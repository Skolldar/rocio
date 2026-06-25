// Lumina slider engine: owns the Three.js renderer, the shader material, the
// auto-advance timer, and the DOM wiring for navigation/counter/progress.
//
// State that was previously shared between closures now lives on the instance.
// Methods are arrow-function fields so they keep their `this` binding when used
// as event listeners or timer callbacks. Call `start()` after the CDN
// dependencies have loaded, and `dispose()` to tear everything down.
/* eslint-disable @typescript-eslint/no-explicit-any -- GSAP and Three.js are untyped CDN globals */

import { getEffectIndex, PROGRESS_UPDATE_INTERVAL, SLIDER_CONFIG } from "./config";
import { fragmentShader, vertexShader } from "./shaders";
import { slides } from "./slides";
import { animateInitialTitle, animateTitleIn, animateTitleOut, splitText } from "./title-animations";

declare const gsap: any;
declare const THREE: any;

export class LuminaSliderEngine {
  private currentSlideIndex = 0;
  private isTransitioning = false;
  private shaderMaterial: any;
  private renderer: any;
  private scene: any;
  private camera: any;
  private slideTextures: any[] = [];
  private texturesLoaded = false;
  private autoSlideTimer: any = null;
  private progressAnimation: any = null;
  private sliderEnabled = false;
  private rafId = 0;
  private disposed = false;

  private readonly slideDuration = () => SLIDER_CONFIG.settings.autoSlideSpeed as number;
  private readonly transitionDuration = () => SLIDER_CONFIG.settings.transitionDuration as number;

  // --- LIFECYCLE ---

  start = () => {
    this.createSlidesNavigation();
    this.updateCounter(0);

    const titleEl = document.getElementById("mainTitle");
    const descEl = document.getElementById("mainDesc");
    if (titleEl && descEl) {
      titleEl.innerHTML = splitText(slides[0].title);
      descEl.textContent = slides[0].description;
      animateInitialTitle(titleEl, descEl);
    }

    this.initRenderer();

    document.addEventListener("visibilitychange", this.onVisibility);
    window.addEventListener("resize", this.onResize);
  };

  dispose = () => {
    this.disposed = true;
    this.sliderEnabled = false;
    this.stopAutoSlideTimer();
    cancelAnimationFrame(this.rafId);
    document.removeEventListener("visibilitychange", this.onVisibility);
    window.removeEventListener("resize", this.onResize);
    this.slideTextures.forEach((t) => t?.dispose?.());
    this.shaderMaterial?.dispose?.();
    this.renderer?.dispose?.();
  };

  // --- SHADER UNIFORMS ---

  private updateShaderUniforms = () => {
    if (!this.shaderMaterial) return;
    const s = SLIDER_CONFIG.settings;
    const u = this.shaderMaterial.uniforms;
    for (const key in s) {
      const uName = "u" + key.charAt(0).toUpperCase() + key.slice(1);
      if (u[uName]) u[uName].value = s[key];
    }
    u.uEffectType.value = getEffectIndex(s.currentEffect);
  };

  // --- CONTENT ---

  private updateContent = (idx: number) => {
    const titleEl = document.getElementById("mainTitle");
    const descEl = document.getElementById("mainDesc");
    if (!titleEl || !descEl) return;

    animateTitleOut(titleEl, descEl);

    setTimeout(() => {
      titleEl.innerHTML = splitText(slides[idx].title);
      descEl.textContent = slides[idx].description;
      animateTitleIn(idx, titleEl, descEl);
    }, 500);
  };

  // --- NAVIGATION ---

  private navigateToSlide = (targetIndex: number) => {
    if (this.isTransitioning || targetIndex === this.currentSlideIndex) return;
    this.stopAutoSlideTimer();
    this.quickResetProgress(this.currentSlideIndex);

    const currentTexture = this.slideTextures[this.currentSlideIndex];
    const targetTexture = this.slideTextures[targetIndex];
    if (!currentTexture || !targetTexture) return;

    this.isTransitioning = true;
    this.shaderMaterial.uniforms.uTexture1.value = currentTexture;
    this.shaderMaterial.uniforms.uTexture2.value = targetTexture;
    this.shaderMaterial.uniforms.uTexture1Size.value = currentTexture.userData.size;
    this.shaderMaterial.uniforms.uTexture2Size.value = targetTexture.userData.size;

    this.updateContent(targetIndex);

    this.currentSlideIndex = targetIndex;
    this.updateCounter(this.currentSlideIndex);
    this.updateNavigationState(this.currentSlideIndex);

    gsap.fromTo(
      this.shaderMaterial.uniforms.uProgress,
      { value: 0 },
      {
        value: 1,
        duration: this.transitionDuration(),
        ease: "power2.inOut",
        // Start the auto-slide progress bar as the new image begins appearing,
        // not after the transition finishes, so the bar tracks the full dwell.
        onStart: () => this.safeStartTimer(),
        onComplete: () => {
          this.shaderMaterial.uniforms.uProgress.value = 0;
          this.shaderMaterial.uniforms.uTexture1.value = targetTexture;
          this.shaderMaterial.uniforms.uTexture1Size.value = targetTexture.userData.size;
          this.isTransitioning = false;
        },
      }
    );
  };

  private handleSlideChange = () => {
    if (this.isTransitioning || !this.texturesLoaded || !this.sliderEnabled) return;
    this.navigateToSlide((this.currentSlideIndex + 1) % slides.length);
  };

  private createSlidesNavigation = () => {
    const nav = document.getElementById("slidesNav");
    if (!nav) return;
    nav.innerHTML = "";
    slides.forEach((slide, i) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = `slide-nav-item${i === 0 ? " active" : ""}`;
      item.dataset.slideIndex = String(i);
      item.setAttribute("aria-label", `Ir a la diapositiva ${i + 1}: ${slide.label}`);
      item.innerHTML = `<div class="slide-progress-line"><div class="slide-progress-fill"></div></div><div class="slide-nav-title">${slide.label}</div>`;
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!this.isTransitioning && i !== this.currentSlideIndex) {
          this.stopAutoSlideTimer();
          this.quickResetProgress(this.currentSlideIndex);
          this.navigateToSlide(i);
        }
      });
      nav.appendChild(item);
    });
  };

  private updateNavigationState = (idx: number) =>
    document.querySelectorAll(".slide-nav-item").forEach((el, i) => el.classList.toggle("active", i === idx));

  // --- PROGRESS BARS ---

  private updateSlideProgress = (idx: number, prog: number) => {
    const el = document.querySelectorAll(".slide-nav-item")[idx]?.querySelector(".slide-progress-fill") as HTMLElement;
    if (el) {
      el.style.width = `${prog}%`;
      el.style.opacity = "1";
    }
  };

  private fadeSlideProgress = (idx: number) => {
    const el = document.querySelectorAll(".slide-nav-item")[idx]?.querySelector(".slide-progress-fill") as HTMLElement;
    if (el) {
      el.style.opacity = "0";
      setTimeout(() => (el.style.width = "0%"), 300);
    }
  };

  private quickResetProgress = (idx: number) => {
    const el = document.querySelectorAll(".slide-nav-item")[idx]?.querySelector(".slide-progress-fill") as HTMLElement;
    if (el) {
      el.style.transition = "width 0.2s ease-out";
      el.style.width = "0%";
      setTimeout(() => (el.style.transition = "width 0.1s ease, opacity 0.3s ease"), 200);
    }
  };

  private updateCounter = (idx: number) => {
    const sn = document.getElementById("slideNumber");
    if (sn) sn.textContent = String(idx + 1).padStart(2, "0");
    const st = document.getElementById("slideTotal");
    if (st) st.textContent = String(slides.length).padStart(2, "0");
  };

  // --- AUTO-SLIDE TIMER ---

  private startAutoSlideTimer = () => {
    if (!this.texturesLoaded || !this.sliderEnabled) return;
    this.stopAutoSlideTimer();
    let progress = 0;
    const increment = (100 / this.slideDuration()) * PROGRESS_UPDATE_INTERVAL;
    this.progressAnimation = setInterval(() => {
      if (!this.sliderEnabled) {
        this.stopAutoSlideTimer();
        return;
      }
      progress += increment;
      this.updateSlideProgress(this.currentSlideIndex, progress);
      if (progress >= 100) {
        clearInterval(this.progressAnimation);
        this.progressAnimation = null;
        this.fadeSlideProgress(this.currentSlideIndex);
        if (!this.isTransitioning) this.handleSlideChange();
      }
    }, PROGRESS_UPDATE_INTERVAL);
  };

  private stopAutoSlideTimer = () => {
    if (this.progressAnimation) clearInterval(this.progressAnimation);
    if (this.autoSlideTimer) clearTimeout(this.autoSlideTimer);
    this.progressAnimation = null;
    this.autoSlideTimer = null;
  };

  private safeStartTimer = (delay = 0) => {
    this.stopAutoSlideTimer();
    if (this.sliderEnabled && this.texturesLoaded) {
      if (delay > 0) this.autoSlideTimer = setTimeout(this.startAutoSlideTimer, delay);
      else this.startAutoSlideTimer();
    }
  };

  // --- TEXTURES & RENDERER ---

  private loadImageTexture = (src: string) =>
    new Promise<any>((resolve, reject) => {
      const l = new THREE.TextureLoader();
      l.setCrossOrigin("anonymous");
      l.load(
        src,
        (t: any) => {
          t.minFilter = t.magFilter = THREE.LinearFilter;
          t.userData = { size: new THREE.Vector2(t.image.width, t.image.height) };
          resolve(t);
        },
        undefined,
        reject
      );
    });

  private onResize = () => {
    if (this.renderer) {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.shaderMaterial.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    }
  };

  private onVisibility = () =>
    document.hidden ? this.stopAutoSlideTimer() : !this.isTransitioning && this.safeStartTimer();

  private initRenderer = async () => {
    const canvas = document.querySelector(".webgl-canvas") as HTMLCanvasElement;
    if (!canvas) return;
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture1: { value: null },
        uTexture2: { value: null },
        uProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uTexture1Size: { value: new THREE.Vector2(1, 1) },
        uTexture2Size: { value: new THREE.Vector2(1, 1) },
        uEffectType: { value: 0 },
        uGlobalIntensity: { value: 1.0 },
        uSpeedMultiplier: { value: 1.0 },
        uDistortionStrength: { value: 1.0 },
        uColorEnhancement: { value: 1.0 },
        uGlassRefractionStrength: { value: 1.0 },
        uGlassChromaticAberration: { value: 1.0 },
        uGlassBubbleClarity: { value: 1.0 },
        uGlassEdgeGlow: { value: 1.0 },
        uGlassLiquidFlow: { value: 1.0 },
        uFrostIntensity: { value: 1.0 },
        uFrostCrystalSize: { value: 1.0 },
        uFrostIceCoverage: { value: 1.0 },
        uFrostTemperature: { value: 1.0 },
        uFrostTexture: { value: 1.0 },
        uRippleFrequency: { value: 25.0 },
        uRippleAmplitude: { value: 0.08 },
        uRippleWaveSpeed: { value: 1.0 },
        uRippleRippleCount: { value: 1.0 },
        uRippleDecay: { value: 1.0 },
        uPlasmaIntensity: { value: 1.2 },
        uPlasmaSpeed: { value: 0.8 },
        uPlasmaEnergyIntensity: { value: 0.4 },
        uPlasmaContrastBoost: { value: 0.3 },
        uPlasmaTurbulence: { value: 1.0 },
        uTimeshiftDistortion: { value: 1.6 },
        uTimeshiftBlur: { value: 1.5 },
        uTimeshiftFlow: { value: 1.4 },
        uTimeshiftChromatic: { value: 1.5 },
        uTimeshiftTurbulence: { value: 1.4 },
      },
      vertexShader,
      fragmentShader,
    });
    this.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.shaderMaterial));

    for (const s of slides) {
      try {
        this.slideTextures.push(await this.loadImageTexture(s.media));
      } catch {
        console.warn("Failed texture");
      }
    }
    if (this.disposed) return;
    if (this.slideTextures.length >= 2) {
      this.shaderMaterial.uniforms.uTexture1.value = this.slideTextures[0];
      this.shaderMaterial.uniforms.uTexture2.value = this.slideTextures[1];
      this.shaderMaterial.uniforms.uTexture1Size.value = this.slideTextures[0].userData.size;
      this.shaderMaterial.uniforms.uTexture2Size.value = this.slideTextures[1].userData.size;
      this.texturesLoaded = true;
      this.sliderEnabled = true;
      this.updateShaderUniforms();
      document.querySelector(".slider-wrapper")?.classList.add("loaded");
      this.safeStartTimer(500);
    }

    const render = () => {
      this.rafId = requestAnimationFrame(render);
      this.renderer.render(this.scene, this.camera);
    };
    render();
  };
}

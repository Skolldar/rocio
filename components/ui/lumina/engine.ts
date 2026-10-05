// Lumina slider engine: owns the WebGL renderer, the shader uniforms, the
// auto-advance timer, and the DOM wiring for navigation/counter/progress.
//
// Methods are arrow-function fields so they keep their `this` binding when used
// as event listeners or timer callbacks. This module is loaded lazily (it pulls
// in GSAP), so the hero's first paint never waits on it. Call `start()` once,
// and `dispose()` to tear everything down.

import { gsap } from "gsap";

import { getEffectIndex, PROGRESS_UPDATE_INTERVAL, SLIDER_CONFIG } from "./config";
import { QuadRenderer, type SlideTexture } from "./gl";
import { fragmentShader } from "./shaders";
import { slides } from "./slides";
import { animateTitleIn, animateTitleOut, splitText } from "./title-animations";

const imageCache = new Map<string, Promise<HTMLImageElement>>();

// Widths the Next.js image optimizer serves by default (`images.deviceSizes`).
const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

// Texture URL for a slide, resized by the Next.js image optimizer to the
// viewport instead of downloading the full-size original. Slide 0 reuses the
// poster's already-downloaded source so it comes straight from cache.
const textureUrl = (src: string, idx: number): string => {
  if (idx === 0) {
    const poster = document.querySelector<HTMLImageElement>(".slide-poster");
    if (poster?.currentSrc) return poster.currentSrc;
  }
  const target = window.innerWidth * Math.min(window.devicePixelRatio, 2);
  const width = DEVICE_SIZES.find((w) => w >= target) ?? DEVICE_SIZES[DEVICE_SIZES.length - 1];
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
};

export class LuminaSliderEngine {
  private currentSlideIndex = 0;

  onSlideChange?: (idx: number) => void;
  private isTransitioning = false;
  private renderer: QuadRenderer | null = null;
  private slideTextures: (SlideTexture | null)[] = [];
  private texturesLoaded = false;
  private autoSlideTimer: ReturnType<typeof setTimeout> | null = null;
  private progressAnimation: ReturnType<typeof setInterval> | null = null;
  private progress = { value: 0 };
  private sliderEnabled = false;
  private disposed = false;
  // The auto-advance only runs while the hero is actually on screen.
  private inView = false;

  private readonly slideDuration = () => SLIDER_CONFIG.settings.autoSlideSpeed as number;
  private readonly transitionDuration = () => SLIDER_CONFIG.settings.transitionDuration as number;

  // --- LIFECYCLE ---

  start = () => {
    this.createSlidesNavigation();
    this.updateCounter(0);

    // The first title is server-rendered and already visible (it is the LCP
    // element). Split it into letters, still visible, so the first transition
    // can animate it out.
    const titleEl = document.getElementById("mainTitle");
    if (titleEl) titleEl.innerHTML = splitText(slides[0].title, true);

    this.initRenderer();

    document.addEventListener("visibilitychange", this.onVisibility);
    window.addEventListener("resize", this.onResize);
  };

  /** Called by the IntersectionObserver in the hook: pause off-screen, resume on-screen. */
  setInView = (inView: boolean) => {
    if (this.inView === inView) return;
    this.inView = inView;
    if (inView) {
      if (!this.isTransitioning) this.safeStartTimer(300);
    } else {
      this.stopAutoSlideTimer();
    }
  };

  dispose = () => {
    this.disposed = true;
    this.sliderEnabled = false;
    this.stopAutoSlideTimer();
    document.removeEventListener("visibilitychange", this.onVisibility);
    window.removeEventListener("resize", this.onResize);
    gsap.killTweensOf(this.progress);
    this.renderer?.dispose();
    this.renderer = null;
  };

  // --- SHADER UNIFORMS ---

  private updateShaderUniforms = () => {
    const r = this.renderer;
    if (!r) return;
    const s = SLIDER_CONFIG.settings;
    for (const key in s) {
      const value = s[key];
      if (typeof value !== "number") continue;
      r.setFloat("u" + key.charAt(0).toUpperCase() + key.slice(1), value);
    }
    r.setInt("uEffectType", getEffectIndex(s.currentEffect));
  };

  // Binds the outgoing/incoming slide textures to the shader.
  private bindTextures = (from: SlideTexture, to: SlideTexture) => {
    const r = this.renderer;
    if (!r) return;
    r.setTexture("uTexture1", from.texture);
    r.setTexture("uTexture2", to.texture);
    r.setVec2("uTexture1Size", from.size);
    r.setVec2("uTexture2Size", to.size);
  };

  // Draws one frame. The image is static between transitions, so frames are
  // only drawn while a transition runs or after a resize, never in a loop.
  private draw = () => {
    if (!this.renderer || this.disposed) return;
    this.renderer.setFloat("uProgress", this.progress.value);
    this.renderer.render();
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
      this.onSlideChange?.(idx);
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
    this.bindTextures(currentTexture, targetTexture);

    this.updateContent(targetIndex);

    this.currentSlideIndex = targetIndex;
    this.updateCounter(this.currentSlideIndex);
    this.updateNavigationState(this.currentSlideIndex);

    gsap.fromTo(
      this.progress,
      { value: 0 },
      {
        value: 1,
        duration: this.transitionDuration(),
        ease: "power2.inOut",
        onUpdate: this.draw,
        // Start the auto-slide progress bar as the new image begins appearing,
        // not after the transition finishes, so the bar tracks the full dwell.
        onStart: () => this.safeStartTimer(),
        onComplete: () => {
          this.progress.value = 0;
          this.bindTextures(targetTexture, targetTexture);
          this.draw();
          this.isTransitioning = false;
        },
      }
    );
  };

  private handleSlideChange = () => {
    if (this.isTransitioning || !this.texturesLoaded || !this.sliderEnabled) return;
    this.navigateToSlide((this.currentSlideIndex + 1) % slides.length);
  };

  // The nav buttons are server-rendered with the hero; this only wires them up.
  private createSlidesNavigation = () => {
    document.querySelectorAll<HTMLButtonElement>("#slidesNav .slide-nav-item").forEach((item, i) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!this.isTransitioning && i !== this.currentSlideIndex) {
          this.stopAutoSlideTimer();
          this.quickResetProgress(this.currentSlideIndex);
          this.navigateToSlide(i);
        }
      });
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
        if (this.progressAnimation) clearInterval(this.progressAnimation);
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
    if (this.sliderEnabled && this.texturesLoaded && this.inView) {
      if (delay > 0) this.autoSlideTimer = setTimeout(this.startAutoSlideTimer, delay);
      else this.startAutoSlideTimer();
    }
  };

  // --- TEXTURES & RENDERER ---

  private loadImageTexture = async (src: string, idx: number): Promise<SlideTexture | null> => {
    const url = textureUrl(src, idx);
    let pending = imageCache.get(url);
    if (!pending) {
      pending = new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load ${url}`));
        img.src = url;
      }).then(async (img) => {
        await img.decode().catch(() => undefined);
        return img;
      });
      imageCache.set(url, pending);
      pending.catch(() => imageCache.delete(url));
    }
    const img = await pending;
    if (this.disposed || !this.renderer) return null;
    return this.renderer.createTexture(img);
  };

  private resizeRenderer = () => {
    if (!this.renderer) return;
    this.renderer.setSize(window.innerWidth, window.innerHeight, Math.min(window.devicePixelRatio, 2));
    this.renderer.setVec2("uResolution", [window.innerWidth, window.innerHeight]);
  };

  private onResize = () => {
    this.resizeRenderer();
    this.draw();
  };

  private onVisibility = () =>
    document.hidden ? this.stopAutoSlideTimer() : !this.isTransitioning && this.safeStartTimer();

  private initRenderer = async () => {
    const canvas = document.querySelector<HTMLCanvasElement>(".webgl-canvas");
    if (!canvas) return;
    try {
      this.renderer = new QuadRenderer(canvas, fragmentShader, ["uTexture1", "uTexture2"]);
    } catch (e) {
      // Without WebGL the server-rendered poster simply stays in place.
      console.warn("Hero slider disabled:", e);
      return;
    }
    this.resizeRenderer();
    this.updateShaderUniforms();

    const load = (i: number) =>
      this.loadImageTexture(slides[i].media, i)
        .catch(() => {
          console.warn(`Failed texture: ${slides[i].media}`);
          return null;
        })
        .then((t) => (this.slideTextures[i] = t));

    this.slideTextures = slides.map(() => null);
    // The first two slides gate the slider; the rest follow in the background.
    await Promise.all([load(0), load(1)]);
    if (this.disposed) return;
    for (let i = 2; i < slides.length; i++) void load(i);

    const [first, second] = this.slideTextures;
    if (first && second) {
      this.bindTextures(first, first);
      this.draw();
      this.texturesLoaded = true;
      this.sliderEnabled = true;
      document.querySelector(".slider-wrapper")?.classList.add("loaded");
      this.safeStartTimer(500);
    }
  };
}

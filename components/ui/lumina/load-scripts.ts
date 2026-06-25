// Loads GSAP and Three.js from CDN at runtime and resolves once their globals
// are available on `window`. Three.js depends on GSAP being present first, so
// the dependencies are loaded sequentially.
/* eslint-disable @typescript-eslint/no-explicit-any -- CDN globals are untyped */

const GSAP_SRC = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
const THREE_SRC = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

const loadScript = (src: string, globalName: string): Promise<void> =>
  new Promise<void>((res, rej) => {
    if ((window as any)[globalName]) {
      res();
      return;
    }
    // Another instance is already loading this script — poll for the global.
    if (document.querySelector(`script[src="${src}"]`)) {
      const check = setInterval(() => {
        if ((window as any)[globalName]) {
          clearInterval(check);
          res();
        }
      }, 50);
      setTimeout(() => {
        clearInterval(check);
        rej(new Error(`Timeout waiting for ${globalName}`));
      }, 10000);
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => {
      // Brief delay so the global is fully initialized before we touch it.
      setTimeout(() => res(), 100);
    };
    s.onerror = () => rej(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });

export const loadSliderDependencies = async (): Promise<void> => {
  await loadScript(GSAP_SRC, "gsap");
  await loadScript(THREE_SRC, "THREE");
};

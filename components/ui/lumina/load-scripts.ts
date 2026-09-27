const GSAP_SRC = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
const THREE_SRC = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

const hasGlobal = (globalName: string): boolean =>
  Boolean((window as unknown as Record<string, unknown>)[globalName]);

const loadScript = (src: string, globalName: string): Promise<void> =>
  new Promise<void>((res, rej) => {
    if (hasGlobal(globalName)) {
      res();
      return;
    }

    if (document.querySelector(`script[src="${src}"]`)) {
      const check = setInterval(() => {
        if (hasGlobal(globalName)) {
          clearInterval(check);
          clearTimeout(timeout);
          res();
        }
      }, 50);
      const timeout = setTimeout(() => {
        clearInterval(check);
        rej(new Error(`Timeout waiting for ${globalName}`));
      }, 10000);
      return;
    }

    const s = document.createElement("script");
    s.src = src;
    s.onload = () => res();
    s.onerror = () => rej(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });

export const loadSliderDependencies = async (): Promise<void> => {
  await Promise.all([loadScript(GSAP_SRC, "gsap"), loadScript(THREE_SRC, "THREE")]);
};

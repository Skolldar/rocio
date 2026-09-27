import { useEffect, type RefObject } from "react";

import type { LuminaSliderEngine } from "./engine";

// Resolves once the page has finished loading and the main thread is idle, so
// the slider's script and textures never compete with the first paint.
const whenIdle = (): Promise<void> =>
  new Promise((resolve) => {
    const idle = () =>
      "requestIdleCallback" in window
        ? window.requestIdleCallback(() => resolve(), { timeout: 3000 })
        : setTimeout(resolve, 200);
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
  });

export function useLuminaSlider(
  containerRef: RefObject<HTMLElement | null>,
  onSlideChange?: (idx: number) => void,
) {
  useEffect(() => {
    let active = true;
    let engine: LuminaSliderEngine | null = null;
    let inView = false;
    // Users who asked for less motion keep manual navigation but no auto-advance.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && !reduceMotion;
        engine?.setInView(inView);
      },
      // Consider the hero "on screen" once roughly a third of it is visible.
      { threshold: 0.35 },
    );
    if (containerRef.current) observer.observe(containerRef.current);

    whenIdle()
      .then(() => import("./engine"))
      .then(({ LuminaSliderEngine }) => {
        if (!active) return;
        engine = new LuminaSliderEngine();
        engine.onSlideChange = onSlideChange;
        engine.start();
        engine.setInView(inView);
      })
      .catch((e) => console.error("Failed to load hero slider:", e));

    return () => {
      active = false;
      observer.disconnect();
      engine?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- boot once per mount
  }, []);
}

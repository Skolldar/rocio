// React hook that loads the CDN dependencies, boots the slider engine, and
// tears it down on unmount. Guards against the component unmounting while the
// scripts are still loading.
import { useEffect } from "react";

import { LuminaSliderEngine } from "./engine";
import { loadSliderDependencies } from "./load-scripts";

export function useLuminaSlider() {
  useEffect(() => {
    let active = true;
    let engine: LuminaSliderEngine | null = null;

    loadSliderDependencies()
      .then(() => {
        if (!active) return;
        engine = new LuminaSliderEngine();
        engine.start();
      })
      .catch((e) => console.error("Failed to load slider dependencies:", e));

    return () => {
      active = false;
      engine?.dispose();
    };
  }, []);
}

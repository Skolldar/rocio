// Runtime configuration for the Lumina hero slider.
// `settings` doubles as the source of truth for the shader uniforms: every
// numeric key is mapped to a `u<Key>` uniform in the engine (see
// `updateShaderUniforms`), so keep names in sync with the shader.

export interface SliderSettings {
  currentEffect: string;
  currentEffectPreset: string;
  // All other settings are numeric and feed shader uniforms.
  [key: string]: number | string;
}

export interface SliderConfig {
  settings: SliderSettings;
}

export const SLIDER_CONFIG: SliderConfig = {
  settings: {
    transitionDuration: 2.5,
    autoSlideSpeed: 5000,
    currentEffect: "glass",
    currentEffectPreset: "Default",
    globalIntensity: 1.0,
    speedMultiplier: 1.0,
    distortionStrength: 1.0,
    colorEnhancement: 1.0,
    glassRefractionStrength: 1.0,
    glassChromaticAberration: 1.0,
    glassBubbleClarity: 1.0,
    glassEdgeGlow: 1.0,
    glassLiquidFlow: 1.0,
    frostIntensity: 1.5,
    frostCrystalSize: 1.0,
    frostIceCoverage: 1.0,
    frostTemperature: 1.0,
    frostTexture: 1.0,
    rippleFrequency: 25.0,
    rippleAmplitude: 0.08,
    rippleWaveSpeed: 1.0,
    rippleRippleCount: 1.0,
    rippleDecay: 1.0,
    plasmaIntensity: 1.2,
    plasmaSpeed: 0.8,
    plasmaEnergyIntensity: 0.4,
    plasmaContrastBoost: 0.3,
    plasmaTurbulence: 1.0,
    timeshiftDistortion: 1.6,
    timeshiftBlur: 1.5,
    timeshiftFlow: 1.4,
    timeshiftChromatic: 1.5,
    timeshiftTurbulence: 1.4,
  },
};

// How often (ms) the auto-slide progress bar ticks.
export const PROGRESS_UPDATE_INTERVAL = 50;

// Maps an effect name to the integer the fragment shader branches on.
export const getEffectIndex = (name: string): number =>
  ({ glass: 0, frost: 1, ripple: 2, plasma: 3, timeshift: 4 } as Record<string, number>)[name] ?? 0;

// GLSL shaders for the WebGL slide transitions. The fragment shader exposes
// one effect per `uEffectType` value (see `getEffectIndex` in `config.ts`);
// only the `glass` effect is fully implemented, the rest cross-fade.

export const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

export const fragmentShader = `
  uniform sampler2D uTexture1, uTexture2;
  uniform float uProgress;
  uniform vec2 uResolution, uTexture1Size, uTexture2Size;
  uniform int uEffectType;
  uniform float uGlobalIntensity, uSpeedMultiplier, uDistortionStrength, uColorEnhancement;
  uniform float uGlassRefractionStrength, uGlassChromaticAberration, uGlassBubbleClarity, uGlassEdgeGlow, uGlassLiquidFlow;
  uniform float uFrostIntensity, uFrostCrystalSize, uFrostIceCoverage, uFrostTemperature, uFrostTexture;
  uniform float uRippleFrequency, uRippleAmplitude, uRippleWaveSpeed, uRippleRippleCount, uRippleDecay;
  uniform float uPlasmaIntensity, uPlasmaSpeed, uPlasmaEnergyIntensity, uPlasmaContrastBoost, uPlasmaTurbulence;
  uniform float uTimeshiftDistortion, uTimeshiftBlur, uTimeshiftFlow, uTimeshiftChromatic, uTimeshiftTurbulence;
  varying vec2 vUv;

  vec2 getCoverUV(vec2 uv, vec2 textureSize) {
      vec2 s = uResolution / textureSize;
      float scale = max(s.x, s.y);
      vec2 scaledSize = textureSize * scale;
      vec2 offset = (uResolution - scaledSize) * 0.5;
      return (uv * uResolution - offset) / scaledSize;
  }
  float noise(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  vec4 glassEffect(vec2 uv, float progress) {
      float time = progress * 5.0 * uSpeedMultiplier;
      vec2 uv1 = getCoverUV(uv, uTexture1Size); vec2 uv2 = getCoverUV(uv, uTexture2Size);
      float maxR = length(uResolution) * 0.85; float br = progress * maxR;
      vec2 p = uv * uResolution; vec2 c = uResolution * 0.5;
      float d = length(p - c); float nd = d / max(br, 0.001);
      float param = smoothstep(br + 3.0, br - 3.0, d); // Inside circle
      vec4 img;
      if (param > 0.0) {
           float ro = 0.08 * uGlassRefractionStrength * uDistortionStrength * uGlobalIntensity * pow(smoothstep(0.3 * uGlassBubbleClarity, 1.0, nd), 1.5);
           vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
           vec2 distUV = uv2 - dir * ro;
           distUV += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * uGlassLiquidFlow * uSpeedMultiplier * nd * param;
           float ca = 0.02 * uGlassChromaticAberration * uGlobalIntensity * pow(smoothstep(0.3, 1.0, nd), 1.2);
           img = vec4(texture2D(uTexture2, distUV + dir * ca * 1.2).r, texture2D(uTexture2, distUV + dir * ca * 0.2).g, texture2D(uTexture2, distUV - dir * ca * 0.8).b, 1.0);
           if (uGlassEdgeGlow > 0.0) {
              float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
              img.rgb += rim * 0.08 * uGlassEdgeGlow * uGlobalIntensity;
           }
      } else { img = texture2D(uTexture2, uv2); }
      vec4 oldImg = texture2D(uTexture1, uv1);
      if (progress > 0.95) img = mix(img, texture2D(uTexture2, uv2), (progress - 0.95) / 0.05);
      return mix(oldImg, img, param);
  }
  vec4 frostEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }
  vec4 rippleEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }
  vec4 plasmaEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }
  vec4 timeshiftEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }

  void main() {
      if (uEffectType == 0) gl_FragColor = glassEffect(vUv, uProgress);
      else if (uEffectType == 1) gl_FragColor = frostEffect(vUv, uProgress);
      else if (uEffectType == 2) gl_FragColor = rippleEffect(vUv, uProgress);
      else if (uEffectType == 3) gl_FragColor = plasmaEffect(vUv, uProgress);
      else gl_FragColor = timeshiftEffect(vUv, uProgress);
  }
`;

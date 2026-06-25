"use client";

import React, { useRef } from "react";

import { useLuminaSlider } from "./lumina/use-lumina-slider";

export function Component() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLuminaSlider();

  return (
    <main className="slider-wrapper" ref={containerRef} aria-label="Colecciones destacadas">
      <canvas className="webgl-canvas" aria-hidden="true"></canvas>

      <div className="slider-overlay" aria-hidden="true"></div>

      <div className="slide-counter" aria-hidden="true">
        <span className="slide-number" id="slideNumber">
          01
        </span>
        <span className="slide-counter-sep">/</span>
        <span className="slide-total" id="slideTotal">
          06
        </span>
      </div>

      <div className="slide-content">
        <p className="slide-eyebrow">La Colección</p>
        <h1 className="slide-title" id="mainTitle"></h1>
        <p className="slide-description" id="mainDesc"></p>
        <a className="slide-cta" href="/products">
          Explora la colección
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      <nav className="slides-navigation" id="slidesNav" aria-label="Diapositivas de la colección"></nav>
    </main>
  );
}

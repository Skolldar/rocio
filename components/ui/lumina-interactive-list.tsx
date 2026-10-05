"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { slides } from "./lumina/slides";
import { useLuminaSlider } from "./lumina/use-lumina-slider";

export function Component() {
  const containerRef = useRef<HTMLElement>(null);

  const [activeSlide, setActiveSlide] = useState(0);

  useLuminaSlider(containerRef, setActiveSlide);

  return (
    <main className="slider-wrapper" ref={containerRef} aria-label="Colecciones destacadas">
      <Image
        className="slide-poster"
        src={slides[0].media}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
      />
      <canvas className="webgl-canvas" aria-hidden="true"></canvas>

      <div className="slider-overlay" aria-hidden="true"></div>

      <div className="slide-counter" aria-hidden="true">
        <span className="slide-number" id="slideNumber">
          01
        </span>
        <span className="slide-counter-sep">/</span>
        <span className="slide-total" id="slideTotal">
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      <div className="slide-content">
        <p className="slide-eyebrow">La Colección</p>
        {/* The first slide's copy is server-rendered so it paints immediately;
            the slider engine takes these nodes over once it boots. */}
        <h1 className="slide-title" id="mainTitle">
          {slides[0].title}
        </h1>
        <p className="slide-description" id="mainDesc">
          {slides[0].description}
        </p>
        <Link className="slide-cta" href={slides[activeSlide].href}>
          Explora la colección
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Server-rendered so the labels paint with the hero; the slider engine
          wires up these buttons once it boots. */}
      <nav className="slides-navigation" id="slidesNav" aria-label="Diapositivas de la colección">
        {slides.map((slide, i) => (
          <button
            key={slide.label}
            type="button"
            className={`slide-nav-item${i === 0 ? " active" : ""}`}
            data-slide-index={i}
            aria-label={`Ir a la diapositiva ${i + 1}: ${slide.label}`}
          >
            <div className="slide-progress-line">
              <div className="slide-progress-fill"></div>
            </div>
            <div className="slide-nav-title">{slide.label}</div>
          </button>
        ))}
      </nav>
    </main>
  );
}

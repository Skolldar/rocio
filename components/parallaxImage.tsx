"use client"

import { useEffect, useRef } from "react"

type ParallaxImageProps = {
  src: string
  alt: string
  /** How far (px) the image drifts across the full scroll pass. */
  distance?: number
  className?: string
}

/**
 * Full-bleed image that drifts vertically as the viewport scrolls past it,
 * creating a parallax effect. The image is rendered taller than its frame so
 * the drift never exposes an edge. Honors `prefers-reduced-motion`.
 */
export default function ParallaxImage({
  src,
  alt,
  distance = 120,
  className = "",
}: ParallaxImageProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    const img = imgRef.current
    if (!frame || !img) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = frame.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the frame's top is at the bottom of the viewport,
      // 1 when its bottom has scrolled past the top.
      const progress = (vh - rect.top) / (vh + rect.height)
      const clamped = Math.min(1, Math.max(0, progress))
      const y = (clamped - 0.5) * distance
      img.style.transform = `translate3d(0, ${y}px, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [distance])

  return (
    <div ref={frameRef} className={`overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute -top-[15%] left-0 h-[130%] w-full object-cover will-change-transform"
      />
    </div>
  )
}

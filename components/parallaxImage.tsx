"use client"

import { useEffect, useRef, type CSSProperties } from "react"

type ParallaxImageProps = {
  src: string
  alt: string
  video?: string
  distance?: number
  objectPosition?: string
  className?: string
}

export default function ParallaxImage({
  src,
  alt,
  video,
  distance = 120,
  objectPosition = "50% 50%",
  className = "",
}: ParallaxImageProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLImageElement & HTMLVideoElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    const media = mediaRef.current
    if (!frame || !media) return
    // React doesn't reliably reflect the `muted` attribute onto the DOM
    // property, so set it directly: the video must never play sound.
    if (video) media.muted = true
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (video && reduceMotion) media.pause()
   
    if (CSS.supports("animation-timeline: view()")) return
    if (reduceMotion) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = frame.getBoundingClientRect()
      const vh = window.innerHeight
   
      const progress = (vh - rect.top) / (vh + rect.height)
      const clamped = Math.min(1, Math.max(0, progress))
      const y = (clamped - 0.5) * distance
      media.style.transform = `translate3d(0, ${y}px, 0)`
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
  }, [distance, video])

  const overflow = distance / 2
  const mediaStyle: CSSProperties = {
    top: -overflow,
    height: `calc(100% + ${distance}px)`,
    objectPosition,
  }
  const mediaClass =
    "parallax-img absolute left-0 w-full object-cover will-change-transform"

  return (
    <div
      ref={frameRef}
      style={{ "--parallax-distance": `${distance}px` } as CSSProperties}
      className={`parallax-frame overflow-clip ${className}`}
    >
      {video ? (
        <video
          ref={mediaRef}
          src={video}
          poster={src}
          aria-label={alt}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={mediaStyle}
          className={mediaClass}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={mediaRef}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={mediaStyle}
          className={mediaClass}
        />
      )}
    </div>
  )
}

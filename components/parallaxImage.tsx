"use client"

import { useEffect, useRef, type CSSProperties } from "react"
import { getImageProps } from "next/image"

import { observePlayback, posterUrl } from "@/components/lazyVideo"

type ParallaxImageProps = {
  src: string
  alt: string
  video?: string
  distance?: number
  objectPosition?: string
  className?: string
  sizes?: string
}

export default function ParallaxImage({
  src,
  alt,
  video,
  distance = 120,
  objectPosition = "50% 50%",
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: ParallaxImageProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLImageElement & HTMLVideoElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    const media = mediaRef.current
    if (!frame || !media) return
    // Videos only download and play once they approach the viewport.
    const stopPlayback = video ? observePlayback(media) : () => {}
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (CSS.supports("animation-timeline: view()") || reduceMotion) return stopPlayback

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
      stopPlayback()
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
  // Responsive, optimizer-served sources; positioning comes from `mediaStyle`.
  const { style: _fillStyle, ...imgProps } = getImageProps({ src, alt, fill: true, sizes }).props
  void _fillStyle
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
          poster={posterUrl(src, 1920)}
          aria-label={alt}
          muted
          loop
          playsInline
          preload="none"
          style={mediaStyle}
          className={mediaClass}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={mediaRef}
          {...imgProps}
          alt={alt}
          style={mediaStyle}
          className={mediaClass}
        />
      )}
    </div>
  )
}

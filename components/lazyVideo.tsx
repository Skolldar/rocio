"use client"

import { useEffect, useRef, type ComponentProps } from "react"

// Plays a muted, looping video only while it is near the viewport. The file is
// not downloaded at all until then (`preload="none"`, no `autoPlay`), so a
// below-the-fold video no longer costs megabytes on page load. Returns a
// cleanup function.
export function observePlayback(video: HTMLVideoElement): () => void {
  // React doesn't reliably reflect the `muted` attribute onto the DOM
  // property, so set it directly: the video must never play sound.
  video.muted = true
  // Users who asked for less motion get the poster frame only.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {}

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    },
    { rootMargin: "200px 0px" },
  )
  observer.observe(video)
  return () => observer.disconnect()
}

// A resized, optimizer-served poster instead of the full-size original.
// `width` must be one of the optimizer's `deviceSizes`; 1080px covers a
// half-viewport panel at 2x.
export const posterUrl = (src: string, width = 1080) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`

type LazyVideoProps = Omit<ComponentProps<"video">, "autoPlay" | "preload" | "poster"> & {
  poster: string
}

export default function LazyVideo({ poster, ...props }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (ref.current) return observePlayback(ref.current)
  }, [])

  return <video ref={ref} poster={posterUrl(poster)} muted loop playsInline preload="none" {...props} />
}

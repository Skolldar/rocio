"use client"

import { useEffect, useRef, type ReactNode } from "react"

type RevealProps = {
  as?: "div" | "ul"
  className?: string
  children: ReactNode
}

const STAGGER_MS = 70

// Card entrance for any `.reveal-item` inside. The CSS animation plays on first
// paint, so the first row fades in without waiting for hydration. Items that
// start below the fold are re-hidden here (offscreen, so nothing flickers) and
// replay the animation when they scroll into view, staggered per batch.
export default function Reveal({ as: Tag = "div", className, children }: RevealProps) {
  const ref = useRef<HTMLDivElement & HTMLUListElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root || !("IntersectionObserver" in window)) return

    const items = Array.from(root.querySelectorAll<HTMLElement>(".reveal-item")).filter(
      (item) => item.getBoundingClientRect().top > window.innerHeight,
    )
    items.forEach((item) => item.classList.add("is-pending"))

    const observer = new IntersectionObserver(
      (entries) => {
        let batchIndex = 0
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const item = entry.target as HTMLElement
          item.style.setProperty("--reveal-delay", `${batchIndex * STAGGER_MS}ms`)
          item.classList.remove("is-pending")
          observer.unobserve(item)
          batchIndex++
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    )

    items.forEach((item) => observer.observe(item))
    return () => {
      observer.disconnect()
      items.forEach((item) => item.classList.remove("is-pending"))
    }
  }, [children])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

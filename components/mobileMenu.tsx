"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, ShoppingBag, User } from "lucide-react"

import { useCart } from "@/lib/cart"
import { cn } from "@/lib/utils"

export type NavLink = { title: string; href: string; description: string }

type MobileMenuProps = {
  id: string
  open: boolean
  onClose: () => void
  categories: NavLink[]
  collections: NavLink[]
}

// Staggered reveal: each block fades up a beat after the previous one.
function revealStyle(open: boolean, step: number): React.CSSProperties {
  return { transitionDelay: open ? `${60 + step * 35}ms` : "0ms" }
}

const revealClass = (open: boolean) =>
  cn(
    "transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
  )

export default function MobileMenu({
  id,
  open,
  onClose,
  categories,
  collections,
}: MobileMenuProps) {
  const { count: cartCount } = useCart()
  const pathname = usePathname()

  // Lock page scroll, close on Escape, and close if the viewport grows to desktop.
  React.useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    const desktop = window.matchMedia("(min-width: 1024px)")
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) onClose()
    }

    window.addEventListener("keydown", onKeyDown)
    desktop.addEventListener("change", onBreakpoint)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
      desktop.removeEventListener("change", onBreakpoint)
    }
  }, [open, onClose])

  // Only path-only hrefs can be matched against usePathname().
  const isActive = (href: string) => !href.includes("?") && pathname === href

  const featuredStep = categories.length

  // The closed panel stays mounted (invisible) over the viewport, so its links
  // would all count as "visible" and prefetch every route on page load. Only
  // prefetch once the menu is actually open.
  const prefetch = open ? null : false

  // Likewise, hold the featured card's background image until the first open
  // so it isn't downloaded on every page load. It stays set afterwards so it
  // doesn't vanish during the closing fade.
  const [hasOpened, setHasOpened] = React.useState(open)
  if (open && !hasOpened) setHasOpened(true)

  return (
    <nav
      id={id}
      aria-label="Menú principal"
      inert={!open}
      className={cn(
        "fixed inset-x-0 bottom-0 top-14 z-40 flex flex-col overflow-y-auto overscroll-contain bg-stone-950 text-stone-50 transition-[opacity,visibility] duration-300 ease-out motion-reduce:transition-none lg:hidden",
        open ? "visible opacity-100" : "invisible opacity-0 duration-200"
      )}
    >
      {/* Soft gold glow so the panel doesn't read as a flat black sheet */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--gold)_14%,transparent),transparent_70%)]"
      />

      <div className="relative mx-auto flex w-full max-w-400 flex-1 flex-col px-5 sm:px-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8">
        <p
          style={revealStyle(open, 0)}
          className={cn(
            "text-[0.72rem] font-medium uppercase tracking-[0.32em] text-gold-bright",
            revealClass(open)
          )}
        >
          Joyería
        </p>
        <ul className="mt-3 border-t border-white/10">
          {categories.map((category, index) => {
            const active = isActive(category.href)
            return (
              <li
                key={category.title}
                style={revealStyle(open, index + 1)}
                className={revealClass(open)}
              >
                <Link
                  href={category.href}
                  prefetch={prefetch}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className="group flex min-h-16 items-center gap-4 border-b border-white/10 py-3 outline-none transition-colors focus-visible:bg-white/5"
                >
                  <span
                    aria-hidden="true"
                    className="w-6 text-[0.7rem] font-medium tabular-nums tracking-widest text-stone-500 transition-colors group-hover:text-gold-bright group-active:text-gold-bright"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "flex-1 text-[1.65rem] font-semibold leading-tight tracking-tight transition-colors group-hover:text-gold-bright group-active:text-gold-bright",
                      active ? "text-gold-bright" : "text-stone-50"
                    )}
                  >
                    {category.title}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-5 text-stone-500 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-bright"
                  />
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Featured collection */}
        <Link
          href="/products"
          prefetch={prefetch}
          onClick={onClose}
          style={revealStyle(open, featuredStep + 1)}
          className={cn(
            "group relative mt-8 flex aspect-video flex-col justify-end overflow-hidden rounded-lg p-5 outline-none focus-visible:ring-2 focus-visible:ring-gold-bright",
            revealClass(open)
          )}
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
            style={
              hasOpened
                ? {
                    backgroundImage:
                      "url('/img/modelos/modelo-collares-capas.webp')",
                  }
                : undefined
            }
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-stone-950/90 via-stone-950/40 to-transparent"
          />
          <span className="relative text-[0.7rem] font-medium uppercase tracking-[0.22em] text-gold-bright">
            Colección
          </span>
          <span className="relative mt-1 flex items-center justify-between gap-3">
            <span className="text-2xl font-semibold leading-tight text-white">
              Atelier de Oro
            </span>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:bg-gold-bright group-hover:text-stone-950">
              <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="size-4.5" />
            </span>
          </span>
          <span className="relative mt-1 text-sm font-regular leading-snug text-stone-200">
            Piezas de acero inoxidable color oro y color plata.
          </span>
        </Link>

        {/* Collections — 2×2 grid of tiles, arrow badge matches the featured card */}
        <div style={revealStyle(open, featuredStep + 2)} className={cn("mt-8", revealClass(open))}>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.32em] text-gold-bright">
            Colecciones
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {[
              ...collections,
              {
                title: "Sobre mí",
                href: "/sobre-nosotras",
                description: "La historia detrás del taller.",
              },
            ].map((collection) => {
              const active = isActive(collection.href)
              return (
                <li key={collection.title}>
                  <Link
                    href={collection.href}
                    prefetch={prefetch}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex h-full flex-col gap-3 rounded-lg border bg-white/3 p-4 outline-none transition-[border-color,background-color,transform] duration-200 hover:border-gold-bright/50 hover:bg-white/6 focus-visible:ring-2 focus-visible:ring-gold-bright active:scale-[0.98] motion-reduce:transition-none",
                      active ? "border-gold-bright/60" : "border-white/10"
                    )}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span
                        className={cn(
                          "text-lg font-semibold leading-tight transition-colors group-hover:text-gold-bright",
                          active ? "text-gold-bright" : "text-white"
                        )}
                      >
                        {collection.title}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className="size-5 shrink-0 text-stone-500 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-bright group-active:text-gold-bright"
                      />
                    </span>
                    <span className="line-clamp-2 text-[0.8rem] leading-snug text-stone-400">
                      {collection.description}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Account + cart — pinned to the bottom when there's room */}
        <div
          style={revealStyle(open, featuredStep + 3)}
          className={cn(
            "mt-auto grid grid-cols-2 gap-3 pt-10",
            revealClass(open)
          )}
        >
          <Link
            href="/order"
            prefetch={prefetch}
            onClick={onClose}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 text-[0.78rem] font-medium uppercase tracking-[0.12em] text-stone-100 outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-gold-bright"
          >
            <User aria-hidden="true" className="size-4" strokeWidth={1.75} />
            Mi cuenta
          </Link>
          <Link
            href="/order"
            prefetch={prefetch}
            onClick={onClose}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-linear-135 from-gold-bright to-gold text-[0.78rem] font-medium uppercase tracking-[0.12em] text-gold-ink shadow-gold outline-none transition-[filter] hover:brightness-107 focus-visible:ring-2 focus-visible:ring-gold-bright focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
          >
            <ShoppingBag aria-hidden="true" className="size-4" strokeWidth={1.75} />
            Carrito ({cartCount})
          </Link>
        </div>
      </div>
    </nav>
  )
}

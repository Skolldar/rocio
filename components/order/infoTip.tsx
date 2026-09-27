"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"

// "?" junto a una etiqueta. Se abre al pasar el ratón, con el teclado (foco)
// o tocándolo en el móvil, así no depende solo del hover.
// El globo se posiciona respecto al contenedor `relative` más cercano (la fila
// de la etiqueta), para que no se salga de la pantalla en el móvil.
export default function InfoTip({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <span className="group/tip inline-flex align-middle" onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={id}
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false)
            event.currentTarget.blur()
          }
        }}
        // El before: amplía la zona táctil a 44px sin agrandar el círculo.
        className="relative grid size-5 cursor-help place-items-center rounded-full border border-muted-foreground/40 text-[0.7rem] font-semibold leading-none text-muted-foreground transition-colors before:absolute before:-inset-3 hover:border-gold-deep hover:text-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep aria-expanded:border-gold-deep aria-expanded:text-gold-deep"
      >
        ?
      </button>

      <span
        id={id}
        role="tooltip"
        className={cn(
          "absolute bottom-full left-0 z-30 w-full max-w-xs pb-2 text-left transition-[opacity,translate] duration-150 ease-out motion-reduce:transition-none",
          "invisible translate-y-1 opacity-0",
          "group-hover/tip:visible group-hover/tip:translate-y-0 group-hover/tip:opacity-100",
          "group-focus-within/tip:visible group-focus-within/tip:translate-y-0 group-focus-within/tip:opacity-100",
          open && "visible translate-y-0 opacity-100"
        )}
      >
        <span className="block rounded-xl bg-ink px-4 py-3 text-sm font-normal leading-snug text-cream shadow-lg shadow-stone-950/15">
          {children}
        </span>
      </span>
    </span>
  )
}

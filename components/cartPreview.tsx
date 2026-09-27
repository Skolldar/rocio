"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { eur, type CartItem } from "@/lib/cart"

type CartPreviewProps = {
  id: string
  open: boolean
  items: CartItem[]
  onRemove: (itemId: string) => void
  onNavigate: () => void
}

export default function CartPreview({
  id,
  open,
  items,
  onRemove,
  onNavigate,
}: CartPreviewProps) {
  const itemCount = items.reduce((sum, it) => sum + it.quantity, 0)
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0)

  return (
    // El pt-3 hace de "puente" invisible entre el icono y el panel, para que el
    // hover no se pierda al bajar el ratón.
    <div
      id={id}
      aria-hidden={!open}
      inert={!open}
      className={cn(
        "absolute right-0 top-full z-50 w-[min(30rem,calc(100vw-6rem))] pt-3 transition-[opacity,translate] ease-out motion-reduce:transition-none",
        open
          ? "visible translate-y-0 opacity-100 duration-200"
          : "invisible -translate-y-1 opacity-0 duration-150"
      )}
    >
      <section
        aria-label="Resumen del carrito"
        className="relative rounded-md bg-popover text-popover-foreground shadow-lg"
      >
        {/* Caret apuntando al icono de la bolsa */}
        <span
          aria-hidden="true"
          className="absolute -top-1.5 right-3.5 size-3 rotate-45 rounded-tl-sm bg-popover"
        />

        <header className="flex items-baseline justify-between px-7 pb-6 pt-7">
          <h2 className="text-2xl font-semibold uppercase">
            Carrito
          </h2>
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-gold-deep">
            {itemCount} {itemCount === 1 ? "pieza" : "piezas"}
          </span>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-col items-center px-7 pb-10 pt-4 text-center">
            <ShoppingBag className="size-7 text-gold-deep" strokeWidth={1.25} />
            <p className="mt-3 text-sm text-muted-foreground">Tu carrito está vacío</p>
          </div>
        ) : (
          <ul className="max-h-[min(26rem,55dvh)] space-y-5 overflow-y-auto px-7 pb-7 [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin]">
            {items.map((item) => (
              <li key={item.id} className="relative flex gap-4">
                <div className="relative size-32 shrink-0 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-center pr-8 text-sm">
                  <p className="font-medium leading-snug">{item.name}</p>
                  {item.detail.split(" · ").map((line) => (
                    <p key={line} className="leading-snug text-muted-foreground">
                      {line}
                    </p>
                  ))}
                  <p className="leading-snug text-muted-foreground">
                    {item.quantity} {item.quantity === 1 ? "pieza" : "piezas"}
                  </p>
                  <p className="mt-4 font-semibold tabular-nums">
                    {eur.format(item.price * item.quantity)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  aria-label={`Quitar ${item.name} del carrito`}
                  className="absolute -right-2.5 -top-2 grid size-10 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep"
                >
                  <X className="size-4.5" strokeWidth={1.5} />
                </button>
              </li>
            ))}
          </ul>
        )}

        <footer className="border-t border-border px-7 pb-7 pt-5">
          <div className="flex items-baseline justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-lg font-semibold tabular-nums">
              {eur.format(subtotal)}
            </span>
          </div>
          <Link
            href="/order"
            onClick={onNavigate}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-linear-135 from-gold-bright to-gold px-6 text-[0.78rem] font-medium uppercase tracking-[0.12em] text-gold-ink shadow-gold outline-none transition-[filter] hover:brightness-107 focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-popover"
          >
            Ver carrito [{itemCount}]
          </Link>
        </footer>
      </section>
    </div>
  )
}

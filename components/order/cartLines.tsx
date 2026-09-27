"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X } from "lucide-react"

import {
  eur,
  MAX_QUANTITY,
  productHref,
  removeFromCart,
  setCartQuantity,
  type CartItem,
} from "@/lib/cart"

export default function CartLines({ items }: { items: CartItem[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {items.map((item) => (
        <li key={item.id} className="flex gap-4 py-5 sm:gap-6">
          <Link
            href={productHref(item)}
            tabIndex={-1}
            aria-hidden="true"
            className="relative aspect-4/5 w-24 shrink-0 overflow-hidden rounded-xl bg-sand ring-1 ring-border sm:w-28"
          >
            <Image src={item.image} alt="" fill sizes="112px" className="object-cover" />
          </Link>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <Link
                  href={productHref(item)}
                  className="rounded-sm text-lg font-semibold leading-tight transition-colors hover:text-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.detail}
                  <span aria-hidden="true"> · </span>
                  <span className="tabular-nums">{eur.format(item.price)}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Quitar ${item.name} del pedido`}
                className="-mr-2.5 -mt-2 grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep"
              >
                <X aria-hidden="true" className="size-4.5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="mt-auto flex items-center justify-between gap-4 pt-4">
              <div className="flex h-11 items-center rounded-full border border-border bg-card">
                <StepButton
                  label={`Reducir cantidad de ${item.name}`}
                  onClick={() => setCartQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus aria-hidden="true" className="size-3.5" />
                </StepButton>
                <span className="min-w-6 text-center text-sm tabular-nums">
                  <span className="sr-only">Cantidad: </span>
                  {item.quantity}
                </span>
                <StepButton
                  label={`Aumentar cantidad de ${item.name}`}
                  onClick={() => setCartQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= MAX_QUANTITY}
                >
                  <Plus aria-hidden="true" className="size-3.5" />
                </StepButton>
              </div>

              <p className="shrink-0 text-lg font-semibold tabular-nums">
                {eur.format(item.price * item.quantity)}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

function StepButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string
  onClick: () => void
  disabled: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid size-11 cursor-pointer place-items-center rounded-full transition-colors hover:text-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep disabled:cursor-not-allowed disabled:opacity-35"
    >
      {children}
    </button>
  )
}

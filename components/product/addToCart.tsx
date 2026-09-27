"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Check, Minus, Plus, ShoppingBag } from "lucide-react"

import { addToCart, MAX_QUANTITY, type CartItem } from "@/lib/cart"

export default function AddToCart({
  item,
  soldOut = false,
}: {
  item: Omit<CartItem, "quantity">
  soldOut?: boolean
}) {
  const productName = item.name
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  if (soldOut) {
    return (
      <div>
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="inline-flex h-13 w-full cursor-not-allowed items-center justify-center gap-2.5 rounded-full border border-border bg-foreground/5 px-6 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground"
        >
          <ShoppingBag aria-hidden="true" className="size-4.5" />
          Agotado
        </button>
        <p role="status" className="mt-3 text-sm font-regular text-muted-foreground">
          Esta pieza no está disponible ahora mismo. Pregúntanos si quieres saber cuándo vuelve.
        </p>
      </div>
    )
  }

  const handleAdd = () => {
    addToCart(item, quantity)
    setAdded(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(false), 3000)
  }

  return (
    <div>
      {/* Stepper and CTA stack on phones so the button label stays on one line */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex h-13 w-fit items-center rounded-full border border-border">
          <StepButton
            label={`Reducir cantidad de ${productName}`}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="size-4" />
          </StepButton>
          <span aria-live="polite" className="min-w-6 text-center text-sm tabular-nums">
            <span className="sr-only">Cantidad: </span>
            {quantity}
          </span>
          <StepButton
            label={`Aumentar cantidad de ${productName}`}
            onClick={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))}
            disabled={quantity >= MAX_QUANTITY}
          >
            <Plus className="size-4" />
          </StepButton>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex h-13 flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-linear-to-br from-gold-bright to-gold px-6 text-sm font-semibold uppercase tracking-[0.14em] text-gold-ink shadow-gold transition-[filter,box-shadow] duration-200 hover:shadow-gold-lg hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {added ? (
            <Check aria-hidden="true" className="size-4.5" />
          ) : (
            <ShoppingBag aria-hidden="true" className="size-4.5" />
          )}
          {added ? "Añadido" : "Añadir al carrito"}
        </button>
      </div>

      <p role="status" className="mt-3 min-h-5 text-sm font-regular text-muted-foreground">
        {added && (
          <>
            {quantity} × {productName} en tu carrito.{" "}
            <Link
              href="/order"
              className="font-normal text-foreground underline underline-offset-4 hover:text-gold-deep"
            >
              Ver pedido
            </Link>
          </>
        )}
      </p>
    </div>
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

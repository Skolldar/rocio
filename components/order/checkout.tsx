"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ShoppingBag } from "lucide-react"

import CartLines from "@/components/order/cartLines"
import CheckoutOptions from "@/components/order/checkoutOptions"
import OrderSummary, { MobileOrderBar } from "@/components/order/orderSummary"
import Step from "@/components/order/step"
import { useCart } from "@/lib/cart"
import { useHydrated } from "@/lib/localStore"

export default function Checkout() {
  const { items, count } = useCart()
  const hydrated = useHydrated()
  const router = useRouter()
  const hadItems = useRef(false)

  useEffect(() => {
    if (!hydrated) return
    if (items.length > 0) hadItems.current = true
    else if (hadItems.current) router.replace("/")
  }, [hydrated, items.length, router])

  if (!hydrated) return <div className="min-h-[70dvh]" aria-hidden="true" />

  if (items.length === 0) return <EmptyCart />

  return (
    <div className="mx-auto max-w-400 px-5 pb-36 pt-8 sm:px-8 sm:pt-12 lg:pb-24">
      <Link
        href="/products"
        className="inline-flex min-h-11 items-center gap-2 rounded-sm text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep"
      >
        <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.5} />
        Seguir comprando
      </Link>

      <header className="mt-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-border pb-8">
        <h1 className="text-[clamp(2.25rem,1.5rem+3vw,3.75rem)] font-semibold leading-none">
          Tu pedido
        </h1>
        <p className="text-sm text-muted-foreground">
          {count} {count === 1 ? "pieza" : "piezas"} · se confirma por WhatsApp
        </p>
      </header>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="space-y-14">
          <Step number={1} title="Tus piezas">
            <CartLines items={items} />
          </Step>
          <CheckoutOptions />
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary />
        </div>
      </div>

      <MobileOrderBar />
    </div>
  )
}

function EmptyCart() {
  return (
    <CenteredState
      icon={<ShoppingBag aria-hidden="true" className="size-7" strokeWidth={1.25} />}
      title="Tu carrito está vacío"
      text="Cuando añadas una joya aparecerá aquí, y podrás pedírmela por WhatsApp."
      action={{ href: "/products", label: "Ver joyas" }}
    />
  )
}

function CenteredState({
  icon,
  title,
  text,
  action,
}: {
  icon: React.ReactNode
  title: string
  text: string
  action: { href: string; label: string }
}) {
  return (
    <div className="mx-auto flex min-h-[70dvh] max-w-md flex-col items-center justify-center px-5 py-20 text-center">
      <div className="grid size-16 place-items-center rounded-full bg-accent text-gold-deep">{icon}</div>
      <h1 className="mt-6 text-3xl font-semibold">{title}</h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
      <Link
        href={action.href}
        className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-linear-to-br from-gold-bright to-gold px-8 text-xs font-semibold uppercase tracking-[0.14em] text-gold-ink shadow-gold transition-[filter,box-shadow] duration-200 hover:shadow-gold-lg hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {action.label}
      </Link>
    </div>
  )
}

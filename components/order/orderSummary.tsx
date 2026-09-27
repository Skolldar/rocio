"use client"

import { Gift, MessageCircle, ShieldCheck, Wallet, type LucideIcon } from "lucide-react"

import { WhatsappIcon } from "@/components/socialIcons"
import { clearCart, eur, useCart } from "@/lib/cart"
import {
  buildOrderMessage,
  deliveryOptions,
  orderTotals,
  useCheckout,
} from "@/lib/checkout"
import { cn } from "@/lib/utils"
import { whatsappUrl } from "@/lib/whatsapp"

const reassurances: { icon: LucideIcon; text: string }[] = [
  { icon: Wallet, text: "Pagas con Bizum, transferencia o en efectivo si quedamos en mano." },
  { icon: ShieldCheck, text: "Aún no pagas nada: primero te confirmo el pedido." },
  { icon: MessageCircle, text: "Suelo contestar el mismo día." },
  { icon: Gift, text: "Cada pieza va en su estuche, lista para regalar." },
]

function useOrder() {
  const { items, subtotal } = useCart()
  const checkout = useCheckout()
  return {
    checkout,
    ...orderTotals(subtotal, checkout.delivery),
    url: whatsappUrl(buildOrderMessage(items, checkout)),
  }
}

export default function OrderSummary({
  sent,
  onSend,
}: {
  sent: boolean
  onSend: () => void
}) {
  const { checkout, subtotal, shipping, total, url } = useOrder()

  return (
    <section
      aria-labelledby="resumen-titulo"
      className="rounded-3xl bg-ink p-6 text-cream shadow-xl shadow-stone-950/10 sm:p-8"
    >
      <h2 id="resumen-titulo" className="text-2xl font-semibold">
        Resumen
      </h2>

      <dl className="mt-6 space-y-3 text-sm font-medium">
        <Row label="Subtotal" value={eur.format(subtotal)} />
        <Row
          label={deliveryOptions[checkout.delivery].label}
          value={shipping === 0 ? "Sin coste" : eur.format(shipping)}
          highlight={shipping === 0}
        />
        <div className="flex items-baseline justify-between border-t border-white/15 pt-4">
          <dt className="text-lg font-semibold">Total</dt>
          <dd className="text-3xl font-semibold tabular-nums text-gold-bright">
            {eur.format(total)}
          </dd>
        </div>
      </dl>

      {/* En móvil el botón vive en la barra fija de abajo */}
      <div className="mt-7 hidden lg:block">
        <WhatsappButton url={url} onSend={onSend} />
      </div>

      <p role="status" className="text-center text-xs text-white/65 empty:hidden lg:mt-3">
        {sent && (
          <>
            ¿Ya me lo has enviado?{" "}
            <button
              type="button"
              onClick={clearCart}
              className="min-h-6 cursor-pointer rounded-sm text-gold-bright underline underline-offset-4 hover:text-cream focus-visible:outline-2 focus-visible:outline-gold-bright"
            >
              Vaciar carrito
            </button>
          </>
        )}
      </p>

      <ul className="mt-7 space-y-3 border-t border-white/15 pt-6">
        {reassurances.map(({ icon: Icon, text }) => (
          <li key={text} className="flex gap-3 text-sm leading-snug text-white/75">
            <Icon aria-hidden="true" strokeWidth={1.5} className="mt-px size-4.5 shrink-0 text-gold-bright" />
            {text}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function MobileOrderBar({ onSend }: { onSend: () => void }) {
  const { total, url } = useOrder()

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 text-cream backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-xl items-center gap-4">
        <div className="shrink-0">
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-white/60">Total</p>
          <p className="text-xl font-semibold tabular-nums text-gold-bright">{eur.format(total)}</p>
        </div>
        <WhatsappButton url={url} onSend={onSend} className="flex-1" />
      </div>
    </div>
  )
}

function WhatsappButton({
  url,
  onSend,
  className,
}: {
  url: string
  onSend: () => void
  className?: string
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onSend}
      className={cn(
        "flex min-h-13 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-linear-to-br from-gold-bright to-gold px-5 text-xs font-semibold uppercase tracking-[0.1em] sm:tracking-[0.14em] text-gold-ink shadow-gold transition-[filter,box-shadow] duration-200 hover:shadow-gold-lg hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright motion-reduce:transition-none",
        className
      )}
    >
      <WhatsappIcon className="size-4.5" />
      Pedir por WhatsApp
    </a>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between gap-4 text-white/75">
      <dt>{label}</dt>
      <dd className={cn("tabular-nums", highlight && "text-gold-bright")}>{value}</dd>
    </div>
  )
}

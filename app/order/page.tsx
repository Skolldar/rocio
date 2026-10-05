import type { Metadata } from "next"

import Checkout from "@/components/order/checkout"

export const metadata: Metadata = {
  title: "Tu pedido · Luxgirl",
  description: "Revisa tu carrito, elige entrega y pago, y envíame el pedido por WhatsApp.",
  robots: { index: false, follow: true },
}

export default function OrderPage() {
  return (
    <main className="min-h-dvh bg-background pt-14 text-foreground">
      <Checkout />
    </main>
  )
}

import { eur, type CartItem } from "@/lib/cart"
import { createLocalStore } from "@/lib/localStore"

// Mismas condiciones que en /envios-y-entrega.
export const SHIPPING_COST = 4.9

export const deliveryOptions = {
  envio: { label: "Envío a domicilio", note: "2 a 4 días laborables", cost: SHIPPING_COST },
  mano: { label: "Entrega en mano", note: "Quedamos en mi ciudad", cost: 0 },
} as const

export type Delivery = keyof typeof deliveryOptions

export type Checkout = {
  delivery: Delivery
  name: string
  note: string
}

const DEFAULT_CHECKOUT: Checkout = {
  delivery: "envio",
  name: "",
  note: "",
}

const store = createLocalStore<Checkout>("luxgirl:pedido", DEFAULT_CHECKOUT, (raw) => {
  if (typeof raw !== "object" || raw === null) return DEFAULT_CHECKOUT
  const value = raw as Record<string, unknown>
  const delivery =
    typeof value.delivery === "string" && value.delivery in deliveryOptions
      ? (value.delivery as Delivery)
      : DEFAULT_CHECKOUT.delivery
  return {
    delivery,
    name: typeof value.name === "string" ? value.name : "",
    note: typeof value.note === "string" ? value.note : "",
  }
})

export const useCheckout = store.useValue

export function updateCheckout(patch: Partial<Checkout>) {
  store.set((prev) => ({ ...prev, ...patch }))
}

export function orderTotals(subtotal: number, delivery: Delivery) {
  const shipping = deliveryOptions[delivery].cost
  return { subtotal, shipping, total: subtotal + shipping }
}

export function buildOrderMessage(items: CartItem[], checkout: Checkout) {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  const { shipping, total } = orderTotals(subtotal, checkout.delivery)
  const name = checkout.name.trim()
  const note = checkout.note.trim()

  const lines = [
    name ? `¡Hola! Soy ${name} y quiero hacer este pedido:` : "¡Hola! Quiero hacer este pedido:",
    "",
    ...items.map(
      (it) =>
        `- ${it.quantity} × ${it.name} (${it.detail}): ${eur.format(it.price * it.quantity)}`,
    ),
    "",
    `Subtotal: ${eur.format(subtotal)}`,
    `${deliveryOptions[checkout.delivery].label}: ${
      shipping === 0 ? "sin coste" : eur.format(shipping)
    }`,
    `*Total: ${eur.format(total)}*`,
  ]
  if (note) lines.push("", `Nota: ${note}`)

  return lines.join("\n")
}

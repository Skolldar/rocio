import { eur, type CartItem } from "@/lib/cart"
import { createLocalStore } from "@/lib/localStore"

// Mismas condiciones que en /envios-y-entrega.
export const SHIPPING_COST = 4.9

// La entrega en mano es siempre en el mismo sitio.
export const HAND_DELIVERY_PLACE = "Centro comercial Plaza Río, Madrid"

export const deliveryOptions = {
  envio: { label: "Envío a domicilio", note: "2 a 4 días laborables", cost: SHIPPING_COST },
  mano: { label: "Entrega en mano", note: "En el C.C. Plaza Río, Madrid", cost: 0 },
} as const

export type Delivery = keyof typeof deliveryOptions

export type Checkout = {
  delivery: Delivery
  name: string
  note: string
  // Solo se usan con envío a domicilio.
  address: string
  postalCode: string
  city: string
}

const DEFAULT_CHECKOUT: Checkout = {
  delivery: "envio",
  name: "",
  note: "",
  address: "",
  postalCode: "",
  city: "",
}

const store = createLocalStore<Checkout>("luxgirl:pedido", DEFAULT_CHECKOUT, (raw) => {
  if (typeof raw !== "object" || raw === null) return DEFAULT_CHECKOUT
  const value = raw as Record<string, unknown>
  const delivery =
    typeof value.delivery === "string" && value.delivery in deliveryOptions
      ? (value.delivery as Delivery)
      : DEFAULT_CHECKOUT.delivery
  const text = (field: string) => (typeof value[field] === "string" ? value[field] : "")
  return {
    delivery,
    name: text("name"),
    note: text("note"),
    address: text("address"),
    postalCode: text("postalCode"),
    city: text("city"),
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

  if (checkout.delivery === "mano") {
    lines.push("", `Recogida: ${HAND_DELIVERY_PLACE}`)
  } else {
    const place = [checkout.postalCode.trim(), checkout.city.trim()].filter(Boolean).join(" ")
    const address = [checkout.address.trim(), place].filter(Boolean).join(", ")
    if (address) lines.push("", `Dirección de envío: ${address}`)
  }
  if (note) lines.push("", `Nota: ${note}`)

  return lines.join("\n")
}

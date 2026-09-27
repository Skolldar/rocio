import { createLocalStore } from "@/lib/localStore"

export type CartItem = {
  id: string
  name: string
  detail: string
  price: number
  quantity: number
  image: string
}

export const MAX_QUANTITY = 10

const EMPTY: CartItem[] = []

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false
  const item = value as Record<string, unknown>
  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.detail === "string" &&
    typeof item.image === "string" &&
    typeof item.price === "number" &&
    Number.isInteger(item.quantity) &&
    (item.quantity as number) > 0
  )
}

const store = createLocalStore<CartItem[]>("luxgirl:carrito", EMPTY, (raw) =>
  Array.isArray(raw) ? raw.filter(isCartItem) : EMPTY,
)

const clampQuantity = (quantity: number) =>
  Math.min(MAX_QUANTITY, Math.max(1, quantity))

export function useCart() {
  const items = store.useValue()
  return {
    items,
    count: items.reduce((sum, it) => sum + it.quantity, 0),
    subtotal: items.reduce((sum, it) => sum + it.price * it.quantity, 0),
  }
}

export function addToCart(item: Omit<CartItem, "quantity">, quantity: number) {
  store.set((prev) => {
    const existing = prev.find((it) => it.id === item.id)
    if (!existing) return [...prev, { ...item, quantity: clampQuantity(quantity) }]
    return prev.map((it) =>
      it.id === item.id
        ? { ...it, ...item, quantity: clampQuantity(it.quantity + quantity) }
        : it,
    )
  })
}

export function setCartQuantity(id: string, quantity: number) {
  store.set((prev) =>
    prev.map((it) => (it.id === id ? { ...it, quantity: clampQuantity(quantity) } : it)),
  )
}

export function removeFromCart(id: string) {
  store.set((prev) => prev.filter((it) => it.id !== id))
}

export function clearCart() {
  store.set(EMPTY)
}

export const productHref = (item: Pick<CartItem, "id">) => `/products/${item.id}`

export const eur = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

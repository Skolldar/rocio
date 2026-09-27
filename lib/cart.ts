export type CartItem = {
  id: string
  name: string
  detail: string
  price: number
  quantity: number
  image: string
}

// Datos de ejemplo hasta que exista un carrito real.
export const SAMPLE_CART_ITEMS: CartItem[] = [
  {
    id: "anillo-aurora",
    name: "Anillo Aurora",
    detail: "Oro 18k · Diamante 0.5ct",
    price: 1290,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=160&q=80",
  },
  {
    id: "collar-lumen",
    name: "Collar Lumen",
    detail: "Oro blanco · Zafiro",
    price: 860,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=160&q=80",
  },
  {
    id: "pendientes-eclat",
    name: "Pendientes Éclat",
    detail: "Oro 18k · Perla",
    price: 540,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=160&q=80",
  },
]

export const eur = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export type Material = "oro" | "plata"

// Estilo de la pieza: collares dobles (dos cadenas o hilos) o pendientes mini (botón pegado al lóbulo).
export type Style = "doble" | "mini"

export type Product = {
  slug: string
  name: string
  description: string
  price: number
  material: Material
  style?: Style
  image: string
  badge?: "Nuevo" | "Más vendido" | "Edición limitada"
  // Sin existencias: se muestra atenuado y no se puede añadir al carrito.
  soldOut?: boolean
  addedAt: number
  story?: string
  details?: ProductDetail[]
}

export type ProductDetail = {
  label: string
  value: string
}

export type Category = {
  slug: string
  title: string
  eyebrow: string
  description: string
  heroImage: string
  // Punto focal del recorte (CSS object-position). Por defecto, centrado.
  heroPosition?: string
  products: Product[]
}

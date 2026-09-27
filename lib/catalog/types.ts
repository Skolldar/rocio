export type Material = "oro" | "plata"

export type Product = {
  slug: string
  name: string
  description: string
  price: number
  material: Material
  image: string
  badge?: "Nuevo" | "Más vendido" | "Edición limitada"
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

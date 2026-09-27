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
}

export type Category = {
  slug: string
  title: string
  eyebrow: string
  description: string
  heroImage: string
  products: Product[]
}

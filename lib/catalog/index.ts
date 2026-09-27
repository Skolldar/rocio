import { anillos } from "./categories/anillos"
import { brazaletes } from "./categories/brazaletes"
import { collares } from "./categories/collares"
import { pendientes } from "./categories/pendientes"
import { pulseras } from "./categories/pulseras"
import type { Category } from "./types"

export type { Category, Material, Product, ProductDetail } from "./types"
export * from "./utils"

// Order here is the order categories appear in the store.
const categories: Category[] = [anillos, collares, pendientes, pulseras, brazaletes]

export function getCategorySlugs() {
  return categories.map((category) => category.slug)
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug)
}

export function getProduct(categorySlug: string, productSlug: string) {
  const category = getCategory(categorySlug)
  const product = category?.products.find((p) => p.slug === productSlug)
  return category && product ? { category, product } : undefined
}

// Los slugs de producto solo son únicos dentro de su categoría
// (p. ej. "trebol-de-nacar" existe en collares y en pendientes).
export function getProductParams() {
  return categories.flatMap((category) =>
    category.products.map((product) => ({
      categoria: category.slug,
      slug: product.slug,
    })),
  )
}

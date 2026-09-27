import { anillos } from "./categories/anillos"
import { brazaletes } from "./categories/brazaletes"
import { collares } from "./categories/collares"
import { pendientes } from "./categories/pendientes"
import { pulseras } from "./categories/pulseras"
import type { Category } from "./types"

export type { Category, Material, Product } from "./types"
export * from "./utils"

// Order here is the order categories appear in the store.
const categories: Category[] = [anillos, collares, pendientes, pulseras, brazaletes]

export function getCategorySlugs() {
  return categories.map((category) => category.slug)
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug)
}

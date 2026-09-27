import type { Material, Product } from "./types"

export const materialLabels: Record<Material, string> = {
  oro: "Baño de oro",
  plata: "Plata",
}

export const sortOptions = [
  { value: "destacados", label: "Destacados" },
  { value: "novedades", label: "Novedades" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
] as const

export type SortValue = (typeof sortOptions)[number]["value"]

export function isSortValue(value: unknown): value is SortValue {
  return sortOptions.some((option) => option.value === value)
}

export function isMaterial(value: unknown): value is Material {
  return typeof value === "string" && value in materialLabels
}

export function filterAndSortProducts(
  products: Product[],
  { material, sort }: { material?: Material; sort: SortValue },
) {
  const filtered = material
    ? products.filter((product) => product.material === material)
    : [...products]

  switch (sort) {
    case "novedades":
      return filtered.sort((a, b) => b.addedAt - a.addedAt)
    case "precio-asc":
      return filtered.sort((a, b) => a.price - b.price)
    case "precio-desc":
      return filtered.sort((a, b) => b.price - a.price)
    default:
      return filtered
  }
}

const priceFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
})

export function formatPrice(price: number) {
  return priceFormatter.format(price)
}

import type { Material, Product, ProductDetail, Style } from "./types"

export const materialLabels: Record<Material, string> = {
  oro: "Acero inoxidable color oro",
  plata: "Acero inoxidable color plata",
}

export const materialSwatchClass: Record<Material, string> = {
  oro: "bg-[radial-gradient(circle_at_30%_30%,var(--gold-bright),var(--gold)_45%,var(--gold-deep))]",
  plata: "bg-[radial-gradient(circle_at_30%_30%,#ffffff,#d4d4d8_45%,#8b8b93)]",
}

export const styleLabels: Record<Style, string> = {
  doble: "Collares dobles",
  mini: "Mini",
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

export function isStyle(value: unknown): value is Style {
  return typeof value === "string" && value in styleLabels
}

export function filterAndSortProducts(
  products: Product[],
  {
    material,
    style,
    sort,
  }: { material?: Material; style?: Style; sort: SortValue },
) {
  const filtered = products.filter(
    (product) =>
      (!material || product.material === material) &&
      (!style || product.style === style),
  )

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
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatPrice(price: number) {
  return priceFormatter.format(price)
}

export function getProductDetails(product: Product): ProductDetail[] {
  return [
    { label: "Material", value: materialLabels[product.material] },
    { label: "Referencia", value: `LX-${product.slug.toUpperCase()}` },
    { label: "Presentación", value: "Estuche de firma Luxgirl" },
    ...(product.details ?? []),
  ]
}

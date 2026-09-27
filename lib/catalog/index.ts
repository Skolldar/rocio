import { anillos } from "./categories/anillos"
import { brazaletes } from "./categories/brazaletes"
import { collares } from "./categories/collares"
import { pendientes } from "./categories/pendientes"
import { pulseras } from "./categories/pulseras"
import type { Category, Product } from "./types"

export type { Category, Material, Product, ProductDetail } from "./types"
export * from "./utils"

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

export function getProductParams() {
  return categories.flatMap((category) =>
    category.products.map((product) => ({
      categoria: category.slug,
      slug: product.slug,
    })),
  )
}

function getBadgeCollection(
  badge: NonNullable<Product["badge"]>,
  meta: Omit<Category, "products">,
) {
  const productCategory = new Map<Product, string>()
  for (const category of categories) {
    for (const product of category.products) {
      if (product.badge === badge) {
        productCategory.set(product, category.slug)
      }
    }
  }

  const collection: Category = { ...meta, products: [...productCategory.keys()] }

  return {
    category: collection,
    productHref: (product: Product) =>
      `/products/${productCategory.get(product)}/${product.slug}`,
  }
}

export function getLimitedEdition() {
  return getBadgeCollection("Edición limitada", {
    slug: "edicion-limitada",
    title: "Edición Limitada",
    eyebrow: "Colección",
    description:
      "Series numeradas diseñadas en cantidades reducidas. Cuando se agotan, no vuelven.",
    heroImage: "/img/modelos/modelo-selfie-flores.webp",
    heroPosition: "center 80%",
  })
}

export function getNovedades() {
  return getBadgeCollection("Nuevo", {
    slug: "novedades",
    title: "Novedades",
    eyebrow: "Colección",
    description:
      "Lo último que ha llegado al atelier: piezas recién salidas del taller para estrenar esta temporada.",
    heroImage: "/img/modelos/modelo-collares-capas.webp",
  })
}

import type { Metadata } from "next"

import CategoryPage from "@/components/catalog/categoryPage"
import {
  filterAndSortProducts,
  getLimitedEdition,
  isMaterial,
  isSortValue,
} from "@/lib/catalog"

type Props = {
  searchParams: Promise<{ material?: string; orden?: string }>
}

export function generateMetadata(): Metadata {
  const { category } = getLimitedEdition()
  return {
    title: `${category.title} · Luxgirl`,
    description: category.description,
  }
}

export default async function EdicionLimitadaPage({ searchParams }: Props) {
  const { material, orden } = await searchParams
  const { category, productHref } = getLimitedEdition()

  const activeMaterial = isMaterial(material) ? material : undefined
  const sort = isSortValue(orden) ? orden : "destacados"

  return (
    <CategoryPage
      category={category}
      products={filterAndSortProducts(category.products, {
        material: activeMaterial,
        sort,
      })}
      basePath={`/products/${category.slug}`}
      material={activeMaterial}
      sort={sort}
      productHref={productHref}
    />
  )
}

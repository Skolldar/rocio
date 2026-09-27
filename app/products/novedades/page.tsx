import type { Metadata } from "next"

import CategoryPage from "@/components/catalog/categoryPage"
import {
  filterAndSortProducts,
  getNovedades,
  isMaterial,
  isSortValue,
} from "@/lib/catalog"

type Props = {
  searchParams: Promise<{ material?: string; orden?: string }>
}

export function generateMetadata(): Metadata {
  const { category } = getNovedades()
  return {
    title: `${category.title} · Luxgirl`,
    description: category.description,
  }
}

export default async function NovedadesPage({ searchParams }: Props) {
  const { material, orden } = await searchParams
  const { category, productHref } = getNovedades()

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

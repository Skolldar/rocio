import type { Metadata } from "next"

import CategoryPage from "@/components/catalog/categoryPage"
import {
  filterAndSortProducts,
  getParaRegalo,
  isMaterial,
  isSortValue,
  isStyle,
} from "@/lib/catalog"

type Props = {
  searchParams: Promise<{ material?: string; estilo?: string; orden?: string }>
}

export function generateMetadata(): Metadata {
  const { category } = getParaRegalo()
  return {
    title: `${category.title} · Luxgirl`,
    description: category.description,
    alternates: { canonical: `/products/${category.slug}` },
    openGraph: { images: [{ url: category.heroImage, alt: category.title }] },
  }
}

export default async function ParaRegaloPage({ searchParams }: Props) {
  const { material, estilo, orden } = await searchParams
  const { category, productHref } = getParaRegalo()

  const activeMaterial = isMaterial(material) ? material : undefined
  const activeStyle = isStyle(estilo) ? estilo : undefined
  const sort = isSortValue(orden) ? orden : "destacados"

  return (
    <CategoryPage
      category={category}
      products={filterAndSortProducts(category.products, {
        material: activeMaterial,
        style: activeStyle,
        sort,
      })}
      basePath={`/products/${category.slug}`}
      material={activeMaterial}
      style={activeStyle}
      sort={sort}
      productHref={productHref}
    />
  )
}

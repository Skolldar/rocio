import type { Metadata } from "next"
import { notFound } from "next/navigation"

import CategoryPage from "@/components/catalog/categoryPage"
import {
  filterAndSortProducts,
  getCategory,
  getCategorySlugs,
  isMaterial,
  isSortValue,
} from "@/lib/catalog"

type Props = {
  params: Promise<{ categoria: string }>
  searchParams: Promise<{ material?: string; orden?: string }>
}

export function generateStaticParams() {
  return getCategorySlugs().map((categoria) => ({ categoria }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).categoria)
  if (!category) return {}
  return {
    title: `${category.title} · Luxgirl`,
    description: category.description,
  }
}

export default async function CategoriaPage({ params, searchParams }: Props) {
  const { categoria } = await params
  const { material, orden } = await searchParams

  const category = getCategory(categoria)
  if (!category) notFound()

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
    />
  )
}

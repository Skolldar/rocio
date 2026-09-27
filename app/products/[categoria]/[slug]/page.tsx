import type { Metadata } from "next"
import { notFound } from "next/navigation"

import ProductDetail from "@/components/product/productDetail"
import { getProduct, getProductParams } from "@/lib/catalog"

type Props = {
  params: Promise<{ categoria: string; slug: string }>
}

export function generateStaticParams() {
  return getProductParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria, slug } = await params
  const match = getProduct(categoria, slug)
  if (!match) return {}
  return {
    title: `${match.product.name} · ${match.category.title} · Luxgirl`,
    description: match.product.description,
  }
}

export default async function ProductPage({ params }: Props) {
  const { categoria, slug } = await params

  const match = getProduct(categoria, slug)
  if (!match) notFound()

  return <ProductDetail category={match.category} product={match.product} />
}

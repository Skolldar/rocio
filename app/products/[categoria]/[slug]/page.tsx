import type { Metadata } from "next"
import { notFound } from "next/navigation"

import JsonLd from "@/components/jsonLd"
import ProductDetail from "@/components/product/productDetail"
import { getProduct, getProductParams, materialLabels } from "@/lib/catalog"
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site"

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
  const { category, product } = match
  const title = `${product.name} · ${category.title} · Luxgirl`
  return {
    title,
    description: product.description,
    alternates: { canonical: `/products/${category.slug}/${product.slug}` },
    openGraph: {
      title,
      description: product.description,
      url: `/products/${category.slug}/${product.slug}`,
      images: [{ url: product.image, alt: product.name }],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { categoria, slug } = await params

  const match = getProduct(categoria, slug)
  if (!match) notFound()

  const { category, product } = match
  const url = absoluteUrl(`/products/${category.slug}/${product.slug}`)

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.story ?? product.description,
    image: absoluteUrl(product.image),
    sku: `LX-${product.slug.toUpperCase()}`,
    category: category.title,
    material: materialLabels[product.material],
    brand: { "@type": "Brand", name: SITE_NAME },
    url,
    offers: {
      "@type": "Offer",
      url,
      price: product.price.toFixed(2),
      priceCurrency: "EUR",
      availability: product.soldOut
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${SITE_URL}/#store` },
    },
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: category.title,
        item: absoluteUrl(`/products/${category.slug}`),
      },
      { "@type": "ListItem", position: 3, name: product.name, item: url },
    ],
  }

  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <ProductDetail category={category} product={product} />
    </>
  )
}

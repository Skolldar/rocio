import type { MetadataRoute } from "next"

import { getCategories, getCollections } from "@/lib/catalog"
import { absoluteUrl, INFO_PAGES } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const categoryPages = getCategories().flatMap((category) => [
    {
      url: absoluteUrl(`/products/${category.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: [absoluteUrl(category.heroImage)],
    },
    ...category.products.map((product) => ({
      url: absoluteUrl(`/products/${category.slug}/${product.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: [absoluteUrl(product.image)],
    })),
  ])

  const collectionPages = getCollections().map((collection) => ({
    url: absoluteUrl(`/products/${collection.slug}`),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
    images: [absoluteUrl(collection.heroImage)],
  }))

  const infoPages = INFO_PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }))

  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    ...categoryPages,
    ...collectionPages,
    ...infoPages,
  ]
}

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import CatalogToolbar from "@/components/catalog/catalogToolbar"
import ProductCard from "@/components/catalog/productCard"
import {
  materialLabels,
  type Category,
  type Material,
  type Product,
  type SortValue,
} from "@/lib/catalog"

type CategoryPageProps = {
  category: Category
  products: Product[]
  basePath: string
  material?: Material
  sort: SortValue
  productHref?: (product: Product) => string
}

export default function CategoryPage({
  category,
  products,
  basePath,
  material,
  sort,
  productHref = (product) => `/products/${category.slug}/${product.slug}`,
}: CategoryPageProps) {
  const materials = (Object.keys(materialLabels) as Material[]).filter((m) =>
    category.products.some((p) => p.material === m),
  )

  return (
    <main className="w-full bg-background text-foreground">
      {/* Cabecera */}
      <section
        aria-labelledby="categoria-titulo"
        className="relative isolate overflow-hidden bg-stone-950 text-stone-50"
      >
        <Image
          src={category.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: category.heroPosition }}
          className="-z-10 object-cover object-center opacity-60"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-r from-stone-950/90 via-stone-950/55 to-stone-950/10"
        />

        <div className="mx-auto flex min-h-[clamp(20rem,52vh,32rem)] max-w-400 flex-col justify-end px-8 pb-12 pt-28 sm:pb-16">
          <nav aria-label="Ruta de navegación" className="mb-auto pb-10">
            <ol className="flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-stone-300">
              <li>
                <Link
                  href="/"
                  className="rounded-sm transition-colors hover:text-gold-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright"
                >
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li>
                <Link
                  href="/products"
                  className="rounded-sm transition-colors hover:text-gold-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright"
                >
                  {category.eyebrow}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="text-stone-50">
                {category.title}
              </li>
            </ol>
          </nav>

          <p className="text-xs font-medium uppercase text-gold-bright">
            {category.eyebrow}
          </p>
          <h1
            id="categoria-titulo"
            className="mt-3 text-[clamp(2.5rem,1.5rem+5vw,5.5rem)] font-semibold text-balance"
          >
            {category.title}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-stone-200 sm:mt-5 md:text-lg md:font-light">
            {category.description}
          </p>
        </div>
      </section>

      {/* Listado */}
      <section aria-label={`Productos de ${category.title}`}>
        <div className="mx-auto max-w-400 px-8 py-10 sm:py-14">
          <CatalogToolbar
            basePath={basePath}
            total={products.length}
            material={material}
            sort={sort}
            materials={materials}
          />

          {products.length > 0 ? (
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:mt-12 xl:grid-cols-4">
              {products.map((product, index) => {
                const href = productHref(product)
                return (
                  <li key={href}>
                    <ProductCard
                      product={product}
                      href={href}
                      priority={index < 4}
                    />
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className="mx-auto mt-16 max-w-md text-center">
              <p className="text-xl font-semibold">No hay piezas con este filtro</p>
              <p className="mt-2 text-sm font-light text-muted-foreground">
                Prueba con otro material o vuelve a ver toda la selección.
              </p>
              <Link
                href={basePath}
                className="mt-6 inline-flex min-h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium uppercase tracking-[0.14em] text-background transition-colors hover:bg-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2"
              >
                Ver todo
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

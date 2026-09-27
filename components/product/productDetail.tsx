import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronRight, Gift, Wallet } from "lucide-react"

import ProductCard from "@/components/catalog/productCard"
import AddToCart from "@/components/product/addToCart"
import AskQuestion from "@/components/product/askQuestion"
import {
  formatPrice,
  getProductDetails,
  materialLabels,
  type Category,
  type Product,
} from "@/lib/catalog"

type ProductDetailProps = {
  category: Category
  product: Product
}

const linkStyles =
  "rounded-sm transition-colors hover:text-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep"

export default function ProductDetail({ category, product }: ProductDetailProps) {
  const details = getProductDetails(product)
  const soldOut = product.soldOut === true
  const related = category.products.filter((p) => p.slug !== product.slug).slice(0, 4)
  const categoryPath = `/products/${category.slug}`

  return (
    <main className="w-full bg-background pt-14 text-foreground">
      <div className="mx-auto max-w-400 px-5 sm:px-8 pb-16 pt-8 sm:pb-24">
        <nav aria-label="Ruta de navegación">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <li>
              <Link href="/" className={linkStyles}>
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li>
              <Link href={categoryPath} className={linkStyles}>
                {category.title}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="text-foreground">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 xl:gap-24">
          {/* Imagen */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-sand ring-1 ring-border">
              <Image
                src={product.image}
                alt={`${product.name} — ${product.description}`}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className={`object-cover ${soldOut ? "grayscale" : ""}`}
              />
              {soldOut && (
                <>
                  <div aria-hidden="true" className="absolute inset-0 bg-stone-950/45" />
                  <span className="absolute inset-x-0 bottom-0 flex justify-center pb-5 sm:pb-6">
                    <span className="rounded-full border border-stone-100/40 bg-stone-950/70 px-4 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-stone-100 backdrop-blur-sm">
                      Agotado
                    </span>
                  </span>
                </>
              )}
              {product.badge && !soldOut && (
                <span className="absolute left-4 top-4 rounded-full bg-stone-950/60 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-stone-100 backdrop-blur-sm sm:left-5 sm:top-5">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Información */}
          <div className="flex flex-col">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-deep">
              {category.title} · {materialLabels[product.material]}
            </p>
            <h1 className="mt-3 text-[clamp(2.25rem,1.5rem+3vw,3.75rem)] font-semibold leading-[1.02] text-balance first-letter:uppercase">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl font-medium tabular-nums tracking-wide">
              {formatPrice(product.price)}
            </p>

            <p className="mt-6 max-w-5xl text-base font-regular leading-relaxed text-muted-foreground">
              {product.story ?? product.description}
            </p>

            <div className="mt-8 border-t border-border pt-8">
              <AddToCart productName={product.name} soldOut={soldOut} />
              <AskQuestion productName={product.name} />
            </div>

            <ul className="mt-8 grid gap-3 text-sm font-regular text-muted-foreground sm:grid-cols-2">
              <li className="flex items-center gap-3">
                <Gift aria-hidden="true" strokeWidth={1.25} className="size-5 text-foreground" />
                Lista para regalar, en su estuche
              </li>
              <li className="flex items-center gap-3">
                <Wallet aria-hidden="true" strokeWidth={1.25} className="size-5 text-foreground" />
                Bizum, efectivo o transferencia
              </li>
            </ul>

            {/* Detalles */}
            <div className="mt-10 divide-y divide-border border-y border-border">
              <DetailSection title="Detalles" defaultOpen>
                <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3">
                  {details.map((detail) => (
                    <div key={detail.label} className="contents">
                      <dt className="text-xs uppercase font-medium tracking-wide text-muted-foreground">
                        {detail.label}
                      </dt>
                      <dd className="text-sm">{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              </DetailSection>
              <DetailSection title="Cuidado de tu joya">
                <p>
                  Guárdala en su estuche, separada de otras piezas para evitar roces, y
                  límpiala con un paño suave tras cada uso. Evita el contacto con
                  perfumes, cremas y productos de limpieza.
                </p>
              </DetailSection>
              <DetailSection title="Envío y pago">
                <p>
                  Cada pieza viaja protegida en su estuche de firma, lista para regalar.
                  Puedes pagar con Bizum, en efectivo o por transferencia.
                </p>
              </DetailSection>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section
          aria-labelledby="relacionados-titulo"
          className="border-t border-border"
        >
          <div className="mx-auto max-w-400 px-5 sm:px-8 py-16 sm:py-20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2
                id="relacionados-titulo"
                className="text-[clamp(1.75rem,1.25rem+2vw,2.5rem)] font-semibold leading-tight"
              >
                También te puede gustar
              </h2>
              <Link
                href={categoryPath}
                className={`inline-flex min-h-11 w-fit shrink-0 items-center text-xs font-medium uppercase tracking-[0.16em] underline decoration-foreground/40 underline-offset-4 hover:decoration-gold-deep ${linkStyles}`}
              >
                Ver {category.title.toLowerCase()}
              </Link>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4">
              {related.map((item) => (
                <li key={item.slug}>
                  <ProductCard product={item} href={`${categoryPath}/${item.slug}`} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  )
}

function DetailSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  return (
    <details open={defaultOpen} className="group">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium uppercase tracking-[0.14em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
        />
      </summary>
      <div className="pb-6 text-sm font-regular leading-relaxed text-muted-foreground">
        {children}
      </div>
    </details>
  )
}

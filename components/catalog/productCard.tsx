import Image from "next/image"
import Link from "next/link"

import { formatPrice, materialLabels, type Product } from "@/lib/catalog"

type ProductCardProps = {
  product: Product
  href: string
  priority?: boolean
}

export default function ProductCard({ product, href, priority = false }: ProductCardProps) {
  const soldOut = product.soldOut === true

  return (
    <article className="group relative" data-sold-out={soldOut || undefined}>
      <div
        className={`relative aspect-4/5 overflow-hidden rounded-xl bg-foreground/5 ring-1 ring-border transition duration-300 ${
          soldOut ? "" : "group-hover:ring-gold-deep/50"
        }`}
      >
        <Image
          src={product.image}
          alt={`${product.name} — ${product.description}`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className={`object-cover transition-transform duration-700 ease-out motion-reduce:transition-none ${
            soldOut
              ? "grayscale"
              : "group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
          }`}
        />
        {soldOut && (
          <>
            <div aria-hidden="true" className="absolute inset-0 bg-stone-950/45" />
            <span className="absolute inset-x-0 bottom-0 flex justify-center pb-4 sm:pb-5">
              <span className="rounded-full border border-stone-100/40 bg-stone-950/70 px-3.5 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-stone-100 backdrop-blur-sm">
                Agotado
              </span>
            </span>
          </>
        )}
        {product.badge && !soldOut && (
          <span className="absolute left-3 top-3 rounded-full bg-stone-950/60 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-stone-100 backdrop-blur-sm sm:left-4 sm:top-4">
            {product.badge}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3
            className={`text-lg font-semibold leading-tight transition-colors sm:text-xl ${
              soldOut ? "text-muted-foreground" : "text-foreground group-hover:text-gold-deep"
            }`}
          >
            <Link
              href={href}
              className="rounded-sm after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-gold-deep focus-visible:after:ring-offset-4"
            >
              {product.name}
              {soldOut && <span className="sr-only"> (agotado)</span>}
            </Link>
          </h3>
          <p className="mt-1 text-xs uppercase font-medium text-muted-foreground">
            {materialLabels[product.material]}
          </p>
        </div>
        <span
          className={`shrink-0 text-sm font-medium tabular-nums tracking-wide ${
            soldOut ? "text-muted-foreground" : "text-gold-deep"
          }`}
        >
          {formatPrice(product.price)}
        </span>
      </div>
      <p className="mt-2 hidden text-sm font-light leading-relaxed text-muted-foreground sm:block">
        {product.description}
      </p>
    </article>
  )
}

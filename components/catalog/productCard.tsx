import Image from "next/image"

import { formatPrice, materialLabels, type Product } from "@/lib/catalog"

type ProductCardProps = {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <article className="group">
      <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-foreground/5 ring-1 ring-border transition duration-300 group-hover:ring-gold-deep/50">
        <Image
          src={product.image}
          alt={`${product.name} — ${product.description}`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-stone-950/60 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-stone-100 backdrop-blur-sm sm:left-4 sm:top-4">
            {product.badge}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-gold-deep sm:text-xl">
            {product.name}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {materialLabels[product.material]}
          </p>
        </div>
        <span className="shrink-0 text-sm font-medium tabular-nums tracking-wide text-gold-deep">
          {formatPrice(product.price)}
        </span>
      </div>
      <p className="mt-2 hidden text-sm font-light leading-relaxed text-muted-foreground sm:block">
        {product.description}
      </p>
    </article>
  )
}

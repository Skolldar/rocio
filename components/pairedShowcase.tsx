import Link from "next/link"

import ParallaxImage from "@/components/parallaxImage"

type ShowcasePair = {
  /** Overlay link shown on the lifestyle image. */
  label: string
  href: string
  /** Full-bleed lifestyle photo (model wearing the piece). */
  lifestyleImage: string
  lifestyleAlt: string
  /** Single product shot on the light panel. */
  product: {
    name: string
    price: string
    image: string
    alt: string
    /** Optional looping video; replaces the still image when present. */
    video?: string
  }
  /** Flip the panes so the product sits on the left (editorial rhythm). */
  reverse?: boolean
}

const pairs: ShowcasePair[] = [
  {
    label: "Collares de Oro",
    href: "/products?categoria=collares",
    lifestyleImage: "/img/collares/collar-medalla-grabada.webp",
    lifestyleAlt: "Collar de oro con colgante rectangular y corazón sobre seda clara",
    product: {
      name: "Gargantilla Aurora",
      price: "320,00 €",
      image: "/img/collares/collar-corazon-filigrana.webp",
      alt: "Gargantilla Aurora de oro sobre fondo claro",
      video: "/video/collar.mp4",
    },
  },
  {
    label: "Pendientes de Fiesta",
    href: "/products?categoria=pendientes",
    lifestyleImage: "/img/pendientes/aretes-hero.webp",
    lifestyleAlt: "Modelo con pendientes de perla y oro a la luz del sol",
    product: {
      name: "Pendientes Solsticio",
      price: "260,00 €",
      image: "/img/pendientes/aretes-pera.webp",
      alt: "Pendientes Solsticio de oro sobre fondo claro",
    },
    reverse: true,
  },
]

export default function PairedShowcase() {
  return (
    <section
      aria-label="Colecciones destacadas"
      className="w-full bg-background"
    >
      {pairs.map((pair) => (
        <div
          key={pair.label}
          className={`grid grid-cols-1 lg:grid-cols-2 ${
            pair.reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* Lifestyle pane — full-bleed image with overlaid category link */}
          <Link
            href={pair.href}
            className="group relative block min-h-[58vh] overflow-hidden lg:min-h-170 focus-visible:outline-none"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pair.lifestyleImage}
              alt={pair.lifestyleAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1200 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            {/* Soft legibility wash so the white link reads on any photo */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-r from-stone-950/45 via-stone-950/10 to-transparent transition-opacity duration-500 group-hover:from-stone-950/55"
            />
            <span className="absolute left-[8%] top-1/2 -translate-y-1/2">
              <span className="inline-block pb-2 text-sm font-medium uppercase tracking-[0.32em] text-cream transition-colors duration-300 group-hover:border-gold-bright group-hover:text-gold-bright sm:text-base">
                {pair.label}
              </span>
            </span>
            {/* Keyboard focus ring on the whole pane */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-3 rounded-sm ring-gold-bright ring-offset-0 transition group-focus-visible:ring-2"
            />
          </Link>

          {/* Product pane — video fills the panel; still image stays centered */}
          {pair.product.video ? (
            <Link
              href={pair.href}
              className="group relative block min-h-[58vh] overflow-hidden bg-sand lg:min-h-170 focus-visible:outline-none"
            >
              <video
                src={pair.product.video}
                poster={pair.product.image}
                aria-label={pair.product.alt}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1200 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              {/* Soft wash so the product name reads over the footage */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-stone-950/40 via-transparent to-transparent"
              />
              <h3 className="absolute bottom-8 left-0 right-0 text-center text-base font-normal tracking-wide text-cream transition-colors group-hover:text-gold-bright">
                {pair.product.name}
              </h3>
            </Link>
          ) : (
            <Link
              href={pair.href}
              className="group relative block min-h-[58vh] overflow-clip bg-sand lg:min-h-170 focus-visible:outline-none"
            >
              <ParallaxImage
                src={pair.product.image}
                alt={pair.product.alt}
                className="absolute inset-0"
              />
              {/* Soft wash so the name + price read over the photo */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-stone-950/55 via-stone-950/10 to-transparent"
              />
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <h3 className="text-base font-normal tracking-wide text-cream transition-colors group-hover:text-gold-bright">
                  {pair.product.name}
                </h3>
                <p className="mt-2 text-xl italic text-gold-bright">
                  {pair.product.price}
                </p>
              </div>
            </Link>
          )}
        </div>
      ))}
    </section>
  )
}

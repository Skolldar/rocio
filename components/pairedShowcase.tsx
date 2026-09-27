import Link from "next/link"

import ParallaxImage from "@/components/parallaxImage"
import { formatPrice } from "@/lib/catalog"

type ShowcasePair = {
  label: string
  href: string
  lifestyleImage: string
  lifestyleAlt: string
  product: {
    name: string
    href?: string
    price?: string
    image: string
    alt: string
    video?: string
  }

  reverse?: boolean
}

const pairs: ShowcasePair[] = [
  {
    label: "Collares",
    href: "/products/collares/medalla-grabada",
    lifestyleImage: "/img/collares/collar-medalla-grabada.webp",
    lifestyleAlt:
      "Collar Medalla Grabada: medalla rectangular en relieve sobre cadena fina de oro",
    product: {
      name: "Pulseras",
      href: "/products/pulseras",
      image: "/img/collares/collar-corazon-filigrana.webp",
      alt: "Cadenas finas, perlas y tréboles para apilar en la muñeca",
      video: "/video/collar.mp4",
    },
  },
  {
    label: "Pendientes",
    href: "/products/pendientes",
    lifestyleImage: "/img/pendientes/aretes-hero.webp",
    lifestyleAlt: "Modelo con pendientes de nácar y oro a la luz del sol",
    product: {
      name: "Aretes Pera",
      href: "/products/pendientes/aretes-pera",
      price: formatPrice(6),
      image: "/img/pendientes/aretes-pera.webp",
      alt: "Aretes Pera: cristal facetado en forma de pera colgando de un arete de oro",
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
              href={pair.product.href ?? pair.href}
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
              href={pair.product.href ?? pair.href}
              className="group relative block min-h-[58vh] overflow-clip bg-sand lg:min-h-170 focus-visible:outline-none"
            >
              <ParallaxImage
                src={pair.product.image}
                alt={pair.product.alt}
                className="absolute inset-0"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-stone-950/55 via-stone-950/10 to-transparent"
              />
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <h3 className="text-base font-normal tracking-wide text-cream transition-colors group-hover:text-gold-bright">
                  {pair.product.name}
                </h3>
                {pair.product.price && (
                  <p className="mt-2 text-xl italic text-gold-bright">
                    {pair.product.price}
                  </p>
                )}
              </div>
            </Link>
          )}
        </div>
      ))}
    </section>
  )
}

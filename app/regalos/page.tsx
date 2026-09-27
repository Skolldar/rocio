import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Gift, Package, Sparkles, Truck } from "lucide-react"

import ProductCard from "@/components/catalog/productCard"
import { getMasVendidos, getParaRegalo } from "@/lib/catalog"

export const metadata: Metadata = {
  title: "Regalos · Luxgirl",
  description:
    "Ideas de regalo para cada ocasión: joyas listas para sorprender, con estuche de firma y envoltorio incluido.",
}

type Occasion = {
  title: string
  description: string
  href: string
  image: string
  alt: string
}

const occasions: Occasion[] = [
  {
    title: "Para ella",
    description: "Collares y pendientes que se llevan a diario y no pasan de moda.",
    href: "/products/collares",
    image: "/img/modelos/modelo-collar-corazon-perla.webp",
    alt: "Modelo con collar de corazón y perla",
  },
  {
    title: "Aniversario",
    description: "Anillos y piezas con significado para celebrar el tiempo juntos.",
    href: "/products/anillos",
    image: "/img/modelos/modelo-manos-anillos.webp",
    alt: "Manos con anillos de oro",
  },
  {
    title: "Cumpleaños",
    description: "Pulseras y brazaletes para apilar, en oro y plata.",
    href: "/products/pulseras",
    image: "/img/modelos/modelo-cafe-pulseras.webp",
    alt: "Modelo con pulseras tomando café",
  },
  {
    title: "Un detalle",
    description: "Pequeños gestos con gran efecto, por menos de lo que imaginas.",
    href: "/products/para-regalo",
    image: "/img/modelos/modelo-perlas-corazon.webp",
    alt: "Modelo con pendientes de perla y corazón",
  },
]

const perks = [
  {
    icon: Gift,
    title: "Estuche de firma",
    description: "Cada joya llega en su estuche Luxgirl, sin coste adicional.",
  },
  {
    icon: Package,
    title: "Envoltorio incluido",
    description: "Lista para entregar en mano o dejar bajo el árbol.",
  },
  {
    icon: Sparkles,
    title: "Nota personalizada",
    description: "Añade un mensaje al pedido y lo escribimos a mano por ti.",
  },
  {
    icon: Truck,
    title: "Entrega cuidada",
    description: "Protegida durante todo el trayecto hasta su destino.",
  },
]

export default function RegalosPage() {
  const { category: paraRegalo, productHref: paraRegaloHref } = getParaRegalo()
  const { category: masVendidos, productHref: masVendidosHref } = getMasVendidos()

  const picks = paraRegalo.products.slice(0, 4)
  const favorites = masVendidos.products.slice(0, 4)

  return (
    <main className="w-full bg-background text-foreground">
      {/* Hero */}
      <section
        aria-labelledby="regalos-titulo"
        className="relative isolate overflow-hidden bg-stone-950 text-stone-50"
      >
        <Image
          src="/img/empaque-productos.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-center opacity-60"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-r from-stone-950/90 via-stone-950/55 to-stone-950/10"
        />

        <div className="mx-auto flex min-h-[clamp(22rem,60vh,36rem)] max-w-400 flex-col justify-end px-8 pb-12 pt-28 sm:pb-16">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-bright">
            Guía de regalos
          </p>
          <h1
            id="regalos-titulo"
            className="mt-3 text-[clamp(2.5rem,1.5rem+5vw,5.5rem)] font-semibold text-balance"
          >
            Regalos que se recuerdan
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-stone-200 sm:mt-5 md:text-lg md:font-light">
            Joyas elegidas para sorprender, con estuche de firma y envoltorio
            incluido. Solo tienes que decidir a quién.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products/para-regalo"
              className="inline-flex min-h-11 items-center rounded-full bg-gold-bright px-6 text-sm font-medium uppercase tracking-[0.14em] text-stone-950 transition-colors hover:bg-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
            >
              Ver selección
            </Link>
            <a
              href="#por-ocasion"
              className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-6 text-sm font-medium uppercase tracking-[0.14em] text-stone-100 transition-colors hover:border-gold-bright hover:text-gold-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright"
            >
              Por ocasión
            </a>
          </div>
        </div>
      </section>

      {/* Por ocasión */}
      <section
        id="por-ocasion"
        aria-labelledby="ocasion-titulo"
        className="scroll-mt-24"
      >
        <div className="mx-auto max-w-400 px-8 py-20 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
              ¿Para quién es?
            </p>
            <h2
              id="ocasion-titulo"
              className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
            >
              Regalar por ocasión
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-muted-foreground">
              Hemos agrupado nuestras piezas según el momento que quieres
              celebrar. Cada camino te lleva a una selección pensada para
              acertar.
            </p>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {occasions.map((occasion) => (
              <li key={occasion.title}>
                <Link
                  href={occasion.href}
                  className="group relative flex aspect-4/5 flex-col justify-end overflow-hidden rounded-xl p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-4"
                >
                  <Image
                    src={occasion.image}
                    alt={occasion.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-stone-950/90 via-stone-950/35 to-transparent"
                  />
                  <span className="relative flex items-center justify-between gap-3">
                    <span className="text-2xl font-semibold leading-tight text-white">
                      {occasion.title}
                    </span>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:bg-gold-bright group-hover:text-stone-950">
                      <ArrowUpRight
                        aria-hidden="true"
                        strokeWidth={1.75}
                        className="size-4.5"
                      />
                    </span>
                  </span>
                  <span className="relative mt-2 text-sm font-light leading-snug text-stone-200">
                    {occasion.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Detalles por menos de X € */}
      <section
        aria-labelledby="detalles-titulo"
        className="border-t border-border"
      >
        <div className="mx-auto max-w-400 px-8 py-20 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
                {paraRegalo.eyebrow}
              </p>
              <h2
                id="detalles-titulo"
                className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
              >
                Pequeños detalles
              </h2>
              <p className="mt-4 text-base font-light leading-relaxed text-muted-foreground">
                {paraRegalo.description}
              </p>
            </div>
            <Link
              href="/products/para-regalo"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-foreground px-6 text-sm font-medium uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2"
            >
              Ver todos
              <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="size-4" />
            </Link>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4">
            {picks.map((product, index) => {
              const href = paraRegaloHref(product)
              return (
                <li key={href}>
                  <ProductCard product={product} href={href} priority={index < 2} />
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Envoltorio */}
      <section
        aria-labelledby="envoltorio-titulo"
        className="bg-stone-950 text-stone-50"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[50vh] lg:min-h-160">
            <Image
              src="/img/empaque-productos.webp"
              alt="Estuches y bolsas de firma Luxgirl"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-24">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-bright">
              Listo para entregar
            </p>
            <h2
              id="envoltorio-titulo"
              className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
            >
              El envoltorio también es parte del regalo
            </h2>
            <p className="mt-5 max-w-[52ch] text-base font-light leading-relaxed text-stone-300">
              Todos los pedidos salen del atelier en su estuche de firma, con
              bolsa y lazo. Si es un regalo, dínoslo al hacer el pedido y
              retiramos el precio del paquete.
            </p>

            <ul className="mt-10 grid gap-8 sm:grid-cols-2">
              {perks.map((perk) => (
                <li key={perk.title} className="flex gap-4">
                  <perk.icon
                    aria-hidden="true"
                    strokeWidth={1.25}
                    className="mt-0.5 size-6 shrink-0 text-gold-bright"
                  />
                  <div>
                    <h3 className="text-base font-medium">{perk.title}</h3>
                    <p className="mt-1 text-sm font-light leading-relaxed text-stone-300">
                      {perk.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Favoritos */}
      <section aria-labelledby="favoritos-titulo">
        <div className="mx-auto max-w-400 px-8 py-20 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
                Para acertar seguro
              </p>
              <h2
                id="favoritos-titulo"
                className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
              >
                Los regalos más repetidos
              </h2>
              <p className="mt-4 text-base font-light leading-relaxed text-muted-foreground">
                Las piezas que más se regalan en Luxgirl. Si dudas, empieza por
                aquí.
              </p>
            </div>
            <Link
              href="/products/mas-vendidos"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-foreground px-6 text-sm font-medium uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2"
            >
              Ver más vendidos
              <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="size-4" />
            </Link>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4">
            {favorites.map((product) => {
              const href = masVendidosHref(product)
              return (
                <li key={href}>
                  <ProductCard product={product} href={href} />
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* CTA ayuda */}
      <section
        aria-labelledby="ayuda-titulo"
        className="border-t border-border bg-sand"
      >
        <div className="mx-auto max-w-400 px-8 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="ayuda-titulo"
              className="text-2xl font-semibold text-balance sm:text-3xl"
            >
              ¿No sabes por dónde empezar?
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-muted-foreground">
              Cuéntanos para quién es y cómo es su estilo. Te proponemos dos o
              tres opciones para que solo tengas que elegir.
            </p>
            <Link
              href="/order"
              className="mt-8 inline-flex min-h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium uppercase tracking-[0.14em] text-background transition-colors hover:bg-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2"
            >
              Pedir ayuda
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

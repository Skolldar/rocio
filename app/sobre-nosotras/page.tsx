import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Gem, HandHeart, Leaf, Scissors } from "lucide-react"

import ParallaxImage from "@/components/parallaxImage"
import QualityGuarantee from "@/components/qualityGuarantee"

export const metadata: Metadata = {
  title: "Sobre nosotras · Luxgirl",
  description:
    "Conoce Luxgirl: un atelier de joyería contemporánea hecho por mujeres, para mujeres. Piezas cuidadas, materiales nobles y atención cercana.",
}

const values = [
  {
    icon: Gem,
    title: "Materiales nobles",
    description:
      "Trabajamos con baño de oro de 18 quilates y plata de ley para que cada pieza brille durante años.",
  },
  {
    icon: Scissors,
    title: "Hecho con calma",
    description:
      "Seleccionamos y terminamos cada joya a mano en el atelier, en tiradas pequeñas y sin prisas.",
  },
  {
    icon: HandHeart,
    title: "Trato cercano",
    description:
      "Te acompañamos antes y después de la compra: tallas, combinaciones, regalos y cuidados.",
  },
  {
    icon: Leaf,
    title: "Consumo consciente",
    description:
      "Diseñamos piezas atemporales para llevar toda la vida, no para una temporada.",
  },
]

const milestones = [
  {
    year: "2021",
    title: "Un cajón lleno de ideas",
    description:
      "Luxgirl empieza como un proyecto entre amigas: joyas sencillas que queríamos llevar y no encontrábamos.",
  },
  {
    year: "2023",
    title: "El primer atelier",
    description:
      "Abrimos nuestro pequeño taller y presentamos la primera colección completa de collares y pendientes.",
  },
  {
    year: "2025",
    title: "Comunidad Luxgirl",
    description:
      "Miles de piezas han salido del atelier. Las series numeradas de Edición Limitada nacen ese año.",
  },
  {
    year: "Hoy",
    title: "Seguimos a mano",
    description:
      "Cada pedido sigue saliendo con su estuche de firma y una nota escrita por nosotras.",
  },
]

export default function SobreNosotrasPage() {
  return (
    <main className="w-full bg-background text-foreground">
      {/* Hero */}
      <section
        aria-labelledby="nosotras-titulo"
        className="relative isolate overflow-hidden bg-stone-950 text-stone-50"
      >
        <Image
          src="/img/modelos/modelo-selfie-flores.webp"
          alt="selfie de modelo con pendientes y collares de oro"
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
            Sobre nosotras
          </p>
          <h1
            id="nosotras-titulo"
            className="mt-3 text-[clamp(2.5rem,1.5rem+5vw,3.5rem)] font-semibold text-balance"
          >
            Joyas hechas por mujeres, <br /> 
            para mujeres
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-stone-200 sm:mt-5 md:text-lg md:font-light">
            Luxgirl es un atelier pequeño con una idea clara: piezas bonitas,
            bien hechas y pensadas para llevarlas cada día.
          </p>
        </div>
      </section>

      {/* Manifiesto */}
      <section aria-labelledby="historia-titulo">
        <div className="mx-auto max-w-400 px-8 py-20 sm:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
                Nuestra historia
              </p>
              <h2
                id="historia-titulo"
                className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
              >
                Empezamos buscando la joya que no existía
              </h2>
            </div>
            <div className="space-y-6 text-base font-light leading-relaxed text-muted-foreground lg:col-span-7 lg:text-lg">
              <p>
                Queríamos collares finos que no se enredaran, pendientes ligeros
                que pudiéramos llevar todo el día y anillos que combinaran entre
                sí sin pensarlo demasiado. Como no los encontrábamos, empezamos a
                hacerlos.
              </p>
              <p>
                Hoy Luxgirl sigue siendo un equipo pequeño. Elegimos cada
                material, probamos cada pieza y preparamos cada pedido en el
                atelier. Nos gusta que lo que llega a tus manos haya pasado antes
                por las nuestras.
              </p>
              <p>
                Creemos en una joyería cercana: sin lujos inaccesibles, sin
                prisas y sin piezas que se olvidan en un cajón.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Imagen parallax */}
      <section aria-label="El atelier">
        <ParallaxImage
          src="/img/modelos/modelo-collares-capas.webp"
          alt="Modelo con varios collares de oro a distintas alturas"
          objectPosition="50% 58%"
          className="relative h-[80svh] min-h-100 w-full max-h-180 lg:h-[110svh] lg:min-h-200 lg:max-h-300"
        />
      </section>

      {/* Sellos de calidad */}
      <QualityGuarantee className="border-t-0" />

      {/* Valores */}
      <section
        aria-labelledby="valores-titulo"
        className="border-b border-border"
      >
        <div className="mx-auto max-w-400 px-8 py-20 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
              Lo que nos importa
            </p>
            <h2
              id="valores-titulo"
              className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
            >
              Cuatro cosas en las que no cedemos
            </h2>
          </div>

          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <li key={value.title}>
                <value.icon
                  aria-hidden="true"
                  strokeWidth={1.25}
                  className="size-7 text-gold-deep"
                />
                <h3 className="mt-5 text-lg font-medium">{value.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recorrido */}
      <section aria-labelledby="recorrido-titulo" className="bg-sand">
        <div className="mx-auto max-w-400 px-8 py-20 sm:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
                Recorrido
              </p>
              <h2
                id="recorrido-titulo"
                className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
              >
                Paso a paso, sin prisas
              </h2>
              <div className="relative mt-10 aspect-4/5 overflow-hidden rounded-xl">
                <Image
                  src="/img/modelos/modelo-mano-anillos-pulsera.webp"
                  alt="Mano con anillos y pulsera de oro"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <ol className="lg:col-span-8">
              {milestones.map((milestone) => (
                <li
                  key={milestone.year}
                  className="grid gap-3 border-t border-border py-8 sm:grid-cols-12 sm:gap-8 last:border-b"
                >
                  <span className="text-sm font-medium uppercase tracking-[0.18em] text-gold-deep sm:col-span-2">
                    {milestone.year}
                  </span>
                  <div className="sm:col-span-10">
                    <h3 className="text-xl font-semibold">{milestone.title}</h3>
                    <p className="mt-2 max-w-[60ch] text-base font-light leading-relaxed text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        aria-labelledby="cta-titulo"
        className="bg-white text-foreground"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-24">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
              Descubre el atelier
            </p>
            <h2
              id="cta-titulo"
              className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
            >
              Ahora que nos conoces, conoce las piezas
            </h2>
            <p className="mt-5 max-w-3xl text-base font-light leading-relaxed text-muted-foreground">
              Explora las colecciones o escríbenos si buscas algo concreto. Nos
              encanta ayudar a encontrar la joya adecuada.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-6 text-sm font-medium uppercase tracking-[0.14em] text-gold-ink transition-colors hover:bg-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Ver colecciones
                <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="size-4" />
              </Link>
              <Link
                href="/regalos"
                className="inline-flex min-h-11 items-center rounded-full border border-border px-6 text-sm font-medium uppercase tracking-[0.14em] text-foreground transition-colors hover:border-gold-deep hover:text-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Guía de regalos
              </Link>
            </div>
          </div>
          <div className="relative min-h-[50vh] lg:min-h-160">
            <Image
              src="/img/modelos/modelo-brazalete-trebol.webp"
              alt="Modelo con brazalete de trébol"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  )
}

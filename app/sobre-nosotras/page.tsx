import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Gem, HandHeart, Leaf, Scissors } from "lucide-react"

import ParallaxImage from "@/components/parallaxImage"
import QualityGuarantee from "@/components/qualityGuarantee"

export const metadata: Metadata = {
  title: "Sobre mí · Luxgirl",
  description:
    "Luxgirl es un pequeño proyecto de joyería que llevo yo sola: piezas escogidas con calma, materiales que duran y trato directo conmigo.",
}

const values = [
  {
    icon: Gem,
    title: "Materiales que duran",
    description:
      "Todas mis piezas son de acero inoxidable con baño de oro o de plata. No se oscurecen, no dan alergia y aguantan el día a día sin perder el color.",
  },
  {
    icon: Scissors,
    title: "Sin prisas",
    description:
      "Reviso y termino cada joya a mano, en tiradas pequeñas. Si algo no me convence, no sale.",
  },
  {
    icon: HandHeart,
    title: "Hablas conmigo",
    description:
      "Si tienes dudas con la talla, con un regalo o con cómo cuidar una pieza, me escribes y te contesto yo.",
  },
  {
    icon: Leaf,
    title: "Para toda la vida",
    description:
      "Diseño pensando en piezas que quieras llevar dentro de diez años, no solo esta temporada.",
  },
]

const milestones = [
  {
    year: "2021",
    title: "Un cajón lleno de ideas",
    description:
      "Empecé haciendo las joyas sencillas que quería llevar y no encontraba en ningún sitio. Al principio, solo para mí.",
  },
  {
    year: "2023",
    title: "El primer taller",
    description:
      "Monté un pequeño taller en casa y saqué la primera colección completa de collares y pendientes.",
  },
  {
    year: "2025",
    title: "Edición Limitada",
    description:
      "Ya habían salido miles de piezas del taller. Ese año empecé las series numeradas, en cantidades muy pequeñas.",
  },
  {
    year: "Hoy",
    title: "Sigo haciéndolo yo",
    description:
      "Cada pedido sale con su estuche y una nota escrita a mano. La escribo yo, igual que el primer día.",
  },
]

export default function SobreNosotrasPage() {
  return (
    <main className="w-full bg-background text-foreground">
      {/* Hero */}
      <section
        aria-labelledby="sobre-mi-titulo"
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

        <div className="mx-auto flex min-h-[clamp(22rem,60vh,36rem)] max-w-400 flex-col justify-end px-5 sm:px-8 pb-12 pt-28 sm:pb-16">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-bright">
            Sobre mí
          </p>
          <h1
            id="sobre-mi-titulo"
            className="mt-3 text-[clamp(2.5rem,1.5rem+5vw,3.5rem)] font-semibold text-balance"
          >
            Joyas hechas por una mujer, <br className="hidden sm:inline" />
            para otras mujeres
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-stone-200 sm:mt-5 md:text-lg md:font-regular">
            Luxgirl es un proyecto pequeño que llevo yo sola. Piezas bonitas,
            bien hechas y pensadas para llevarlas cada día.
          </p>
        </div>
      </section>

      {/* Historia */}
      <section aria-labelledby="historia-titulo">
        <div className="mx-auto max-w-400 px-5 sm:px-8 py-20 sm:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
                Mi historia
              </p>
              <h2
                id="historia-titulo"
                className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
              >
                Empecé buscando la joya que no existía
              </h2>
            </div>
            <div className="space-y-6 text-base font-regular leading-relaxed text-muted-foreground lg:col-span-7 lg:text-lg">
              <p>
                Quería collares finos que no se enredaran, pendientes ligeros
                para llevar todo el día y anillos que combinaran entre sí sin
                pensarlo mucho. Como no los encontraba, empecé a hacerlos.
              </p>
              <p>
                Luxgirl sigue siendo cosa de una sola persona. Elijo cada
                material, pruebo cada pieza y preparo cada pedido en el taller.
                Lo que llega a tus manos ha pasado antes por las mías, y me
                gusta que sea así.
              </p>
              <p>
                Creo en una joyería cercana: sin lujos inaccesibles, sin prisas
                y sin piezas que acaban olvidadas en un cajón.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Imagen parallax: se fija en la parte superior y el contenido
          siguiente se desliza por encima (efecto cortina). */}
      <section aria-label="El taller" className="sticky top-0 z-0 h-svh">
        <ParallaxImage
          src="/img/modelos/modelo-collares-capas.webp"
          video="/video/taller.mp4"
          alt="Modelo con varios collares de oro a distintas alturas"
          objectPosition="50% 58%"
          className="relative h-full w-full"
        />
      </section>

      {/* Todo lo que sigue se apila por encima de la imagen fija */}
      <div className="relative z-10 shadow-[0_-32px_64px_-32px_rgba(0,0,0,0.45)]">
      {/* Sellos de calidad */}
      <QualityGuarantee className="border-t-0" />

      {/* Valores */}
      <section
        aria-labelledby="valores-titulo"
        className="border-b border-border bg-background"
      >
        <div className="mx-auto max-w-400 px-5 sm:px-8 py-20 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
              Lo que me importa
            </p>
            <h2
              id="valores-titulo"
              className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
            >
              Cuatro cosas en las que no cedo
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
                <p className="mt-3 text-sm font-regular leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recorrido */}
      <section aria-labelledby="recorrido-titulo" className="bg-sand">
        <div className="mx-auto max-w-400 px-5 sm:px-8 py-20 sm:py-24 lg:py-28">
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
                    <p className="mt-2 max-w-[60ch] text-base font-regular leading-relaxed text-muted-foreground">
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
          <div className="flex flex-col justify-center px-5 sm:px-8 py-16 lg:px-16 lg:py-24">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
              Descubre el taller
            </p>
            <h2
              id="cta-titulo"
              className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
            >
              Ahora que me conoces, conoce las piezas
            </h2>
            <p className="mt-5 max-w-3xl text-base font-regular leading-relaxed text-muted-foreground">
              Echa un vistazo a las colecciones o escríbeme si buscas algo
              concreto. Me gusta ayudar a encontrar la joya adecuada.
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
      </div>
    </main>
  )
}

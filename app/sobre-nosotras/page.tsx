import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Gem, HandHeart, Leaf, Scissors } from "lucide-react"

import ParallaxImage from "@/components/parallaxImage"
import QualityGuarantee from "@/components/qualityGuarantee"

export const metadata: Metadata = {
  title: "Sobre mí · Luxgirl",
  description:
    "Luxgirl es un pequeño proyecto que llevo yo sola: accesorios bonitos y asequibles, elegidos con calma para mujeres que disfrutan verse bien.",
}

const values = [
  {
    icon: Gem,
    title: "Piezas que yo me pondría",
    description:
      "Solo elijo lo que yo llevaría en cada ocasión. Si una pieza no me enamora, no entra en la tienda.",
  },
  {
    icon: Scissors,
    title: "Asequibles de verdad",
    description:
      "Verte bonita no tiene por qué costar una fortuna. Busco piezas delicadas a precios que puedas permitirte sin pensarlo dos veces.",
  },
  {
    icon: HandHeart,
    title: "Hablas conmigo",
    description:
      "Si tienes dudas con una pieza, con un regalo o con cómo combinarla, me escribes y te contesto yo.",
  },
  {
    icon: Leaf,
    title: "Para cualquier día",
    description:
      "Una cita, una salida con amigas o un martes cualquiera. Un collar o unos aretes pueden cambiar cómo te sientes con lo que llevas puesto.",
  },
]

const milestones = [
  {
    year: "El inicio",
    title: "Una casualidad",
    description:
      "Un día me encontré con piezas preciosas, delicadas y a precios increíbles. Piezas que me pondría en cada ocasión. Y pensé: ¿por qué no convertir esto en una oportunidad?",
  },
  {
    year: "La idea",
    title: "Un pequeño sueño",
    description:
      "Quería otra fuente de ingresos, sí. Pero también me hacía ilusión compartir algo que a mí me encanta.",
  },
  {
    year: "El nombre",
    title: "Nace Luxgirl",
    description:
      "Un espacio para mujeres que disfrutan verse bien, expresarse a través de su estilo y encontrar belleza en los pequeños detalles.",
  },
  {
    year: "Hoy",
    title: "Sigo eligiendo yo",
    description:
      "Cada pieza que entra en Luxgirl la imagino formando parte de la historia de otra mujer. Quiero que esto crezca hasta ser una marca que acompañe a cada una en su manera de brillar.",
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
            Accesorios elegidos por una mujer, <br className="hidden sm:inline" />
            para otras mujeres
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-stone-200 sm:mt-5 md:text-lg md:font-regular">
            Luxgirl es un proyecto pequeño que llevo yo sola. Piezas bonitas,
            delicadas y asequibles, para sentirte bien contigo misma.
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
                Empezó como una casualidad
              </h2>
            </div>
            <div className="space-y-6 text-base font-regular leading-relaxed text-muted-foreground lg:col-span-7 lg:text-lg">
              <p>
                Me apasiona sentirme bien conmigo misma, y esos pequeños
                detalles que hacen que un look se sienta nuestro. Un día me
                encontré con piezas preciosas, delicadas y a precios
                increíbles. Piezas que me pondría en cualquier ocasión. Ahí
                empezó este pequeño sueño.
              </p>
              <p>
                Siempre he pensado que los accesorios son mucho más que un
                complemento. Con el ajetreo del día a día vestimos algo
                práctico, básico o cómodo, y en algún momento pensamos "falta
                algo". Un collar, unos aretes o un anillo son ese algo.
              </p>
              <p>
                Cada pieza que elijo la imagino en la historia de otra mujer:
                en un día cualquiera, en una cita, en una salida con amigas o
                en ese momento frente al espejo en el que piensas "hoy me
                quiero ver bonita para mí".
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Imagen parallax: se fija en la parte superior y el contenido
          siguiente se desliza por encima (efecto cortina). */}
      <section aria-label="Las piezas" className="sticky top-0 z-0 h-svh">
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
              Cuatro cosas que tengo claras
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
                Cómo llegué hasta aquí
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
              Descubre las piezas
            </p>
            <h2
              id="cta-titulo"
              className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
            >
              Ahora que me conoces, conoce las piezas
            </h2>
            <p className="mt-5 max-w-3xl text-base font-regular leading-relaxed text-muted-foreground">
              Echa un vistazo a las colecciones o escríbeme si buscas algo
              concreto. Me gusta ayudar a encontrar la pieza que te falta.
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

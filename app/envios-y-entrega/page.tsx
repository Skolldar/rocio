import type { Metadata } from "next"
import Image from "next/image"
import {
  Check,
  Handshake,
  MessageCircle,
  PackageCheck,
  Truck,
  type LucideIcon,
} from "lucide-react"

import HelpFooterNav from "@/components/help/helpFooterNav"
import HelpHero from "@/components/help/helpHero"

export const metadata: Metadata = {
  title: "Envíos y entrega · Luxgirl",
  description:
    "Elige cómo recibir tu pedido: envío a domicilio con un coste fijo o entrega en mano, sin coste, en el centro comercial Plaza Río de Madrid.",
}

// Condiciones actuales. Cambia aquí los datos y se actualizan en toda la página.
const SHIPPING_PRICE = "4,90 €"
const SHIPPING_DAYS = "2 a 4 días laborables"
const PREP_DAYS = "1 a 2 días laborables"

type DeliveryOption = {
  icon: LucideIcon
  eyebrow: string
  title: string
  price: string
  priceNote: string
  timing: string
  description: string
  bullets: string[]
}

const options: DeliveryOption[] = [
  {
    icon: Truck,
    eyebrow: "Opción 1",
    title: "Envío a domicilio",
    price: SHIPPING_PRICE,
    priceNote: "coste fijo por pedido",
    timing: `${SHIPPING_DAYS} desde que sale del taller`,
    description:
      "Lo mando por mensajería a la dirección que me indiques, dentro de la península. Te paso el número de seguimiento en cuanto lo entrego en la oficina.",
    bullets: [
      "Puedes seguir el paquete desde que sale hasta que llega.",
      "Si no estás en casa, la mensajería lo intenta de nuevo o lo deja en un punto de recogida cercano.",
      "Para Baleares, Canarias o fuera de España, escríbeme antes y miramos el coste.",
    ],
  },
  {
    icon: Handshake,
    eyebrow: "Opción 2",
    title: "Entrega en mano",
    price: "Sin coste",
    priceNote: "en el C.C. Plaza Río, Madrid",
    timing: "cuando mejor te venga, normalmente en la misma semana",
    description:
      "Si estás en Madrid o cerca, quedamos en el centro comercial Plaza Río y te doy el pedido en persona. No pagas envío.",
    bullets: [
      "Acordamos el día y la hora por mensaje.",
      "Puedes ver la pieza antes de llevártela y pagar en ese momento si prefieres efectivo.",
      "Si el plan cambia, avísame y buscamos otro momento sin problema.",
    ],
  },
]

const steps = [
  {
    title: "Confirmo tu pedido",
    description:
      "Te escribo para confirmar la pieza, la talla si la tiene y cómo quieres recibirla. Si es un regalo, dímelo y no incluyo el precio.",
  },
  {
    title: "Preparo la pieza",
    description: `Reviso la joya, la limpio y la meto en su estuche con una nota escrita a mano. Suelo tardar ${PREP_DAYS}.`,
  },
  {
    title: "Sale del taller o quedamos",
    description:
      "Si has elegido envío, la llevo a la mensajería y te paso el seguimiento. Si has elegido entrega en mano, cerramos el día y la hora para vernos en Plaza Río.",
  },
  {
    title: "La tienes contigo",
    description:
      "Ábrela, pruébatela y, si algo no es como esperabas, escríbeme el mismo día. Lo resolvemos.",
  },
]

const faqs = [
  {
    question: "¿Puedo cambiar de envío a entrega en mano después de pedir?",
    answer:
      "Sí, siempre que el paquete no haya salido todavía. Escríbeme y lo cambio. Si ya has pagado el envío, te lo devuelvo.",
  },
  {
    question: "¿Cómo pago?",
    answer:
      "Por Bizum, transferencia o en efectivo si nos vemos en persona. El envío se paga junto con el pedido.",
  },
  {
    question: "¿Cómo va embalado?",
    answer:
      "Cada joya va en su estuche, dentro de una caja rígida con relleno para que no se mueva. La cadena de los collares la dejo cerrada para que no se enrede por el camino.",
  },
  {
    question: "¿Y si llega dañado?",
    answer:
      "Hazle una foto al paquete y a la pieza y mándamela ese mismo día. Te envío otra o te devuelvo el dinero, lo que prefieras.",
  },
]

export default function EnviosPage() {
  return (
    <main className="w-full bg-background text-foreground">
      <HelpHero
        eyebrow="Envíos y entrega"
        titleId="envios-titulo"
        title="Dos formas de recibir tu pedido"
        intro="Puedes pedir que te lo envíe a casa, con un coste fijo, o recogerlo en mano en el centro comercial Plaza Río, en Madrid, sin pagar envío. Las dos opciones llevan el mismo estuche y la misma nota."
        image={{
          src: "/img/empaque-productos.webp",
          alt: "Estuches y cajas de Luxgirl preparados para enviar",
        }}
        layout="edge"
      />

      {/* Opciones */}
      <section aria-labelledby="opciones-titulo">
        <div className="mx-auto max-w-400 px-5 sm:px-8 py-20 sm:py-24">
          <h2 id="opciones-titulo" className="sr-only">
            Opciones de entrega
          </h2>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {options.map((option) => (
              <article
                key={option.title}
                className="flex flex-col rounded-xl border border-border bg-white p-8 sm:p-10"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
                      {option.eyebrow}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">
                      {option.title}
                    </h3>
                  </div>
                  <option.icon
                    aria-hidden="true"
                    strokeWidth={1.25}
                    className="size-9 shrink-0 text-gold-deep"
                  />
                </div>

                <dl className="mt-8 grid gap-6 border-y border-border py-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Precio
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold tabular-nums">
                      {option.price}
                    </dd>
                    <dd className="text-sm font-regular text-muted-foreground">
                      {option.priceNote}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Plazo
                    </dt>
                    <dd className="mt-1 text-base leading-snug">{option.timing}</dd>
                  </div>
                </dl>

                <p className="mt-6 text-base font-regular leading-relaxed text-muted-foreground">
                  {option.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {option.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm font-regular leading-relaxed"
                    >
                      <Check
                        aria-hidden="true"
                        strokeWidth={1.75}
                        className="mt-0.5 size-4 shrink-0 text-gold-deep"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section aria-labelledby="proceso-titulo" className="border-y border-border bg-sand">
        <div className="mx-auto max-w-400 px-5 sm:px-8 py-20 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
              Después de pedir
            </p>
            <h2
              id="proceso-titulo"
              className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
            >
              Qué pasa con tu pedido, paso a paso
            </h2>
          </div>

          {/* Imagen y pasos en la misma fila: la lista se centra respecto a la imagen. */}
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="relative hidden aspect-4/5 overflow-hidden rounded-xl lg:col-span-4 lg:block">
              <Image
                src="/img/modelos/modelo-collar-corazon-perla.webp"
                alt="Modelo con collar de corazón y perla"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </div>

            <ol className="lg:col-span-8">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="grid gap-3 border-t border-border py-8 sm:grid-cols-12 sm:gap-8 last:border-b"
                >
                  <span className="text-sm font-medium uppercase tracking-[0.18em] text-gold-deep tabular-nums sm:col-span-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="sm:col-span-10">
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 max-w-[60ch] text-base font-regular leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Preguntas */}
      <section aria-labelledby="envios-faq-titulo">
        <div className="mx-auto max-w-400 px-5 sm:px-8 py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
                Lo que más me preguntan
              </p>
              <h2
                id="envios-faq-titulo"
                className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
              >
                Dudas frecuentes sobre el envío
              </h2>
              <ul className="mt-8 space-y-4 text-sm font-regular text-muted-foreground">
                <li className="flex gap-3">
                  <PackageCheck aria-hidden="true" strokeWidth={1.25} className="size-5 shrink-0 text-foreground" />
                  Todo sale revisado y en su estuche.
                </li>
                <li className="flex gap-3">
                  <MessageCircle aria-hidden="true" strokeWidth={1.25} className="size-5 shrink-0 text-foreground" />
                  Te aviso por mensaje en cada paso.
                </li>
              </ul>
            </div>

            <div className="lg:col-span-8">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group border-t border-border last:border-b"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-normal leading-snug transition-colors hover:text-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:text-xl [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="size-5 flex-none text-muted-foreground transition-transform duration-300 ease-out group-open:-rotate-180"
                    >
                      <path
                        d="m6 9 6 6 6-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </summary>
                  <p className="max-w-[65ch] pb-7 text-base font-regular leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HelpFooterNav current="envios" />
    </main>
  )
}

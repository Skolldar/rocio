import type { Metadata } from "next"
import Image from "next/image"
import { Lightbulb } from "lucide-react"

import HelpFooterNav from "@/components/help/helpFooterNav"
import HelpHero from "@/components/help/helpHero"

export const metadata: Metadata = {
  title: "Guía de tallas · Luxgirl",
  description:
    "Cómo medir tu dedo y tu muñeca en casa, y cómo elegir el largo del collar. Tabla de tallas de anillos en milímetros.",
}

// Talla española = circunferencia interior en mm menos 40.
// La talla US es orientativa, redondeada al cuarto más cercano.
const ringSizes = [
  { es: 6, circumference: 46, diameter: "14,6", us: "3 ¾" },
  { es: 8, circumference: 48, diameter: "15,3", us: "4 ½" },
  { es: 10, circumference: 50, diameter: "15,9", us: "5 ¼" },
  { es: 12, circumference: 52, diameter: "16,6", us: "6" },
  { es: 14, circumference: 54, diameter: "17,2", us: "6 ¾" },
  { es: 16, circumference: 56, diameter: "17,8", us: "7 ½" },
  { es: 18, circumference: 58, diameter: "18,5", us: "8 ¼" },
  { es: 20, circumference: 60, diameter: "19,1", us: "9" },
]

const ringSteps = [
  {
    title: "Con un anillo que ya te quede bien",
    description:
      "Ponlo sobre una regla y mide el diámetro interior, de borde a borde por dentro, en milímetros. Busca ese número en la columna de diámetro de la tabla.",
  },
  {
    title: "Con un hilo o una tira de papel",
    description:
      "Rodea la base del dedo donde vaya a ir el anillo, marca donde se cruza y mide esa longitud con la regla. Es la circunferencia. Si el nudillo es más ancho que la base, mide también el nudillo y quédate con la medida mayor.",
  },
  {
    title: "Entre dos tallas",
    description:
      "Elige la mayor. Un anillo un poco holgado se lleva bien. Uno que aprieta acaba en el joyero.",
  },
]

const necklaceLengths = [
  {
    length: "40 cm",
    name: "Gargantilla",
    where: "Rodea la base del cuello, sin holgura. Es el largo de los collares de circonitas en fila.",
  },
  {
    length: "45 cm",
    name: "Clavícula",
    where: "Cae justo sobre la clavícula. Es el largo más habitual de mis colgantes y el que uso si no me dices nada.",
  },
  {
    length: "50 cm",
    name: "Bajo la clavícula",
    where: "Queda unos dedos por debajo del hueso. Va bien con escotes en pico y para combinar con otro más corto.",
  },
  {
    length: "60 cm",
    name: "Sobre el pecho",
    where: "Cae a la altura del esternón. Pensado para llevar por fuera de jerséis y camisas.",
  },
]

const braceletFits = [
  { wrist: "14 cm", size: "16 cm", fit: "Ajustada, sin que se mueva" },
  { wrist: "15 cm", size: "17 cm", fit: "La medida estándar" },
  { wrist: "16 cm", size: "18 cm", fit: "Cómoda, con algo de juego" },
  { wrist: "17 cm o más", size: "19 cm", fit: "Holgada, cae hacia la mano" },
]

const cellHead =
  "px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground first:pl-0 last:pr-0"
const cell = "px-4 py-3.5 text-base tabular-nums first:pl-0 last:pr-0"

export default function GuiaDeTallasPage() {
  return (
    <main className="w-full bg-background text-foreground">
      <HelpHero
        eyebrow="Guía de tallas"
        titleId="tallas-titulo"
        title="Mide una vez y acierta"
        intro="Con una regla y un hilo tienes todo lo que hace falta. Aquí explico cómo medir el dedo y la muñeca en casa, y cómo elegir el largo de un collar según dónde quieras que caiga."
        image={{
          src: "/img/modelos/modelo-manos-anillos.webp",
          alt: "Manos con varios anillos finos de oro",
          position: "50% 50%",
        }}
        layout="edge"
      />

      {/* Anillos */}
      <section aria-labelledby="anillos-titulo">
        <div className="mx-auto max-w-400 px-5 sm:px-8 py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
                Anillos
              </p>
              <h2
                id="anillos-titulo"
                className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
              >
                Cómo saber tu talla de anillo
              </h2>
              <p className="mt-4 max-w-[48ch] text-base font-regular leading-relaxed text-muted-foreground">
                La mayoría de mis anillos son abiertos o ajustables, así que
                sirven para varios dedos sin medir nada. Para los cerrados,
                sigue uno de estos dos métodos.
              </p>

              <ol className="mt-10 divide-y divide-border border-y border-border">
                {ringSteps.map((step, index) => (
                  <li key={step.title} className="grid gap-2 py-6 sm:grid-cols-12 sm:gap-6">
                    <span className="text-sm font-medium uppercase tracking-[0.18em] text-gold-deep tabular-nums sm:col-span-2">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="sm:col-span-10">
                      <h3 className="text-lg font-medium">{step.title}</h3>
                      <p className="mt-2 text-sm font-regular leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="min-w-0 lg:col-span-7">
              <div className="overflow-x-auto rounded-xl border border-border bg-white p-6 sm:p-8">
                <table className="w-full min-w-104 border-collapse">
                  <caption className="mb-5 text-left text-lg font-medium">
                    Tabla de tallas de anillo
                  </caption>
                  <thead>
                    <tr className="border-b border-border">
                      <th scope="col" className={cellHead}>
                        Talla (ES)
                      </th>
                      <th scope="col" className={cellHead}>
                        Circunferencia
                      </th>
                      <th scope="col" className={cellHead}>
                        Diámetro
                      </th>
                      <th scope="col" className={cellHead}>
                        Talla US (aprox.)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {ringSizes.map((size) => (
                      <tr key={size.es} className="transition-colors hover:bg-sand">
                        <th scope="row" className={`${cell} font-semibold`}>
                          {size.es}
                        </th>
                        <td className={cell}>{size.circumference} mm</td>
                        <td className={cell}>{size.diameter} mm</td>
                        <td className={`${cell} text-muted-foreground`}>{size.us}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex gap-4 rounded-xl bg-sand p-6">
                <Lightbulb
                  aria-hidden="true"
                  strokeWidth={1.25}
                  className="size-6 shrink-0 text-gold-deep"
                />
                <p className="text-sm font-regular leading-relaxed text-muted-foreground">
                  Mide al final del día y con las manos a temperatura normal.
                  Por la mañana o con frío los dedos están más finos, y la
                  talla que saques te quedará pequeña.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collares */}
      <section aria-labelledby="collares-titulo" className="border-y border-border bg-sand">
        <div className="mx-auto max-w-400 px-5 sm:px-8 py-20 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
              Collares
            </p>
            <h2
              id="collares-titulo"
              className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
            >
              Dónde cae cada largo
            </h2>
            <p className="mt-4 max-w-[44ch] text-base font-regular leading-relaxed text-muted-foreground">
              Casi todos mis collares llevan cadena de extensión de 5 cm, así
              que cada largo cubre un margen. Si quieres comprobarlo, ponte un
              hilo al cuello a la altura que te guste y mídelo.
            </p>
          </div>

          {/* Imagen y lista en la misma fila: la lista se centra respecto a la imagen. */}
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="relative aspect-4/5 overflow-hidden rounded-xl lg:col-span-4">
              <Image
                src="/img/modelos/modelo-collares-capas.webp"
                alt="Modelo con varios collares de oro a distintas alturas"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 45%" }}
              />
            </div>

            <ul className="lg:col-span-8">
              {necklaceLengths.map((item) => (
                <li
                  key={item.length}
                  className="grid gap-3 border-t border-border py-8 sm:grid-cols-12 sm:gap-8 last:border-b"
                >
                  <span className="text-2xl font-semibold tabular-nums sm:col-span-3">
                    {item.length}
                  </span>
                  <div className="sm:col-span-9">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="mt-2 max-w-[60ch] text-base font-regular leading-relaxed text-muted-foreground">
                      {item.where}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pulseras */}
      <section aria-labelledby="pulseras-titulo">
        <div className="mx-auto max-w-400 px-5 sm:px-8 py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
                Pulseras y brazaletes
              </p>
              <h2
                id="pulseras-titulo"
                className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
              >
                Mide la muñeca y suma dos centímetros
              </h2>
              <div className="mt-4 max-w-[48ch] space-y-4 text-base font-regular leading-relaxed text-muted-foreground">
                <p>
                  Rodea la muñeca con un hilo justo por encima del hueso, sin
                  apretar, y mide esa longitud. A esa medida súmale entre uno y
                  dos centímetros según lo suelta que te guste llevarla.
                </p>
                <p>
                  Los brazaletes rígidos no tienen cierre: entran por la parte
                  más estrecha de la muñeca girándolos un poco. Si tu muñeca
                  mide más de 17 cm, escríbeme antes de pedir uno.
                </p>
              </div>
            </div>

            <div className="min-w-0 lg:col-span-7">
              <div className="overflow-x-auto rounded-xl border border-border bg-white p-6 sm:p-8">
                <table className="w-full min-w-[24rem] border-collapse">
                  <caption className="mb-5 text-left text-lg font-medium">
                    Largo de pulsera según muñeca
                  </caption>
                  <thead>
                    <tr className="border-b border-border">
                      <th scope="col" className={cellHead}>
                        Tu muñeca
                      </th>
                      <th scope="col" className={cellHead}>
                        Largo de pulsera
                      </th>
                      <th scope="col" className={cellHead}>
                        Cómo queda
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {braceletFits.map((row) => (
                      <tr key={row.wrist} className="transition-colors hover:bg-sand">
                        <th scope="row" className={`${cell} font-semibold`}>
                          {row.wrist}
                        </th>
                        <td className={cell}>{row.size}</td>
                        <td className={`${cell} text-muted-foreground`}>{row.fit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm font-regular leading-relaxed text-muted-foreground">
                Las pulseras de cadena llevan extensión, así que un largo de 17 cm
                llega hasta unos 19 cm. Las de perlas con cierre corredizo se
                ajustan a cualquier muñeca.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HelpFooterNav current="tallas" />
    </main>
  )
}

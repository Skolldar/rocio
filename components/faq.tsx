"use client"

import { useState } from "react"

type QAItem = {
  question: string
  answer: string
}

const faqs: QAItem[] = [
  {
    question: "¿Cómo elijo unos pendientes que vayan con su estilo personal?",
    answer:
      "Para un look discreto, los pendientes pequeños de botón o los aros finos aportan un acento perfecto al día a día. Si su estilo es más atrevido, las piezas de eslabón crean una impresión llamativa. Para quienes prefieren un aire romántico y atemporal, los pendientes de diamante o las clásicas perlas son una elección excelente. Cada diseño refleja una estética distinta, así que es fácil encontrar el par que mejor complementa su personalidad.",
  },
  {
    question: "¿Cuáles son las mejores joyas de diseño para regalar?",
    answer:
      "Las piezas más acertadas son las versátiles: un colgante delicado, unos pendientes de botón o una pulsera fina que se adaptan a cualquier ocasión. Apuesta por materiales que aguanten el uso diario, como el acero inoxidable color oro o color plata, que no se oscurece ni pierde el color con los años.",
  },
  {
    question: "¿Qué estilos de joyería son tendencia en 2026?",
    answer:
      "Este año destacan las piezas escultóricas de líneas limpias, los acabados en oro mate y la combinación de varias cadenas a distintas alturas. Las perlas reinterpretadas con un aire contemporáneo y las gemas de color en tonos cálidos también ocupan un lugar protagonista.",
  },
  {
    question: "¿Es una buena idea regalar joyas a alguien que no suele llevarlas?",
    answer:
      "Sin duda. La clave está en elegir algo sutil y cómodo: una cadena fina, unos pendientes pequeños o una pulsera ligera que se pueda llevar a diario sin esfuerzo. Una pieza sencilla y bien hecha suele convertirse en la favorita incluso de quien apenas usa joyas.",
  },
  {
    question: "¿Qué cuidados necesita una joya para mantener su brillo?",
    answer:
      "Guárdala en su estuche, separada de otras piezas para evitar roces, y límpiala con un paño suave tras cada uso. Evita el contacto con perfumes, cremas y productos de limpieza. Con estos pequeños gestos, tu joya conservará su brillo original durante años.",
  },
  {
    question: "¿Qué estilos de joyería son un regalo atemporal para mujer?",
    answer:
      "Los clásicos nunca fallan: unos pendientes de diamante o de perla, un colgante solitario o una pulsera de eslabones. Son piezas que trascienden modas y se transmiten de generación en generación, manteniendo intacto su valor sentimental y estético.",
  },
]

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-5 w-5 flex-none text-muted-foreground transition-transform duration-300 ease-out ${
        open ? "-rotate-180" : "rotate-0"
      }`}
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
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      aria-labelledby="faq-titulo"
      className="w-full border-t border-border bg-background"
    >
      <h2 id="faq-titulo" className="sr-only">
        Preguntas frecuentes
      </h2>

      <div className="mx-auto max-w-400 px-5 sm:px-8 py-20 sm:py-24 lg:py-28">
        <ul className="mx-auto max-w-7xl">
          {faqs.map((item, index) => {
            const open = openIndex === index
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <li key={item.question} className="border-b border-border first:border-t">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 py-7 text-left transition-colors hover:text-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    <span className="text-lg font-normal leading-snug tracking-[0.01em] text-foreground sm:text-xl">
                      {item.question}
                    </span>
                    <ChevronDown open={open} />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-7xl pb-8 text-base text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

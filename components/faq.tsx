"use client"

import { useState } from "react"

import { faqs } from "@/lib/faq"

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

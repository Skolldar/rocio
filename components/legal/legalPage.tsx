import type { ReactNode } from "react"
import Link from "next/link"

import { LEGAL, type LegalPageKey, legalPages } from "@/components/legal/legalData"

export type LegalSection = {
  id: string
  title: string
  content: ReactNode
}

type LegalPageProps = {
  current: LegalPageKey
  title: string
  intro: string
  sections: LegalSection[]
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-background"

// Plantilla sencilla para los textos legales: una sola columna de lectura,
// sin cabecera visual ni imágenes.
export default function LegalPage({ current, title, intro, sections }: LegalPageProps) {
  const titleId = `${current}-titulo`
  const others = legalPages.filter((page) => page.key !== current)

  return (
    <main className="w-full bg-background text-foreground">
      <article
        aria-labelledby={titleId}
        className="mx-auto max-w-3xl px-5 sm:px-8 pb-20 pt-28 sm:pb-24 sm:pt-32"
      >
        <header className="border-b border-border pb-8">
          <h1 id={titleId} className="text-3xl font-semibold text-balance sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-[60ch] text-lg font-regular leading-relaxed text-muted-foreground">
            {intro}
          </p>
          <p className="mt-8 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Última actualización: {LEGAL.lastUpdated}
          </p>
        </header>

        <div className="mt-12 space-y-12">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-titulo`}
              className="scroll-mt-28"
            >
              <h2 id={`${section.id}-titulo`} className="text-xl font-semibold sm:text-2xl">
                {section.title}
              </h2>
              <div className="mt-3 space-y-4 text-base font-regular leading-relaxed text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-gold-deep [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-16 border-t border-border pt-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Otros textos legales
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {others.map((page) => (
              <li key={page.key}>
                <Link
                  href={page.href}
                  className={`rounded-sm text-sm font-regular text-foreground underline underline-offset-4 transition-colors hover:text-gold-deep ${focusRing}`}
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      </article>
    </main>
  )
}

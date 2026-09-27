import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { INSTAGRAM_URL } from "@/components/socialIcons"

export type HelpPage = "envios" | "tallas" | "cuidado"

const pages: { key: HelpPage; label: string; href: string; hint: string }[] = [
  {
    key: "envios",
    label: "Envíos y entrega",
    href: "/envios-y-entrega",
    hint: "Envío a domicilio o entrega en mano sin coste.",
  },
  {
    key: "tallas",
    label: "Guía de tallas",
    href: "/guia-de-tallas",
    hint: "Cómo medir tu dedo, tu muñeca y elegir el largo del collar.",
  },
  {
    key: "cuidado",
    label: "Cuidado de tus joyas",
    href: "/cuidado-de-tus-joyas",
    hint: "Limpieza, guardado y lo que conviene evitar.",
  },
]

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-background"

// Bloque final de las páginas de ayuda: enlaza a las otras dos guías y
// ofrece un contacto directo para lo que no quede resuelto.
export default function HelpFooterNav({ current }: { current: HelpPage }) {
  const others = pages.filter((page) => page.key !== current)

  return (
    <section
      aria-labelledby="ayuda-mas-titulo"
      className="border-t border-border bg-background"
    >
      <div className="mx-auto max-w-400 px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
              ¿Te queda alguna duda?
            </p>
            <h2
              id="ayuda-mas-titulo"
              className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
            >
              Escríbeme y te contesto yo
            </h2>
            <p className="mt-4 max-w-[48ch] text-base font-regular leading-relaxed text-muted-foreground">
              Si algo no queda claro en esta guía, mándame un mensaje por
              Instagram. Suelo responder el mismo día, de lunes a sábado.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-gold px-6 text-sm font-medium uppercase tracking-[0.14em] text-gold-ink transition-colors hover:bg-gold-deep ${focusRing}`}
            >
              Escribirme por Instagram
              <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="size-4" />
            </a>
          </div>

          <nav aria-label="Otras guías" className="lg:col-span-7">
            <ul className="divide-y divide-border border-y border-border">
              {others.map((page) => (
                <li key={page.key}>
                  <Link
                    href={page.href}
                    className={`group flex cursor-pointer items-center justify-between gap-6 rounded-sm py-6 transition-colors hover:text-gold-deep ${focusRing}`}
                  >
                    <span>
                      <span className="block text-lg font-medium sm:text-xl">
                        {page.label}
                      </span>
                      <span className="mt-1 block text-sm font-regular text-muted-foreground">
                        {page.hint}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-gold-deep"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  )
}

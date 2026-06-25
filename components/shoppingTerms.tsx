// Condiciones de compra — a minimal, editorial trust strip for the Luxgirl
// home page (modelled on high-end jewelry footers like Damiani's service row).
// Static server component: three centered text columns — a muted label, one
// line of copy, and an optional underlined link — framed by a hairline rule.
// No icons, no boxes. Brand font: Elms Sans.

import Link from "next/link"

type TermBlock = {
  title: string
  description: string
  cta?: {
    label: string
    href: string
  }
}

const blocks: TermBlock[] = [
  {
    title: "Entrega cuidada",
    description:
      "Cada pieza viaja protegida en su estuche de firma, lista para regalar.",
  },
  {
    title: "Métodos de pago",
    description: "Paga con Bizum, en efectivo o por transferencia.",
  },
  {
    title: "Atención personalizada",
    description:
      "Te acompañamos de lunes a sábado, en horario comercial.",
  },
]

export default function ShoppingTerms() {
  return (
    <section
      aria-labelledby="condiciones-compra-titulo"
      className="w-full border-t border-border bg-background font-[Elms_Sans,system-ui,sans-serif]"
    >
      <h2 id="condiciones-compra-titulo" className="sr-only">
        Condiciones de compra
      </h2>

      <div className="mx-auto max-w-400 px-8 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-x-10 gap-y-14 md:grid-cols-3">
          {blocks.map((block) => (
            <div
              key={block.title}
              className="mx-auto flex max-w-xs flex-col items-center text-center"
            >
              <h3 className="text-base font-medium tracking-[0.01em] text-muted-foreground">
                {block.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-foreground">
                {block.description}
              </p>
              {block.cta && (
                <Link
                  href={block.cta.href}
                  className="mt-3 inline-block text-sm text-foreground underline decoration-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b88a2e] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {block.cta.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

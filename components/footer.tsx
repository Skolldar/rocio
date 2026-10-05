
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import {
  type BrandIcon,
  INSTAGRAM_URL,
  InstagramIcon,
} from "@/components/socialIcons"

type FooterLink = { label: string; href: string }
type FooterColumn = { title: string; links: FooterLink[] }
type SocialLink = { label: string; href: string; icon: BrandIcon }

const columns: FooterColumn[] = [
  {
    title: "Joyería",
    links: [
      { label: "Anillos", href: "/products?categoria=anillos" },
      { label: "Collares", href: "/products?categoria=collares" },
      { label: "Pendientes", href: "/products?categoria=pendientes" },
      { label: "Pulseras", href: "/products?categoria=pulseras" },
      { label: "Edición Limitada", href: "/products/edicion-limitada" },
    ],
  },
  {
    title: "Colecciones",
    links: [
      { label: "Novedades", href: "/products/novedades" },
      { label: "Más Vendidos", href: "/products/mas-vendidos" },
      { label: "Para Regalo", href: "/products/para-regalo" },
      { label: "Guía de Regalos", href: "/regalos" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Sobre mí", href: "/sobre-nosotras" },
      { label: "Envíos y entrega", href: "/envios-y-entrega" },
      { label: "Guía de tallas", href: "/guia-de-tallas" },
      { label: "Cuidado de tus joyas", href: "/cuidado-de-tus-joyas" },
      { label: "Contacto", href: "/#contacto" },
    ],
  },
]

const socials: SocialLink[] = [
  { label: "Instagram", href: INSTAGRAM_URL, icon: InstagramIcon },
]

const legal: FooterLink[] = [
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Privacidad", href: "/privacidad" },
  { label: "Cookies", href: "/cookies" },
  { label: "Términos", href: "/terminos" },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      aria-labelledby="footer-titulo"
      className="w-full bg-stone-950 text-stone-50"
    >
      <h2 id="footer-titulo" className="sr-only">
        Pie de página
      </h2>

      <div className="mx-auto max-w-400 px-5 sm:px-8 py-16 lg:py-20">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between lg:pb-16">
          <div className="max-w-5xl">
            <p className="text-xs font-medium uppercase tracking-wide text-gold-bright">
              @_.luxgirl._
            </p>
            <h3 className="mt-3 text-4xl font-semibold leading-[1.05]  text-stone-50">
              Síguenos para estar al tanto de todo
            </h3>
            <p className="mt-3 max-w-xl text-sm font-regular leading-relaxed text-stone-300">
              Las piezas nuevas y las ediciones limitadas salen antes en Instagram. Si
              algo te gusta, pídelo por mensaje directo.
            </p>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Seguir a Luxgirl en Instagram (@_.luxgirl._), se abre en una pestaña nueva"
            className="group inline-flex h-12 w-full max-w-md shrink-0 cursor-pointer items-center justify-between gap-3 rounded-full bg-gold-bright pl-5 pr-2 text-stone-950 transition-colors duration-200 hover:bg-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 sm:w-auto"
          >
            <span className="inline-flex items-center gap-2.5">
              <InstagramIcon className="size-4.5" />
              <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                Seguir en Instagram
              </span>
            </span>
            <span className="grid size-8 place-items-center rounded-full bg-stone-950 text-gold-bright transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-0">
              <ArrowUpRight className="size-4" />
            </span>
          </a>
        </div>

        {/* Main grid — brand + link columns */}
        <div className="grid grid-cols-2 gap-10 py-12 sm:grid-cols-3 lg:grid-cols-[1.5fr_repeat(3,1fr)] lg:gap-12 lg:py-16">
          {/* Brand block */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link
              href="/"
              className="inline-block rounded-sm text-3xl font-semibold uppercase tracking-[0.22em] text-stone-50 transition-colors hover:text-gold-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
            >
              Lux<span className="text-gold-bright">girl</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm font-regular leading-relaxed text-stone-400">
              Joyería contemporánea en acero inoxidable color oro y color plata, para
              marcar los momentos que más importan.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {socials.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid size-10 cursor-pointer place-items-center rounded-full border border-white/15 text-stone-300 transition-colors hover:border-gold-bright hover:text-gold-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
                  >
                    <Icon className="size-4.5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-gold-bright">
                {column.title}
              </p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      className="rounded-sm text-sm font-regular text-stone-300 transition-colors hover:text-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-xs font-regular text-stone-400 sm:text-left">
            © {year} Luxgirl. Todos los derechos reservados.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-start">
            {legal.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  prefetch={false}
                  className="rounded-sm text-xs font-regular text-stone-400 transition-colors hover:text-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

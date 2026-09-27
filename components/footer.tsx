
import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"

import {
  type BrandIcon,
  FacebookIcon,
  INSTAGRAM_URL,
  InstagramIcon,
  YoutubeIcon,
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
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "YouTube", href: "https://youtube.com", icon: YoutubeIcon },
]

const legal: FooterLink[] = [
  { label: "Aviso legal", href: "/" },
  { label: "Privacidad", href: "/" },
  { label: "Cookies", href: "/" },
  { label: "Términos", href: "/" },
]

export default function Footer() {
  const year = 2026

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
          <div className="max-w-xl">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.32em] text-gold-bright">
              Lista Luxgirl
            </p>
            <h3 className="mt-3 text-[clamp(1.875rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-tight text-stone-50">
              Únete y recibe lo nuevo primero
            </h3>
            <p className="mt-3 max-w-md text-sm font-regular leading-relaxed text-stone-300">
              Lanzamientos, ediciones limitadas y un 10&nbsp;% en tu primera compra.
            </p>
          </div>

          <form
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            // Static scaffold — wire to a real subscribe action when available.
            action="/"
          >
            <label htmlFor="footer-email" className="sr-only">
              Correo electrónico
            </label>
            <div className="relative flex-1">
              <Mail
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-stone-400"
                strokeWidth={1.75}
              />
              <input
                id="footer-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="tu@correo.com"
                className="h-12 w-full rounded-full border border-white/15 bg-white/5 pl-11 pr-4 text-sm text-stone-50 placeholder:text-stone-400 transition-colors focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/40"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-gold-bright px-6 text-xs font-semibold uppercase tracking-[0.16em] text-stone-950 transition-colors hover:bg-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
            >
              Suscribirme
              <ArrowUpRight className="size-4" />
            </button>
          </form>
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
              Joyería contemporánea en acero inoxidable con baño de oro o plata, para
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
          <p className="text-xs font-regular text-stone-400">
            © {year} Luxgirl. Todos los derechos reservados.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legal.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
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

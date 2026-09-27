
import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"

type BrandIcon = (props: { className?: string }) => React.ReactElement

const InstagramIcon: BrandIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const FacebookIcon: BrandIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
  </svg>
)

const YoutubeIcon: BrandIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

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
      { label: "Más Vendidos", href: "/products?coleccion=mas-vendidos" },
      { label: "Para Regalo", href: "/products?coleccion=regalo" },
      { label: "Atelier de Oro", href: "/products" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Envíos y entregas", href: "/" },
      { label: "Devoluciones", href: "/" },
      { label: "Guía de tallas", href: "/" },
      { label: "Cuidado de tus joyas", href: "/" },
      { label: "Contacto", href: "/" },
    ],
  },
]

const socials: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
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

      <div className="mx-auto max-w-400 px-8 py-16 lg:py-20">
        {/* Newsletter — the wide opening band */}
        <div className="flex flex-col gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between lg:pb-16">
          <div className="max-w-xl">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.32em] text-gold-bright">
              Lista Luxgirl
            </p>
            <h3 className="mt-3 text-[clamp(1.875rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-tight text-stone-50">
              Únete y recibe lo nuevo primero
            </h3>
            <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-stone-300">
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
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-stone-400">
              Joyería contemporánea hecha a mano en oro de 18 quilates, para
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
                      className="rounded-sm text-sm font-light text-stone-300 transition-colors hover:text-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
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
          <p className="text-xs font-light text-stone-400">
            © {year} Luxgirl. Todos los derechos reservados.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legal.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="rounded-sm text-xs font-light text-stone-400 transition-colors hover:text-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright"
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

import { ArrowUpRight, Clock, Mail, Phone } from "lucide-react"

import {
  type BrandIcon,
  FacebookIcon,
  INSTAGRAM_URL,
  InstagramIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@/components/socialIcons"
import { EMAIL, PHONE_DISPLAY, PHONE_HREF, whatsappUrl } from "@/lib/contact"

type Channel = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  label: string
  value: string
  description: string
  href: string
  external?: boolean
}

const channels: Channel[] = [
  {
    icon: WhatsappIcon,
    label: "WhatsApp",
    value: PHONE_DISPLAY,
    description: "La forma más rápida: escríbenos y te respondemos en pocas horas.",
    href: whatsappUrl("¡Hola Luxgirl! Tengo una consulta sobre una joya."),
    external: true,
  },
  {
    icon: Phone,
    label: "Llámanos",
    value: PHONE_DISPLAY,
    description: "¿Prefieres hablar? Te asesoramos por teléfono sobre tallas, regalos y pedidos.",
    href: PHONE_HREF,
  },
  {
    icon: Mail,
    label: "Correo electrónico",
    value: EMAIL,
    description: "Para consultas detalladas, cambios o pedidos personalizados.",
    href: `mailto:${EMAIL}`,
  },
]

type Social = { label: string; handle: string; href: string; icon: BrandIcon }

const socials: Social[] = [
  { label: "Instagram", handle: "@_.luxgirl._", href: INSTAGRAM_URL, icon: InstagramIcon },
  { label: "Facebook", handle: "Luxgirl", href: "https://facebook.com", icon: FacebookIcon },
  { label: "YouTube", handle: "Luxgirl", href: "https://youtube.com", icon: YoutubeIcon },
]

export default function Contact() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="w-full scroll-mt-24 border-t border-border bg-sand"
    >
      <div className="mx-auto max-w-400 px-5 sm:px-8 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          {/* Intro */}
          <div className="flex flex-col">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.32em] text-gold-deep">
              Contacto
            </p>
            <h2
              id="contacto-titulo"
              className="mt-3 text-[clamp(1.875rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-tight text-foreground"
            >
              ¿Tu pregunta no está en la lista?
            </h2>
            <p className="mt-5 max-w-md text-base font-regular leading-relaxed text-muted-foreground">
              Estamos aquí para ayudarte a elegir la pieza perfecta, resolver dudas sobre tu
              pedido o preparar un regalo especial. Escríbenos por el canal que prefieras y te
              atenderemos de forma cercana y personal.
            </p>

            <p className="mt-8 inline-flex items-center gap-2.5 text-sm font-regular text-foreground">
              <Clock aria-hidden="true" strokeWidth={1.5} className="size-4.5 text-gold-deep" />
              Lunes a sábado · 10:00 – 20:00
            </p>

            {/* Social media */}
            <div className="mt-10 pt-8 lg:mt-auto">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Síguenos
              </p>
              <p className="mt-2 max-w-sm text-sm font-regular leading-relaxed text-foreground">
                Novedades, looks y piezas en primicia cada semana.
              </p>
              <ul className="mt-5 flex flex-wrap items-center gap-3">
                {socials.map((social) => {
                  const Icon = social.icon
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${social.label} (${social.handle}), se abre en una pestaña nueva`}
                        className="group inline-flex h-11 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-background pl-3.5 pr-4.5 text-sm text-foreground transition-colors duration-200 hover:border-gold-deep hover:text-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
                      >
                        <Icon className="size-4.5" />
                        {social.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* Direct channels */}
          <ul className="flex flex-col">
            {channels.map((channel) => {
              const Icon = channel.icon
              return (
                <li key={channel.label} className="border-b border-border first:border-t">
                  <a
                    href={channel.href}
                    {...(channel.external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="group flex cursor-pointer items-start gap-5 py-7 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-4 focus-visible:ring-offset-sand sm:items-center sm:gap-7 sm:py-8"
                  >
                    <span className="grid size-12 flex-none place-items-center rounded-full border border-border bg-background text-foreground transition-colors duration-200 group-hover:border-gold-deep group-hover:bg-gold-deep group-hover:text-background">
                      <Icon strokeWidth={1.5} className="size-5" />
                    </span>

                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                        {channel.label}
                      </span>
                      <span className="wrap-break-word text-lg font-normal leading-snug tracking-[0.01em] text-foreground transition-colors duration-200 group-hover:text-gold-deep sm:text-xl">
                        {channel.value}
                      </span>
                      <span className="text-sm font-regular leading-relaxed text-muted-foreground">
                        {channel.description}
                      </span>
                    </span>

                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="mt-1 size-5 flex-none text-muted-foreground transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-deep motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0 sm:mt-0"
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

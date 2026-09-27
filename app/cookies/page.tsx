import type { Metadata } from "next"

import LegalPage, { type LegalSection } from "@/components/legal/legalPage"
import { EMAIL } from "@/lib/contact"

export const metadata: Metadata = {
  title: "Cookies · Luxgirl",
  description: "Esta web no usa cookies de seguimiento. Aquí te cuento qué sí usa.",
}

const sections: LegalSection[] = [
  {
    id: "que-son",
    title: "Qué son",
    content: (
      <p>
        Las cookies son pequeños archivos que una web guarda en tu navegador. Sirven para
        que la página funcione, recuerde tus preferencias o, en muchas webs, para saber
        qué haces en ella.
      </p>
    ),
  },
  {
    id: "esta-web",
    title: "Qué usa esta web",
    content: (
      <>
        <p>
          Casi nada. Solo las cookies técnicas que necesita la web para cargar y moverte
          entre páginas. No uso Google Analytics ni ninguna herramienta de publicidad, y
          por eso no verás ningún aviso de cookies al entrar.
        </p>
        <p>
          Si algún día añado algo de medición, actualizaré esta página y te pediré
          permiso antes.
        </p>
      </>
    ),
  },
  {
    id: "terceros",
    title: "Redes sociales",
    content: (
      <p>
        Los enlaces y vídeos de Instagram, Facebook, YouTube o WhatsApp pueden dejar
        cookies suyas cuando pinchas en ellos. Eso ya depende de cada plataforma y de la
        configuración de tu cuenta.
      </p>
    ),
  },
  {
    id: "borrar",
    title: "Cómo borrarlas",
    content: (
      <p>
        Desde los ajustes de tu navegador puedes ver, bloquear o borrar las cookies de
        cualquier web, esta incluida. Si te queda alguna duda, escríbeme a{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    ),
  },
]

export default function CookiesPage() {
  return (
    <LegalPage
      current="cookies"
      title="Cookies"
      intro="Esta web usa solo las cookies imprescindibles para funcionar. Nada de seguimiento ni publicidad."
      sections={sections}
    />
  )
}

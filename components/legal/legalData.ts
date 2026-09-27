// Datos del titular que aparecen en los textos legales.
// TODO: completar con los datos reales antes de publicar.
export const LEGAL = {
  brand: "Luxgirl",
  ownerName: "[Nombre y apellidos de la titular]",
  nif: "[NIF]",
  address: "[Dirección postal completa]",
  email: "anneryssuarez@gmail.com",
  phone: "+34 610 919 305",
  domain: "luxgirl.es",
  lastUpdated: "27 de septiembre de 2026",
} as const

export type LegalPageKey = "aviso-legal" | "privacidad" | "cookies" | "terminos"

export const legalPages: { key: LegalPageKey; label: string; href: string }[] = [
  {
    key: "aviso-legal",
    label: "Aviso legal",
    href: "/aviso-legal",
  },
  {
    key: "privacidad",
    label: "Política de privacidad",
    href: "/privacidad",
  },
  {
    key: "cookies",
    label: "Política de cookies",
    href: "/cookies",
  },
  {
    key: "terminos",
    label: "Términos y condiciones",
    href: "/terminos",
  },
]

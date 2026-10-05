// Dirección pública de la web. Se usa para las URLs absolutas del sitemap,
// robots.txt, llms.txt, Open Graph y los datos estructurados.
// NEXT_PUBLIC_SITE_URL permite cambiarla (p. ej. en una preview).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://luxgirl.store").replace(
  /\/$/,
  "",
)

export const SITE_NAME = "Luxgirl"

export const SITE_DESCRIPTION =
  "Luxgirl es una pequeña tienda online de joyería en España: anillos, collares, pendientes, pulseras y brazaletes asequibles en acero inoxidable color oro y color plata, que no se oxidan ni dan alergia y llegan listos para regalar."

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`

// Páginas públicas que no salen del catálogo, en orden de importancia.
export const INFO_PAGES = [
  { path: "/regalos", title: "Regalos" },
  { path: "/sobre-nosotras", title: "Sobre mí" },
  { path: "/guia-de-tallas", title: "Guía de tallas" },
  { path: "/cuidado-de-tus-joyas", title: "Cuidado de tus joyas" },
  { path: "/envios-y-entrega", title: "Envíos y entrega" },
  { path: "/terminos", title: "Términos y condiciones" },
  { path: "/privacidad", title: "Privacidad" },
  { path: "/cookies", title: "Cookies" },
  { path: "/aviso-legal", title: "Aviso legal" },
]

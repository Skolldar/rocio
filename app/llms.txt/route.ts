import { formatPrice, getCategories, getCollections } from "@/lib/catalog"
import { absoluteUrl, INFO_PAGES, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site"
import { EMAIL, PHONE_DISPLAY } from "@/lib/contact"
import { INSTAGRAM_URL } from "@/components/socialIcons"

// Resumen de la tienda en Markdown para asistentes de IA (estándar llms.txt).
export const dynamic = "force-static"

export function GET() {
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "Luxgirl es una tienda online pequeña en España, llevada por una sola persona, de joyería de acero inoxidable con acabado color oro y color plata. El acero no se oxida ni da alergia, las piezas aguantan el uso diario y se entregan en el estuche de firma Luxgirl, listas para regalar. Los pedidos se confirman por WhatsApp.",
    "",
    "## Categorías",
    "",
    ...getCategories().map(
      (c) => `- [${c.title}](${absoluteUrl(`/products/${c.slug}`)}): ${c.description}`,
    ),
    "",
    "## Colecciones",
    "",
    ...getCollections().map(
      (c) => `- [${c.title}](${absoluteUrl(`/products/${c.slug}`)}): ${c.description}`,
    ),
    "",
    ...getCategories().flatMap((c) => [
      `## ${c.title}`,
      "",
      ...c.products.map((p) => {
        const notes = [
          formatPrice(p.price),
          p.material === "oro" ? "color oro" : "color plata",
          p.badge,
          p.soldOut ? "agotado" : undefined,
        ].filter(Boolean)
        return `- [${p.name}](${absoluteUrl(`/products/${c.slug}/${p.slug}`)}) (${notes.join(", ")}): ${p.description}`
      }),
      "",
    ]),
    "## Información",
    "",
    ...INFO_PAGES.map((page) => `- [${page.title}](${absoluteUrl(page.path)})`),
    "",
    "## Contacto",
    "",
    `- Email: ${EMAIL}`,
    `- Teléfono / WhatsApp: ${PHONE_DISPLAY}`,
    `- Instagram: ${INSTAGRAM_URL}`,
    "",
  ]

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}

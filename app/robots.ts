import type { MetadataRoute } from "next"

import { absoluteUrl, SITE_URL } from "@/lib/site"

// Rutas sin valor para buscadores: el carrito y las páginas aún sin contenido.
const PRIVATE_PATHS = ["/order", "/products/new", "/api/"]

// Rastreadores de buscadores y asistentes de IA a los que damos acceso
// explícito, para que la tienda aparezca en sus resultados y respuestas.
const AI_AND_SEARCH_BOTS = [
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "DuckDuckBot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Meta-ExternalAgent",
  "MistralAI-User",
  "CCBot",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: AI_AND_SEARCH_BOTS, allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  }
}

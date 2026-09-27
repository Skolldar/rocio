// Catálogo estático de la tienda. Cada categoría alimenta la plantilla
// reutilizable de `components/catalog/categoryPage.tsx` a través de la ruta
// `app/products/[categoria]`. Para publicar una categoría nueva basta con
// añadir una entrada a `categories` — no hace falta tocar la UI.
// Cuando exista el modelo Prisma, sustituir estas funciones por consultas.

export type Material = "oro" | "plata"

export type Product = {
  slug: string
  name: string
  description: string
  price: number
  material: Material
  image: string
  badge?: "Nuevo" | "Más vendido" | "Edición limitada"
  /** Orden de llegada: cuanto mayor, más reciente. */
  addedAt: number
}

export type Category = {
  slug: string
  title: string
  eyebrow: string
  description: string
  heroImage: string
  products: Product[]
}

export const materialLabels: Record<Material, string> = {
  oro: "Baño de oro",
  plata: "Plata",
}

export const sortOptions = [
  { value: "destacados", label: "Destacados" },
  { value: "novedades", label: "Novedades" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
] as const

export type SortValue = (typeof sortOptions)[number]["value"]

const categories: Category[] = [
  {
    slug: "anillos",
    title: "Anillos",
    eyebrow: "Joyería",
    description:
      "Corazones, perlas y destellos pensados para llevar solos o apilados. Ajustables y listos para regalar.",
    heroImage: "/img/anillo-lifestyle-3.webp",
    products: [
      {
        slug: "ola-dorada",
        name: "Ola Dorada",
        description: "Anillo abierto con curva ondulada y circonita.",
        price: 34,
        material: "oro",
        image: "/img/anillos/anillo-ola-dorada.webp",
        badge: "Más vendido",
        addedAt: 3,
      },
      {
        slug: "corazon-fino",
        name: "Corazón Fino",
        description: "Aro delicado rematado con un pequeño corazón.",
        price: 29,
        material: "oro",
        image: "/img/anillos/anillo-corazon-fino.webp",
        addedAt: 5,
      },
      {
        slug: "corazon",
        name: "Corazón",
        description: "Un corazón liso y pulido que abraza el dedo.",
        price: 32,
        material: "oro",
        image: "/img/anillos/anillo-corazon.webp",
        badge: "Nuevo",
        addedAt: 8,
      },
      {
        slug: "duo-corazon",
        name: "Dúo Corazón",
        description: "Pareja de corazones calados en oro y plata.",
        price: 45,
        material: "plata",
        image: "/img/anillos/anillo-duo-corazon.webp",
        addedAt: 4,
      },
      {
        slug: "destello",
        name: "Destello",
        description: "Banda fina con piedra central talla brillante.",
        price: 36,
        material: "oro",
        image: "/img/anillos/anillo-destello.webp",
        addedAt: 2,
      },
      {
        slug: "trio-apilable",
        name: "Trío Apilable",
        description: "Tres aros entrelazados para un look superpuesto.",
        price: 42,
        material: "oro",
        image: "/img/anillos/anillo-trio-apilable.jpeg",
        badge: "Más vendido",
        addedAt: 1,
      },
      {
        slug: "flor-de-perla",
        name: "Flor de Perla",
        description: "Flor esmaltada en blanco con perla en el centro.",
        price: 39,
        material: "oro",
        image: "/img/anillos/anillo-flor-de-perla.jpeg",
        badge: "Edición limitada",
        addedAt: 7,
      },
      {
        slug: "perla-clasica",
        name: "Perla Clásica",
        description: "Perla cultivada sobre una banda dorada.",
        price: 38,
        material: "oro",
        image: "/img/anillos/anillo-perla-clasica.jpeg",
        badge: "Nuevo",
        addedAt: 6,
      },
    ],
  },
  {
    slug: "collares",
    title: "Collares",
    eyebrow: "Joyería",
    description:
      "Gargantillas rígidas, perlas y tréboles de nácar que enmarcan el escote. Para llevar solos o en capas.",
    heroImage: "/img/collar-lifestyle-1.jpg",
    products: [
      {
        slug: "medalla-grabada",
        name: "Medalla Grabada",
        description: "Medalla rectangular en relieve sobre cadena fina.",
        price: 42,
        material: "oro",
        image: "/img/collares/collar-medalla-grabada.webp",
        addedAt: 3,
      },
      {
        slug: "trebol-de-nacar",
        name: "Trébol de Nácar",
        description: "Trébol de nácar sobre una cadena de plata.",
        price: 36,
        material: "plata",
        image: "/img/collares/collar-trebol-de-nacar.webp",
        badge: "Más vendido",
        addedAt: 9,
      },
      {
        slug: "gardenia",
        name: "Gardenia",
        description: "Gargantilla rígida con flor blanca de resina.",
        price: 58,
        material: "oro",
        image: "/img/collares/collar-gardenia.webp",
        badge: "Edición limitada",
        addedAt: 14,
      },
      {
        slug: "dalia",
        name: "Dalia",
        description: "Gargantilla rígida con flor nacarada.",
        price: 62,
        material: "oro",
        image: "/img/collares/collar-dalia.webp",
        addedAt: 12,
      },
      {
        slug: "trebol-calado",
        name: "Trébol Calado",
        description: "Trébol calado con circonita en cadena fina.",
        price: 39,
        material: "oro",
        image: "/img/collares/collar-trebol-calado.webp",
        addedAt: 5,
      },
      {
        slug: "cascada-de-treboles",
        name: "Cascada de Tréboles",
        description: "Cadena larga salpicada de tréboles de nácar.",
        price: 55,
        material: "plata",
        image: "/img/collares/collar-cascada-de-treboles.webp",
        addedAt: 7,
      },
      {
        slug: "petalos",
        name: "Pétalos",
        description: "Cadena de eslabones con pétalos dorados.",
        price: 49,
        material: "oro",
        image: "/img/collares/collar-petalos.webp",
        addedAt: 4,
      },
      {
        slug: "doble-corazon",
        name: "Doble Corazón",
        description: "Dos cadenas con corazones esmaltados.",
        price: 46,
        material: "oro",
        image: "/img/collares/collar-doble-corazon.webp",
        badge: "Nuevo",
        addedAt: 15,
      },
      {
        slug: "cristal",
        name: "Cristal",
        description: "Doble hilo transparente con gota colgante.",
        price: 29,
        material: "plata",
        image: "/img/collares/collar-cristal.webp",
        addedAt: 2,
      },
      {
        slug: "perla-barroca",
        name: "Perla Barroca",
        description: "Perla barroca en cadena ajustable tipo lazo.",
        price: 44,
        material: "oro",
        image: "/img/collares/collar-perla-barroca.webp",
        addedAt: 8,
      },
      {
        slug: "perla-y-corazon",
        name: "Perla y Corazón",
        description: "Dos vueltas: hilo de perlas y corazón dorado.",
        price: 52,
        material: "oro",
        image: "/img/collares/collar-perla-y-corazon.webp",
        badge: "Más vendido",
        addedAt: 10,
      },
      {
        slug: "trebol-clasico",
        name: "Trébol Clásico",
        description: "Trébol de nácar sobre cadena dorada.",
        price: 38,
        material: "oro",
        image: "/img/collares/collar-trebol-clasico.webp",
        addedAt: 6,
      },
      {
        slug: "corazon-filigrana",
        name: "Corazón Filigrana",
        description: "Colgante de corazón con filigrana.",
        price: 41,
        material: "oro",
        image: "/img/collares/collar-corazon-filigrana.webp",
        addedAt: 1,
      },
      {
        slug: "lazo-de-perla",
        name: "Lazo de Perla",
        description: "Cadena serpiente rematada con una perla.",
        price: 45,
        material: "oro",
        image: "/img/collares/collar-lazo-de-perla.jpeg",
        badge: "Nuevo",
        addedAt: 16,
      },
      {
        slug: "lirio",
        name: "Lirio",
        description: "Gargantilla rígida con flor de lirio.",
        price: 54,
        material: "oro",
        image: "/img/collares/collar-lirio.jpg",
        addedAt: 11,
      },
      {
        slug: "constelacion",
        name: "Constelación",
        description: "Gargantilla de circonitas engastadas.",
        price: 69,
        material: "oro",
        image: "/img/collares/collar-constelacion.jpg",
        badge: "Edición limitada",
        addedAt: 13,
      },
    ],
  },
  {
    slug: "pendientes",
    title: "Pendientes",
    eyebrow: "Joyería",
    description:
      "Desde botones mínimos hasta aros con cristal: piezas ligeras para el día a día o para brillar de noche.",
    heroImage: "/img/aretes-lifestyle-1.jpg",
    products: [
      {
        slug: "cono-de-cristal",
        name: "Cono de Cristal",
        description: "Ganchos con cono dorado y cuarzo facetado.",
        price: 29,
        material: "oro",
        image: "/img/pendientes/aretes-cono-de-cristal.webp",
        addedAt: 3,
      },
      {
        slug: "gota-dorada",
        name: "Gota Dorada",
        description: "Gota maxi con acabado espejo.",
        price: 32,
        material: "oro",
        image: "/img/pendientes/aretes-gota-dorada.webp",
        badge: "Más vendido",
        addedAt: 9,
      },
      {
        slug: "aro-medallon",
        name: "Aro Medallón",
        description: "Aro con medallón de nácar.",
        price: 34,
        material: "oro",
        image: "/img/pendientes/aretes-aro-medallon.webp",
        addedAt: 6,
      },
      {
        slug: "aro-cuarzo",
        name: "Aro Cuarzo",
        description: "Aro con cristal facetado colgante.",
        price: 33,
        material: "oro",
        image: "/img/pendientes/aretes-aro-cuarzo.webp",
        addedAt: 5,
      },
      {
        slug: "corazon-mini",
        name: "Corazón Mini",
        description: "Botón de corazón con circonita.",
        price: 19,
        material: "oro",
        image: "/img/pendientes/aretes-corazon-mini.webp",
        addedAt: 11,
      },
      {
        slug: "colibri",
        name: "Colibrí",
        description: "Botón en forma de colibrí.",
        price: 21,
        material: "oro",
        image: "/img/pendientes/aretes-colibri.webp",
        badge: "Nuevo",
        addedAt: 14,
      },
      {
        slug: "trebol-de-nacar",
        name: "Trébol de Nácar",
        description: "Botón de trébol con nácar blanco.",
        price: 24,
        material: "oro",
        image: "/img/pendientes/aretes-trebol-de-nacar.webp",
        badge: "Más vendido",
        addedAt: 8,
      },
      {
        slug: "luna-de-nacar",
        name: "Luna de Nácar",
        description: "Botón redondo de nácar.",
        price: 22,
        material: "plata",
        image: "/img/pendientes/aretes-luna-de-nacar.webp",
        addedAt: 4,
      },
      {
        slug: "set-corazones",
        name: "Set Corazones",
        description: "Set de tres pares de corazones.",
        price: 35,
        material: "oro",
        image: "/img/pendientes/aretes-set-corazones.webp",
        addedAt: 7,
      },
      {
        slug: "estrella-de-mar",
        name: "Estrella de Mar",
        description: "Botones con forma de estrella de mar.",
        price: 20,
        material: "oro",
        image: "/img/pendientes/aretes-estrella-de-mar.webp",
        addedAt: 10,
      },
      {
        slug: "cuarzo-rosa",
        name: "Cuarzo Rosa",
        description: "Botón triangular de cuarzo rosa.",
        price: 26,
        material: "plata",
        image: "/img/pendientes/aretes-cuarzo-rosa.jpeg",
        addedAt: 12,
      },
      {
        slug: "corazon-pulido",
        name: "Corazón Pulido",
        description: "Botón de corazón pulido.",
        price: 18,
        material: "plata",
        image: "/img/pendientes/aretes-corazon-pulido.webp",
        addedAt: 2,
      },
      {
        slug: "pave-corazon",
        name: "Pavé Corazón",
        description: "Corazón con pavé de circonitas.",
        price: 28,
        material: "oro",
        image: "/img/pendientes/aretes-pave-corazon.webp",
        badge: "Nuevo",
        addedAt: 15,
      },
      {
        slug: "set-brillo",
        name: "Set Brillo",
        description: "Set de botones con circonitas y estrella.",
        price: 39,
        material: "oro",
        image: "/img/pendientes/aretes-set-brillo.webp",
        badge: "Edición limitada",
        addedAt: 13,
      },
      {
        slug: "set-perla",
        name: "Set Perla",
        description: "Set de perlas y botones dorados.",
        price: 36,
        material: "oro",
        image: "/img/pendientes/aretes-set-perla.webp",
        addedAt: 1,
      },
    ],
  },
  {
    slug: "pulseras",
    title: "Pulseras",
    eyebrow: "Joyería",
    description:
      "Cadenas finas, perlas y tréboles para apilar en la muñeca. Ajustables y cómodas de llevar.",
    heroImage: "/img/pulsera-lifestyle-1.jpg",
    products: [
      {
        slug: "riviera",
        name: "Riviera",
        description: "Cadena de circonitas engastadas.",
        price: 38,
        material: "plata",
        image: "/img/pulseras/pulsera-riviera.jpeg",
        badge: "Más vendido",
        addedAt: 5,
      },
      {
        slug: "serpiente",
        name: "Serpiente",
        description: "Cadena serpiente con medalla colgante.",
        price: 29,
        material: "oro",
        image: "/img/pulseras/pulsera-serpiente.webp",
        addedAt: 3,
      },
      {
        slug: "globo",
        name: "Globo",
        description: "Cadena fina con charm de perrito globo.",
        price: 34,
        material: "oro",
        image: "/img/pulseras/pulsera-globo.jpeg",
        badge: "Nuevo",
        addedAt: 9,
      },
      {
        slug: "perlas-ajustable",
        name: "Perlas Ajustable",
        description: "Cadena fina con perlas y cierre deslizante.",
        price: 27,
        material: "oro",
        image: "/img/pulseras/pulsera-perlas-ajustable.webp",
        addedAt: 6,
      },
      {
        slug: "trebol-blanco",
        name: "Trébol Blanco",
        description: "Tréboles de nácar blanco enlazados.",
        price: 42,
        material: "oro",
        image: "/img/pulseras/pulsera-trebol-blanco.jpeg",
        badge: "Más vendido",
        addedAt: 7,
      },
      {
        slug: "trebol-negro",
        name: "Trébol Negro",
        description: "Tréboles de ónix enlazados.",
        price: 42,
        material: "oro",
        image: "/img/pulseras/pulsera-trebol-negro.webp",
        addedAt: 8,
      },
      {
        slug: "mariposa-de-perlas",
        name: "Mariposa de Perlas",
        description: "Varias vueltas de perlas con mariposa.",
        price: 48,
        material: "oro",
        image: "/img/pulseras/pulsera-mariposa-de-perlas.webp",
        badge: "Edición limitada",
        addedAt: 4,
      },
      {
        slug: "placas",
        name: "Placas",
        description: "Cadena con placas pulidas.",
        price: 31,
        material: "oro",
        image: "/img/pulseras/pulsera-placas.jpeg",
        addedAt: 2,
      },
      {
        slug: "eslabones",
        name: "Eslabones",
        description: "Cadena de eslabones con cierre de corazones.",
        price: 36,
        material: "oro",
        image: "/img/pulseras/pulsera-eslabones.webp",
        addedAt: 1,
      },
    ],
  },
  {
    slug: "brazaletes",
    title: "Brazaletes",
    eyebrow: "Joyería",
    description:
      "Brazaletes rígidos y de charms con circonitas, nácar y detalles con significado.",
    heroImage: "/img/brazalete-lifestyle-1.jpg",
    products: [
      {
        slug: "corazon-pave",
        name: "Corazón Pavé",
        description: "Brazalete rígido con corazón y circonitas.",
        price: 45,
        material: "oro",
        image: "/img/brazaletes/brazalete-corazon-pave.jpeg",
        badge: "Más vendido",
        addedAt: 5,
      },
      {
        slug: "charms-del-mar",
        name: "Charms del Mar",
        description: "Brazalete de charms marinos.",
        price: 49,
        material: "oro",
        image: "/img/brazaletes/brazalete-charms-del-mar.webp",
        addedAt: 7,
      },
      {
        slug: "charms-jade",
        name: "Charms Jade",
        description: "Charms dorados con cuenta verde.",
        price: 49,
        material: "oro",
        image: "/img/brazaletes/brazalete-charms-jade.webp",
        addedAt: 6,
      },
      {
        slug: "flor-de-sol",
        name: "Flor de Sol",
        description: "Brazalete abierto con flor nacarada.",
        price: 59,
        material: "oro",
        image: "/img/brazaletes/brazalete-flor-de-sol.webp",
        badge: "Edición limitada",
        addedAt: 9,
      },
      {
        slug: "trebol-esbelto",
        name: "Trébol Esbelto",
        description: "Brazalete fino con trébol de nácar.",
        price: 39,
        material: "oro",
        image: "/img/brazaletes/brazalete-trebol-esbelto.webp",
        addedAt: 3,
      },
      {
        slug: "clavo",
        name: "Clavo",
        description: "Brazalete abierto en forma de clavo.",
        price: 42,
        material: "oro",
        image: "/img/brazaletes/brazalete-clavo.webp",
        badge: "Nuevo",
        addedAt: 8,
      },
      {
        slug: "infinito",
        name: "Infinito",
        description: "Brazalete rígido con circonitas e infinito.",
        price: 52,
        material: "oro",
        image: "/img/brazaletes/brazalete-infinito.webp",
        addedAt: 2,
      },
      {
        slug: "charms-llave",
        name: "Charms Llave",
        description: "Charms de llave, candado y flor.",
        price: 49,
        material: "oro",
        image: "/img/brazaletes/brazalete-charms-llave.jpeg",
        addedAt: 4,
      },
      {
        slug: "charms-corazon",
        name: "Charms Corazón",
        description: "Charms con corazón y ala.",
        price: 49,
        material: "oro",
        image: "/img/brazaletes/brazalete-charms-corazon.webp",
        addedAt: 1,
      },
    ],
  },
]

export function getCategorySlugs() {
  return categories.map((category) => category.slug)
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug)
}

export function isSortValue(value: unknown): value is SortValue {
  return sortOptions.some((option) => option.value === value)
}

export function isMaterial(value: unknown): value is Material {
  return typeof value === "string" && value in materialLabels
}

export function filterAndSortProducts(
  products: Product[],
  { material, sort }: { material?: Material; sort: SortValue },
) {
  const filtered = material
    ? products.filter((product) => product.material === material)
    : [...products]

  switch (sort) {
    case "novedades":
      return filtered.sort((a, b) => b.addedAt - a.addedAt)
    case "precio-asc":
      return filtered.sort((a, b) => a.price - b.price)
    case "precio-desc":
      return filtered.sort((a, b) => b.price - a.price)
    default:
      return filtered
  }
}

const priceFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
})

export function formatPrice(price: number) {
  return priceFormatter.format(price)
}

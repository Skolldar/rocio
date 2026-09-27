import type { Category } from "../types"

export const pendientes: Category = {
  slug: "pendientes",
  title: "Pendientes",
  eyebrow: "Joyería",
  description:
    "Desde botones mínimos hasta aros con cristal: piezas ligeras para el día a día o para brillar de noche.",
  heroImage: "/img/pendientes/aretes-hero.webp",
  products: [
    {
      slug: "cono-de-cristal",
      name: "Cono de Cristal",
      description: "Ganchos con cono dorado y cuarzo facetado.",
      story:
        "Pendientes de gancho con un cono dorado del que cuelga un cuarzo facetado. El cuarzo es transparente y se mueve al andar. Miden unos tres centímetros en total y pesan poco para su tamaño.",
      price: 29,
      material: "oro",
      image: "/img/pendientes/aretes-cono-de-cristal.webp",
      addedAt: 3,
    },
    {
      slug: "gota-dorada",
      name: "Gota Dorada",
      description: "Gota maxi con acabado espejo.",
      story:
        "Una gota grande con acabado espejo, sin piedras. Es un pendiente de una sola pieza, sin partes que cuelguen. Refleja la luz como un espejo pequeño y por eso se nota mucho en fotos. Si te gustan los pendientes que se ven, este es de los más sencillos de combinar.",
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
      story:
        "Un aro fino con un medallón redondo de nácar en la parte inferior. El aro se cierra por presión y el medallón queda colgando justo debajo del lóbulo. El nácar tiene un tono blanco irisado que cambia con la luz.",
      price: 34,
      material: "oro",
      image: "/img/pendientes/aretes-aro-medallon.webp",
      addedAt: 6,
    },
    {
      slug: "aro-cuarzo",
      name: "Aro Cuarzo",
      description: "Aro con cristal facetado colgante.",
      story:
        "Aro con un cristal facetado en forma de pera colgando. El cristal es transparente y tiene caras planas, así que descompone la luz en destellos. Es un pendiente para el día, no muy largo, que se mueve con la cabeza.",
      price: 33,
      material: "oro",
      image: "/img/pendientes/aretes-pera.webp",
      addedAt: 5,
    },
    {
      slug: "trebol-nacar-mini",
      name: "Trébol de Nácar Mini",
      description: "Trébol de nácar blanco en forma de mini.",
      story:
        "La versión más pequeña del trébol de nácar, en botón. Mide medio centímetro, aproximadamente, y va pegado al lóbulo. Es el pendiente más barato de la colección y sirve para un segundo agujero o para quien prefiere pendientes muy discretos.",
      price: 19,
      material: "oro",
      image: "/img/pendientes/aretes-flor-blanca-mini.webp",
      addedAt: 11,
    },
    {
      slug: "colibri",
      name: "Colibrí",
      description: "Botón en forma de colibrí.",
      story:
        "Un botón con la silueta de un colibrí en pleno vuelo. Es pequeño, con las alas abiertas y el pico hacia arriba. Un detalle que la gente se fija cuando lo ve de cerca, pero que no llama la atención desde lejos.",
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
      story:
        "Botón de trébol de cuatro hojas con nácar blanco. Es el trébol de tamaño medio, más grande que el mini y más pequeño que el del collar. Hace juego con el collar y la pulsera de trébol, si quieres llevar el conjunto completo.",
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
      story:
        "Un botón redondo de nácar blanco sobre plata, sin más adorno. El nácar tiene ese brillo suave, irisado, que no se consigue con esmalte. Son pendientes de todos los días, de los que no se quitan para dormir.",
      price: 22,
      material: "plata",
      image: "/img/pendientes/aretes-circular-blanca.webp",
      addedAt: 4,
    },
    {
      slug: "set-corazones",
      name: "Set Corazones",
      description: "Set de tres pares de corazones.",
      story:
        "Tres pares de pendientes de corazón en un solo set: uno liso, uno calado y uno con circonita. Vienen en la misma caja. Sirven para tres agujeros distintos o para ir cambiando según el día.",
      price: 35,
      material: "oro",
      image: "/img/pendientes/aretes-set-corazones.webp",
      addedAt: 7,
    },
    {
      slug: "arbol-de-la-vida",
      name: "Árbol de la Vida",
      description: "Botón con forma de árbol de la vida.",
      story:
        "Botón con el árbol de la vida en relieve, con las ramas y las raíces dibujadas dentro de un círculo. Es un símbolo que se regala mucho en nacimientos y cumpleaños. Pequeño y pegado al lóbulo.",
      price: 20,
      material: "oro",
      image: "/img/pendientes/aretes-hojas.webp",
      addedAt: 10,
    },
    {
      slug: "cuarzo-rosa",
      name: "Cuarzo Rosa",
      description: "Botón triangular de cuarzo rosa.",
      story:
        "Un botón triangular de cuarzo rosa sobre plata. La piedra es de color rosa pálido, un poco translúcida, y cada una tiene un tono ligeramente distinto porque es natural. Combina con la plata mejor que con el dorado.",
      price: 26,
      material: "plata",
      image: "/img/pendientes/aretes-cuarzo-rosa.webp",
      addedAt: 12,
    },
    {
      slug: "mariposa-blanca",
      name: "Mariposa Blanca",
      description: "Botón en forma de mariposa blanca.",
      story:
        "Botón con forma de mariposa con las alas en blanco. Las alas son esmaltadas y el cuerpo es de metal. Es un pendiente de primavera que también funciona en invierno con jerséis oscuros, porque el blanco resalta.",
      price: 23,
      material: "oro",
      image: "/img/pendientes/aretes-mariposa-blanca.webp",
      addedAt: 2,
    },
    {
      slug: "pave-corazon",
      name: "Pavé Corazón",
      description: "Corazón con pavé de circonitas.",
      story:
        "Un corazón cubierto de circonitas pequeñas, engastadas una al lado de otra. Tiene brillo pero es de botón, así que no cuelga. Es el pendiente de corazón más vestido de la colección.",
      price: 28,
      material: "oro",
      image: "/img/pendientes/aretes-corazon-verde.webp",
      badge: "Nuevo",
      addedAt: 15,
    },
    {
      slug: "set-planetario",
      name: "Set Planetario",
      description: "Set de botones con circonitas y estrella.",
      story:
        "Set de botones con circonitas y una estrella. Los pendientes son distintos entre sí, pensados para combinarlos en varios agujeros: un botón brillante, una estrella y un punto de luz. Vienen en la misma caja.",
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
      story:
        "Un set con perlas y botones dorados lisos. Las perlas son pequeñas y los botones dorados hacen de segundo pendiente o de pareja. Es el set más sobrio y se regala mucho a madres y abuelas.",
      price: 36,
      material: "oro",
      image: "/img/pendientes/aretes-set-perla.webp",
      addedAt: 1,
    },
  ],
}

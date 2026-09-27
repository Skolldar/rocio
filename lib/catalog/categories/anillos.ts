import type { Category } from "../types"

export const anillos: Category = {
  slug: "anillos",
  title: "Anillos",
  eyebrow: "Joyería",
  description:
    "Corazones, perlas y destellos pensados para llevar solos o apilados. Ajustables y listos para regalar.",
  heroImage: "/img/modelos/modelo-manos-anillos.webp",
  products: [
    {
      slug: "ola-dorada",
      name: "Ola Dorada",
      description: "Anillo abierto con curva ondulada y circonita.",
      story:
        "Un aro abierto que dibuja una curva en S y termina en una pequeña circonita. Como no cierra, se ajusta apretándolo un poco entre los dedos, así que sirve para el índice, el corazón o el anular sin preocuparte por la talla. Queda bien solo y también combinado con una banda lisa en el mismo dedo.",
      price: 34,
      material: "oro",
      image: "/img/anillos/anillo-S-flor.webp",
      badge: "Más vendido",
      addedAt: 3,
    },
    {
      slug: "corazon-fino",
      name: "Corazón Fino",
      description: "Aro delicado rematado con un pequeño corazón.",
      story:
        "Un aro muy fino con un corazón diminuto en el frente. Es de los que se ponen y se olvidan: no se engancha en la ropa ni pesa. Suele ser el primer anillo que la gente compra para apilar, y con el tiempo se le van sumando otros.",
      price: 29,
      material: "oro",
      image: "/img/anillos/anillo-corazon-doble.webp",
      addedAt: 5,
    },
    {
      slug: "v",
      name: "Anillo en V",
      description: "Un anillo en V liso y pulido que abraza el dedo.",
      story:
        "Una banda pulida con la punta en forma de V. Sin piedras ni relieve, solo la forma. Alarga visualmente el dedo, y por eso muchas lo llevan en el índice o encima de otro anillo más fino. Talla ajustable.",
      price: 32,
      material: "oro",
      image: "/img/anillos/anillo-v.webp",
      badge: "Nuevo",
      addedAt: 8,
    },
    {
      slug: "duo-corazon",
      name: "Dúo Corazón",
      description: "Pareja de corazones calados en oro y plata.",
      story:
        "Dos anillos en uno: un corazón calado en plata y otro en tono dorado, unidos por la base. Por su tamaño se nota más que el resto de anillos de la colección, así que funciona bien como pieza única en la mano. Ajustable.",
      price: 45,
      material: "plata",
      image: "/img/anillos/anillo-duo-corazon.webp",
      addedAt: 4,
    },
    {
      slug: "flor-dorada",
      name: "flor dorada",
      description: "Banda fina con piedra central talla brillante.",
      story:
        "Una banda fina con una piedra central de talla brillante, montada baja para que no sobresalga. Es un anillo sencillo que pasa desapercibido en el día a día y brilla cuando le da la luz. Se puede llevar como anillo de promesa o simplemente porque sí.",
      price: 36,
      material: "oro",
      image: "/img/anillos/anillo-linea-flor.webp",
      addedAt: 2,
    },
    {
      slug: "anillo-huella",
      name: "Anillo Huella",
      description: "Anillo con diseño de huella de cachorro.",
      story:
        "Un anillo con la silueta de una huella de cachorro en relieve. Lo compran sobre todo quienes tienen perro o gato, y también como regalo para alguien que acaba de adoptar. Es ajustable y la huella queda centrada en el dedo.",
      price: 42,
      material: "oro",
      image: "/img/anillos/anillo-huella.webp",
      badge: "Más vendido",
      addedAt: 1,
    },
    {
      slug: "flor-de-perla",
      name: "Flor de Perla",
      description: "Flor esmaltada en blanco con perla en el centro.",
      story:
        "Una flor de cinco pétalos esmaltados en blanco con una perla pequeña en el centro. El esmalte es opaco, no brilla como el metal, y ese contraste es lo que hace que la flor destaque sobre la banda dorada. Va bien con vestidos de verano y con manga larga en invierno, la verdad es que no tiene temporada.",
      price: 39,
      material: "oro",
      image: "/img/anillos/anillo-flor-de-perla.webp",
      badge: "Edición limitada",
      addedAt: 7,
    },
    {
      slug: "perla-clasica",
      name: "Perla Clásica",
      description: "Perla cultivada sobre una banda dorada.",
      story:
        "Una perla cultivada sobre una banda dorada y ajustable. Es el anillo más sobrio de la colección: sin piedras, sin formas, solo la perla. Si buscas algo para llevar cada día que no llame la atención pero se note cuando alguien mira la mano, es este.",
      price: 38,
      material: "oro",
      image: "/img/anillos/anillo-perla-clasica.webp",
      badge: "Nuevo",
      addedAt: 6,
    },
  ],
}

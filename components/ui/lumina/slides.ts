export interface Slide {
  label: string;
  title: string;
  description: string;
  media: string;
  href: string;
}

export const slides: Slide[] = [
  {
    label: "Collares",
    title: "Brillo Eterno",
    description: "Collares de acero inoxidable color oro para llevar cada día.",
    media: "/img/collares/neklace.webp",
    href: "/products/collares",
  },
  {
    label: "Pendientes",
    title: "Luz de Noche",
    description: "Pendientes de perla y oro para las noches de fiesta.",
    media: "/img/pendientes/aretes-hero.webp",
    href: "/products/pendientes",
  },
  {
    label: "Pulseras",
    title: "Elegancia Sutil",
    description: "Pulseras finas que se llevan solas o combinadas en la muñeca.",
    media: "/img/pulseras/pulsera.webp",
    href: "/products/pulseras",
  },
  {
    label: "Anillos",
    title: "Susurro Dorado",
    description: "Anillos hechos a mano, ajustables y fáciles de apilar.",
    media: "/img/anillos/anillos2.webp",
    href: "/products/anillos",
  },
  {
    label: "Brazaletes",
    title: "Joya Atemporal",
    description: "Brazaletes hechos a mano para guardar durante años.",
    media: "/img/brazaletes/brazalete.webp",
    href: "/products/brazaletes",
  },
];

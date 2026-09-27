// Slide deck for the hero. `media` paths are served from `public/`.

export interface Slide {
  label: string;
  title: string;
  description: string;
  media: string;
}

export const slides: Slide[] = [
  {
    label: "Collares",
    title: "Brillo Eterno",
    description: "Collares con baño de oro para llevar cada día.",
    media: "/img/collares/neklace.webp",
  },
  {
    label: "Pendientes",
    title: "Luz de Noche",
    description: "Pendientes de perla y oro para las noches de fiesta.",
    media: "/img/pendientes/aretes-hero.webp",
  },
  {
    label: "Pulseras",
    title: "Elegancia Sutil",
    description: "Pulseras finas que se llevan solas o combinadas en la muñeca.",
    media: "/img/pulseras/pulsera2.webp",
  },
  {
    label: "Anillos",
    title: "Susurro Dorado",
    description: "Anillos hechos a mano, ajustables y fáciles de apilar.",
    media: "/img/anillos/anillos2.webp",
  },
  {
    label: "Brazaletes",
    title: "Joya Atemporal",
    description: "Brazaletes hechos a mano para guardar durante años.",
    media: "/img/brazaletes/brazalete.webp",
  },
];

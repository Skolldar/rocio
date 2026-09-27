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
    description: "Collares de oro de 18 quilates para llevar cada día.",
    media: "/img/collar-lifestyle-1.jpg",
  },
  {
    label: "Pendientes",
    title: "Luz de Noche",
    description: "Pendientes de perla y oro para las noches de fiesta.",
    media: "/img/aretes-lifestyle-1.jpg",
  },
  {
    label: "Pulseras",
    title: "Elegancia Sutil",
    description: "Pulseras finas que se llevan solas o combinadas en la muñeca.",
    media: "/img/pulsera-lifestyle-2.jpg",
  },
  {
    label: "Anillos",
    title: "Susurro Dorado",
    description: "Anillos hechos a mano, ajustables y fáciles de apilar.",
    media: "/img/anillo-lifestyle-2.jpg",
  },
  {
    label: "Brazaletes",
    title: "Joya Atemporal",
    description: "Brazaletes hechos a mano para guardar durante años.",
    media: "/img/brazalete-lifestyle-1.jpg",
  },
];

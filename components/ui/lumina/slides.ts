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
    description: "Collares de oro de 18 quilates que capturan la luz en cada gesto.",
    media: "/img/collar-lifestyle-1.jpg",
  },
  {
    label: "Aretes",
    title: "Luz de Noche",
    description: "Aretes que iluminan tu rostro y acompañan cada celebración.",
    media: "/img/aretes-lifestyle-1.jpg",
  },
  {
    label: "pulseras",
    title: "Elegancia Sutil",
    description: "pulseras delicadas que abrazan el cuello con sofisticación.",
    media: "/img/pulsera-lifestyle-2.jpg",
  },
  {
    label: "Anillos",
    title: "Susurro Dorado",
    description: "Anillos artesanales que realzan cada tono de piel.",
    media: "/img/anillo-lifestyle-2.jpg",
  },
  {
    label: "Brazaletes",
    title: "Joya Atemporal",
    description: "Hechas a mano para pasar de generación en generación.",
    media: "/img/brazalete-lifestyle-1.jpg",
  },
];

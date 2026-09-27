import type { Metadata } from "next"

import { LEGAL } from "@/components/legal/legalData"
import LegalPage, { type LegalSection } from "@/components/legal/legalPage"

export const metadata: Metadata = {
  title: "Aviso legal · Luxgirl",
  description: "Quién está detrás de la web de Luxgirl y cómo puedes usarla.",
}

const sections: LegalSection[] = [
  {
    id: "web",
    title: "Qué es esta web",
    content: (
      <p>
        Aquí muestro las piezas que hago. La web no tiene carrito ni pasarela de pago. Si
        te gusta algo, me escribes y lo hablamos por mensaje.
      </p>
    ),
  },
  {
    id: "contenidos",
    title: "Fotos y textos",
    content: (
      <p>
        Las fotos, los vídeos y los textos son míos. Puedes guardarlos para ti o
        compartirlos enlazando a la web. Para usarlos en otro sitio, pídeme permiso antes.
      </p>
    ),
  },
  {
    id: "responsabilidad",
    title: "Un par de avisos",
    content: (
      <>
        <p>
          Intento que todo lo que ves aquí sea correcto y esté al día, pero puede haber
          algún error. Si lo ves, dímelo y lo corrijo.
        </p>
        <p>
          El color de una joya puede cambiar un poco de una pantalla a otra. Los enlaces a
          Instagram, Facebook o YouTube llevan a webs que no controlo.
        </p>
      </>
    ),
  },
]

export default function AvisoLegalPage() {
  return (
    <LegalPage
      current="aviso-legal"
      title="Aviso legal"
      intro="Quién está detrás de esta web y en qué condiciones puedes usarla."
      sections={sections}
    />
  )
}

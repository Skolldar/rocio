import type { Metadata } from "next"
import Link from "next/link"

import LegalPage, { type LegalSection } from "@/components/legal/legalPage"

export const metadata: Metadata = {
  title: "Privacidad · Luxgirl",
  description: "Qué datos guardo cuando me escribes y qué hago con ellos.",
}

const sections: LegalSection[] = [
  {
    id: "datos",
    title: "Qué datos recojo",
    content: (
      <>
        <p>
          Esta web no tiene formularios de compra ni cuentas de usuario. Los únicos datos
          que llegan a mis manos son los que tú me das cuando me escribes: tu nombre, tu
          correo o tu teléfono y lo que me cuentes en el mensaje.
        </p>
        <p>
          Si dejas tu correo en la lista del pie de página, guardo solo ese correo. El
          servidor también registra datos técnicos como la dirección IP, como cualquier
          web.
        </p>
      </>
    ),
  },
  {
    id: "uso",
    title: "Para qué los uso",
    content: (
      <p>
        Para responderte, preparar tu pedido si lo hay y quedar contigo para la entrega.
        Si te apuntaste a la lista, para avisarte de piezas nuevas. Nada más. No los vendo
        ni se los paso a nadie.
      </p>
    ),
  },
  {
    id: "terceros",
    title: "Quién más los ve",
    content: (
      <p>
        Si me escribes por WhatsApp o Instagram, esas plataformas tratan tus datos según
        sus propias normas. Si te envío un pedido, la mensajería necesita tu dirección.
        El proveedor que aloja la web y el correo también los ve de paso.
      </p>
    ),
  },
  {
    id: "tiempo",
    title: "Cuánto tiempo los guardo",
    content: (
      <p>
        Los mensajes, hasta resolver lo que me pidas. Los datos de un pedido, el tiempo
        que exige Hacienda. Tu correo en la lista, hasta que me digas que te borre.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <p>
        Lo poco que hay que contar sobre cookies está en la{" "}
        <Link href="/cookies">política de cookies</Link>.
      </p>
    ),
  },
]

export default function PrivacidadPage() {
  return (
    <LegalPage
      current="privacidad"
      title="Privacidad"
      intro="Qué datos guardo cuando me escribes, qué hago con ellos y cómo pedirme que los borre."
      sections={sections}
    />
  )
}

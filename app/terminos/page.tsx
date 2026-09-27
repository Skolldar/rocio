import type { Metadata } from "next"
import Link from "next/link"

import { LEGAL } from "@/components/legal/legalData"
import LegalPage, { type LegalSection } from "@/components/legal/legalPage"

export const metadata: Metadata = {
  title: "Términos · Luxgirl",
  description: "Cómo funciona encargar una joya a Luxgirl: precio, pago, entrega y cambios.",
}

const sections: LegalSection[] = [
  {
    id: "como-funciona",
    title: "Cómo se encarga una joya",
    content: (
      <p>
        En esta web no se compra con carrito. Ves la pieza que te gusta, me escribes por
        WhatsApp, Instagram o correo, y te confirmo si la tengo, el precio y cómo te la
        hago llegar. El encargo queda cerrado cuando me pagas o, si quedamos en persona,
        cuando acordamos día y hora.
      </p>
    ),
  },
  {
    id: "piezas",
    title: "Las piezas",
    content: (
      <p>
        Todo es acero inoxidable con baño de oro o plata. Las fotos son de las piezas
        reales, aunque el color puede variar un poco según tu pantalla. Las medidas son
        aproximadas. Si una pieza aparece como agotada, dímelo y te aviso cuando vuelva.
      </p>
    ),
  },
  {
    id: "pago",
    title: "Precio y pago",
    content: (
      <p>
        Los precios están en euros con impuestos incluidos. El envío, si lo hay, te lo
        digo aparte antes de confirmar. Puedes pagar por Bizum, transferencia o en
        efectivo si nos vemos.
      </p>
    ),
  },
  {
    id: "entrega",
    title: "Entrega",
    content: (
      <p>
        Te lo envío por mensajería a la península con un coste fijo, o quedamos y te lo
        doy en mano sin coste. Suelo tardar uno o dos días en prepararlo. Tienes todos los
        detalles en <Link href="/envios-y-entrega">envíos y entrega</Link>.
      </p>
    ),
  },
  {
    id: "cambios",
    title: "Cambios y devoluciones",
    content: (
      <>
        <p>
          Tienes 14 días desde que recibes la pieza para cambiarla o devolverla, sin
          tener que darme explicaciones. Tiene que estar sin usar y con su estuche. El
          envío de vuelta lo pagas tú, salvo que la pieza llegue dañada o no sea la que
          pediste. Te devuelvo el dinero en cuanto la reciba, por el mismo medio que
          usaste.
        </p>
        <p>
          Por higiene, los pendientes no se pueden devolver una vez probados, salvo
          defecto. Las piezas personalizadas o grabadas tampoco.
        </p>
      </>
    ),
  },
  {
    id: "garantia",
    title: "Si algo sale mal",
    content: (
      <p>
        Las joyas tienen la garantía legal de tres años. Si una pieza llega con un fallo o
        se estropea sin motivo, hazle una foto y escríbeme. La arreglo, te mando otra o te
        devuelvo el dinero. La garantía no cubre golpes, perfumes, cremas ni el desgaste
        normal por el uso. En{" "}
        <Link href="/cuidado-de-tus-joyas">cuidado de tus joyas</Link> te cuento cómo
        mantenerlas.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "Dudas y reclamaciones",
    content: (
      <p>
        Escríbeme a <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> o llámame al{" "}
        {LEGAL.phone}. Suelo contestar el mismo día. Si no lo resolvemos entre las dos,
        puedes acudir a la oficina de consumo de tu comunidad. Se aplica la ley española y
        los juzgados de tu domicilio.
      </p>
    ),
  },
]

export default function TerminosPage() {
  return (
    <LegalPage
      current="terminos"
      title="Términos y condiciones"
      intro="Cómo funciona encargar una joya: precio, pago, entrega, cambios y garantía."
      sections={sections}
    />
  )
}

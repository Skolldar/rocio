import type { Metadata } from "next"

// Página provisional: fuera del índice hasta que tenga contenido.
export const metadata: Metadata = { robots: { index: false, follow: true } }

export default function NewProductPage() {
  return (
    <>
      <div>Nuevo producto</div>
    </>
  )
}

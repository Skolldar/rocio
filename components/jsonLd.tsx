// Datos estructurados schema.org: ayudan a Google y a los asistentes de IA a
// entender la tienda, los productos y las preguntas frecuentes.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // `<` escapado para que ningún texto pueda cerrar la etiqueta <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}

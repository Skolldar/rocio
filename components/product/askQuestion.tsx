"use client"

import { useId, useState } from "react"
import { MessageCircleQuestion } from "lucide-react"

const fieldStyles =
  "w-full rounded-xl border border-border bg-card px-4 text-sm placeholder:text-muted-foreground/70 transition-colors focus:border-gold-deep focus:outline-none focus:ring-2 focus:ring-gold-deep/30"

export default function AskQuestion({ productName }: { productName: string }) {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const panelId = useId()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div className="mt-3">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-13 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border border-foreground/80 px-6 text-sm font-medium uppercase tracking-[0.14em] transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <MessageCircleQuestion aria-hidden="true" strokeWidth={1.5} className="size-4.5" />
        ¿Tienes alguna pregunta?
      </button>

      <div id={panelId} hidden={!open} className="mt-4 rounded-2xl bg-muted p-5 sm:p-6">
        {sent ? (
          <p role="status" className="text-sm font-light leading-relaxed">
            Gracias, hemos recibido tu pregunta sobre <strong className="font-medium">{productName}</strong>.
            Te responderemos de lunes a sábado, en horario comercial.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <p className="text-sm font-light leading-relaxed text-muted-foreground">
              Cuéntanos qué quieres saber sobre {productName}: tallas, materiales,
              regalos… Te respondemos por correo.
            </p>
            <label htmlFor={`${panelId}-email`} className="sr-only">
              Correo electrónico
            </label>
            <input
              id={`${panelId}-email`}
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="tu@correo.com"
              className={`h-12 ${fieldStyles}`}
            />
            <label htmlFor={`${panelId}-mensaje`} className="sr-only">
              Tu pregunta
            </label>
            <textarea
              id={`${panelId}-mensaje`}
              name="mensaje"
              required
              rows={4}
              placeholder="Escribe tu pregunta"
              className={`resize-none py-3 ${fieldStyles}`}
            />
            <button
              type="submit"
              className="inline-flex h-12 cursor-pointer items-center justify-center self-start rounded-full bg-foreground px-6 text-xs font-semibold uppercase tracking-[0.16em] text-background transition-colors hover:bg-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2"
            >
              Enviar pregunta
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

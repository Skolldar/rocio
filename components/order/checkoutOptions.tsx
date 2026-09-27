"use client"

import { useId } from "react"
import Link from "next/link"
import { Handshake, Truck, type LucideIcon } from "lucide-react"

import InfoTip from "@/components/order/infoTip"
import Step from "@/components/order/step"
import { eur } from "@/lib/cart"
import {
  deliveryOptions,
  updateCheckout,
  useCheckout,
  type Delivery,
} from "@/lib/checkout"
import { cn } from "@/lib/utils"

const deliveryIcons: Record<Delivery, LucideIcon> = { envio: Truck, mano: Handshake }

const fieldStyles =
  "w-full rounded-xl border border-border bg-card px-4 text-base placeholder:text-muted-foreground/70 transition-colors focus:border-gold-deep focus:outline-none focus:ring-2 focus:ring-gold-deep/30"

export default function CheckoutOptions() {
  const checkout = useCheckout()
  const id = useId()

  return (
    <>
      <Step number={2} title="Entrega">
        <fieldset>
          <legend className="sr-only">Cómo quieres recibir el pedido</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {(Object.keys(deliveryOptions) as Delivery[]).map((key) => {
              const option = deliveryOptions[key]
              return (
                <OptionCard
                  key={key}
                  name={`${id}-entrega`}
                  icon={deliveryIcons[key]}
                  label={option.label}
                  note={option.note}
                  price={option.cost === 0 ? "Sin coste" : eur.format(option.cost)}
                  checked={checkout.delivery === key}
                  onSelect={() => updateCheckout({ delivery: key })}
                />
              )
            })}
          </div>
        </fieldset>
      </Step>

      <Step number={3} title="Algo más">
        <div className="grid gap-5">
          <div>
            <div className="relative flex items-center gap-2">
              <label htmlFor={`${id}-nombre`} className="text-sm font-medium">
                Tu nombre <span className="font-normal text-muted-foreground">(opcional)</span>
              </label>
              <InfoTip id={`${id}-nombre-ayuda`} label="Para qué sirve el nombre">
                Nombre y apellido, para saber de quién es el pedido cuando me llegue.
              </InfoTip>
            </div>
            <input
              id={`${id}-nombre`}
              type="text"
              autoComplete="name"
              aria-describedby={`${id}-nombre-ayuda`}
              placeholder="Ej.: Lucía García"
              value={checkout.name}
              onChange={(event) => updateCheckout({ name: event.target.value })}
              className={cn("mt-2 h-12", fieldStyles)}
            />
          </div>
          <div>
            <div className="relative flex items-center gap-2">
              <label htmlFor={`${id}-nota`} className="text-sm font-medium">
                Nota <span className="font-normal text-muted-foreground">(opcional)</span>
              </label>
              <InfoTip id={`${id}-nota-ayuda`} label="Qué poner en la nota">
                Si pides un anillo o una pulsera, dime la talla de cada uno. La
                dirección me la pasas luego por el chat.
              </InfoTip>
            </div>
            <textarea
              id={`${id}-nota`}
              rows={3}
              maxLength={500}
              aria-describedby={`${id}-nota-ayuda`}
              placeholder="Ej.: El anillo Ola Dorada en talla 14. Es un regalo, no pongas el precio."
              value={checkout.note}
              onChange={(event) => updateCheckout({ note: event.target.value })}
              className={cn("mt-2 resize-y py-3", fieldStyles)}
            />
            <p className="mt-2 text-sm text-muted-foreground">
              ¿No sabes tu talla?{" "}
              <Link
                href="/guia-de-tallas"
                target="_blank"
                className="rounded-sm text-foreground underline underline-offset-4 hover:text-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep"
              >
                Mira la guía de tallas
              </Link>
            </p>
          </div>
        </div>
      </Step>
    </>
  )
}

function OptionCard({
  name,
  icon: Icon,
  label,
  note,
  price,
  checked,
  onSelect,
}: {
  name: string
  icon: LucideIcon
  label: string
  note: string
  price?: string
  checked: boolean
  onSelect: () => void
}) {
  return (
    <label
      className={cn(
        "group relative flex cursor-pointer gap-4 rounded-2xl border border-border bg-card p-4 transition-[border-color,background-color,box-shadow] duration-200 sm:p-5",
        "items-center sm:flex-col sm:items-start",
        "hover:border-gold-deep/50",
        "has-checked:border-gold-deep has-checked:bg-accent/50 has-checked:shadow-[inset_0_0_0_1px_var(--gold-deep)]",
        "has-focus-visible:ring-2 has-focus-visible:ring-gold-deep/40 has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-background"
      )}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onSelect}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className="grid size-11 shrink-0 place-items-center rounded-full bg-muted text-foreground transition-colors duration-200 group-has-checked:bg-gold group-has-checked:text-gold-ink"
      >
        <Icon strokeWidth={1.5} className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium">{label}</span>
        <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">{note}</span>
        {price && (
          <span className="mt-2 block text-sm font-semibold tabular-nums text-gold-deep">{price}</span>
        )}
      </span>
      <span
        aria-hidden="true"
        className="grid size-5 shrink-0 place-items-center rounded-full border border-border bg-card transition-colors group-has-checked:border-gold-deep sm:absolute sm:right-5 sm:top-5"
      >
        <span className="size-2.5 scale-0 rounded-full bg-gold-deep transition-transform duration-200 group-has-checked:scale-100 motion-reduce:transition-none" />
      </span>
    </label>
  )
}

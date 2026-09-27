"use client";

import React, { useState } from "react";
import Image from "next/image";

import { SAMPLE_CART_ITEMS, eur, type CartItem } from "@/lib/cart";

const SHIPPING_THRESHOLD = 1500;
const SHIPPING_COST = 25;

export default function OrderSummary() {
  const [items, setItems] = useState<CartItem[]>(SAMPLE_CART_ITEMS);

  const updateQuantity = (id: string, delta: number) =>
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, quantity: Math.max(1, it.quantity + delta) } : it,
      ),
    );

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const itemCount = items.reduce((sum, it) => sum + it.quantity, 0);
  const freeShipping = subtotal >= SHIPPING_THRESHOLD || items.length === 0;
  const shipping = freeShipping ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const toFreeShipping = Math.max(0, SHIPPING_THRESHOLD - subtotal);

  return (
    <aside className=" flex flex-col bg-ink text-cream md:h-screen md:w-72 lg:w-96">
      {/* Header */}
      <header className="flex items-baseline justify-between border-b border-white/10 px-6 py-6">
        <h2 className=" text-3xl font-semibold tracking-wide">
          Mi Pedido
        </h2>
        <span className="text-xs uppercase tracking-[0.2em] text-gold-bright">
          {itemCount} {itemCount === 1 ? "pieza" : "piezas"}
        </span>
      </header>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          {/* Free-shipping progress */}
          <div className="px-6 pt-5">
            <p className="text-[0.7rem] leading-relaxed text-white/60">
              {freeShipping ? (
                <span className="text-gold-bright">Envío gratuito incluido</span>
              ) : (
                <>
                  Te faltan{" "}
                  <span className="text-gold-bright">{eur.format(toFreeShipping)}</span>{" "}
                  para el envío gratuito
                </>
              )}
            </p>
            <div className="mt-2 h-0.75 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-linear-to-r from-gold to-gold-bright transition-[width] duration-500 ease-out"
                style={{
                  width: `${Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Line items */}
          <ul className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="group flex gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-white/5"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 rounded-lg object-cover ring-1 ring-white/10"
                />

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className=" truncate text-lg font-semibold leading-tight">
                        {item.name}
                      </p>
                      <p className="truncate text-[0.7rem] text-white/50">
                        {item.detail}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Quitar ${item.name} del pedido`}
                      className="shrink-0 cursor-pointer rounded-md p-1 text-white/40 opacity-0 transition-colors duration-200 hover:text-gold-bright focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-gold-bright group-hover:opacity-100"
                    >
                      <TrashIcon />
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-2">
                    {/* Quantity stepper */}
                    <div className="flex items-center gap-1 rounded-full border border-white/15">
                      <StepperButton
                        label={`Reducir cantidad de ${item.name}`}
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <MinusIcon />
                      </StepperButton>
                      <span className="min-w-5 text-center text-xs tabular-nums">
                        {item.quantity}
                      </span>
                      <StepperButton
                        label={`Aumentar cantidad de ${item.name}`}
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <PlusIcon />
                      </StepperButton>
                    </div>

                    <span className=" text-lg font-semibold text-gold-bright">
                      {eur.format(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Totals + checkout */}
          <footer className="border-t border-white/10 px-6 py-5">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between text-white/70">
                <dt>Subtotal</dt>
                <dd className="tabular-nums">{eur.format(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-white/70">
                <dt>Envío</dt>
                <dd className="tabular-nums">
                  {shipping === 0 ? (
                    <span className="text-gold-bright">Gratis</span>
                  ) : (
                    eur.format(shipping)
                  )}
                </dd>
              </div>
              <div className="mt-3 flex items-baseline justify-between border-t border-white/10 pt-3">
                <dt className=" text-xl font-semibold">
                  Total
                </dt>
                <dd className=" text-2xl font-semibold tabular-nums text-gold-bright">
                  {eur.format(total)}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-linear-to-br from-gold-bright to-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-gold-ink shadow-gold transition-all duration-200 hover:shadow-gold-lg hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright motion-reduce:transition-none"
            >
              Finalizar compra
              <ArrowIcon />
            </button>

            <p className="mt-3 text-center text-[0.65rem] text-white/40">
              Pago seguro · Devoluciones gratuitas en 30 días
            </p>
          </footer>
        </>
      )}
    </aside>
  );
}

/* ------------------------------ subcomponents ----------------------------- */

function EmptyCart() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 text-gold-bright">
        <BagIcon />
      </div>
      <p className=" mt-5 text-xl font-semibold">
        Tu pedido está vacío
      </p>
      <p className="mt-1 max-w-[24ch] text-xs leading-relaxed text-white/50">
        Descubre nuestra colección y añade tus piezas favoritas.
      </p>
    </div>
  );
}

function StepperButton({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-white/80 transition-colors duration-200 hover:text-gold-bright focus-visible:outline-2 focus-visible:outline-gold-bright disabled:cursor-not-allowed disabled:text-white/20"
    >
      {children}
    </button>
  );
}

/* --------------------------------- icons ---------------------------------- */
/* Inline Lucide-style icons (24x24 viewBox, 1.75 stroke) — no emoji. */

const iconBase = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PlusIcon = () => (
  <svg {...iconBase} width={14} height={14} aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const MinusIcon = () => (
  <svg {...iconBase} width={14} height={14} aria-hidden="true">
    <path d="M5 12h14" />
  </svg>
);

const TrashIcon = () => (
  <svg {...iconBase} aria-hidden="true">
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
  </svg>
);

const ArrowIcon = () => (
  <svg {...iconBase} className="text-gold-ink" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const BagIcon = () => (
  <svg {...iconBase} width={26} height={26} aria-hidden="true">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
  </svg>
);

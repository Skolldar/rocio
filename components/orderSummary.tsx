"use client";

import React, { useState } from "react";

/* ------------------------------------------------------------------ *
 * Luxgirl — Shopping cart ("Mi Pedido")
 * Premium dark + gold aesthetic. Cormorant headings / Montserrat body.
 * Self-contained mock state until the cart is wired to Prisma + a real
 * product source. Swap `INITIAL_ITEMS` / handlers for server state later.
 * ------------------------------------------------------------------ */

type CartItem = {
  id: string;
  name: string;
  detail: string;
  price: number;
  quantity: number;
  image: string;
};

const INITIAL_ITEMS: CartItem[] = [
  {
    id: "anillo-aurora",
    name: "Anillo Aurora",
    detail: "Oro 18k · Diamante 0.5ct",
    price: 1290,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=160&q=80",
  },
  {
    id: "collar-lumen",
    name: "Collar Lumen",
    detail: "Oro blanco · Zafiro",
    price: 860,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=160&q=80",
  },
  {
    id: "pendientes-eclat",
    name: "Pendientes Éclat",
    detail: "Oro 18k · Perla",
    price: 540,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=160&q=80",
  },
];

const SHIPPING_THRESHOLD = 1500;
const SHIPPING_COST = 25;

const eur = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export default function OrderSummary() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);

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
    <aside className="font-['Elms_Sans',system-ui,sans-serif] flex flex-col bg-[#0c0a09] text-[#f5f0e8] md:h-screen md:w-72 lg:w-96">
      {/* Header */}
      <header className="flex items-baseline justify-between border-b border-white/10 px-6 py-6">
        <h2 className="font-['Elms_Sans',system-ui,sans-serif] text-3xl font-semibold tracking-wide">
          Mi Pedido
        </h2>
        <span className="text-xs uppercase tracking-[0.2em] text-[#f0c869]">
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
                <span className="text-[#f0c869]">Envío gratuito incluido</span>
              ) : (
                <>
                  Te faltan{" "}
                  <span className="text-[#f0c869]">{eur.format(toFreeShipping)}</span>{" "}
                  para el envío gratuito
                </>
              )}
            </p>
            <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#d8a948] to-[#f0c869] transition-[width] duration-500 ease-out"
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
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 flex-shrink-0 rounded-lg object-cover ring-1 ring-white/10"
                />

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-['Elms_Sans',system-ui,sans-serif] truncate text-lg font-semibold leading-tight">
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
                      className="flex-shrink-0 cursor-pointer rounded-md p-1 text-white/40 opacity-0 transition-colors duration-200 hover:text-[#f0c869] focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-[#f0c869] group-hover:opacity-100"
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
                      <span className="min-w-[1.25rem] text-center text-xs tabular-nums">
                        {item.quantity}
                      </span>
                      <StepperButton
                        label={`Aumentar cantidad de ${item.name}`}
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <PlusIcon />
                      </StepperButton>
                    </div>

                    <span className="font-['Elms_Sans',system-ui,sans-serif] text-lg font-semibold text-[#f0c869]">
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
                    <span className="text-[#f0c869]">Gratis</span>
                  ) : (
                    eur.format(shipping)
                  )}
                </dd>
              </div>
              <div className="mt-3 flex items-baseline justify-between border-t border-white/10 pt-3">
                <dt className="font-['Elms_Sans',system-ui,sans-serif] text-xl font-semibold">
                  Total
                </dt>
                <dd className="font-['Elms_Sans',system-ui,sans-serif] text-2xl font-semibold tabular-nums text-[#f0c869]">
                  {eur.format(total)}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#f0c869] to-[#d8a948] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#1c1206] shadow-[0_8px_30px_rgba(216,169,72,0.28)] transition-all duration-200 hover:shadow-[0_10px_38px_rgba(216,169,72,0.45)] hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0c869] motion-reduce:transition-none"
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
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 text-[#f0c869]">
        <BagIcon />
      </div>
      <p className="font-['Elms_Sans',system-ui,sans-serif] mt-5 text-xl font-semibold">
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
      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-white/80 transition-colors duration-200 hover:text-[#f0c869] focus-visible:outline-2 focus-visible:outline-[#f0c869] disabled:cursor-not-allowed disabled:text-white/20"
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
  <svg {...iconBase} stroke="#1c1206" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const BagIcon = () => (
  <svg {...iconBase} width={26} height={26} aria-hidden="true">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
  </svg>
);

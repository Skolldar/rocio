import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type SeasonPiece = {
  name: string
  category: string
  price: string
  image: string
  href: string
}

// Otoño · Invierno 2026 — la cápsula de nueva temporada.
const pieces: SeasonPiece[] = [
  {
    name: "Solsticio",
    category: "Anillos",
    price: "320,00 €",
    image: "/img/anillos/anillo-S-flor.webp",
    href: "/products/anillos?orden=novedades",
  },
  {
    name: "Vendimia",
    category: "Collares",
    price: "480,00 €",
    image: "/img/collares/collar-corazon-filigrana.webp",
    href: "/products/collares?orden=novedades",
  },
  {
    name: "Ámbar",
    category: "Pendientes",
    price: "260,00 €",
    image: "/img/pendientes/aretes-pera.webp",
    href: "/products/pendientes?orden=novedades",
  },
  {
    name: "Bruma",
    category: "Pulseras",
    price: "210,00 €",
    image: "/img/pulseras/pulsera-eslabones.webp",
    href: "/products/pulseras?orden=novedades",
  },
  {
    name: "Eclipse",
    category: "Edición Limitada",
    price: "540,00 €",
    image: "/img/brazaletes/brazalete-charms-corazon.webp",
    href: "/products/edicion-limitada?orden=novedades",
  },
  {
    name: "Penumbra",
    category: "Collares",
    price: "390,00 €",
    image: "/img/collares/collar-medalla-grabada.webp",
    href: "/products/collares?orden=novedades",
  },
]

export default function NewSeason() {
  return (
    <section
      aria-labelledby="nueva-temporada-titulo"
      className="w-full bg-background text-foreground"
    >
      <div className="mx-auto max-w-400 px-8 py-10">
        <Carousel opts={{ align: "start" }} className="">

          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-gold-deep">
                Nueva Temporada
              </p>
              <h2
                id="nueva-temporada-titulo"
                className="mt-3 text-4xl font-semibold text-balance text-foreground sm:text-5xl"
              >
                Los favoritos del <span className="text-gold-deep">verano</span>
              </h2>
              <p className="mt-4 max-w-7xl text-base leading-relaxed text-muted-foreground sm:mt-5 md:text-lg md:font-light">
                Piezas ligeras para los días de sol: oro cálido y piedras
                luminosas que lucen sobre la piel.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <CarouselPrevious
                aria-label="Pieza anterior"
                className="static left-auto right-auto top-auto h-11 w-11 translate-x-0 translate-y-0 border-border bg-transparent text-foreground hover:border-gold-deep hover:bg-gold-deep hover:text-white focus-visible:ring-gold-deep focus-visible:ring-offset-background disabled:opacity-40"
              />
              <CarouselNext
                aria-label="Pieza siguiente"
                className="static left-auto right-auto top-auto h-11 w-11 translate-x-0 translate-y-0 border-border bg-transparent text-foreground hover:border-gold-deep hover:bg-gold-deep hover:text-white focus-visible:ring-gold-deep focus-visible:ring-offset-background disabled:opacity-40"
              />
            </div>
          </div>

          {/* Pieces */}
          <CarouselContent className="-ml-4 mt-10 sm:-ml-6 lg:mt-14">
            {pieces.map((piece) => (
              <CarouselItem
                key={piece.name}
                className="basis-[78%] pl-4 sm:basis-1/2 sm:pl-6 lg:basis-1/3 xl:basis-1/4"
              >
                <Link
                  href={piece.href}
                  className="group block rounded-xl focus-visible:outline-none"
                >
                  <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-foreground/5 ring-1 ring-border transition duration-300 group-hover:ring-gold-deep/50 group-focus-visible:ring-2 group-focus-visible:ring-gold-deep">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      style={{ backgroundImage: `url('${piece.image}')` }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-t from-stone-950/70 via-stone-950/5 to-transparent"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-stone-950/55 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-stone-100 backdrop-blur-sm">
                      {piece.category}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute bottom-4 right-4 grid size-10 translate-y-2 place-items-center rounded-full bg-gold-deep text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
                    >
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>

                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <h3 className="text-2xl font-semibold leading-tight text-foreground transition-colors group-hover:text-gold-deep">
                      {piece.name}
                    </h3>
                    <span className="shrink-0 text-sm font-medium tracking-wide text-gold-deep">
                      {piece.price}
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Footer link */}
          <div className="mt-12 border-t border-border pt-6">
            <Link
              href="/products/novedades"
              className="group inline-flex items-center gap-2 rounded-sm text-sm font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:text-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Ver toda la colección
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
            </Link>
          </div>
        </Carousel>
      </div>
    </section>
  )
}

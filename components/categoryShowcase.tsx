import Image from "next/image";
import Link from "next/link";


type Category = {
  name: string;
  tagline: string;
  image: string;
  href: string;
};

const categories: Category[] = [
  {
    name: "Anillos",
    tagline: "Para llevar solos o apilados",
    image: "/img/anillos/anillo-S-flor.webp",
    href: "/products/anillos",
  },
  {
    name: "Collares",
    tagline: "Cadenas finas y colgantes de oro",
    image: "/img/collares/collar-corazon-filigrana.webp",
    href: "/products/collares",
  },
  {
    name: "Pendientes",
    tagline: "Aros, perlas y botones para cada día",
    image: "/img/pendientes/aretes-pera.webp",
    href: "/products/pendientes",
  },
  {
    name: "Pulseras",
    tagline: "Eslabones y cadenas que se llevan a diario",
    image: "/img/pulseras/pulsera-trebol-negro.webp",
    href: "/products/pulseras",
  },
  {
    name: "Brazaletes",
    tagline: "Piezas rígidas pensadas para durar años",
    image: "/img/brazaletes/brazalete-charms-corazon.webp",
    href: "/products/brazaletes",
  },
];

export default function CategoryShowcase() {
  return (
    <section
      aria-labelledby="shop-by-category-title"
      className="w-full bg-background"
    >
      <div className="mx-auto max-w-400 px-5 sm:px-8 py-10">
      {/* Centered title block */}
      <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
        <p
          className="mb-3 text-xs font-medium uppercase text-gold-deep sm:text-sm"
        >
          Selección actual
        </p>
        <h2
          id="shop-by-category-title"
          className="text-4xl font-semibold text-balance text-foreground sm:text-5xl"
        >
          Compra por categoría
        </h2>
        <p
          className="mx-auto mt-4 max-w-7xl text-base leading-relaxed text-muted-foreground sm:mt-5 md:text-lg md:font-regular"
        >
          Anillos, collares, pendientes y pulseras en oro y plata, para el día a día o para regalar.
        </p>
      </div>

      {/* 5-card grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((category, index) => (
          <Link
            key={category.name}
            href={category.href}
            className={`group relative block overflow-hidden rounded-xl border border-border bg-foreground/5 shadow-sm outline-none transition-shadow duration-300 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              // the 5th card spans both columns on the 2-col mobile layout, as a
              // landscape banner so it doesn't tower over the others
              index === 4 ? "col-span-2 aspect-3/2 md:col-span-1 md:aspect-3/4" : "aspect-3/4"
            }`}
          >
            <Image
              src={category.image}
              alt={`Colección de ${category.name.toLowerCase()}`}
              fill
              sizes={index === 4 ? "(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 100vw" : "(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Legibility gradient */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/20 to-transparent"
            />

            {/* Label */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <h3
                className="mt-1.5 text-2xl font-semibold leading-tight text-cream sm:text-[1.65rem]"
              >
                {category.name}
              </h3>
              <p
                className="mt-1 text-sm leading-snug text-cream/80"
              >
                {category.tagline}
              </p>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </section>
  );
}


type Category = {
  name: string;
  tagline: string;
  image: string;
  href: string;
};

const categories: Category[] = [
  {
    name: "Rings",
    tagline: "Where every promise begins",
    image: "/img/anillo-2.webp",
    href: "/products?category=rings",
  },
  {
    name: "Necklaces",
    tagline: "Grace that rests close to the heart",
    image: "/img/collar-flor.webp",
    href: "/products?category=necklaces",
  },
  {
    name: "Earrings",
    tagline: "A quiet sparkle in every turn",
    image: "/img/aretes-2.webp",
    href: "/products?category=earrings",
  },
  {
    name: "Bracelets",
    tagline: "Elegance that follows your every move",
    image: "/img/pulsera-esposas.webp",
    href: "/products?category=bracelets",
  },
  {
    name: "Pulseras",
    tagline: "Heirloom pieces made to endure",
    image: "/img/pulsera-serpiente.webp",
    href: "/products?category=watches",
  },
];

export default function CategoryShowcase() {
  return (
    <section
      aria-labelledby="shop-by-category-title"
      className="w-full bg-background"
    >
      <div className="mx-auto max-w-400 px-8 py-10">
      {/* Centered title block */}
      <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
        <p
          className="mb-4 text-xs font-medium uppercase tracking-[0.32em] text-[#b88a2e]"
          style={{ fontFamily: "Elms Sans, system-ui, sans-serif" }}
        >
          Curated Selection
        </p>
        <h2
          id="shop-by-category-title"
          className="text-4xl font-semibold leading-none tracking-tight text-foreground sm:text-5xl"
          style={{ fontFamily: "Elms Sans, system-ui, sans-serif" }}
        >
          Shop by Category
        </h2>
        <p
          className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed text-muted-foreground"
          style={{ fontFamily: "Elms Sans, system-ui, sans-serif" }}
        >
          Explore our collections, each crafted to mark the moments that matter most.
        </p>
      </div>

      {/* 5-card grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((category, index) => (
          <a
            key={category.name}
            href={category.href}
            className={`group relative block aspect-3/4 overflow-hidden rounded-xl border border-border bg-foreground/5 shadow-sm outline-none transition-shadow duration-300 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              // make the 5th card span both columns on the 2-col mobile layout
              index === 4 ? "col-span-2 md:col-span-1" : ""
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={category.image}
              alt={`${category.name} collection`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Legibility gradient */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-[#0c0a09]/85 via-[#0c0a09]/20 to-transparent"
            />

            {/* Label */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <h3
                className="mt-1.5 text-2xl font-semibold leading-tight text-[#f5f0e8] sm:text-[1.65rem]"
                style={{ fontFamily: "Elms Sans, system-ui, sans-serif" }}
              >
                {category.name}
              </h3>
              <p
                className="mt-0.5 text-xs font-light text-[#f5f0e8]/70"
                style={{ fontFamily: "Elms Sans, system-ui, sans-serif" }}
              >
                {category.tagline}
              </p>
            </div>
          </a>
        ))}
      </div>
      </div>
    </section>
  );
}

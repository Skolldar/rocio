import Image from "next/image"

type HelpHeroProps = {
  eyebrow: string
  title: string
  titleId: string
  intro: string
  image: {
    src: string
    alt: string
    position?: string
  }
  // "split": texto a la izquierda e imagen a la derecha (por defecto).
  // "full": la imagen ocupa todo el ancho y el texto va encima, en la esquina inferior.
  // "edge": dos mitades a sangre; texto sobre blanco a la izquierda e imagen a la derecha.
  layout?: "split" | "full" | "edge"
}

// Cabecera compartida por las páginas de ayuda.
export default function HelpHero({
  eyebrow,
  title,
  titleId,
  intro,
  image,
  layout = "split",
}: HelpHeroProps) {
  if (layout === "full") {
    return (
      <section
        aria-labelledby={titleId}
        className="relative isolate overflow-hidden bg-stone-950 text-stone-50"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
          style={{ objectPosition: image.position ?? "50% 50%" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-t from-stone-950/90 via-stone-950/45 to-stone-950/10"
        />

        <div className="mx-auto flex min-h-[clamp(24rem,70vh,40rem)] max-w-400 flex-col justify-end px-5 sm:px-8 pb-12 pt-28 sm:pb-16">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-bright">
            {eyebrow}
          </p>
          <h1
            id={titleId}
            className="mt-3 max-w-2xl text-[clamp(2.25rem,1.5rem+4vw,3.5rem)] font-semibold leading-[1.05] text-balance"
          >
            {title}
          </h1>
          <p className="mt-5 max-w-lg text-base font-regular leading-relaxed text-stone-200 md:text-lg">
            {intro}
          </p>
        </div>
      </section>
    )
  }

  if (layout === "edge") {
    return (
      <section
        aria-labelledby={titleId}
        className="border-b border-border bg-white text-foreground"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center px-5 sm:px-8 pb-16 pt-28 lg:px-16 lg:py-24">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
              {eyebrow}
            </p>
            <h1
              id={titleId}
              className="mt-3 max-w-2xl text-[clamp(2.25rem,1.5rem+4vw,3.5rem)] font-semibold leading-[1.05] text-balance"
            >
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-base font-regular leading-relaxed text-muted-foreground md:text-lg">
              {intro}
            </p>
          </div>
          <div className="relative min-h-[50vh] lg:min-h-160">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: image.position ?? "50% 50%" }}
            />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      aria-labelledby={titleId}
      className="border-b border-border bg-sand"
    >
      <div className="mx-auto grid max-w-400 gap-10 px-5 sm:px-8 pb-14 pt-28 lg:grid-cols-12 lg:items-center lg:gap-16 lg:pb-20">
        <div className="lg:col-span-7">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
            {eyebrow}
          </p>
          <h1
            id={titleId}
            className="mt-3 max-w-2xl text-[clamp(2.25rem,1.5rem+4vw,3.5rem)] font-semibold leading-[1.05] text-balance"
          >
            {title}
          </h1>
          <p className="mt-5 max-w-lg text-base font-regular leading-relaxed text-muted-foreground md:text-lg">
            {intro}
          </p>
        </div>
        <div className="relative aspect-4/3 overflow-hidden rounded-xl lg:col-span-5 lg:aspect-5/4">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
            style={{ objectPosition: image.position ?? "50% 50%" }}
          />
        </div>
      </div>
    </section>
  )
}

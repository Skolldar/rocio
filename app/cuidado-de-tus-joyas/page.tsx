import type { Metadata } from "next"
import Image from "next/image"
import { Check, X } from "lucide-react"

import HelpFooterNav from "@/components/help/helpFooterNav"
import HelpHero from "@/components/help/helpHero"

export const metadata: Metadata = {
  title: "Cuidado de tus joyas · Luxgirl",
  description:
    "Cómo limpiar, guardar y proteger tus joyas de acero inoxidable color oro o color plata para que duren años con el mismo color.",
}

const yes = [
  "Ponértelas al final, cuando ya te has echado el perfume y la crema.",
  "Quitártelas para dormir, para la ducha y para hacer deporte.",
  "Pasarles un paño suave y seco al quitártelas.",
  "Guardar cada pieza en su estuche o en una bolsita, separada de las demás.",
]

const no = [
  "Bañarte en la piscina o en el mar con ellas. El cloro y la sal apagan el color.",
  "Usar limpiadores de plata, líquidos abrasivos o cepillos duros.",
  "Dejarlas en el baño con la humedad y el vapor de la ducha.",
  "Guardarlas todas juntas en un mismo cajón, rozándose.",
]

const cleaningSteps = [
  {
    title: "Agua tibia y una gota de jabón neutro",
    description:
      "Llena un vaso con agua tibia, añade una gota de jabón de manos suave y deja la pieza dentro dos o tres minutos. Si tiene perla o nácar, sáltate este paso y ve directamente al paño.",
  },
  {
    title: "Frota con los dedos o un cepillo blando",
    description:
      "Con los dedos suele bastar. Para los huecos de las circonitas puedes usar un cepillo de dientes de bebé, sin apretar.",
  },
  {
    title: "Aclara y seca del todo",
    description:
      "Aclara con agua limpia y seca con un paño de algodón o de microfibra. Que no quede humedad en el cierre ni entre los eslabones antes de guardarla.",
  },
]

const materials = [
  {
    title: "Acero inoxidable color oro y color plata",
    description:
      "Es la base de todas mis piezas. No se oxida, no da alergia y aguanta el agua puntual. Lo que se desgasta con el tiempo es el color, y lo que más lo acelera es el roce con otras joyas, el perfume y el sudor. Con un uso normal y estos cuidados, el color se mantiene años.",
  },
  {
    title: "Perlas y nácar",
    description:
      "Son materiales orgánicos y porosos. No los mojes, no los sumerjas en agua con jabón y mantenlos lejos del perfume y la laca. Límpialos solo con un paño seco y guárdalos aparte porque se rayan con facilidad.",
  },
  {
    title: "Circonitas y cristal",
    description:
      "Las piedras aguantan bien la limpieza con agua y jabón. Lo que pierde brillo es la suciedad que se acumula detrás, así que de vez en cuando límpialas por el reverso también.",
  },
  {
    title: "Cadenas finas",
    description:
      "El enemigo es el enredo, no el desgaste. Ciérralas antes de guardarlas y cuélgalas o déjalas estiradas. Si se hace un nudo, no tires: pon la cadena sobre una superficie lisa y sepáralo con un alfiler.",
  },
]

export default function CuidadoPage() {
  return (
    <main className="w-full bg-background text-foreground">
      <HelpHero
        eyebrow="Cuidado de tus joyas"
        titleId="cuidado-titulo"
        title="Poco trabajo, muchos años"
        intro="Mis piezas están pensadas para llevarlas cada día, pero el acabado en color oro o color plata agradece unos gestos sencillos. Lo que cuento aquí es lo mismo que hago yo con las mías."
        image={{
          src: "/img/modelos/modelo-mano-anillos-pulsera.webp",
          alt: "Mano con anillos y pulsera de oro",
          position: "50% 30%",
        }}
        layout="edge"
      />

      {/* Cada día */}
      <section aria-labelledby="cada-dia-titulo">
        <div className="mx-auto max-w-400 px-5 sm:px-8 py-20 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
              En el día a día
            </p>
            <h2
              id="cada-dia-titulo"
              className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
            >
              Lo que sí y lo que mejor no
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="rounded-xl border border-border bg-white p-8 sm:p-10">
              <h3 className="flex items-center gap-3 text-xl font-semibold">
                <span className="grid size-8 place-items-center rounded-full bg-gold/20 text-gold-deep">
                  <Check aria-hidden="true" strokeWidth={2} className="size-4" />
                </span>
                Lo que sí
              </h3>
              <ul className="mt-6 divide-y divide-border">
                {yes.map((item) => (
                  <li key={item} className="py-4 text-base font-regular leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-white p-8 sm:p-10">
              <h3 className="flex items-center gap-3 text-xl font-semibold">
                <span className="grid size-8 place-items-center rounded-full bg-stone-200 text-stone-700">
                  <X aria-hidden="true" strokeWidth={2} className="size-4" />
                </span>
                Lo que mejor no
              </h3>
              <ul className="mt-6 divide-y divide-border">
                {no.map((item) => (
                  <li key={item} className="py-4 text-base font-regular leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Limpieza */}
      <section aria-labelledby="limpieza-titulo" className="border-y border-border bg-sand">
        <div className="mx-auto max-w-400 px-5 sm:px-8 py-20 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
              Limpieza
            </p>
            <h2
              id="limpieza-titulo"
              className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
            >
              Cómo limpiarlas en casa en cinco minutos
            </h2>
            <p className="mt-4 max-w-[44ch] text-base font-medium leading-relaxed text-muted-foreground">
              Una vez al mes es suficiente si las llevas a diario. Si las usas
              de vez en cuando, con el paño al guardarlas basta.
            </p>
          </div>

          {/* Imagen y pasos en la misma fila: la lista se centra respecto a la imagen. */}
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="relative hidden aspect-4/5 overflow-hidden rounded-xl lg:col-span-4 lg:block">
              <Image
                src="/img/modelos/modelo-perlas-corazon.webp"
                alt="Modelo con collar de perlas y colgante de corazón"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </div>

            <ol className="lg:col-span-8">
              {cleaningSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="grid gap-3 border-t border-border py-8 sm:grid-cols-12 sm:gap-8 last:border-b"
                >
                  <span className="text-sm font-medium uppercase tracking-[0.18em] text-gold-deep tabular-nums sm:col-span-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="sm:col-span-10">
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 max-w-[60ch] text-base font-regular leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Por material */}
      <section aria-labelledby="materiales-titulo">
        <div className="mx-auto max-w-400 px-5 sm:px-8 py-20 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
              Según la pieza
            </p>
            <h2
              id="materiales-titulo"
              className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
            >
              Cada material pide algo distinto
            </h2>
          </div>

          <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {materials.map((material) => (
              <div key={material.title} className="border-t border-border pt-6">
                <dt className="text-lg font-medium">{material.title}</dt>
                <dd className="mt-3 max-w-lg text-sm font-regular leading-relaxed text-muted-foreground">
                  {material.description}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 rounded-xl bg-stone-800 p-8 text-stone-50 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-5xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-bright">
                Si el color se ha desgastado
              </p>
              <p className="mt-3 text-base font-regular leading-relaxed text-stone-200">
                Pasa con los años, sobre todo en anillos y pulseras, que rozan
                más. Escríbeme con una foto y vemos qué se puede hacer. A veces
                basta con cambiar el cierre, y sale por mucho menos de lo que
                cuesta una pieza nueva.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HelpFooterNav current="cuidado" />
    </main>
  )
}

import QualityStamps from "@/components/qualityStamps"

type QualityGuaranteeProps = {
  className?: string
}

export default function QualityGuarantee({
  className = "",
}: QualityGuaranteeProps) {
  return (
    <section
      aria-labelledby="sellos-titulo"
      className={`border-t border-border bg-sand ${className}`}
    >
      <div className="mx-auto max-w-400 px-5 sm:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
            Garantía Luxgirl
          </p>
          <h2
            id="sellos-titulo"
            className="mt-3 text-3xl font-semibold text-balance sm:text-4xl"
          >
            Pensadas para llevarlas cada día
          </h2>
        </div>
        <QualityStamps className="mx-auto mt-12 max-w-4xl" />
      </div>
    </section>
  )
}

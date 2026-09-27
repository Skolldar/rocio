import Link from "next/link"

import { cn } from "@/lib/utils"
import { materialLabels, type Material, type SortValue } from "@/lib/catalog"
import SortSelect from "@/components/catalog/sortSelect"

type CatalogToolbarProps = {
  basePath: string
  total: number
  material?: Material
  sort: SortValue
  materials: Material[]
}

function buildHref(basePath: string, material?: Material, sort?: SortValue) {
  const params = new URLSearchParams()
  if (material) params.set("material", material)
  if (sort && sort !== "destacados") params.set("orden", sort)
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const chipClass =
  "inline-flex min-h-10 items-center rounded-full border px-4 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export default function CatalogToolbar({
  basePath,
  total,
  material,
  sort,
  materials,
}: CatalogToolbarProps) {
  const filters: { label: string; value?: Material }[] =
    materials.length > 1
      ? [
          { label: "Todo" },
          ...materials.map((value) => ({ label: materialLabels[value], value })),
        ]
      : []

  return (
    <div className="flex flex-col gap-6 border-b border-border pb-6 lg:flex-row lg:items-center lg:justify-between">
      <nav aria-label="Filtrar por material" className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => {
          const active = filter.value === material
          return (
            <Link
              key={filter.label}
              href={buildHref(basePath, filter.value, sort)}
              aria-current={active ? "true" : undefined}
              scroll={false}
              className={cn(
                chipClass,
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground hover:border-gold-deep hover:text-gold-deep",
              )}
            >
              {filter.label}
            </Link>
          )
        })}
        <span
          className={cn("text-sm text-muted-foreground", filters.length > 0 && "ml-2")}
          aria-live="polite"
        >
          {total} {total === 1 ? "pieza" : "piezas"}
        </span>
      </nav>

      <SortSelect sort={sort} />
    </div>
  )
}

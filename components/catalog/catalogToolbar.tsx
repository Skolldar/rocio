import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  materialLabels,
  styleLabels,
  type Material,
  type SortValue,
  type Style,
} from "@/lib/catalog"
import SortSelect from "@/components/catalog/sortSelect"

type CatalogToolbarProps = {
  basePath: string
  total: number
  material?: Material
  style?: Style
  sort: SortValue
  materials: Material[]
  styles: Style[]
}

function buildHref(
  basePath: string,
  { material, style, sort }: { material?: Material; style?: Style; sort?: SortValue },
) {
  const params = new URLSearchParams()
  if (material) params.set("material", material)
  if (style) params.set("estilo", style)
  if (sort && sort !== "destacados") params.set("orden", sort)
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const swatchClass: Record<Material, string> = {
  oro: "bg-[radial-gradient(circle_at_30%_30%,var(--gold-bright),var(--gold)_45%,var(--gold-deep))]",
  plata: "bg-[radial-gradient(circle_at_30%_30%,#ffffff,#d4d4d8_45%,#8b8b93)]",
}

export default function CatalogToolbar({
  basePath,
  total,
  material,
  style,
  sort,
  materials,
  styles,
}: CatalogToolbarProps) {
  const filters: { label: string; value?: Material }[] =
    materials.length > 1
      ? [
          { label: "Todo" },
          ...materials.map((value) => ({ label: materialLabels[value], value })),
        ]
      : []

  const styleFilters: { label: string; value?: Style }[] =
    styles.length > 0
      ? [
          { label: "Todos" },
          ...styles.map((value) => ({ label: styleLabels[value], value })),
        ]
      : []

  return (
    <div className="flex flex-col gap-6 border-b border-border pb-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        {filters.length > 0 && (
          <nav
            aria-label="Filtrar por material"
            className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/70 p-1"
          >
            {filters.map((filter) => {
              const active = filter.value === material
              return (
                <Link
                  key={filter.label}
                  href={buildHref(basePath, { material: filter.value, style, sort })}
                  aria-current={active ? "page" : undefined}
                  scroll={false}
                  className={cn(
                    "inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm transition-[background-color,color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-secondary",
                    active
                      ? "bg-card text-foreground shadow-[0_1px_2px_rgb(12_10_9/0.06),0_4px_12px_rgb(12_10_9/0.06)] ring-1 ring-border"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {filter.value && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-3 shrink-0 rounded-full ring-1 ring-black/10",
                        swatchClass[filter.value],
                      )}
                    />
                  )}
                  {filter.label}
                </Link>
              )
            })}
          </nav>
        )}
        {styleFilters.length > 0 && (
          <nav
            aria-label="Filtrar por estilo"
            className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/70 p-1"
          >
            {styleFilters.map((filter) => {
              const active = filter.value === style
              return (
                <Link
                  key={filter.label}
                  href={buildHref(basePath, { material, style: filter.value, sort })}
                  aria-current={active ? "page" : undefined}
                  scroll={false}
                  className={cn(
                    "inline-flex min-h-10 items-center rounded-full px-4 text-sm transition-[background-color,color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-secondary",
                    active
                      ? "bg-card text-foreground shadow-[0_1px_2px_rgb(12_10_9/0.06),0_4px_12px_rgb(12_10_9/0.06)] ring-1 ring-border"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {filter.label}
                </Link>
              )
            })}
          </nav>
        )}
        <p
          className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground"
          aria-live="polite"
        >
          <span className="tabular-nums text-foreground">{total}</span>{" "}
          {total === 1 ? "pieza" : "piezas"}
        </p>
      </div>

      <SortSelect sort={sort} />
    </div>
  )
}

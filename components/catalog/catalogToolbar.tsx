import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  materialLabels,
  materialSwatchClass,
  styleLabels,
  type Material,
  type SortValue,
  type Style,
} from "@/lib/catalog"
import MaterialSelect from "@/components/catalog/materialSelect"
import SortSelect from "@/components/catalog/sortSelect"

type CatalogToolbarProps = {
  basePath: string
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

const groupClass =
  "grid w-full auto-cols-fr grid-flow-col items-center gap-1 rounded-full border border-border bg-secondary/70 p-1 sm:inline-flex sm:w-auto sm:shrink-0"

const pillClass =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-3 text-center text-sm leading-tight transition-[background-color,color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-secondary sm:whitespace-nowrap sm:px-4"

export default function CatalogToolbar({
  basePath,
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
      {/* On phones the material filter is a dropdown (its labels are too long for
          pills) and the style filter is a full-width segmented control. */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
        {filters.length > 0 && (
          <MaterialSelect material={material} materials={materials} className="sm:hidden" />
        )}
        {filters.length > 0 && (
          <nav
            aria-label="Filtrar por material"
            className={cn(groupClass, "max-sm:hidden")}
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
                    pillClass,
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
                        materialSwatchClass[filter.value],
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
            className={groupClass}
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
                    pillClass,
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
      </div>

      <SortSelect sort={sort} />
    </div>
  )
}

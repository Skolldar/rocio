"use client"
import { useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { isSortValue, sortOptions, type SortValue } from "@/lib/catalog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SortSelect({ sort }: { sort: SortValue }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [pending, startTransition] = useTransition()

  function handleChange(value: string) {
    if (!isSortValue(value)) return
    const params = new URLSearchParams(searchParams)
    if (value === "destacados") params.delete("orden")
    else params.set("orden", value)
    const query = params.toString()
    startTransition(() => {
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
    })
  }

  // On phones this row lines up with MaterialSelect: same label width, full-width trigger
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <span
        id="ordenar-etiqueta"
        className="w-21 shrink-0 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground sm:w-auto sm:tracking-[0.22em]"
      >
        Ordenar
      </span>
      <Select value={sort} onValueChange={handleChange}>
        <SelectTrigger
          aria-labelledby="ordenar-etiqueta"
          aria-busy={pending}
          className={cn(
            "min-w-0 flex-1 gap-2 px-3 text-xs sm:w-60 sm:flex-none sm:gap-3 sm:px-4 sm:text-sm",
            pending && "opacity-60",
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

"use client"
import { useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import {
  isMaterial,
  materialLabels,
  materialSwatchClass,
  type Material,
} from "@/lib/catalog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Radix Select can't use an empty string as an item value
const ALL = "todo"

export default function MaterialSelect({
  material,
  materials,
  className,
}: {
  material?: Material
  materials: Material[]
  className?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [pending, startTransition] = useTransition()

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams)
    if (isMaterial(value)) params.set("material", value)
    else params.delete("material")
    const query = params.toString()
    startTransition(() => {
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
    })
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        id="material-etiqueta"
        className="w-21 shrink-0 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
      >
        Material
      </span>
      <Select value={material ?? ALL} onValueChange={handleChange}>
        <SelectTrigger
          aria-labelledby="material-etiqueta"
          aria-busy={pending}
          className={cn("min-w-0 flex-1 gap-2 px-3 text-xs", pending && "opacity-60")}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="start">
          <SelectItem value={ALL} className="text-xs">
            Todo
          </SelectItem>
          {materials.map((value) => (
            <SelectItem key={value} value={value} className="text-xs">
              <span className="flex items-center gap-2 whitespace-nowrap">
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-3 shrink-0 rounded-full ring-1 ring-black/10",
                    materialSwatchClass[value],
                  )}
                />
                {materialLabels[value]}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

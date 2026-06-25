"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, ShoppingBag, User, X } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

type Category = { title: string; href: string; description: string }

const categories: Category[] = [
  {
    title: "Anillos",
    href: "/products?categoria=anillos",
    description: "Solitarios, alianzas y diseños de autor en oro y plata.",
  },
  {
    title: "Collares",
    href: "/products?categoria=collares",
    description: "Gargantillas y colgantes que enmarcan cada escote.",
  },
  {
    title: "Pendientes",
    href: "/products?categoria=pendientes",
    description: "Desde aros minimalistas hasta piezas de gala.",
  },
  {
    title: "Pulseras",
    href: "/products?categoria=pulseras",
    description: "Brazaletes y tennis con pavé de circonitas.",
  },
  {
    title: "Tobilleras",
    href: "/products?categoria=tobilleras",
    description: "Detalles sutiles para el verano y la playa.",
  },
  {
    title: "Edición Limitada",
    href: "/products?categoria=edicion-limitada",
    description: "Series numeradas diseñadas en cantidades reducidas.",
  },
]

const collections: Category[] = [
  {
    title: "Novedades",
    href: "/products?coleccion=novedades",
    description: "Lo último que ha llegado al atelier.",
  },
  {
    title: "Más Vendidos",
    href: "/products?coleccion=mas-vendidos",
    description: "Las piezas favoritas de la comunidad Luxgirl.",
  },
  {
    title: "Para Regalo",
    href: "/products?coleccion=regalo",
    description: "Selección lista para sorprender, con envoltorio incluido.",
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const pathname = usePathname()

  // Transparent only when overlaying the dark hero (home, before scrolling).
  // Everywhere else — and once scrolled — it frosts so the light pages stay legible.
  const transparent = pathname === "/" && !scrolled

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 font-[Elms_Sans,system-ui,sans-serif] transition-all duration-300",
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-white/10 bg-stone-950/40 shadow-lg backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-14 max-w-400 items-center justify-between gap-4 px-8">
        {/* Brand */}
        <Link
          href="/"
          className="shrink-0 rounded-sm font-[Elms_Sans,system-ui,sans-serif] text-2xl font-semibold uppercase tracking-[0.22em] text-stone-50 transition-colors hover:text-[#f0c869] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c869] lg:text-[1.7rem]"
        >
          Lux<span className="text-[#f0c869]">girl</span>
        </Link>

        {/* Desktop navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-stone-200 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white">
                Joyería
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-115 gap-2 p-4 md:w-140 md:grid-cols-2">
                  {categories.map((category) => (
                    <ListItem
                      key={category.title}
                      title={category.title}
                      href={category.href}
                    >
                      {category.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-stone-200 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white">
                Colecciones
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-130 md:grid-cols-[.9fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        href="/products"
                        className="group relative flex h-full w-full select-none flex-col justify-end overflow-hidden rounded-md p-6 no-underline outline-none focus:ring-2 focus:ring-[#f0c869]"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                          style={{
                            backgroundImage:
                              "url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=640&q=80')",
                          }}
                        />
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-linear-to-t from-stone-950/90 via-stone-950/40 to-transparent"
                        />
                        <span className="relative mb-1 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[#f0c869]">
                          Colección
                        </span>
                        <span className="relative font-[Elms_Sans,system-ui,sans-serif] text-2xl font-semibold leading-tight text-white">
                          Atelier de Oro
                        </span>
                        <span className="relative mt-1 text-sm leading-snug text-stone-200">
                          Piezas hechas a mano en oro de 18 quilates.
                        </span>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  {collections.map((collection) => (
                    <ListItem
                      key={collection.title}
                      title={collection.title}
                      href={collection.href}
                    >
                      {collection.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/products?coleccion=regalo"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-stone-200 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                  )}
                >
                  Regalos
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-stone-200 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                  )}
                >
                  Sobre Nosotras
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-label="Buscar"
            className="grid size-10 cursor-pointer place-items-center rounded-full text-stone-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c869]"
          >
            <Search className="size-5" />
          </button>
          <Link
            href="/order"
            aria-label="Mi cuenta"
            className="hidden size-10 cursor-pointer place-items-center rounded-full text-stone-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c869] sm:grid"
          >
            <User className="size-5" />
          </Link>
          <Link
            href="/order"
            aria-label="Carrito de compra"
            className="relative grid size-10 cursor-pointer place-items-center rounded-full text-stone-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c869]"
          >
            <ShoppingBag className="size-5" />
            <span className="absolute -right-0.5 -top-0.5 grid min-w-4.5 place-items-center rounded-full bg-[#d8a948] px-1 text-[0.65rem] font-semibold text-stone-950">
              2
            </span>
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="grid size-10 cursor-pointer place-items-center rounded-full text-stone-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c869] lg:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="mx-auto max-w-400 border-t border-white/10 bg-stone-950/95 px-8 py-4 backdrop-blur-md lg:hidden">
          <p className="px-2 pb-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[#f0c869]">
            Joyería
          </p>
          <ul className="grid grid-cols-2 gap-1">
            {categories.map((category) => (
              <li key={category.title}>
                <Link
                  href={category.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-2 py-2 text-sm text-stone-200 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid gap-1 border-t border-white/10 pt-3">
            {collections.map((collection) => (
              <Link
                key={collection.title}
                href={collection.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-2 py-2 text-sm text-stone-200 transition-colors hover:bg-white/10 hover:text-white"
              >
                {collection.title}
              </Link>
            ))}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block rounded-md px-2 py-2 text-sm text-stone-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              Sobre Nosotras
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

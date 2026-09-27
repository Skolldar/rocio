"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingBag, X } from "lucide-react"

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
import MobileMenu, { type NavLink } from "@/components/mobileMenu"
import CartPreview from "@/components/cartPreview"
import { SAMPLE_CART_ITEMS, type CartItem } from "@/lib/cart"
import { INSTAGRAM_URL, InstagramIcon } from "@/components/socialIcons"

type Category = NavLink

const categories: Category[] = [
  {
    title: "Anillos",
    href: "/products/anillos",
    description: "Solitarios, alianzas y diseños de autor con baño de oro o plata.",
  },
  {
    title: "Collares",
    href: "/products/collares",
    description: "Gargantillas y colgantes que enmarcan cada escote.",
  },
  {
    title: "Pendientes",
    href: "/products/pendientes",
    description: "Desde aros minimalistas hasta piezas de gala.",
  },
  {
    title: "Pulseras",
    href: "/products/pulseras",
    description: "Cadenas finas, perlas y tréboles para apilar.",
  },
  {
    title: "Brazaletes",
    href: "/products/brazaletes",
    description: "Rígidos y de charms, con circonitas y nácar.",
  },
  {
    title: "Edición Limitada",
    href: "/products/edicion-limitada",
    description: "Series numeradas que hago en cantidades muy pequeñas.",
  },
]

const collections: Category[] = [
  {
    title: "Novedades",
    href: "/products/novedades",
    description: "Lo último que he terminado en el taller.",
  },
  {
    title: "Más Vendidos",
    href: "/products/mas-vendidos",
    description: "Las piezas que más me pedís.",
  },
  {
    title: "Para Regalo",
    href: "/products/para-regalo",
    description: "Selección lista para sorprender, con envoltorio incluido.",
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [cartOpen, setCartOpen] = React.useState(false)
  const [cartItems, setCartItems] = React.useState<CartItem[]>(SAMPLE_CART_ITEMS)
  const cartCount = cartItems.reduce((sum, it) => sum + it.quantity, 0)
  const removeCartItem = (itemId: string) =>
    setCartItems((prev) => prev.filter((it) => it.id !== itemId))
  const cartCloseTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  const pathname = usePathname()

  const heroPages = ["/", "/regalos", "/sobre-nosotras"]
  const hasHero =
    heroPages.includes(pathname) ||
    categories.some((category) => category.href === pathname)
  const transparent = hasHero && !scrolled && !mobileOpen
  const closeMobile = () => setMobileOpen(false)

  // La vista previa no tiene sentido en /order, donde el resumen ya está visible.
  const cartPreviewEnabled = !pathname.startsWith("/order")
  const openCart = () => {
    clearTimeout(cartCloseTimer.current)
    if (cartPreviewEnabled) setCartOpen(true)
  }
  // Pequeño retraso para poder pasar el ratón del icono al panel sin que se cierre.
  const scheduleCloseCart = () => {
    clearTimeout(cartCloseTimer.current)
    cartCloseTimer.current = setTimeout(() => setCartOpen(false), 200)
  }
  const closeCart = () => {
    clearTimeout(cartCloseTimer.current)
    setCartOpen(false)
  }

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => () => clearTimeout(cartCloseTimer.current), [])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-150 ease-out",
          transparent
            ? "border-transparent bg-transparent"
            : mobileOpen
              ? "border-white/10 bg-stone-950"
              : "border-white/10 bg-stone-950/70 shadow-lg shadow-black/20 backdrop-blur-md backdrop-saturate-150"
        )}
      >
        <div className="mx-auto flex h-14 max-w-400 items-center justify-between gap-4 px-8">
          {/* Brand */}
          <Link
            href="/"
            className="shrink-0 rounded-sm text-2xl font-semibold uppercase text-stone-50 transition-colors hover:text-gold-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright lg:text-[1.7rem]"
          >
            Lux<span className="text-gold-bright">girl</span>
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
                        <Link
                          href="/products/collares/doble-corazon"
                          className="group relative flex h-full w-full select-none flex-col justify-end overflow-hidden rounded-md p-6 no-underline outline-none focus:ring-2 focus:ring-gold-bright"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{
                              backgroundImage:
                                "url('/img/modelos/modelo-collares-capas.webp')",
                            }}
                          />
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-linear-to-t from-stone-950/90 via-stone-950/40 to-transparent"
                          />
                          <span className="relative mb-1 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-gold-bright">
                            New
                          </span>
                          <span className="relative text-2xl font-semibold leading-tight text-white">
                            Doble Corazón
                          </span>
                        </Link>
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
                    href="/regalos"
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
                    href="/sobre-nosotras"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-stone-200 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                    )}
                  >
                    Sobre mí
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Luxgirl"
              className="grid size-10 cursor-pointer place-items-center rounded-full text-stone-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright"
            >
              <InstagramIcon className="size-5" />
            </a>

            <div
              className="relative"
              onMouseEnter={openCart}
              onMouseLeave={scheduleCloseCart}
            >
              <Link
                href="/order"
                aria-label="Carrito de compra"
                aria-controls="vista-carrito"
                onClick={closeCart}
                className="relative grid size-10 cursor-pointer place-items-center rounded-full text-stone-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright"
              >
                <ShoppingBag className="size-5" />
                <span className="absolute -right-0.5 -top-0.5 grid min-w-4.5 place-items-center rounded-full bg-gold px-1 text-[0.65rem] font-semibold text-stone-950">
                  {cartCount}
                </span>
              </Link>

              <CartPreview
                id="vista-carrito"
                open={cartOpen && cartPreviewEnabled}
                items={cartItems}
                onRemove={removeCartItem}
                onNavigate={closeCart}
              />
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              aria-controls="menu-movil"
              onClick={() => setMobileOpen((open) => !open)}
              className="grid size-10 cursor-pointer place-items-center rounded-full text-stone-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright lg:hidden"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

      </header>

      <MobileMenu
        id="menu-movil"
        open={mobileOpen}
        onClose={closeMobile}
        categories={categories}
        collections={collections}
      />
    </>
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

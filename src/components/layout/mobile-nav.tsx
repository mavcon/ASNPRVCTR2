"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingCart, User, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/products",
      label: "Products",
    },
    {
      href: "/categories",
      label: "Categories",
    },
    {
      href: "/about",
      label: "About",
    },
    {
      href: "/search",
      label: "Search",
    },
    {
      href: "/account",
      label: "My Account",
    },
    {
      href: "/cart",
      label: "Cart",
    },
    {
      href: "/checkout",
      label: "Checkout",
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pr-0">
        <div className="flex flex-col space-y-4 py-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-base font-medium transition-colors hover:text-primary",
                route.active ? "text-black dark:text-white" : "text-muted-foreground"
              )}
              onClick={() => setOpen(false)}
            >
              {route.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col space-y-4 border-t pt-4">
          <Link 
            href="/cart" 
            className="flex items-center space-x-2 text-base font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Cart</span>
          </Link>
          <Link 
            href="/auth" 
            className="flex items-center space-x-2 text-base font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            <User className="h-5 w-5" />
            <span>Account</span>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
} 
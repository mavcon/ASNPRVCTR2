"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MainNav() {
  const pathname = usePathname()
  
  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/products",
      label: "Products",
      active: pathname === "/products",
    },
    {
      href: "/categories",
      label: "Categories",
      active: pathname === "/categories",
    },
    {
      href: "/about",
      label: "About",
      active: pathname === "/about",
    },
    {
      href: "/test",
      label: "Test Components",
      active: pathname === "/test",
    },
  ]

  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-black dark:text-white" : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  )
}

export function NavActions() {
  return (
    <div className="flex items-center space-x-4">
      <Link href="/search">
        <Button variant="ghost" size="icon" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <span className="sr-only">Search</span>
        </Button>
      </Link>
      <Link href="/cart">
        <Button variant="ghost" size="icon" aria-label="Shopping Cart">
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Shopping Cart</span>
        </Button>
      </Link>
      <Link href="/account">
        <Button variant="ghost" size="icon" aria-label="User Account">
          <User className="h-5 w-5" />
          <span className="sr-only">User Account</span>
        </Button>
      </Link>
    </div>
  )
} 
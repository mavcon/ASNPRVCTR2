"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  BarChart, 
  Settings, 
  LogOut,
  Menu,
  X,
  Shield
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/ui/logo"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { toast } from "@/hooks/use-toast"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: <ShoppingBag className="h-5 w-5" />,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: <BarChart className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false)

  const handleLogout = () => {
    // In a real app, this would call an API to log the user out
    toast({
      title: "Logged out",
      description: "You have been logged out of your account",
    })
    // Redirect to home page
    window.location.href = "/"
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center">
                    <Logo className="h-8 w-auto" />
                    <span className="ml-2 text-xl font-bold">Admin</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="mt-8 flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  ))}
                  <Separator />
                  <Button
                    variant="ghost"
                    className="flex w-full justify-start gap-3 px-3"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center">
              <Logo className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold hidden md:inline">Admin Panel</span>
            </Link>
            <div className="hidden md:flex">
              <nav className="flex items-center gap-6 text-sm font-medium">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 ${
                      pathname === item.href
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Shield className="h-4 w-4" />
              Admin
            </div>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="container px-4 py-6 md:py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-4">
        <div className="container px-4 flex flex-col items-center justify-center gap-2 text-center sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} 亞 ASNPRVCTR. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <div className="h-4 w-px bg-border" />
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
} 
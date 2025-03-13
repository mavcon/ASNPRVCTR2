import Link from "next/link"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Logo } from "@/components/ui/logo"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="container px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo className="h-8 w-auto" />
        </Link>
        <ThemeToggle />
      </header>
      
      <main className="flex-1 flex flex-col">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        {children}
      </main>
      
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
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-heading bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-lg font-semibold tracking-tight text-transparent transition-opacity hover:opacity-90 dark:from-sky-400 dark:to-emerald-400"
        >
          Turistito
        </Link>
        <nav
          className="flex items-center gap-2 sm:gap-3"
          aria-label="Principal"
        >
          <Link
            href="/auth/login"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "text-sky-700 hover:bg-sky-50 hover:text-sky-900 dark:text-sky-300 dark:hover:bg-sky-950/50 dark:hover:text-sky-100"
            )}
          >
            Login
          </Link>
          <Link
            href="/auth/sign-up"
            className={cn(buttonVariants({ size: "sm" }), "shadow-sm")}
          >
            Signup
          </Link>
        </nav>
      </div>
    </header>
  )
}

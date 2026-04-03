import Link from "next/link"

import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-adventure-olive/15 bg-stone-50/95 backdrop-blur-md supports-[backdrop-filter]:bg-stone-50/90 dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-heading bg-gradient-to-r from-adventure-olive-deep via-adventure-olive to-adventure-olive-light bg-clip-text text-lg font-semibold tracking-tight text-transparent transition-opacity hover:opacity-90 dark:from-emerald-300 dark:via-adventure-moss dark:to-lime-200"
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
              "text-adventure-olive-deep hover:bg-adventure-olive/10 hover:text-adventure-olive dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-white"
            )}
          >
            Login
          </Link>
          <Link
            href="/auth/sign-up"
            className={cn(
              buttonVariants({ size: "sm" }),
              "border-transparent bg-adventure-olive text-white shadow-sm hover:bg-adventure-olive-deep dark:bg-adventure-olive-light dark:text-adventure-olive-deep dark:hover:bg-adventure-moss"
            )}
          >
            Signup
          </Link>
        </nav>
      </div>
    </header>
  )
}

import Link from "next/link"
import Image from "next/image"

import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

export function LandingNavbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-transparent bg-transparent">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 md:grid-cols-[1fr_auto_1fr] lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full bg-background/50 px-2 py-1 backdrop-blur-sm transition-opacity hover:opacity-90"
        >
          <Image
            src="/turistito-logo.png"
            alt="Logo de Turistito"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
            priority
          />
          <span className="font-heading bg-gradient-to-r from-primary via-primary/85 to-primary/70 bg-clip-text text-lg font-semibold tracking-tight text-transparent">
            Turistito
          </span>
        </Link>
        <nav
          className="hidden items-center justify-center gap-6 md:flex"
          aria-label="Secciones de la landing"
        >
          <Link
            href="#funcionalidades"
            className="rounded-full bg-background/45 px-3 py-1 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:text-primary"
          >
            Funcionalidades
          </Link>
          <Link
            href="#precios"
            className="rounded-full bg-background/45 px-3 py-1 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:text-primary"
          >
            Precios
          </Link>
          <Link
            href="#blog"
            className="rounded-full bg-background/45 px-3 py-1 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:text-primary"
          >
            Blog
          </Link>
        </nav>
        <nav
          className="flex items-center justify-end gap-2 sm:gap-3"
          aria-label="Principal"
        >
          <Link
            href="/auth/login"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "bg-background/50 text-foreground backdrop-blur-sm hover:bg-accent hover:text-primary"
            )}
          >
            Login
          </Link>
          <Link
            href="/auth/sign-up"
            className={cn(
              buttonVariants({ size: "sm" }),
              "border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
            )}
          >
            Signup
          </Link>
        </nav>
      </div>
    </header>
  )
}

import Link from "next/link"
import Image from "next/image"

import { LogoutButton } from "@/components/logout-button"

export function AppHeader() {
  return (
    <header className="border-b border-border/40 bg-background/85 backdrop-blur-sm dark:bg-zinc-950/85">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-sm font-semibold tracking-tight text-foreground"
        >
          <Image
            src="/turistito-logo.png"
            alt="Logo de Turistito"
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-cover"
            priority
          />
          <span>Turistito</span>
        </Link>
        <nav
          className="flex items-center gap-3 text-sm"
          aria-label="Sesión"
        >
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Inicio
          </Link>
          <LogoutButton />
        </nav>
      </div>
    </header>
  )
}

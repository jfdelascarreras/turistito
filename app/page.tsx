import type { Metadata } from "next"

import { LandingFooter } from "@/app/components/landing/landing-footer"
import { LandingHero } from "@/app/components/landing/landing-hero"
import { LandingNavbar } from "@/app/components/landing/landing-navbar"

export const metadata: Metadata = {
  title: "Turistito — Planificá tu próximo viaje",
  description:
    "Plataforma de turismo para descubrir destinos, organizar itinerarios y viajar con claridad.",
}

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden text-foreground">
      {/* Velo ligero: deja ver la animación del gradiente en <body> (.animated-bg) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-stone-50/35 dark:bg-zinc-950/40"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-screen flex-col">
        <LandingNavbar />
        <main className="flex flex-1 flex-col">
          <LandingHero />
        </main>
        <LandingFooter />
      </div>
    </div>
  )
}

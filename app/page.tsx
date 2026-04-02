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
    <div className="flex min-h-screen flex-col bg-background">
      <LandingNavbar />
      <main className="flex flex-1 flex-col">
        <LandingHero />
      </main>
      <LandingFooter />
    </div>
  )
}

import type { Metadata } from "next"

import { mockTours } from "@/lib/dashboard/mock-tours"
import { TourCard } from "@/app/components/dashboard/tour-card"

export const metadata: Metadata = {
  title: "Tours",
}

export default function DashboardToursPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
          Tours
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Cada tour combina tus fotos, una narración escrita y un audio guía. Los
          datos de abajo son de ejemplo para el diseño.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {mockTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  )
}

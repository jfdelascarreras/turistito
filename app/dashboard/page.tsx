import Link from "next/link"

import { mockTours } from "@/lib/dashboard/mock-tours"
import { TourCard } from "@/app/components/dashboard/tour-card"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function DashboardHomePage() {
  const preview = mockTours.slice(0, 2)

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
          Inicio
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Subí fotos de tus destinos y generamos una narración tipo guía de bolsillo,
          con texto y audio para escuchar en el camino.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card size="sm">
          <CardHeader>
            <CardTitle className="text-base">Tours activos</CardTitle>
            <CardDescription>Con audio listo</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-heading text-3xl font-semibold tabular-nums">
              {mockTours.filter((t) => t.status === "generado").length}
            </p>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle className="text-base">En proceso</CardTitle>
            <CardDescription>Generando narración o audio</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-heading text-3xl font-semibold tabular-nums">
              {mockTours.filter((t) => t.status === "procesando").length}
            </p>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle className="text-base">Siguiente paso</CardTitle>
            <CardDescription>Explorá todos tus tours</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/dashboard/tours"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Ver tours
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="font-heading text-lg font-semibold">Vista previa</h2>
            <p className="text-sm text-muted-foreground">
              Ejemplos con imágenes y audio ya generados (datos simulados).
            </p>
          </div>
          <Link
            href="/dashboard/tours"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Ir a Tours
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {preview.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </div>
  )
}

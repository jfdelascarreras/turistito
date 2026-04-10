import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { MockTour } from "@/lib/dashboard/mock-tours"

export interface TourCardProps {
  tour: MockTour
  className?: string
}

export function TourCard({ tour, className }: TourCardProps) {
  const isReady = tour.status === "generado" && tour.audioUrl.length > 0

  return (
    <Card className={cn("flex flex-col overflow-hidden", className)}>
      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <CardTitle className="text-lg">{tour.name}</CardTitle>
          <Badge
            variant={tour.status === "generado" ? "default" : "secondary"}
            className="shrink-0"
          >
            {tour.status === "generado" ? "Generado" : "Procesando"}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          Audio guía turístico · narración breve
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tour.imageUrls.map((src, i) => (
            <div
              key={`${tour.id}-img-${i}`}
              className="relative h-28 w-40 shrink-0 overflow-hidden rounded-lg ring-1 ring-border"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Narración
          </p>
          <ScrollArea className="h-24 rounded-md border bg-muted/30 p-3 text-sm leading-relaxed">
            {tour.narration}
          </ScrollArea>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Audio
          </p>
          {isReady ? (
            <audio
              controls
              className="h-10 w-full max-w-full"
              src={tour.audioUrl}
            >
              Tu navegador no reproduce audio embebido.
            </audio>
          ) : (
            <div className="flex flex-col gap-2 rounded-md border border-dashed bg-muted/20 p-3 text-sm text-muted-foreground">
              <p>El audio se generará cuando termine el procesamiento.</p>
              <Button type="button" variant="secondary" size="sm" disabled>
                Reproducir (pronto)
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/30 text-xs text-muted-foreground">
        ID tour · {tour.id}
      </CardFooter>
    </Card>
  )
}

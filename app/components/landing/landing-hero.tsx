import Link from "next/link"
import { Compass, Sparkles } from "lucide-react"

import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

export function LandingHeroBackground() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,oklch(var(--primary)/0.16),transparent)] dark:bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,oklch(var(--primary)/0.24),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 -z-10 size-[28rem] rounded-full bg-primary/10 blur-3xl dark:bg-primary/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 -z-10 size-[22rem] rounded-full bg-primary/15 blur-3xl dark:bg-primary/10"
        aria-hidden
      />
    </>
  )
}

export function LandingHero() {
  return (
    <section
      className="relative overflow-hidden border-b border-border/40 bg-transparent"
      aria-labelledby="turistito-hero-heading"
    >
      <LandingHeroBackground />

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-10 px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:pb-24 lg:pt-28">
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <p className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-card px-3 py-1 text-xs font-medium text-foreground shadow-sm lg:justify-start">
            <Sparkles className="size-3.5 text-primary" aria-hidden />
            Aventura y rutas memorables — tu próximo viaje empieza acá
          </p>
          <h1
            id="turistito-hero-heading"
            className="font-heading text-balance text-4xl font-extrabold tracking-tight text-foreground drop-shadow-[0_8px_24px_oklch(0.145_0_0_/_0.2)] sm:text-5xl md:text-6xl lg:text-[3.75rem] lg:leading-[1.05]"
          >
            <span className="bg-gradient-to-r from-primary via-primary/85 to-primary/70 bg-clip-text text-transparent">
              Guía Turístico AI
            </span>
            <span className="text-foreground">
              : tu copiloto inteligente para viajar mejor
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            Planificá tu viaje con recomendaciones personalizadas, itinerarios
            optimizados y respuestas en tiempo real para cada destino. Menos
            búsquedas infinitas, más experiencias memorables.
          </p>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/auth/sign-up"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 border-transparent bg-primary px-6 text-base text-primary-foreground shadow-md hover:bg-primary/90 sm:h-12 sm:min-w-[11rem]"
              )}
            >
              Crear cuenta gratis
            </Link>
            <Link
              href="/auth/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 border-border bg-background px-6 text-base text-foreground hover:bg-accent sm:h-12 sm:min-w-[11rem]"
              )}
            >
              Ya tengo cuenta
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            Sin tarjeta para empezar · Tu próxima aventura, en cualquier dispositivo
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md flex-1 lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl ring-1 ring-foreground/5">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-primary/20 dark:from-primary/25 dark:via-primary/10 dark:to-primary/15" />
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
              <div className="flex items-start justify-between gap-2">
                <div className="rounded-lg bg-card px-3 py-2 text-left shadow-sm ring-1 ring-primary/25 backdrop-blur-sm">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-primary">
                    Próxima aventura
                  </p>
                  <p className="font-heading text-sm font-semibold text-foreground">
                    Patagonia · 7 días
                  </p>
                </div>
                <div
                  className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary ring-1 ring-primary/35"
                  aria-hidden
                >
                  <Compass className="size-5" />
                </div>
              </div>
              <div className="space-y-2 rounded-xl bg-card/90 p-4 shadow-sm ring-1 ring-border/60 backdrop-blur-sm dark:bg-card/95 dark:ring-border/70">
                <div className="h-2 w-3/4 rounded-full bg-muted" />
                <div className="h-2 w-1/2 rounded-full bg-muted" />
                <div className="h-2 w-5/6 rounded-full bg-muted" />
                <p className="pt-1 text-xs text-muted-foreground">
                  Vista previa — rutas claras, espíritu de expedición
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

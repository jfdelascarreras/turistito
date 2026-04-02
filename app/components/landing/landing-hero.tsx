import Link from "next/link"
import { Compass, Plane, Sparkles } from "lucide-react"

import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

export function LandingHero() {
  return (
    <section
      className="relative overflow-hidden border-b border-border/40"
      aria-labelledby="turistito-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.92_0.08_230/0.35),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.35_0.08_230/0.25),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 -z-10 size-[28rem] rounded-full bg-primary/5 blur-3xl dark:bg-primary/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 -z-10 size-[22rem] rounded-full bg-amber-400/10 blur-3xl dark:bg-amber-500/5"
        aria-hidden
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-20 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:pb-32 lg:pt-24">
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <p className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200/90 bg-emerald-50/90 px-3 py-1 text-xs font-medium text-emerald-800 shadow-sm dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-200 lg:justify-start">
            <Sparkles className="size-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden />
            Tu espacio para planificar viajes memorables
          </p>
          <h1
            id="turistito-hero-heading"
            className="font-heading text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
          >
            <span className="bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent dark:from-sky-400 dark:via-teal-400 dark:to-emerald-400">
              Turistito
            </span>
            <span className="text-slate-800 dark:text-slate-100">
              : turismo claro, simple y a tu ritmo
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0 dark:text-slate-300">
            <span className="font-medium text-sky-700 dark:text-sky-300">
              Descubrí destinos
            </span>
            , organizá tu itinerario y{" "}
            <span className="font-medium text-emerald-700 dark:text-emerald-400">
              viví experiencias
            </span>{" "}
            sin el caos de mil pestañas. Una plataforma pensada para viajeros que
            quieren enfocarse en lo importante:{" "}
            <span className="font-medium text-amber-700 dark:text-amber-400">
              disfrutar el viaje
            </span>
            .
          </p>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <div className="relative inline-flex items-center justify-center">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 size-[8rem] -translate-x-1/2 -translate-y-1/2 animate-turistito-orbit sm:size-[8.5rem]"
                aria-hidden
              >
                <div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 animate-turistito-orbit-counter">
                  <Plane
                    className="size-5 text-sky-500 drop-shadow-sm dark:text-sky-400"
                    strokeWidth={2.25}
                  />
                </div>
              </div>
              <Link
                href="/auth/sign-up"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "relative z-10 h-11 px-6 text-base shadow-md sm:h-12 sm:min-w-[12.5rem]"
                )}
              >
                Crear una cuenta gratis
              </Link>
            </div>
            <Link
              href="/auth/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 border-border/80 bg-background/50 px-6 text-base sm:h-12 sm:min-w-[11rem]"
              )}
            >
              Ya tengo cuenta
            </Link>
          </div>
          <p className="text-xs text-sky-700/90 dark:text-sky-300/90">
            Sin tarjeta para empezar · Accedé desde cualquier dispositivo
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md flex-1 lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl ring-1 ring-foreground/5">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-amber-500/15 dark:from-sky-400/15 dark:to-amber-500/10" />
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
              <div className="flex items-start justify-between gap-2">
                <div className="rounded-lg bg-background/90 px-3 py-2 text-left shadow-sm ring-1 ring-sky-200/70 backdrop-blur-sm dark:bg-card/95 dark:ring-sky-800/50">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-sky-600 dark:text-sky-400">
                    Próximo viaje
                  </p>
                  <p className="font-heading text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Patagonia · 7 días
                  </p>
                </div>
                <div
                  className="flex size-10 items-center justify-center rounded-full bg-sky-100 text-sky-700 ring-1 ring-sky-200/80 dark:bg-sky-950/60 dark:text-sky-300 dark:ring-sky-800/60"
                  aria-hidden
                >
                  <Compass className="size-5" />
                </div>
              </div>
              <div className="space-y-2 rounded-xl bg-background/85 p-4 shadow-sm ring-1 ring-border/50 backdrop-blur-sm dark:bg-card/90">
                <div className="h-2 w-3/4 rounded-full bg-muted" />
                <div className="h-2 w-1/2 rounded-full bg-muted" />
                <div className="h-2 w-5/6 rounded-full bg-muted" />
                <p className="pt-1 text-xs text-teal-700/90 dark:text-teal-300/90">
                  Vista previa del panel — diseño limpio tipo SaaS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

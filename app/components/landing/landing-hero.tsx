import Link from "next/link"
import { Compass, Sparkles } from "lucide-react"

import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

export function LandingHero() {
  return (
    <section
      className="relative overflow-hidden border-b border-border/40 bg-transparent"
      aria-labelledby="turistito-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,rgba(75,83,32,0.14),transparent)] dark:bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,rgba(107,117,56,0.2),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 -z-10 size-[28rem] rounded-full bg-adventure-olive/10 blur-3xl dark:bg-adventure-sage/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 -z-10 size-[22rem] rounded-full bg-amber-400/15 blur-3xl dark:bg-amber-500/10"
        aria-hidden
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-20 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:pb-32 lg:pt-24">
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <p className="inline-flex items-center justify-center gap-2 rounded-full border border-adventure-olive/35 bg-white px-3 py-1 text-xs font-medium text-adventure-olive-deep shadow-sm dark:border-adventure-sage/50 dark:bg-zinc-900 dark:text-zinc-100 lg:justify-start">
            <Sparkles className="size-3.5 text-adventure-olive dark:text-adventure-moss" aria-hidden />
            Aventura y rutas memorables — tu próximo viaje empieza acá
          </p>
          <h1
            id="turistito-hero-heading"
            className="font-heading text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
          >
            <span className="bg-gradient-to-r from-adventure-olive-deep via-adventure-olive to-adventure-olive-light bg-clip-text text-transparent dark:from-adventure-moss dark:via-adventure-sage dark:to-adventure-olive-light">
              Turistito
            </span>
            <span className="text-slate-800 dark:text-zinc-100">
              : turismo claro, simple y a tu ritmo
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-slate-700 sm:text-lg lg:mx-0 dark:text-zinc-300">
            <span className="font-medium text-adventure-olive-deep dark:text-emerald-400">
              Descubrí destinos
            </span>
            , trazá rutas y{" "}
            <span className="font-medium text-adventure-olive dark:text-emerald-300">
              viví la aventura
            </span>{" "}
            sin el caos de mil pestañas. Pensado para quienes buscan{" "}
            <span className="font-medium text-adventure-olive-mid dark:text-lime-200">
              explorar
            </span>{" "}
            y{" "}
            <span className="font-medium text-amber-800 dark:text-amber-300">
              disfrutar cada kilómetro
            </span>
            .
          </p>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/auth/sign-up"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 border-transparent bg-adventure-olive px-6 text-base text-white shadow-md hover:bg-adventure-olive-deep sm:h-12 sm:min-w-[11rem] dark:hover:bg-adventure-olive-mid"
              )}
            >
              Crear cuenta gratis
            </Link>
            <Link
              href="/auth/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 border-adventure-olive/45 bg-white px-6 text-base text-adventure-olive-deep hover:bg-stone-50 dark:border-adventure-sage/50 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 sm:h-12 sm:min-w-[11rem]"
              )}
            >
              Ya tengo cuenta
            </Link>
          </div>
          <p className="text-xs text-slate-600 dark:text-zinc-400">
            Sin tarjeta para empezar · Tu próxima aventura, en cualquier dispositivo
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md flex-1 lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl ring-1 ring-foreground/5">
            <div className="absolute inset-0 bg-gradient-to-br from-adventure-olive/15 via-adventure-sage/5 to-amber-500/18 dark:from-adventure-olive/25 dark:via-adventure-sage/10 dark:to-amber-500/15" />
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
              <div className="flex items-start justify-between gap-2">
                <div className="rounded-lg bg-white px-3 py-2 text-left shadow-sm ring-1 ring-adventure-olive/25 backdrop-blur-sm dark:bg-zinc-900 dark:ring-adventure-sage/40">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-adventure-olive dark:text-emerald-400">
                    Próxima aventura
                  </p>
                  <p className="font-heading text-sm font-semibold text-adventure-olive-deep dark:text-zinc-50">
                    Patagonia · 7 días
                  </p>
                </div>
                <div
                  className="flex size-10 items-center justify-center rounded-full bg-adventure-olive/20 text-adventure-olive-deep ring-1 ring-adventure-olive/35 dark:bg-adventure-olive/35 dark:text-emerald-300 dark:ring-adventure-sage/50"
                  aria-hidden
                >
                  <Compass className="size-5" />
                </div>
              </div>
              <div className="space-y-2 rounded-xl bg-white/90 p-4 shadow-sm ring-1 ring-border/60 backdrop-blur-sm dark:bg-zinc-900/95 dark:ring-zinc-700/60">
                <div className="h-2 w-3/4 rounded-full bg-muted" />
                <div className="h-2 w-1/2 rounded-full bg-muted" />
                <div className="h-2 w-5/6 rounded-full bg-muted" />
                <p className="pt-1 text-xs text-slate-600 dark:text-zinc-400">
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

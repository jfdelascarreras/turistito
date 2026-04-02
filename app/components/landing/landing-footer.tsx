import Link from "next/link"

export function LandingFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center text-sm text-slate-600 sm:flex-row sm:text-left sm:px-6 lg:px-8 dark:text-slate-400">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-emerald-700 dark:text-emerald-400">
            Turistito
          </span>
          . Todos los derechos reservados.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
          <Link
            href="/auth/login"
            className="text-sky-700 transition-colors hover:text-sky-900 dark:text-sky-400 dark:hover:text-sky-200"
          >
            Login
          </Link>
          <Link
            href="/auth/sign-up"
            className="font-medium text-emerald-700 transition-colors hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Signup
          </Link>
        </div>
      </div>
    </footer>
  )
}

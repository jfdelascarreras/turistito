import Link from "next/link"

export function LandingFooter() {
  return (
    <footer className="border-t border-adventure-olive/20 bg-stone-100 py-10 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center text-sm text-slate-700 sm:flex-row sm:text-left sm:px-6 lg:px-8 dark:text-zinc-300">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-adventure-olive-deep dark:text-emerald-400">
            Turistito
          </span>
          . Todos los derechos reservados.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
          <Link
            href="/auth/login"
            className="text-adventure-olive-deep underline-offset-4 transition-colors hover:text-adventure-olive hover:underline dark:text-zinc-200 dark:hover:text-white"
          >
            Login
          </Link>
          <Link
            href="/auth/sign-up"
            className="font-medium text-adventure-olive transition-colors hover:text-adventure-olive-deep dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Signup
          </Link>
        </div>
      </div>
    </footer>
  )
}

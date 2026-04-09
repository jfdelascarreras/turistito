import Link from "next/link"

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center text-sm text-muted-foreground sm:flex-row sm:text-left sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-foreground">
            Turistito
          </span>
          . Todos los derechos reservados.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
          <Link
            href="/auth/login"
            className="text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Login
          </Link>
          <Link
            href="/auth/sign-up"
            className="font-medium text-primary transition-colors hover:text-primary/85"
          >
            Signup
          </Link>
        </div>
      </div>
    </footer>
  )
}

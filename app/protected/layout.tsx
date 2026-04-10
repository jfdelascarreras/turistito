import { AppHeader } from "@/app/components/app/app-header"

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative flex min-h-svh flex-col overflow-x-hidden text-foreground">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-stone-50/78 dark:bg-zinc-950/72"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-svh flex-col">
        <AppHeader />
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </div>
  )
}

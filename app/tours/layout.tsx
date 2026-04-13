import type { Metadata } from "next"

import { DashboardShell } from "@/app/components/dashboard/dashboard-shell"

export const metadata: Metadata = {
  title: "Tours",
  description: "Creá y gestioná tus tours con imagen, narración y audio.",
}

export default function ToursLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardShell>{children}</DashboardShell>
}

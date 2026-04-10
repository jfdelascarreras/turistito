import type { Metadata } from "next"

import { DashboardShell } from "@/app/components/dashboard/dashboard-shell"

export const metadata: Metadata = {
  title: "Panel",
  description: "Gestioná tus tours y audio guías.",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardShell>{children}</DashboardShell>
}

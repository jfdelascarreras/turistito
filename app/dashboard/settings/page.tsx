import type { Metadata } from "next"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Ajustes",
}

export default function DashboardSettingsPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
          Ajustes
        </h1>
        <p className="text-muted-foreground">
          Preferencias de cuenta y de la app (contenido de ejemplo).
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cuenta</CardTitle>
          <CardDescription>
            Datos vinculados a tu sesión de Supabase Auth.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Correo</Label>
            <p className="text-sm text-muted-foreground">
              Gestionado desde el proveedor de autenticación.
            </p>
          </div>
          <Separator />
          <div className="grid gap-2">
            <Label>Notificaciones</Label>
            <p className="text-sm text-muted-foreground">
              Próximamente: avisos cuando un audio tour termine de generarse.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

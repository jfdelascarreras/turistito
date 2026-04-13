"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  useActionState,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react"

import { createTour, deleteTour, updateTour } from "@/app/actions/tours"
import type { TourListItem, TourStatus } from "@/types/database.types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

interface ToursManagerProps {
  initialTours: TourListItem[]
  loadError?: string
}

export function ToursManager({ initialTours, loadError }: ToursManagerProps) {
  const router = useRouter()
  const [tours, setTours] = useState(initialTours)
  const [createOpen, setCreateOpen] = useState(false)
  const [editTour, setEditTour] = useState<TourListItem | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const [createState, createAction, createPending] = useActionState(createTour, {
    ok: false,
  })

  useEffect(() => {
    setTours(initialTours)
  }, [initialTours])

  useEffect(() => {
    if (createState.ok) {
      setCreateOpen(false)
      router.refresh()
    }
  }, [createState.ok, router])

  const sorted = useMemo(
    () => [...tours].sort((a, b) => b.created_at.localeCompare(a.created_at)),
    [tours]
  )

  async function handleUpdate() {
    if (!editTour) return
    startTransition(async () => {
      const res = await updateTour({
        id: editTour.id,
        title: editTour.title,
        content: editTour.content,
        status: editTour.status,
      })
      if (res.ok) {
        setTours((prev) =>
          prev.map((t) =>
            t.id === editTour.id
              ? {
                  ...t,
                  title: editTour.title,
                  content: editTour.content,
                  status: editTour.status,
                }
              : t
          )
        )
        setEditTour(null)
        router.refresh()
      }
    })
  }

  function confirmDelete() {
    if (!deleteId) return
    const id = deleteId
    startTransition(async () => {
      const res = await deleteTour(id)
      if (res.ok) {
        setTours((prev) => prev.filter((t) => t.id !== id))
        setDeleteId(null)
        router.refresh()
      }
    })
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
            Tours
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            CRUD de tours: imagen en Storage, título, descripción (IA), audio
            (ElevenLabs) y estado.
          </p>
          {loadError ? (
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Aviso: {loadError}
            </p>
          ) : null}
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger render={<Button type="button" />}>
            Nuevo tour
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Crear tour</DialogTitle>
              <DialogDescription>
                Subí una imagen y un título. La descripción y el audio se completan
                cuando conectes IA y ElevenLabs.
              </DialogDescription>
            </DialogHeader>
            <form action={createAction} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Ej. Mirador del Fitz Roy"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Imagen</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  required
                />
              </div>
              {createState.error ? (
                <p className="text-sm text-destructive">{createState.error}</p>
              ) : null}
              <DialogFooter>
                <Button type="submit" disabled={createPending}>
                  {createPending ? "Creando…" : "Crear"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado</CardTitle>
          <CardDescription>
            {sorted.length === 0
              ? "Todavía no hay tours. Creá uno con una imagen."
              : `${sorted.length} tour(s)`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Imagen</TableHead>
                <TableHead>Título</TableHead>
                <TableHead className="max-w-[200px]">Descripción</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Audio</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((tour) => (
                <TableRow key={tour.id}>
                  <TableCell>
                    <div className="relative size-16 overflow-hidden rounded-md bg-muted">
                      {tour.imageSignedUrl ? (
                        <Image
                          src={tour.imageSignedUrl}
                          alt=""
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <span className="flex size-full items-center justify-center text-xs text-muted-foreground">
                          —
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{tour.title}</TableCell>
                  <TableCell className="max-w-[220px] truncate text-muted-foreground">
                    {tour.content ?? "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tour.status === "complete" ? "default" : "secondary"
                      }
                    >
                      {tour.status === "complete" ? "Completo" : "Procesando"}
                    </Badge>
                  </TableCell>
                  <TableCell className="min-w-[180px]">
                    {tour.audioSignedUrl ? (
                      <audio
                        controls
                        className="h-8 w-full max-w-[200px]"
                        src={tour.audioSignedUrl}
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={() => setEditTour({ ...tour })}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        type="button"
                        onClick={() => setDeleteId(tour.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este tour?</AlertDialogTitle>
            <AlertDialogDescription>
              Se borrarán la fila y los archivos en Storage asociados a tu usuario.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              type="button"
              variant="destructive"
              onClick={confirmDelete}
              disabled={pending}
            >
              {pending ? "Eliminando…" : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={editTour !== null}
        onOpenChange={(o) => !o && setEditTour(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Editar tour</DialogTitle>
            <DialogDescription>
              Actualizá título, descripción y estado. Las rutas de imagen/audio en
              Storage no se editan desde acá.
            </DialogDescription>
          </DialogHeader>
          {editTour ? (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Título</Label>
                <Input
                  id="edit-title"
                  value={editTour.title}
                  onChange={(e) =>
                    setEditTour((t) =>
                      t ? { ...t, title: e.target.value } : t
                    )
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-content">Descripción (IA / Vision)</Label>
                <Textarea
                  id="edit-content"
                  rows={5}
                  value={editTour.content ?? ""}
                  onChange={(e) =>
                    setEditTour((t) =>
                      t ? { ...t, content: e.target.value || null } : t
                    )
                  }
                  placeholder="Texto generado por el modelo…"
                />
              </div>
              <div className="grid gap-2">
                <Label>Estado</Label>
                <Select
                  value={editTour.status}
                  onValueChange={(v) => {
                    if (!v) return
                    setEditTour((t) =>
                      t ? { ...t, status: v as TourStatus } : t
                    )
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="processing">Procesando</SelectItem>
                    <SelectItem value="complete">Completo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditTour(null)}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  onClick={handleUpdate}
                  disabled={pending}
                >
                  {pending ? "Guardando…" : "Guardar"}
                </Button>
              </DialogFooter>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { createClient } from "@/lib/supabase/server"
import type { TourListItem, TourRow, TourStatus } from "@/types/database.types"

const BUCKET_IMAGES = "tour-images"
const BUCKET_AUDIO = "tour-audio"
const SIGNED_URL_SEC = 3600

const createTourFields = z.object({
  title: z.string().min(1, "El título es obligatorio").max(200),
})

const updateTourFields = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  content: z.string().max(50000).optional().nullable(),
  status: z.enum(["processing", "complete"]).optional(),
})

const deleteTourFields = z.object({
  id: z.string().uuid(),
})

function extFromFile(file: File): string {
  const name = file.name
  const dot = name.lastIndexOf(".")
  if (dot >= 0) {
    const ext = name.slice(dot + 1).toLowerCase()
    if (ext && /^[a-z0-9]+$/.test(ext)) return ext
  }
  if (file.type === "image/png") return "png"
  if (file.type === "image/webp") return "webp"
  if (file.type === "image/gif") return "gif"
  return "jpg"
}

async function signPath(
  bucket: string,
  path: string
): Promise<string | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, SIGNED_URL_SEC)
  if (error || !data?.signedUrl) return null
  return data.signedUrl
}

async function rowToListItem(row: TourRow): Promise<TourListItem> {
  const [imageSignedUrl, audioSignedUrl] = await Promise.all([
    signPath(BUCKET_IMAGES, row.image),
    row.audio ? signPath(BUCKET_AUDIO, row.audio) : Promise.resolve(null),
  ])
  return {
    ...row,
    imageSignedUrl,
    audioSignedUrl,
  }
}

export async function getTours(): Promise<{
  tours: TourListItem[]
  error?: string
}> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { tours: [], error: "No autenticado" }
  }

  const { data, error } = await supabase
    .from("tours")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    return { tours: [], error: error.message }
  }

  const rows = (data ?? []) as TourRow[]
  const tours = await Promise.all(rows.map(rowToListItem))
  return { tours }
}

export async function getTour(
  id: string
): Promise<{ tour: TourListItem | null; error?: string }> {
  const parsed = z.string().uuid().safeParse(id)
  if (!parsed.success) {
    return { tour: null, error: "ID inválido" }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { tour: null, error: "No autenticado" }
  }

  const { data, error } = await supabase
    .from("tours")
    .select("*")
    .eq("id", parsed.data)
    .eq("user_id", user.id)
    .maybeSingle()

  if (error) {
    return { tour: null, error: error.message }
  }
  if (!data) {
    return { tour: null, error: "No encontrado" }
  }

  const tour = await rowToListItem(data as TourRow)
  return { tour }
}

export async function createTour(
  _prev: unknown,
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const titleRaw = formData.get("title")
  const file = formData.get("image")

  const fields = createTourFields.safeParse({
    title: typeof titleRaw === "string" ? titleRaw : "",
  })
  if (!fields.success) {
    const msg = fields.error.issues[0]?.message ?? "Datos inválidos"
    return { ok: false, error: msg }
  }

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Subí una imagen" }
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"]
  if (!allowed.includes(file.type)) {
    return { ok: false, error: "Formato de imagen no permitido" }
  }

  if (file.size > 10 * 1024 * 1024) {
    return { ok: false, error: "La imagen supera 10 MB" }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { ok: false, error: "No autenticado" }
  }

  const ext = extFromFile(file)
  const objectPath = `${user.id}/${crypto.randomUUID()}.${ext}`
  const bytes = new Uint8Array(await file.arrayBuffer())

  const { error: upErr } = await supabase.storage
    .from(BUCKET_IMAGES)
    .upload(objectPath, bytes, {
      contentType: file.type,
      upsert: false,
    })

  if (upErr) {
    return { ok: false, error: upErr.message }
  }

  const { error: insErr } = await supabase.from("tours").insert({
    user_id: user.id,
    image: objectPath,
    title: fields.data.title,
    status: "processing",
  })

  if (insErr) {
    await supabase.storage.from(BUCKET_IMAGES).remove([objectPath])
    return { ok: false, error: insErr.message }
  }

  revalidatePath("/tours")
  revalidatePath("/dashboard")
  return { ok: true }
}

export async function updateTour(input: {
  id: string
  title?: string
  content?: string | null
  status?: TourStatus
}): Promise<{ ok: boolean; error?: string }> {
  const parsed = updateTourFields.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: "Datos inválidos" }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { ok: false, error: "No autenticado" }
  }

  const { id, ...rest } = parsed.data
  const patch: Record<string, unknown> = {}
  if (rest.title !== undefined) patch.title = rest.title
  if (rest.content !== undefined) patch.content = rest.content
  if (rest.status !== undefined) patch.status = rest.status

  if (Object.keys(patch).length === 0) {
    return { ok: true }
  }

  const { error } = await supabase
    .from("tours")
    .update(patch)
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) {
    return { ok: false, error: error.message }
  }

  revalidatePath("/tours")
  revalidatePath("/dashboard")
  return { ok: true }
}

/** Actualiza la ruta del audio en Storage (p. ej. tras ElevenLabs). */
export async function attachTourAudio(
  tourId: string,
  audioPath: string
): Promise<{ ok: boolean; error?: string }> {
  const id = z.string().uuid().parse(tourId)
  const path = z.string().min(1).max(1024).parse(audioPath)

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { ok: false, error: "No autenticado" }
  }

  const { error } = await supabase
    .from("tours")
    .update({ audio: path, status: "complete" })
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) {
    return { ok: false, error: error.message }
  }

  revalidatePath("/tours")
  return { ok: true }
}

export async function deleteTour(id: string): Promise<{ ok: boolean; error?: string }> {
  const parsed = deleteTourFields.safeParse({ id })
  if (!parsed.success) {
    return { ok: false, error: "ID inválido" }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { ok: false, error: "No autenticado" }
  }

  const { data: row, error: fetchErr } = await supabase
    .from("tours")
    .select("image, audio")
    .eq("id", parsed.data.id)
    .eq("user_id", user.id)
    .maybeSingle()

  if (fetchErr || !row) {
    return { ok: false, error: fetchErr?.message ?? "No encontrado" }
  }

  const { image, audio } = row as { image: string; audio: string | null }

  const { error: rmImg } = await supabase.storage.from(BUCKET_IMAGES).remove([image])
  if (rmImg) {
    console.error("remove tour image:", rmImg.message)
  }

  if (audio) {
    const { error: rmAud } = await supabase.storage.from(BUCKET_AUDIO).remove([audio])
    if (rmAud) {
      console.error("remove tour audio:", rmAud.message)
    }
  }

  const { error: delErr } = await supabase
    .from("tours")
    .delete()
    .eq("id", parsed.data.id)
    .eq("user_id", user.id)

  if (delErr) {
    return { ok: false, error: delErr.message }
  }

  revalidatePath("/tours")
  revalidatePath("/dashboard")
  return { ok: true }
}

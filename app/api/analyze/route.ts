import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'
import { createServiceRoleClient } from '@/lib/supabase/service-role'

export const maxDuration = 60

const BUCKET = 'uploads'

/**
 * `gemini-1.5-flash` ya no existe en la API v1 (404). Modelo estable actual.
 * Override opcional: `GOOGLE_GENERATIVE_AI_MODEL` (sin prefijo `models/`).
 */
const DEFAULT_MODEL = 'gemini-2.5-flash'

const GENAI_REQUEST_OPTIONS = { apiVersion: 'v1' as const }

function resolveModelId(): string {
  const raw = process.env.GOOGLE_GENERATIVE_AI_MODEL?.trim()
  if (!raw) return DEFAULT_MODEL
  return raw.replace(/^models\//, '')
}

const ANALYSIS_PROMPT =
  'Analiza la imagen y responde ÚNICAMENTE en formato JSON con la siguiente estructura: {"ubicacion": "Ciudad, País", "descripcion": "Relato tipo guía turístico"}. Identifica el lugar exacto según los elementos visuales.'

const ALLOWED_IMAGE_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
])

function guessMimeFromPath(path: string): string {
  const lower = path.toLowerCase()
  if (lower.endsWith('.png')) return 'image/png'
  if (lower.endsWith('.webp')) return 'image/webp'
  if (lower.endsWith('.gif')) return 'image/gif'
  return 'image/jpeg'
}

function resolveImageMimeType(
  path: string,
  blobType: string | undefined
): string {
  const fromBlob = blobType?.split(';')[0]?.trim().toLowerCase()
  if (fromBlob && ALLOWED_IMAGE_MIME.has(fromBlob)) {
    return fromBlob
  }
  return guessMimeFromPath(path)
}

/** Base64 sin espacios ni prefijos data-URL para inlineData. */
function purifyBase64(raw: string): string {
  const s = raw.replace(/\s/g, '')
  const dataUrl = /^data:image\/[\w+.-]+;base64,(.+)$/i.exec(s)
  return dataUrl ? dataUrl[1] : s
}

/** Quita cercas ```json ... ``` si el modelo las añade. */
function extractJsonObject(raw: string): string {
  const trimmed = raw.trim()
  const fence = /^```(?:json)?\s*([\s\S]*?)```$/m.exec(trimmed)
  if (fence) return fence[1].trim()
  return trimmed
}

function parseAnalysisJson(raw: string): {
  ubicacion: string
  descripcion: string
} {
  const jsonStr = extractJsonObject(raw)
  let parsed: unknown
  try {
    parsed = JSON.parse(jsonStr) as unknown
  } catch {
    throw new Error('Respuesta del modelo no es JSON válido.')
  }
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('JSON inválido.')
  }
  const o = parsed as Record<string, unknown>
  const ubicacion = typeof o.ubicacion === 'string' ? o.ubicacion.trim() : ''
  const descripcion = typeof o.descripcion === 'string' ? o.descripcion.trim() : ''
  if (!ubicacion || !descripcion) {
    throw new Error('Faltan "ubicacion" o "descripcion" en el JSON.')
  }
  return { ubicacion, descripcion }
}

async function describeImageWithGemini(
  base64Raw: string,
  mimeType: string
): Promise<{
  ubicacion: string
  descripcion: string
  modelUsed: string
}> {
  const modelId = resolveModelId()
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!)

  const data = purifyBase64(base64Raw)

  const model = genAI.getGenerativeModel(
    { model: modelId },
    GENAI_REQUEST_OPTIONS
  )

  const result = await model.generateContent(
    {
      contents: [
        {
          role: 'user' as const,
          parts: [
            { text: ANALYSIS_PROMPT },
            {
              inlineData: {
                mimeType,
                data,
              },
            },
          ],
        },
      ],
    },
    GENAI_REQUEST_OPTIONS
  )

  const text = result.response.text()?.trim()
  if (!text) {
    throw new Error('Respuesta vacía del modelo.')
  }
  const parsed = parseAnalysisJson(text)
  return { ...parsed, modelUsed: modelId }
}

export async function POST(request: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return NextResponse.json(
      { error: 'Falta GOOGLE_GENERATIVE_AI_API_KEY en el servidor.' },
      { status: 503 }
    )
  }

  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  let body: { path?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const path = typeof body.path === 'string' ? body.path.trim() : ''
  if (!path || !path.startsWith(`${user.id}/`)) {
    return NextResponse.json(
      { error: 'Ruta de imagen inválida o no permitida.' },
      { status: 403 }
    )
  }

  try {
    const admin = createServiceRoleClient()
    const { data: fileBlob, error: downloadError } = await admin.storage
      .from(BUCKET)
      .download(path)

    if (downloadError || !fileBlob) {
      return NextResponse.json(
        { error: 'No se pudo descargar la imagen desde Storage.' },
        { status: 502 }
      )
    }

    const buffer = Buffer.from(await fileBlob.arrayBuffer())
    const base64Raw = buffer.toString('base64')
    const mimeType = resolveImageMimeType(path, fileBlob.type)

    const analysis = await describeImageWithGemini(base64Raw, mimeType)

    return NextResponse.json({
      ubicacion: analysis.ubicacion,
      descripcion: analysis.descripcion,
      model: analysis.modelUsed,
      mimeType,
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Error interno'
    if (message.includes('SUPABASE_SERVICE_ROLE_KEY')) {
      return NextResponse.json(
        {
          error:
            'Servidor sin credencial de servicio (SUPABASE_SERVICE_ROLE_KEY).',
        },
        { status: 503 }
      )
    }
    console.error('[analyze]', e)
    return NextResponse.json({ error: message }, { status: 502 })
  }
}

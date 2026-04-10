import { NextResponse } from 'next/server'

import {
  isAllowedImageType,
  MAX_IMAGE_BYTES,
  sanitizeUploadFileName,
} from '@/lib/validation/image-upload'
import { createClient } from '@/lib/supabase/server'
import { createServiceRoleClient } from '@/lib/supabase/service-role'

const BUCKET = 'uploads'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const formData = await request.formData()
    const entry = formData.get('file')
    if (!entry || !(entry instanceof File)) {
      return NextResponse.json(
        { error: 'Falta el archivo (campo "file")' },
        { status: 400 }
      )
    }

    if (entry.size > MAX_IMAGE_BYTES) {
      return NextResponse.json(
        { error: `El archivo supera ${MAX_IMAGE_BYTES / 1024 / 1024} MB` },
        { status: 400 }
      )
    }

    if (!isAllowedImageType(entry.type)) {
      return NextResponse.json(
        { error: 'Tipo no permitido. Usá JPEG, PNG, WebP o GIF.' },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await entry.arrayBuffer())
    const safeName = sanitizeUploadFileName(entry.name)
    const path = `${user.id}/${crypto.randomUUID()}-${safeName}`

    const admin = createServiceRoleClient()
    const { error: uploadError } = await admin.storage
      .from(BUCKET)
      .upload(path, buffer, {
        contentType: entry.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('[upload]', uploadError)
      return NextResponse.json(
        { error: 'No se pudo subir la imagen. Revisá el bucket en Supabase.' },
        { status: 500 }
      )
    }

    const { data: urlData } = admin.storage.from(BUCKET).getPublicUrl(path)

    return NextResponse.json({
      path,
      url: urlData.publicUrl,
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
    console.error('[upload]', e)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

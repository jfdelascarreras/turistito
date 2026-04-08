import { redirect } from 'next/navigation'

import { ImageUpload } from '@/app/components/images/image-upload'
import { createClient } from '@/lib/supabase/server'

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  return (
    <div className="flex flex-1 flex-col items-center gap-10 px-4 py-12">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-muted-foreground">
          Sesión iniciada como{" "}
          <span className="font-medium text-foreground">
            {String(data.claims.email ?? "")}
          </span>
        </p>
        <p className="text-sm text-muted-foreground">
          Probá subir una imagen y generar una descripción tipo guía turístico.
        </p>
      </div>
      <ImageUpload />
    </div>
  )
}

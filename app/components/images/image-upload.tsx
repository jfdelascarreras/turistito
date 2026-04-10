'use client'

import { useCallback, useId, useState } from 'react'
import { ImageIcon, Loader2, Sparkles, Upload } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
  className?: string
}

interface AnalysisResult {
  ubicacion: string
  descripcion: string
}

export function ImageUpload({ className }: ImageUploadProps) {
  const inputId = useId()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [storagePath, setStoragePath] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)

  const resetPreview = useCallback(() => {
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    setPreview(null)
  }, [preview])

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setAnalysis(null)
    setStoragePath(null)
    const f = e.target.files?.[0]
    if (!f) {
      setFile(null)
      resetPreview()
      return
    }
    setFile(f)
    resetPreview()
    setPreview(URL.createObjectURL(f))
  }

  const upload = async () => {
    if (!file) return
    setUploading(true)
    setError(null)
    setAnalysis(null)
    try {
      const fd = new FormData()
      fd.set('file', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      })
      const data = (await res.json()) as { error?: string; path?: string }
      if (!res.ok) {
        throw new Error(data.error ?? 'Error al subir')
      }
      if (!data.path) {
        throw new Error('Respuesta inválida del servidor')
      }
      setStoragePath(data.path)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al subir')
    } finally {
      setUploading(false)
    }
  }

  const analyze = async () => {
    if (!storagePath) return
    setAnalyzing(true)
    setError(null)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: storagePath }),
      })
      const data = (await res.json()) as {
        error?: string
        ubicacion?: string
        descripcion?: string
      }
      if (!res.ok) {
        throw new Error(data.error ?? 'Error al analizar')
      }
      if (!data.ubicacion || !data.descripcion) {
        throw new Error('Respuesta incompleta del análisis')
      }
      setAnalysis({ ubicacion: data.ubicacion, descripcion: data.descripcion })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al analizar')
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <Card className={cn('w-full max-w-lg', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ImageIcon className="size-5" aria-hidden />
          Imagen y análisis
        </CardTitle>
        <CardDescription>
          Subí una foto y obtené ubicación estimada y descripción tipo guía con
          Gemini (visión).
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor={inputId}>Archivo de imagen</Label>
          <input
            id={inputId}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="text-sm file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium"
            onChange={onFileChange}
          />
          <p className="text-xs text-muted-foreground">
            JPEG, PNG, WebP o GIF · máx. 4 MB
          </p>
        </div>

        {preview && (
          <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Vista previa de la imagen seleccionada"
              className="max-h-56 w-full object-contain"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            disabled={!file || uploading || !!storagePath}
            onClick={upload}
            aria-label={
              storagePath
                ? 'Imagen ya subida'
                : uploading
                  ? 'Subiendo imagen'
                  : 'Subir imagen a Storage'
            }
          >
            {uploading ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                Subiendo…
              </>
            ) : storagePath ? (
              <>Subida!</>
            ) : (
              <>
                <Upload className="size-4" aria-hidden />
                Subir a Storage
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={!storagePath || analyzing}
            onClick={analyze}
          >
            {analyzing ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                Analizando…
              </>
            ) : (
              <>
                <Sparkles className="size-4" aria-hidden />
                Analizar imagen
              </>
            )}
          </Button>
        </div>

        {storagePath && (
          <p className="break-all text-xs text-muted-foreground">
            Ruta: {storagePath}
          </p>
        )}

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        {analysis && (
          <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm leading-relaxed">
            <p className="mb-1 font-medium text-foreground">Ubicación</p>
            <p className="mb-3 text-muted-foreground">{analysis.ubicacion}</p>
            <p className="mb-1 font-medium text-foreground">Descripción</p>
            <p className="whitespace-pre-wrap text-muted-foreground">
              {analysis.descripcion}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

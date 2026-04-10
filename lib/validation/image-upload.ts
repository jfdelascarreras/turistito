const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
])

/** Alineado con límites típicos de body en API Routes (p. ej. Vercel ~4 MB). */
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024

export function isAllowedImageType(mime: string): boolean {
  return ALLOWED_TYPES.has(mime)
}

export function sanitizeUploadFileName(name: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120)
  return base || 'image'
}

/**
 * Tipos alineados con el schema de Supabase (tabla `tours` y enum `tour_status`).
 * Regenerá con: `pnpm exec supabase gen types typescript --linked > types/database.types.ts`
 * cuando quieras sincronizar todo el proyecto.
 */

export type TourStatus = "processing" | "complete"

export interface TourRow {
  id: string
  user_id: string
  image: string
  title: string
  content: string | null
  audio: string | null
  status: TourStatus
  created_at: string
  updated_at: string
}

export interface TourInsert {
  user_id: string
  image: string
  title: string
  content?: string | null
  audio?: string | null
  status?: TourStatus
}

export interface TourUpdate {
  title?: string
  content?: string | null
  audio?: string | null
  status?: TourStatus
}

/** Fila lista para UI con URLs firmadas de Storage */
export interface TourListItem extends TourRow {
  imageSignedUrl: string | null
  audioSignedUrl: string | null
}

export interface Database {
  public: {
    Tables: {
      tours: {
        Row: TourRow
        Insert: TourInsert
        Update: TourUpdate
      }
    }
    Enums: {
      tour_status: TourStatus
    }
  }
}

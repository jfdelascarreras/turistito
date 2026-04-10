export type TourStatus = "generado" | "procesando"

export interface MockTour {
  id: string
  name: string
  /** Placeholder image URLs for thumbnails */
  imageUrls: string[]
  narration: string
  /** Public sample audio for demo UI */
  audioUrl: string
  status: TourStatus
}

export const mockTours: MockTour[] = [
  {
    id: "1",
    name: "Barrio de San Telmo",
    imageUrls: [
      "https://picsum.photos/seed/telmo1/320/200",
      "https://picsum.photos/seed/telmo2/320/200",
      "https://picsum.photos/seed/telmo3/320/200",
    ],
    narration:
      "Calles empedradas, anticuarios y el latido del tango. En cada esquina, un café con historia: este barrio fue el corazón colonial de Buenos Aires y hoy mezcla patrimonio, arte callejero y ferias que invitan a perderse sin prisa.",
    audioUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
    status: "generado",
  },
  {
    id: "2",
    name: "Cerro Fitz Roy — mirador",
    imageUrls: [
      "https://picsum.photos/seed/fitz1/320/200",
      "https://picsum.photos/seed/fitz2/320/200",
    ],
    narration:
      "El viento ordena las nubes y el granito brilla como un filo. Desde acá el trekking cobra sentido: no solo subís, escuchás el silencio de la altura y el rumor lejano de los glaciares.",
    audioUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
    status: "generado",
  },
  {
    id: "3",
    name: "Quebrada de Humahuaca",
    imageUrls: ["https://picsum.photos/seed/huma1/320/200"],
    narration:
      "Estratos de colores que cuentan milenios. Los pueblos de adobe y la Quebrada son un corredor cultural vivo: música, artesanías y la luz de la tarde que pinta cada cresta.",
    audioUrl: "",
    status: "procesando",
  },
]

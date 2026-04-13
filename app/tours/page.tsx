import { getTours } from "@/app/actions/tours"
import { ToursManager } from "@/app/components/tours/tours-manager"

export default async function ToursPage() {
  const { tours, error } = await getTours()

  if (error && tours.length === 0) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
        {error}
      </div>
    )
  }

  return <ToursManager initialTours={tours} loadError={error} />
}

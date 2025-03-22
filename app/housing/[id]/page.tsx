import { HousingDetail } from "@/components/housing-detail"
import { SiteHeader } from "@/components/site-header"

interface PageProps {
  params: {
    id: string
  }
}

export default function HousingDetailPage({ params }: PageProps) {
  // Remove the # prefix from the ID if it exists
  const propertyId = params.id.replace("#", "")

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 p-6">
        <HousingDetail id={propertyId} />
      </main>
    </div>
  )
}


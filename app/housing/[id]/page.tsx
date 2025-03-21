import { HousingDetail } from "@/components/housing-detail"
import { SiteHeader } from "@/components/site-header"

export default function HousingDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 p-6">
        <HousingDetail id={params.id} />
      </main>
    </div>
  )
}


import { HousingRegistry } from "@/components/housing-registry"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 p-6">
        <HousingRegistry />
      </main>
    </div>
  )
}


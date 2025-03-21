import { WaitlistStatus } from "@/components/waitlist-status"
import { SiteHeader } from "@/components/site-header"

export default function WaitlistPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 p-6">
        <WaitlistStatus />
      </main>
    </div>
  )
}


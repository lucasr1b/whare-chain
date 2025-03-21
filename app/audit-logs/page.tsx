import { AuditLogs } from "@/components/audit-logs"
import { SiteHeader } from "@/components/site-header"

export default function AuditLogsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 p-6">
        <AuditLogs />
      </main>
    </div>
  )
}


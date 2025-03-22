"use client"

import { SiteHeader } from "@/components/site-header"
import { WaitlistedUserDashboard } from "@/components/waitlisted-user-dashboard"
import { BeneficiaryDashboard } from "@/components/beneficiary-dashboard"
import { CHPDashboard } from "@/components/chp-dashboard"
import { useUser, type UserRole } from "@/contexts/user-context"
import VerificationPage from "@/components/verify/verification-page"

export default function MyStatusPage() {
  const { userRole, setUserRole } = useUser()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 p-6">
        {userRole === "public" ? (
          <VerificationPage setUserRole={setUserRole} />
        ) : userRole === "waitlisted" ? (
          <WaitlistedUserDashboard />
        ) : userRole === "beneficiary" ? (
          <BeneficiaryDashboard />
        ) : userRole === "chp" ? (
          <CHPDashboard />
        ) : null}
      </main>
    </div>
  )
}


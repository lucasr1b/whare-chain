"use client"

import { SiteHeader } from "@/components/site-header"
import { WaitlistedUserDashboard } from "@/components/waitlisted-user-dashboard"
import { BeneficiaryDashboard } from "@/components/beneficiary-dashboard"
import { CHPDashboard } from "@/components/chp-dashboard"
import { useUser, type UserRole } from "@/contexts/user-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LockKeyhole, Users, User, Home, Building2 } from "lucide-react"

// Define user roles directly in this file
const userRoles = [
  {
    id: "public",
    name: "Public User",
    description: "View public registry, waitlist, and audit logs",
    icon: Users,
  },
  {
    id: "waitlisted",
    name: "Waitlisted User",
    description: "Check your status, update circumstances, and respond to housing offers",
    icon: User,
    defaultId: "[0x...B8F2]",
  },
  {
    id: "beneficiary",
    name: "Beneficiary",
    description: "Current housing occupant with access to tenancy information",
    icon: Home,
    defaultId: "[0x...A3B1]",
  },
  {
    id: "chp",
    name: "Community Housing Provider",
    description: "Manage properties and recommend housing for waitlisted users",
    icon: Building2,
    defaultId: "[0x...CHP1]",
  },
]

export default function MyStatusPage() {
  const { userRole, setUserRole, setUserId } = useUser()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 p-6">
        {userRole === "public" ? (
          <div className="max-w-md mx-auto mt-20">
            <Card className="border-amber-500/20 shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-amber-500/10">
                    <LockKeyhole className="h-10 w-10 text-amber-500" />
                  </div>
                </div>
                <CardTitle className="text-center text-xl">Access Restricted</CardTitle>
                <CardDescription className="text-center">
                  You need to be logged in as a specific user type to view this page.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <p className="text-center text-muted-foreground">Please select a user type below to continue:</p>
                <div className="grid gap-3">
                  {userRoles
                    .filter((role) => role.id !== "public")
                    .map((role) => (
                      <button
                        key={role.id}
                        onClick={() => {
                          setUserRole(role.id as UserRole)
                          setUserId(role.defaultId || null)
                        }}
                        className="flex items-center gap-3 p-3 rounded-md border border-border hover:bg-accent text-left"
                      >
                        <div className="p-2 rounded-full bg-muted">
                          {role.icon && <role.icon className="h-4 w-4" />}
                        </div>
                        <div>
                          <div className="font-medium">{role.name}</div>
                          <div className="text-xs text-muted-foreground">{role.description}</div>
                        </div>
                      </button>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
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


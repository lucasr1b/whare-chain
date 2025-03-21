"use client"

import { useState } from "react"
import { useUser, type UserRole } from "@/contexts/user-context"
import { Button } from "@/components/ui/button"
import { Users, User, Home, Building2, ChevronDown } from "lucide-react"

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

export function UserSelector() {
  const { userRole, setUserRole, setUserId } = useUser()
  const [isOpen, setIsOpen] = useState(false)

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role)

    // Set default user ID based on role
    const roleConfig = userRoles.find((r) => r.id === role)
    setUserId(roleConfig?.defaultId || null)
    setIsOpen(false)
  }

  const currentRole = userRoles.find((role) => role.id === userRole)

  return (
    <div className="relative">
      <Button variant="outline" className="gap-2" onClick={() => setIsOpen(!isOpen)}>
        {currentRole?.icon && <currentRole.icon className="h-4 w-4" />}
        {currentRole?.name}
        <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-popover border border-border z-50">
          <div className="py-2 px-3 border-b border-border">
            <p className="text-sm font-semibold">Switch User Role</p>
          </div>
          <div className="py-2">
            {userRoles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleChange(role.id as UserRole)}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-accent flex items-center gap-3 ${
                  role.id === userRole ? "bg-accent/50" : ""
                }`}
              >
                <div className={`p-2 rounded-full ${role.id === userRole ? "bg-primary/10" : "bg-muted"}`}>
                  {role.icon && <role.icon className="h-4 w-4" />}
                </div>
                <div>
                  <div className="font-medium">{role.name}</div>
                  <div className="text-xs text-muted-foreground">{role.defaultId || ""}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


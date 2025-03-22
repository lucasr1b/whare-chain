"use client"

import { useState } from "react"
import { CheckCircle, Clock, FileText, PenToolIcon as Tool, Phone, AlertCircle, Hammer } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle, AlertClose } from "@/components/ui/alert"
import { useUser } from "@/contexts/user-context"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Sample beneficiary data
const beneficiaryData = {
  did: "[0x...A3B1]",
  propertyId: "#H1234",
  address: "21 Queen Street, Auckland CBD, 1010",
  moveInDate: "10 Jan 2025",
  leaseEndDate: "10 Jan 2026",
  rentAmount: "$320 per week",
  rentSubsidy: "$150 per week",
  rentPaymentStatus: "Up to date",
  lastPaymentDate: "01 Mar 2025",
  maintenanceRequests: [
    {
      id: "MR001",
      date: "15 Feb 2025",
      issue: "Leaking bathroom tap",
      status: "Completed",
      resolution: "Plumber replaced washer on 18 Feb 2025",
    },
    {
      id: "MR002",
      date: "05 Mar 2025",
      issue: "Broken window latch in bedroom",
      status: "Scheduled",
      resolution: "Maintenance scheduled for 22 Mar 2025",
    },
  ],
  propertyDetails: {
    bedrooms: 3,
    bathrooms: 1,
    heatingSolution: "Heat pump",
    insulation: "Ceiling and underfloor",
    healthyHomesCompliant: true,
    lastInspection: "05 Dec 2024",
    nextInspection: "05 Jun 2025",
  },
  contacts: {
    propertyManager: {
      name: "Sarah Johnson",
      phone: "021 555 1234",
      email: "sarah.j@chp.co.nz",
    },
    maintenance: {
      name: "Maintenance Team",
      phone: "0800 555 6789",
      email: "maintenance@chp.co.nz",
    },
    emergencies: {
      name: "Emergency Hotline",
      phone: "0800 555 9999",
      available: "24/7",
    },
  },
}

export function BeneficiaryDashboard() {
  const { userId } = useUser()
  const [activeTab, setActiveTab] = useState("tenancy")
  const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false)
  const [maintenanceIssue, setMaintenanceIssue] = useState("")

  const handleMaintenanceRequest = () => {
    // In a real app, this would send data to an API
    alert("Maintenance request submitted successfully. Your property manager will be in touch.")
    setMaintenanceDialogOpen(false)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">My Housing</h1>
        <Button
          onClick={() => setMaintenanceDialogOpen(true)}
          className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          <Tool className="h-5 w-5" />
          Request Maintenance
        </Button>
      </div>

      <Card className="shadow-md">
        <CardHeader className="border-b pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Occupant: {userId || beneficiaryData.did}</CardTitle>
            <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/50 px-3 py-1 text-sm">
              <CheckCircle className="mr-1 h-3 w-3" /> Active Tenancy
            </Badge>
          </div>
          <CardDescription className="text-base mt-2">
            Property ID: {beneficiaryData.propertyId} | Address: {beneficiaryData.address}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="tenancy" className="w-full">
            <TabsList className="inline-flex h-11 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground mb-6">
              <TabsTrigger value="tenancy" className="rounded-md px-3 py-2 text-sm font-medium">
                Tenancy Details
              </TabsTrigger>
              <TabsTrigger value="property" className="rounded-md px-3 py-2 text-sm font-medium">
                Property Information
              </TabsTrigger>
              <TabsTrigger value="contacts" className="rounded-md px-3 py-2 text-sm font-medium">
                Important Contacts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tenancy" className="space-y-8 pt-2">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium text-muted-foreground">Move-in Date</h3>
                  <div className="text-xl font-medium">{beneficiaryData.moveInDate}</div>
                </div>
                <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium text-muted-foreground">Lease End Date</h3>
                  <div className="text-xl font-medium">{beneficiaryData.leaseEndDate}</div>
                </div>
                <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium text-muted-foreground">Rent Amount</h3>
                  <div className="text-xl font-medium">{beneficiaryData.rentAmount}</div>
                </div>
                <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium text-muted-foreground">Rent Subsidy</h3>
                  <div className="text-xl font-medium">{beneficiaryData.rentSubsidy}</div>
                </div>
                <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium text-muted-foreground">Payment Status</h3>
                  <div className="text-xl font-medium flex items-center">
                    <span className="flex items-center text-green-500">
                      {beneficiaryData.rentPaymentStatus} <CheckCircle className="ml-2 h-5 w-5" />
                    </span>
                  </div>
                </div>
                <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium text-muted-foreground">Last Payment Date</h3>
                  <div className="text-xl font-medium">{beneficiaryData.lastPaymentDate}</div>
                </div>
              </div>

              <div className="space-y-4 border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-lg">Maintenance Requests</h3>
                  <Button
                    onClick={() => setMaintenanceDialogOpen(true)}
                    className="gap-2 bg-primary hover:bg-primary/90"
                    size="sm"
                  >
                    <Hammer className="h-4 w-4" />
                    New Maintenance Request
                  </Button>
                </div>
                <div className="space-y-4">
                  {beneficiaryData.maintenanceRequests.map((request, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardHeader className="py-3">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">{request.issue}</CardTitle>
                          {request.status === "Completed" ? (
                            <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/50">
                              Completed
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-amber-500/20 text-amber-500 border-amber-500/50">
                              <Clock className="mr-1 h-3 w-3" /> {request.status}
                            </Badge>
                          )}
                        </div>
                        <CardDescription>
                          Request ID: {request.id} | Submitted: {request.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="py-2">
                        <p className="text-sm">{request.resolution}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="property" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium text-muted-foreground">Bedrooms</h3>
                  <div className="text-xl font-medium">{beneficiaryData.propertyDetails.bedrooms}</div>
                </div>
                <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium text-muted-foreground">Bathrooms</h3>
                  <div className="text-xl font-medium">{beneficiaryData.propertyDetails.bathrooms}</div>
                </div>
                <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium text-muted-foreground">Heating Solution</h3>
                  <div className="text-xl font-medium">{beneficiaryData.propertyDetails.heatingSolution}</div>
                </div>
                <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium text-muted-foreground">Insulation</h3>
                  <div className="text-xl font-medium">{beneficiaryData.propertyDetails.insulation}</div>
                </div>
                <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium text-muted-foreground">Healthy Homes Compliant</h3>
                  <div className="text-xl font-medium flex items-center">
                    {beneficiaryData.propertyDetails.healthyHomesCompliant ? (
                      <span className="flex items-center text-green-500">
                        Yes <CheckCircle className="ml-2 h-5 w-5" />
                      </span>
                    ) : (
                      "No"
                    )}
                  </div>
                </div>
                <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium text-muted-foreground">Last Inspection</h3>
                  <div className="text-xl font-medium">{beneficiaryData.propertyDetails.lastInspection}</div>
                </div>
                <div className="space-y-2 bg-muted/30 p-4 rounded-lg md:col-span-2">
                  <h3 className="font-medium text-muted-foreground">Next Inspection</h3>
                  <div className="text-xl font-medium">{beneficiaryData.propertyDetails.nextInspection}</div>
                </div>
              </div>

              <Alert className="relative">
                <FileText className="h-4 w-4" />
                <AlertTitle>Property Documentation</AlertTitle>
                <AlertDescription className="flex justify-between items-center">
                  <span>Access your tenancy agreement, property condition report, and other documents.</span>
                  <Button size="sm" variant="outline">
                    View Documents
                  </Button>
                </AlertDescription>
                <AlertClose />
              </Alert>
            </TabsContent>

            <TabsContent value="contacts" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Property Manager</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-medium">{beneficiaryData.contacts.propertyManager.name}</p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{beneficiaryData.contacts.propertyManager.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-muted-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{beneficiaryData.contacts.propertyManager.email}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Maintenance Team</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-medium">{beneficiaryData.contacts.maintenance.name}</p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{beneficiaryData.contacts.maintenance.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-muted-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{beneficiaryData.contacts.maintenance.email}</span>
                  </div>
                </CardContent>
              </Card>

              <Alert className="bg-red-500/20 text-red-500 border-red-500/50 relative">
                <AlertTitle>Emergency Contact</AlertTitle>
                <AlertDescription>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span className="font-bold">{beneficiaryData.contacts.emergencies.phone}</span>
                    <span>({beneficiaryData.contacts.emergencies.available})</span>
                  </div>
                  <p className="text-sm mt-1">For urgent issues like flooding, fire, or security concerns.</p>
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Maintenance Request Dialog */}
      <Dialog open={maintenanceDialogOpen} onOpenChange={setMaintenanceDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request Maintenance</DialogTitle>
            <DialogDescription>
              Describe the maintenance issue you're experiencing. Non-urgent requests are typically addressed within 5
              business days.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Describe the issue</Label>
              <Textarea
                placeholder="e.g., The kitchen sink is leaking..."
                value={maintenanceIssue}
                onChange={(e) => setMaintenanceIssue(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Is this an emergency?</AlertTitle>
              <AlertDescription>
                For urgent issues like major leaks, electrical hazards, or security concerns, please call the emergency
                hotline at {beneficiaryData.contacts.emergencies.phone}.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setMaintenanceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleMaintenanceRequest} disabled={!maintenanceIssue.trim()}>
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


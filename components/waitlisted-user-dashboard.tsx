"use client"

import { useState } from "react"
import { CheckCircle, Clock, AlertCircle, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/contexts/user-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertClose } from "@/components/ui/alert"

// Sample user data - in a real app, this would come from an API
const userData = {
  did: "[0x...B8F2]",
  position: 1,
  priorityScore: 92,
  timeOnWaitlist: "3 months",
  verified: true,
  eligibilityDetails: {
    householdSize: 4,
    currentIncome: "$52,000 per annum",
    housingNeed: "Medium",
    currentLivingSituation: "Temporary accommodation",
    specialRequirements: "Accessibility features needed",
  },
  applicationHistory: [
    {
      date: "21 Dec 2024",
      action: "Application submitted",
      status: "Completed",
    },
    {
      date: "05 Jan 2025",
      action: "Documentation verified",
      status: "Completed",
    },
    {
      date: "12 Jan 2025",
      action: "Eligibility assessment",
      status: "Completed",
    },
    {
      date: "20 Jan 2025",
      action: "Priority score assigned",
      status: "Completed",
    },
    {
      date: "Pending",
      action: "Housing allocation",
      status: "Waiting",
    },
  ],
  housingOffers: [
    {
      id: "#H1235",
      address: "55 Willis Street, WLG",
      offerDate: "15 Mar 2025",
      responseDeadline: "22 Mar 2025",
      status: "Pending Response",
    },
  ],
}

export function WaitlistedUserDashboard() {
  const { userId, setUserRole } = useUser()
  const [activeTab, setActiveTab] = useState("status")
  const [updateCircumstancesOpen, setUpdateCircumstancesOpen] = useState(false)
  const [housingOfferOpen, setHousingOfferOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [circumstanceChange, setCircumstanceChange] = useState("")
  const [housingNeed, setHousingNeed] = useState("medium")
  const [offerResponse, setOfferResponse] = useState<"accept" | "decline" | null>(null)
  const [declineReason, setDeclineReason] = useState("")

  const handleUpdateCircumstances = () => {
    // In a real app, this would send data to an API
    alert("Circumstances updated successfully. Your priority score will be reassessed.")
    setUpdateCircumstancesOpen(false)
  }

  const handleHousingOfferResponse = () => {
    // In a real app, this would send data to an API
    if (offerResponse === "accept") {
      setUserRole("beneficiary")
    }
    setHousingOfferOpen(false)
  }

  const openHousingOffer = (property: any) => {
    setSelectedProperty(property)
    setHousingOfferOpen(true)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">👤 My Waitlist Status</h1>
        <Button
          onClick={() => setUpdateCircumstancesOpen(true)}
          className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          <AlertCircle className="h-5 w-5" />
          Update My Circumstances
        </Button>
      </div>

      {userData.housingOffers.some((offer) => offer.status === "Pending Response") && (
        <Alert className="bg-primary/20 text-primary border-primary/50 p-6 relative">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full bg-primary/10">
              <Home className="h-6 w-6" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <AlertTitle className="text-lg text-foreground font-semibold">New Housing Offer Available</AlertTitle>
              </div>
              <AlertDescription className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-foreground">
                    You have received a housing offer that requires your response by{" "}
                    <span className="font-semibold">{userData.housingOffers[0].responseDeadline}</span>.
                  </p>
                  <p className="text-sm text-primary/80">
                    Please review the offer details and respond before the deadline.
                  </p>
                </div>
                <Button
                  onClick={() => openHousingOffer(userData.housingOffers[0])}
                  className="bg-white text-black hover:bg-white/90 whitespace-nowrap"
                  size="lg"
                >
                  Review Offer
                </Button>
              </AlertDescription>
            </div>
          </div>
        </Alert>
      )}

      <Card className="shadow-md">
        <CardHeader className="border-b pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Applicant: {userId || userData.did}</CardTitle>
            <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-md">
              <span className="text-sm text-muted-foreground">Priority Score:</span>
              <span className="font-bold text-lg">{userData.priorityScore}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="status" className="w-full">
            <TabsList className="inline-flex h-11 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground mb-6">
              <TabsTrigger value="status" className="rounded-md px-3 py-2 text-sm font-medium">
                Current Status
              </TabsTrigger>
              <TabsTrigger value="details" className="rounded-md px-3 py-2 text-sm font-medium">
                Application Details
              </TabsTrigger>
            </TabsList>


            <TabsContent value="status" className="space-y-8 pt-2">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium text-muted-foreground">Current Position</h3>
                  <div className="text-4xl font-bold">{userData.position}</div>
                </div>
                <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium text-muted-foreground">Time on Waitlist</h3>
                  <div className="text-4xl font-bold">{userData.timeOnWaitlist}</div>
                </div>
                <div className="space-y-3 bg-muted/30 p-4 rounded-lg md:col-span-2">
                  <h3 className="font-medium text-muted-foreground">Verification Status</h3>
                  <div className="text-xl font-bold flex items-center">
                    {userData.verified ? (
                      <span className="flex items-center text-green-500">
                        Verified <CheckCircle className="ml-2 h-5 w-5" />
                      </span>
                    ) : (
                      <span className="flex items-center text-amber-500">
                        Pending <Clock className="ml-2 h-5 w-5" />
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t pt-6">
                <h3 className="font-medium text-lg">Application Progress</h3>
                <Progress value={80} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Application Submitted</span>
                  <span>Verification</span>
                  <span>Priority Assignment</span>
                  <span>Housing Allocation</span>
                </div>
              </div>

              <div className="space-y-3 border-t pt-6">
                <h3 className="font-medium text-lg">Application History</h3>
                <div className="space-y-3">
                  {userData.applicationHistory.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded-md bg-muted/20">
                      {item.status === "Completed" ? (
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <Clock className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      )}
                      <span className="font-medium">{item.date}</span>
                      <span className="text-muted-foreground">{item.action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-6 pt-2">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Household Size</h3>
                  <p className="text-lg">{userData.eligibilityDetails.householdSize} people</p>
                </div>
                <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Current Income</h3>
                  <p className="text-lg">{userData.eligibilityDetails.currentIncome}</p>
                </div>
                <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Housing Need</h3>
                  <p className="text-lg">{userData.eligibilityDetails.housingNeed}</p>
                </div>
                <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Current Living Situation</h3>
                  <p className="text-lg">{userData.eligibilityDetails.currentLivingSituation}</p>
                </div>
                <div className="space-y-2 bg-muted/30 p-4 rounded-lg md:col-span-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Special Requirements</h3>
                  <p className="text-lg">{userData.eligibilityDetails.specialRequirements}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Update Circumstances Dialog */}
      <Dialog open={updateCircumstancesOpen} onOpenChange={setUpdateCircumstancesOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Housing Circumstances</DialogTitle>
            <DialogDescription>
              Changes to your circumstances may affect your priority score and position on the waitlist.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Describe your change in circumstances</Label>
              <Textarea
                placeholder="e.g., I've recently become homeless due to eviction..."
                value={circumstanceChange}
                onChange={(e) => setCircumstanceChange(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Current housing need</Label>
              <RadioGroup value={housingNeed} onValueChange={setHousingNeed}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent">Urgent (homeless or unsafe housing)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium (temporary or insecure housing)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low">Low (unaffordable or unstable housing)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateCircumstancesOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateCircumstances}>Submit Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Housing Offer Dialog */}
      <Dialog open={housingOfferOpen} onOpenChange={setHousingOfferOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Housing Offer</DialogTitle>
            <DialogDescription>
              Please review this housing offer and respond by {selectedProperty?.responseDeadline || "the deadline"}.
            </DialogDescription>
          </DialogHeader>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              If you decline this offer, you will remain on the waitlist.
            </AlertDescription>
          </Alert>
          {selectedProperty && (
            <div className="space-y-4 pb-4">
              <div className="space-y-1">
                <h3 className="font-medium">Property Details</h3>
                <p>{selectedProperty.address}</p>
                <p className="text-sm text-muted-foreground">Property ID: {selectedProperty.id}</p>
              </div>

              <div className="space-y-2">
                <Label>Your Response</Label>
                <RadioGroup value={offerResponse || ""} onValueChange={(value) => setOfferResponse(value as any)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="accept" id="accept" />
                    <Label htmlFor="accept">Accept this housing offer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="decline" id="decline" />
                    <Label htmlFor="decline">Decline this housing offer</Label>
                  </div>
                </RadioGroup>
              </div>

              {offerResponse === "decline" && (
                <div className="space-y-2">
                  <Label>Reason for declining</Label>
                  <Textarea
                    placeholder="Please explain why you are declining this offer..."
                    value={declineReason}
                    onChange={(e) => setDeclineReason(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setHousingOfferOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleHousingOfferResponse}
              disabled={!offerResponse || (offerResponse === "decline" && !declineReason)}
            >
              Submit Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


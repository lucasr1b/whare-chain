"use client"

import { useState } from "react"
import { CheckCircle, Clock, User, AlertCircle, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  recommendedProperties: [
    {
      id: "#H1235",
      address: "55 Willis Street, WLG",
      bedrooms: 3,
      bathrooms: 1,
      features: ["Ground floor", "Close to schools", "Public transport nearby"],
    },
    {
      id: "#H1237",
      address: "8 Victoria Avenue, HLZ",
      bedrooms: 3,
      bathrooms: 2,
      features: ["Wheelchair accessible", "Recently renovated", "Community garden"],
    },
  ],
}

export function MyWaitlistStatus() {
  const [didInput, setDidInput] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [activeTab, setActiveTab] = useState("status")

  const handleLookup = () => {
    // In a real app, this would validate and fetch data
    setShowResults(true)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">👤 My Waitlist Status</h1>
      </div>

      {!showResults ? (
        <Card>
          <CardHeader>
            <CardTitle>Check Your Position</CardTitle>
            <CardDescription>
              Enter your unique identifier (DID) to see your current position on the waitlist and application status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter your DID (e.g., [0x...B8F2])"
                value={didInput}
                onChange={(e) => setDidInput(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleLookup}>Check Status</Button>
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Your DID was provided to you when you registered for social housing. If you've lost it, please contact
            support.
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Applicant: {userData.did}</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setShowResults(false)}>
                  Check Different DID
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="status" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="status">Current Status</TabsTrigger>
                  <TabsTrigger value="details">Application Details</TabsTrigger>
                  <TabsTrigger value="properties">Recommended Properties</TabsTrigger>
                </TabsList>

                <TabsContent value="status" className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="font-medium text-muted-foreground">Current Position</h3>
                      <div className="text-4xl font-bold">{userData.position}</div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-muted-foreground">Priority Score</h3>
                      <div className="text-4xl font-bold">{userData.priorityScore}/100</div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-muted-foreground">Time on Waitlist</h3>
                      <div className="text-4xl font-bold">{userData.timeOnWaitlist}</div>
                    </div>
                    <div className="space-y-2">
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

                  <div className="space-y-2">
                    <h3 className="font-medium">Application Progress</h3>
                    <Progress value={80} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Application Submitted</span>
                      <span>Verification</span>
                      <span>Priority Assignment</span>
                      <span>Housing Allocation</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Application History</h3>
                    <div className="space-y-2">
                      {userData.applicationHistory.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {item.status === "Completed" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-amber-500" />
                          )}
                          <span className="font-medium">{item.date}</span>
                          <span className="text-muted-foreground">{item.action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Household Size</h3>
                      <p>{userData.eligibilityDetails.householdSize} people</p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Current Income</h3>
                      <p>{userData.eligibilityDetails.currentIncome}</p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Housing Need</h3>
                      <p>{userData.eligibilityDetails.housingNeed}</p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Current Living Situation</h3>
                      <p>{userData.eligibilityDetails.currentLivingSituation}</p>
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Special Requirements</h3>
                      <p>{userData.eligibilityDetails.specialRequirements}</p>
                    </div>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Need to update your information?</AlertTitle>
                    <AlertDescription>
                      If your circumstances have changed, please contact your case manager to update your application
                      details.
                    </AlertDescription>
                  </Alert>
                </TabsContent>

                <TabsContent value="properties" className="space-y-4">
                  <p className="text-muted-foreground">
                    Based on your household needs and preferences, these properties may become available to you:
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    {userData.recommendedProperties.map((property, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{property.address}</CardTitle>
                          <CardDescription>{property.id}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between">
                            <span>{property.bedrooms} Bedrooms</span>
                            <span>{property.bathrooms} Bathrooms</span>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Features:</h4>
                            <ul className="text-sm text-muted-foreground">
                              {property.features.map((feature, i) => (
                                <li key={i} className="flex items-center">
                                  <ChevronRight className="h-3 w-3 mr-1" /> {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>

                  <Alert className="bg-primary/20 text-primary border-primary/50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Property Availability</AlertTitle>
                    <AlertDescription>
                      Property availability changes regularly. You'll be notified when a suitable property becomes
                      available for you.
                    </AlertDescription>
                  </Alert>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}


"use client"

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

import { useState } from "react"
import { Users, Home, Search, Filter, User, AlertCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useActiveAccount } from "thirdweb/react"
import { client } from "@/lib/thirdWebClient"
import { HOUSING_REGISTRY_ADDRESS, HOUSING_OFFERS_ADDRESS } from "@/lib/contract"
import { baseSepolia } from "thirdweb/chains"
import { getContract, prepareContractCall, sendTransaction } from "thirdweb"
import { ConnectButton } from "thirdweb/react"

// Sample data for CHP
const waitlistedUsers = [
  {
    did: "[0x...B8F2]",
    position: 1,
    priorityScore: 92,
    householdSize: 4,
    housingNeed: "Medium",
    timeOnWaitlist: "3 months",
    specialRequirements: "Accessibility features needed",
  },
  {
    did: "[0x...9E1A]",
    position: 2,
    priorityScore: 87,
    householdSize: 3,
    housingNeed: "Medium",
    timeOnWaitlist: "4 months",
    specialRequirements: "None",
  },
  {
    did: "[0x...5D3C]",
    position: 3,
    priorityScore: 84,
    householdSize: 5,
    housingNeed: "Urgent",
    timeOnWaitlist: "1 month",
    specialRequirements: "Ground floor only",
  },
  {
    did: "[0x...7F2B]",
    position: 4,
    priorityScore: 79,
    householdSize: 2,
    housingNeed: "Low",
    timeOnWaitlist: "2 months",
    specialRequirements: "None",
  },
  {
    did: "[0x...3A9D]",
    position: 5,
    priorityScore: 75,
    householdSize: 3,
    housingNeed: "Low",
    timeOnWaitlist: "5 months",
    specialRequirements: "Close to schools",
  },
]

const availableProperties = [
  {
    id: "#H1235",
    address: "55 Willis Street, WLG",
    bedrooms: 3,
    bathrooms: 1,
    status: "Available",
    features: ["Ground floor", "Close to schools", "Public transport nearby"],
    offeredTo: null as string | null,
  },
  {
    id: "#H1237",
    address: "8 Victoria Avenue, HLZ",
    bedrooms: 3,
    bathrooms: 2,
    status: "Available",
    features: ["Wheelchair accessible", "Recently renovated", "Community garden"],
    offeredTo: null as string | null,
  },
  {
    id: "#H1240",
    address: "12 Kauri Street, AKL",
    bedrooms: 2,
    bathrooms: 1,
    status: "Available",
    features: ["Pet friendly", "Fenced yard", "Heat pump"],
    offeredTo: null as string | null,
  },
  {
    id: "#H1242",
    address: "45 Miro Road, WLG",
    bedrooms: 4,
    bathrooms: 2,
    status: "Available",
    features: ["Large family home", "Double garage", "Close to hospital"],
    offeredTo: null as string | null,
  },
]

export function CHPDashboard() {
  const { userId } = useUser()
  const account = useActiveAccount()
  const [activeTab, setActiveTab] = useState("waitlist")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [userDetailOpen, setUserDetailOpen] = useState(false)
  const [offerHousingOpen, setOfferHousingOpen] = useState(false)
  const [offerNotes, setOfferNotes] = useState("")
  const [selectedPropertyForOffer, setSelectedPropertyForOffer] = useState("")
  const [addPropertyOpen, setAddPropertyOpen] = useState(false)
  const [newProperty, setNewProperty] = useState({
    id: "",
    address: "",
    bedrooms: "2",
    bathrooms: "1",
    features: "",
  })
  const [propertyToRemove, setPropertyToRemove] = useState<string | null>(null)
  const [removePropertyOpen, setRemovePropertyOpen] = useState(false)
  const [isAddingProperty, setIsAddingProperty] = useState(false)
  const [addPropertyError, setAddPropertyError] = useState<string | null>(null)
  const [properties, setProperties] = useState(availableProperties)

  const filteredWaitlist = waitlistedUsers.filter(
    (user) =>
      user.did.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.housingNeed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.specialRequirements.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredProperties = properties.filter(
    (property) =>
      property.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.features.some((feature) => feature.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const viewUserDetails = (user: any) => {
    setSelectedUser(user)
    setUserDetailOpen(true)
  }

  const openOfferHousing = (user: any) => {
    setSelectedUser(user)
    setOfferHousingOpen(true)
  }

  const handleHousingOffer = async () => {
    if (!account) {
      alert("Please connect your wallet first")
      return
    }

    try {
      // Create contract instance for housing offers
      const offersContract = getContract({
        client,
        chain: baseSepolia,
        address: HOUSING_OFFERS_ADDRESS,
      })

      const transaction = prepareContractCall({
        contract: offersContract,
        method: "function createOffer(string _propertyId, address _applicant)",
        params: [
          selectedPropertyForOffer.replace("#", ""), // Remove # from property ID
          "0x98E0A88c2aAd1bE44d58027D672E77753C646bE6"
        ],
      })

      await sendTransaction({
        account,
        transaction,
      })

      // Optimistically update the property status
      setProperties(prevProperties =>
        prevProperties.map(p =>
          p.id === selectedPropertyForOffer
            ? { ...p, status: "Offered", offeredTo: selectedUser.did }
            : p
        )
      )

      setOfferHousingOpen(false)
    } catch (err) {
      console.error("Failed to create housing offer:", err)
      alert("Failed to create housing offer. Please try again.")
    }
  }

  const handleAddProperty = async () => {
    if (!account) {
      setAddPropertyError("Please connect your wallet first")
      return
    }

    try {
      setIsAddingProperty(true)
      setAddPropertyError(null)

      // Convert features string to array
      const featuresArray = newProperty.features.split(",").map(feature => feature.trim())

      // Create contract instance for housing registry
      const registryContract = getContract({
        client,
        chain: baseSepolia,
        address: HOUSING_REGISTRY_ADDRESS,
      })

      const randomPropertyId = "#H" + Math.floor(Math.random() * 10000)


      const transaction = prepareContractCall({
        contract: registryContract,
        method: "function addProperty(string _id, string _houseAddress, uint256 _bedrooms, uint256 _bathrooms, string[] _features)",
        params: [
          randomPropertyId,
          newProperty.address,
          BigInt(newProperty.bedrooms),
          BigInt(newProperty.bathrooms),
          featuresArray,
        ],
      })

      await sendTransaction({
        account,
        transaction,
      })


      // Add property optimistically to the list
      const newPropertyData = {
        id: randomPropertyId,
        address: newProperty.address,
        bedrooms: parseInt(newProperty.bedrooms),
        bathrooms: parseInt(newProperty.bathrooms),
        status: "Available",
        features: featuresArray,
        offeredTo: null,
      }
      setProperties(prevProperties => [...prevProperties, newPropertyData])

      // Reset form and close dialog
      setNewProperty({
        id: "",
        address: "",
        bedrooms: "2",
        bathrooms: "1",
        features: "",
      })
      setAddPropertyOpen(false)
    } catch (err) {
      setAddPropertyError(err instanceof Error ? err.message : "Failed to add property")
    } finally {
      setIsAddingProperty(false)
    }
  }

  if (!account) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">🏢 Community Housing Provider</h1>
          <ConnectButton client={client} />
        </div>
        <p className="text-muted-foreground">
          Please connect your wallet to manage properties and waitlist.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">🏢 Community Housing Provider</h1>
        <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-md">
          <span className="text-muted-foreground">Provider ID:</span>
          <span className="font-medium">{userId || "[0x...CHP1]"}</span>
        </div>
      </div>

      <Card className="shadow-md">
        <CardContent className="p-6">
          <Tabs defaultValue="waitlist" className="w-full">
            <TabsList className="inline-flex h-11 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground mb-6">
              <TabsTrigger
                value="waitlist"
                onClick={() => setActiveTab("waitlist")}
                className="rounded-md px-3 py-2 text-sm font-medium"
              >
                <Users className="mr-2 h-4 w-4" />
                Waitlisted Applicants
              </TabsTrigger>
              <TabsTrigger
                value="properties"
                onClick={() => setActiveTab("properties")}
                className="rounded-md px-3 py-2 text-sm font-medium"
              >
                <Home className="mr-2 h-4 w-4" />
                Available Properties
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={activeTab === "waitlist" ? "Search applicants..." : "Search properties..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 h-9 text-sm"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                {activeTab === "properties" && (
                  <Button size="sm" className="gap-2" onClick={() => setAddPropertyOpen(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-plus"
                    >
                      <path d="M12 5v14"></path>
                      <path d="M5 12h14"></path>
                    </svg>
                    Add Property
                  </Button>
                )}
              </div>
            </div>

            <TabsContent value="waitlist" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Position</TableHead>
                      <TableHead>Applicant DID</TableHead>
                      <TableHead>Priority Score</TableHead>
                      <TableHead>Household Size</TableHead>
                      <TableHead>Housing Need</TableHead>
                      <TableHead>Special Requirements</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredWaitlist.map((user) => (
                      <TableRow key={user.did}>
                        <TableCell className="font-medium">{user.position}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {user.did}
                          </div>
                        </TableCell>
                        <TableCell>{user.priorityScore}</TableCell>
                        <TableCell>{user.householdSize}</TableCell>
                        <TableCell>
                          {user.housingNeed === "Urgent" ? (
                            <Badge variant="outline" className="bg-red-500/20 text-red-500 border-red-500/50">
                              Urgent
                            </Badge>
                          ) : user.housingNeed === "Medium" ? (
                            <Badge variant="outline" className="bg-primary/20 text-primary border-primary/50">
                              Medium
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-primary/20 text-primary/80 border-primary/50">
                              Low
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{user.specialRequirements}</TableCell>
                        <TableCell>
                          {properties.some(p => p.offeredTo === user.did) ? (
                            <Badge variant="outline" className="bg-primary/20 text-primary border-primary/50">
                              Offer Sent
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-muted text-muted-foreground">
                              No Offer
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => viewUserDetails(user)}
                              className="h-8 px-2"
                            >
                              View Applicant
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="properties" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProperties.map((property) => (
                  <Card key={property.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{property.address}</CardTitle>
                      <CardDescription>{property.id}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>{property.bedrooms} Bedrooms</span>
                        <span>{property.bathrooms} Bathrooms</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          property.status === "Available"
                            ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/50"
                            : "bg-primary/20 text-primary border-primary/50"
                        }
                      >
                        ● {property.status}
                      </Badge>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Features:</h4>
                        <ul className="text-sm text-muted-foreground">
                          {property.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button
                        className="flex-1"
                        disabled={property.status !== "Available"}
                        onClick={() => {
                          setSelectedUser({ did: property.offeredTo })
                          openOfferHousing({ did: property.offeredTo })
                        }}
                      >
                        {property.status === "Available" ? "Assign" : "Offered"}
                      </Button>
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          className="bg-white text-red-500 hover:bg-white/90"
                          onClick={() => {
                            setPropertyToRemove(property.id)
                            setRemovePropertyOpen(true)
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-trash-2"
                          >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            <line x1="10" x2="10" y1="11" y2="17"></line>
                            <line x1="14" x2="14" y1="11" y2="17"></line>
                          </svg>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* User Detail Dialog */}
      <Dialog open={userDetailOpen} onOpenChange={setUserDetailOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Applicant Details</DialogTitle>
            <DialogDescription>Detailed information about the selected applicant.</DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-1">
                <h3 className="font-medium">Applicant DID</h3>
                <p>{selectedUser.did}</p>
              </div>

              {properties.some(p => p.offeredTo === selectedUser.did) && (
                <Alert className="bg-primary/20 text-primary border-primary/50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Housing Offer Sent</AlertTitle>
                  <AlertDescription>
                    This applicant has already been offered housing. Please wait for their response.
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">Waitlist Position</h3>
                  <p>{selectedUser.position}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">Priority Score</h3>
                  <p>{selectedUser.priorityScore}/100</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">Household Size</h3>
                  <p>{selectedUser.householdSize} people</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">Housing Need</h3>
                  <p>{selectedUser.housingNeed}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">Time on Waitlist</h3>
                  <p>{selectedUser.timeOnWaitlist}</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Special Requirements</h3>
                  <p>{selectedUser.specialRequirements}</p>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  className="w-full"
                  onClick={() => {
                    setUserDetailOpen(false)
                    openOfferHousing(selectedUser)
                  }}
                  disabled={properties.some(p => p.offeredTo === selectedUser.did)}
                >
                  {properties.some(p => p.offeredTo === selectedUser.did)
                    ? "Housing Offer Sent"
                    : "Offer Housing to This Applicant"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Offer Housing Dialog */}
      <Dialog open={offerHousingOpen} onOpenChange={setOfferHousingOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Offer Housing</DialogTitle>
            <DialogDescription>Select a property to offer to {selectedUser?.did}</DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Select Property</Label>
                <Select value={selectedPropertyForOffer} onValueChange={setSelectedPropertyForOffer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a property" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map((property) => (
                      <SelectItem key={property.id} value={property.id}>
                        {property.address} ({property.bedrooms} bed, {property.bathrooms} bath)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedPropertyForOffer && (
                <div className="space-y-2 border rounded-md p-3 bg-muted/50">
                  <h3 className="font-medium">Selected Property</h3>
                  <p>{properties.find((p) => p.id === selectedPropertyForOffer)?.address}</p>
                  <div className="text-sm text-muted-foreground">
                    {properties.find((p) => p.id === selectedPropertyForOffer)?.features.join(", ")}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Notes (optional)</Label>
                <Textarea
                  placeholder="Add any additional information about this offer..."
                  value={offerNotes}
                  onChange={(e) => setOfferNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <Alert className="relative">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  The applicant will have 7 days to respond to this offer. All offers are recorded on the blockchain for
                  transparency.
                </AlertDescription>
              </Alert>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOfferHousingOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleHousingOffer} disabled={!selectedPropertyForOffer}>
              Send Housing Offer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Property Dialog */}
      <Dialog open={addPropertyOpen} onOpenChange={setAddPropertyOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
            <DialogDescription>Add a new property to the housing registry.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Property Address</Label>
              <Input
                placeholder="e.g., 123 Main Street, Auckland"
                value={newProperty.address}
                onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <Select
                  value={newProperty.bedrooms}
                  onValueChange={(value) => setNewProperty({ ...newProperty, bedrooms: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Bathrooms</Label>
                <Select
                  value={newProperty.bathrooms}
                  onValueChange={(value) => setNewProperty({ ...newProperty, bathrooms: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Features (comma separated)</Label>
              <Textarea
                placeholder="e.g., Ground floor, Close to schools, Heat pump"
                value={newProperty.features}
                onChange={(e) => setNewProperty({ ...newProperty, features: e.target.value })}
                className="min-h-[80px]"
              />
            </div>

            {addPropertyError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{addPropertyError}</AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddPropertyOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddProperty}
              disabled={!newProperty.address || isAddingProperty}
            >
              {isAddingProperty ? "Adding Property..." : "Add Property"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Property Dialog */}
      <Dialog open={removePropertyOpen} onOpenChange={setRemovePropertyOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Remove Property</DialogTitle>
            <DialogDescription>Are you sure you want to remove this property from the registry?</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="font-medium">{properties.find((p) => p.id === propertyToRemove)?.address}</p>
            <p className="text-sm text-muted-foreground mt-1">Property ID: {propertyToRemove}</p>

            <Alert className="bg-primary/20 text-primary border-primary/50 relative mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                This action cannot be undone. The property will be permanently removed from the registry.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setRemovePropertyOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // In a real app, this would send data to an API
                alert(`Property ${propertyToRemove} has been removed from the registry.`)
                setRemovePropertyOpen(false)
                setPropertyToRemove(null)
              }}
            >
              Remove Property
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


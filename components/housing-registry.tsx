"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CheckCircle, Clock, LinkIcon } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useActiveAccount } from "thirdweb/react"
import { client } from '@/lib/thirdWebClient'
import { baseSepolia } from "thirdweb/chains"
import { CONTRACT_ADDRESS } from "@/lib/contract"
import { getContract, readContract } from "thirdweb"
import { ConnectButton } from "thirdweb/react"

type PropertyStatus = "Occupied" | "Available" | "Pending"

interface Property {
  id: string
  address: string
  status: PropertyStatus
  occupant: string
  moveInDate: string
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">🏠 House Registry</h1>
        <div className="w-1/3">
          <div className="h-10 bg-muted animate-pulse rounded" />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Housing ID</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Occupant</TableHead>
              <TableHead>Move-In Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-6 w-20 bg-muted animate-pulse rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export function HousingRegistry() {
  const [searchTerm, setSearchTerm] = useState("")
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const account = useActiveAccount()

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Historical sample data
        const historicalProperties: Property[] = [
          {
            id: "#H1201",
            address: "123 Queen Street, Auckland CBD",
            status: "Occupied",
            occupant: "[0x1234...5678]",
            moveInDate: "2023-01-15"
          },
          {
            id: "#H1202",
            address: "45 Victoria Street, Wellington",
            status: "Available",
            occupant: "—",
            moveInDate: "—"
          },
          {
            id: "#H1203",
            address: "78 High Street, Christchurch",
            status: "Occupied",
            occupant: "[0xabcd...efgh]",
            moveInDate: "2023-03-20"
          },
          {
            id: "#H1204",
            address: "12 Albert Street, Hamilton",
            status: "Pending",
            occupant: "—",
            moveInDate: "—"
          },
          {
            id: "#H1205",
            address: "89 Devonport Road, Tauranga",
            status: "Occupied",
            occupant: "[0xijkl...mnop]",
            moveInDate: "2023-06-10"
          },
          {
            id: "#H1206",
            address: "34 Princes Street, Dunedin",
            status: "Available",
            occupant: "—",
            moveInDate: "—"
          },
          {
            id: "#H1207",
            address: "56 Cameron Road, Rotorua",
            status: "Occupied",
            occupant: "[0xqrst...uvwx]",
            moveInDate: "2023-09-05"
          },
          {
            id: "#H1208",
            address: "23 Victoria Street, Nelson",
            status: "Pending",
            occupant: "—",
            moveInDate: "—"
          },
          {
            id: "#H1209",
            address: "67 Fitzherbert Street, Palmerston North",
            status: "Occupied",
            occupant: "[0xyzaa...bbcc]",
            moveInDate: "2023-11-15"
          },
          {
            id: "#H1210",
            address: "90 Devon Street, New Plymouth",
            status: "Available",
            occupant: "—",
            moveInDate: "—"
          }
        ]

        // Fetch properties from the contract
        const contract = await getContract({
          client,
          chain: baseSepolia,
          address: CONTRACT_ADDRESS,
        })

        // Get all property IDs from the contract
        const propertyIds = await readContract({
          contract,
          method: "function getAllPropertyIds() returns (string[])",
        }) as string[]

        // Fetch details for each property
        const contractProperties = await Promise.all(
          propertyIds.map(async (id: string) => {
            const [address, bedrooms, bathrooms, features, isAvailable, currentOccupant, moveInDate] = await readContract({
              contract,
              method: "function getProperty(string _id) returns (string, uint256, uint256, string[], bool, address, uint256)",
              params: [id],
            }) as [string, bigint, bigint, string[], boolean, string, bigint]

            return {
              id: `#${id}`,
              address,
              status: isAvailable ? "Available" : "Occupied",
              occupant: currentOccupant === "0x0000000000000000000000000000000000000000" ? "—" : currentOccupant,
              moveInDate: moveInDate === BigInt(0) ? "—" : new Date(Number(moveInDate) * 1000).toISOString().split('T')[0],
            } as Property
          })
        )

        // Combine historical and contract properties
        // Remove any historical properties that exist in the contract
        const filteredHistoricalProperties = historicalProperties.filter(
          historical => !contractProperties.some(contract => contract.id === historical.id)
        )

        // Combine the properties
        const allProperties = [...filteredHistoricalProperties, ...contractProperties]

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        setProperties(allProperties)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch properties")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const filteredData = properties.filter(
    (housing) =>
      housing.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      housing.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      housing.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">🏠 House Registry</h1>
        <div className="w-1/3">
          <Input
            placeholder="Search by ID, address, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Housing ID</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Occupant</TableHead>
              <TableHead>Move-In Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((housing) => (
              <TableRow
                key={housing.id}
                className="group cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => window.location.href = `/housing/${housing.id.replace("#", "")}`}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-primary group-hover:underline">{housing.id}</span>
                    <LinkIcon className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </TableCell>
                <TableCell>{housing.address}</TableCell>
                <TableCell>
                  {housing.status === "Occupied" ? (
                    <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/50">
                      <CheckCircle className="mr-1 h-3 w-3" /> Occupied
                    </Badge>
                  ) : housing.status === "Available" ? (
                    <Badge variant="outline" className="bg-emerald-500/20 text-emerald-500 border-emerald-500/50">
                      ● Available
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-amber-500/20 text-amber-500 border-amber-500/50">
                      <Clock className="mr-1 h-3 w-3" /> Pending
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {housing.occupant !== "—" ? (
                    <div className="flex items-center">
                      {housing.occupant} <LinkIcon className="ml-1 h-3 w-3" />
                    </div>
                  ) : (
                    housing.occupant
                  )}
                </TableCell>
                <TableCell>{housing.moveInDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


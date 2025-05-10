"use client"

import { useState } from "react"
import { CheckCircle, LinkIcon, Search, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data for a specific housing unit
const housingDetail = {
  id: "#H1234",
  address: "123 Queen Street, Auckland CBD, 1010",
  status: "Occupied",
  occupant: "[0x...A3B1]",
  occupancyHistory: [
    {
      occupant: "[0x...A3B1]",
      moveInDate: "10 Jan 2025",
      moveOutDate: "—",
      transactionId: "0x1234...abcd",
    },
    {
      occupant: "[0x...F74D]",
      moveInDate: "05 May 2021",
      moveOutDate: "20 Dec 2024",
      transactionId: "0x5678...efgh",
    },
    {
      occupant: "[0x...4E8A]",
      moveInDate: "12 Feb 2018",
      moveOutDate: "01 May 2021",
      transactionId: "0x9012...ijkl",
    },
  ],
}

export function HousingDetail({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState("details")
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Detailed Housing Unit View</h1>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Housing Unit: {housingDetail.id}</CardTitle>
          <CardDescription>Address: {housingDetail.address}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium">Current Occupancy Status:</span>
              <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/50">
                <CheckCircle className="mr-1 h-3 w-3" /> Occupied
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <span className="font-medium">Occupant DID:</span>
              <span className="flex items-center">
                {housingDetail.occupant} <LinkIcon className="ml-1 h-3 w-3" />
              </span>
              <span className="text-muted-foreground">(anonymized for privacy)</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">
              Occupancy History <span className="text-muted-foreground text-sm">(Immutable on-chain records)</span>
            </h3>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Occupant DID</TableHead>
                    <TableHead>Move-In Date</TableHead>
                    <TableHead>Move-Out Date</TableHead>
                    <TableHead>Recorded On-chain Tx</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {housingDetail.occupancyHistory.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {record.occupant} <LinkIcon className="ml-1 h-3 w-3" />
                        </div>
                      </TableCell>
                      <TableCell>{record.moveInDate}</TableCell>
                      <TableCell>{record.moveOutDate}</TableCell>
                      <TableCell>
                        <a href={`https://base-sepolia.blockscout.com/tx/0xf2fc86ed9c34330f95a0c5726164a503a8e4839474bb23107f2b3a6b55ae7fa0`} target="_blank" rel="noopener noreferrer">
                          <Button variant="link" className="p-0 h-auto text-primary">
                            View Transaction
                          </Button>
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


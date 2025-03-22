"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, Clock, LinkIcon } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Sample data
const housingData = [
  {
    id: "#H1234",
    address: "21 Queen Street, AKL",
    status: "Occupied",
    occupant: "[0x...A3B1]",
    moveInDate: "10 Jan 2025",
  },
  {
    id: "#H1235",
    address: "55 Willis Street, WLG",
    status: "Available",
    occupant: "—",
    moveInDate: "—",
  },
  {
    id: "#H1236",
    address: "14 Colombo St, CHC",
    status: "Pending",
    occupant: "—",
    moveInDate: "—",
  },
  {
    id: "#H1237",
    address: "8 Victoria Avenue, HLZ",
    status: "Available",
    occupant: "—",
    moveInDate: "—",
  },
  {
    id: "#H1238",
    address: "42 George Street, DUD",
    status: "Occupied",
    occupant: "[0x...F2D9]",
    moveInDate: "15 Feb 2025",
  },
]

export function HousingRegistry() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = housingData.filter(
    (housing) =>
      housing.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      housing.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      housing.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
              <TableRow key={housing.id}>
                <TableCell className="font-medium">
                  <Link href={`/housing/${housing.id.replace("#", "")}`} className="text-primary hover:underline">
                    {housing.id}
                  </Link>
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


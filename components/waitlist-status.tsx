"use client"

import { useState } from "react"
import { LinkIcon, FileEdit } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

// Sample waitlist data
const waitlistData = [
  {
    position: 1,
    applicantDID: "[0x...B8F2]",
    priorityScore: 92,
    timeOnWaitlist: "3 months",
    verified: true,
  },
  {
    position: 2,
    applicantDID: "[0x...9E1A]",
    priorityScore: 87,
    timeOnWaitlist: "4 months",
    verified: true,
  },
  {
    position: 3,
    applicantDID: "[0x...5D3C]",
    priorityScore: 84,
    timeOnWaitlist: "1 month",
    verified: false,
  },
  {
    position: 4,
    applicantDID: "[0x...7F2B]",
    priorityScore: 79,
    timeOnWaitlist: "2 months",
    verified: true,
  },
  {
    position: 5,
    applicantDID: "[0x...3A9D]",
    priorityScore: 75,
    timeOnWaitlist: "5 months",
    verified: true,
  },
]

export function WaitlistStatus() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = waitlistData.filter(
    (applicant) =>
      applicant.applicantDID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.priorityScore.toString().includes(searchTerm) ||
      applicant.timeOnWaitlist.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">📄 Housing Waitlist</h1>
      </div>

      <p className="text-muted-foreground">
        Shows clear transparency around who is on the waitlist (anonymized) and their position based on priority
        criteria:
      </p>

      <div className="flex justify-end">
        <div className="w-1/3">
          <Input placeholder="Search waitlist..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position</TableHead>
              <TableHead>Applicant DID</TableHead>
              <TableHead>Priority Score</TableHead>
              <TableHead>Time on Waitlist</TableHead>
              <TableHead>Verified On-chain</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((applicant) => (
              <TableRow key={applicant.position}>
                <TableCell className="font-medium">{applicant.position}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {applicant.applicantDID} <LinkIcon className="ml-1 h-3 w-3" />
                  </div>
                </TableCell>
                <TableCell>{applicant.priorityScore}</TableCell>
                <TableCell>{applicant.timeOnWaitlist}</TableCell>
                <TableCell>
                  {applicant.verified ? (
                    <span className="flex items-center">
                      Yes <span className="ml-1 text-green-500">✓</span>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Pending <span className="ml-1 text-blue-500">⟳</span>
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


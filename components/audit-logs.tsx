"use client"

import { useState } from "react"
import { LinkIcon, LockKeyhole } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

// Sample audit log data
const auditLogData = [
  {
    timestamp: "21 Mar 2025 13:24 NZT",
    transactionHash: "[0xTxHash...]",
    action: "Occupant Change (#H1234)",
    performedBy: "[0x...Gov]",
  },
  {
    timestamp: "18 Mar 2025 09:11 NZT",
    transactionHash: "[0xTxHash...]",
    action: "Added New Housing (#H1237)",
    performedBy: "[0x...Gov]",
  },
  {
    timestamp: "14 Mar 2025 15:34 NZT",
    transactionHash: "[0xTxHash...]",
    action: "Waitlist Update",
    performedBy: "[0x...Gov]",
  },
  {
    timestamp: "10 Mar 2025 11:05 NZT",
    transactionHash: "[0xTxHash...]",
    action: "Housing Status Change (#H1235)",
    performedBy: "[0x...Gov]",
  },
  {
    timestamp: "08 Mar 2025 14:22 NZT",
    transactionHash: "[0xTxHash...]",
    action: "New Applicant Added to Waitlist",
    performedBy: "[0x...Gov]",
  },
]

export function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = auditLogData.filter(
    (log) =>
      log.timestamp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.transactionHash.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">🔒 MSD Audit Logs</h1>
      </div>

      <div className="space-y-2 text-muted-foreground">
        <p>• Accessible to government officials, community auditors, NGOs, and general public.</p>
        <p>• Shows all recent blockchain transactions related to housing registry updates.</p>
      </div>

      <div className="flex justify-end">
        <div className="w-1/3">
          <Input placeholder="Search logs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Transaction Hash</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Performed By (DID)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {log.transactionHash} <LinkIcon className="ml-1 h-3 w-3" />
                  </div>
                </TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {log.performedBy} <LinkIcon className="ml-1 h-3 w-3" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


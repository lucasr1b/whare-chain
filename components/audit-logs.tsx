"use client"

import { useState, useEffect } from "react"
import { LinkIcon, LockKeyhole, CheckCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

// Sample treasury data
const treasuryData = [
  {
    timestamp: "22 Mar 2025 10:15 NZT",
    transactionHash: "[0xTrHash...]",
    action: "Fund Transfer (#F5678) - Wages Payment",
    performedBy: "[0x...Trs]",
    amount: "$45,000",
    type: "Expense",
  },
  {
    timestamp: "19 Mar 2025 16:30 NZT",
    transactionHash: "[0xTrHash...]",
    action: "Treasury Deposit (#F5680) - CHP-001 Allocation",
    performedBy: "[0x...Trs]",
    amount: "$200,000",
    type: "Allocation",
  },
  {
    timestamp: "15 Mar 2025 08:45 NZT",
    transactionHash: "[0xTrHash...]",
    action: "Budget Allocation (#F5682) - Supplies Payment",
    performedBy: "[0x...Trs]",
    amount: "$75,000",
    type: "Expense",
  },
  {
    timestamp: "12 Mar 2025 14:20 NZT",
    transactionHash: "[0xTrHash...]",
    action: "Emergency Fund Release (#F5684) - Escrow for Rent",
    performedBy: "[0x...Trs]",
    amount: "$125,000",
    type: "Escrow",
  },
  {
    timestamp: "07 Mar 2025 11:35 NZT",
    transactionHash: "[0xTrHash...]",
    action: "Quarterly Budget Update (#F5686) - CHP-002 Allocation",
    performedBy: "[0x...Trs]",
    amount: "$250,000",
    type: "Allocation",
  },
]

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold">Audit Logs</h1>
      </div>

      <div className="space-y-2 text-muted-foreground">
        <p>• Shows all recent blockchain transactions related to housing registry updates.</p>
        <p>• Treasury section displays fund allocations, expenditures, and escrow balances for all CHPs.</p>
      </div>

      <Tabs defaultValue="logs" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="treasury">Treasury</TabsTrigger>
          </TabsList>
          <div className="w-1/3">
            <div className="h-10 bg-muted animate-pulse rounded" />
          </div>
        </div>

        <TabsContent value="logs">
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
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-40 bg-muted animate-pulse rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="treasury" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-card rounded-lg p-5 border">
                <div className="h-4 w-32 bg-muted animate-pulse rounded mb-2" />
                <div className="h-8 w-40 bg-muted animate-pulse rounded" />
              </div>
            ))}
          </div>

          <div className="h-6 w-40 bg-muted animate-pulse rounded" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-card rounded-lg p-5 border">
                <div className="h-4 w-32 bg-muted animate-pulse rounded mb-2" />
                <div className="h-8 w-40 bg-muted animate-pulse rounded mb-3" />
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                      <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Transaction Hash</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Performed By (DID)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-40 bg-muted animate-pulse rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-6 w-20 bg-muted animate-pulse rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("logs")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error("Failed to fetch audit logs:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredData = auditLogData.filter(
    (log) =>
      log.timestamp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.transactionHash.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredTreasuryData = treasuryData.filter(
    (log) =>
      log.timestamp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.transactionHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.amount.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold">Audit Logs</h1>
      </div>

      <div className="space-y-2 text-muted-foreground">
        <p>• Shows all recent blockchain transactions related to housing registry updates.</p>
        <p>• Treasury section displays fund allocations, expenditures, and escrow balances for all CHPs.</p>
      </div>

      <Tabs defaultValue="logs" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="treasury">Treasury</TabsTrigger>
          </TabsList>
          {activeTab === "logs" && (
            <div className="w-1/3">
              <Input placeholder="Search logs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          )}
        </div>

        <TabsContent value="logs">
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
        </TabsContent>

        <TabsContent value="treasury" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card rounded-lg p-5 border">
              <div className="text-muted-foreground text-sm mb-2">Main Treasury Total</div>
              <div className="text-foreground text-3xl font-semibold">$2,450,000</div>
            </div>
            <div className="bg-card rounded-lg p-5 border">
              <div className="text-muted-foreground text-sm mb-2">Total Spent</div>
              <div className="text-foreground text-3xl font-semibold">$1,275,000</div>
            </div>
            <div className="bg-card rounded-lg p-5 border">
              <div className="text-muted-foreground text-sm mb-2">Total in Escrow</div>
              <div className="text-foreground text-3xl font-semibold">$675,000</div>
            </div>
            <div className="bg-card rounded-lg p-5 border">
              <div className="text-muted-foreground text-sm mb-2">Total Allocated</div>
              <div className="text-foreground text-3xl font-semibold">$500,000</div>
            </div>
          </div>

          <h3 className="text-lg font-semibold">CHP Allocations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-lg p-5 border">
              <div className="text-muted-foreground text-sm mb-2">CHP-001 Treasury</div>
              <div className="text-foreground text-3xl font-semibold">$175,000</div>
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Allocated:</span>
                  <span className="text-foreground">$200,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Spent:</span>
                  <span className="text-foreground">$125,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Escrow:</span>
                  <span className="text-foreground">$100,000</span>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg p-5 border">
              <div className="text-muted-foreground text-sm mb-2">CHP-002 Treasury</div>
              <div className="text-foreground text-3xl font-semibold">$225,000</div>
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Allocated:</span>
                  <span className="text-foreground">$250,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Spent:</span>
                  <span className="text-foreground">$150,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Escrow:</span>
                  <span className="text-foreground">$125,000</span>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg p-5 border">
              <div className="text-muted-foreground text-sm mb-2">CHP-003 Treasury</div>
              <div className="text-foreground text-3xl font-semibold">$100,000</div>
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Allocated:</span>
                  <span className="text-foreground">$150,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Spent:</span>
                  <span className="text-foreground">$100,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Escrow:</span>
                  <span className="text-foreground">$50,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Transaction Hash</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Performed By (DID)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTreasuryData.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {log.transactionHash} <LinkIcon className="ml-1 h-3 w-3" />
                      </div>
                    </TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.amount}</TableCell>
                    <TableCell>
                      <span
                        className="px-2 py-1 rounded-full text-xs border border-primary/50">
                        {log.type}
                      </span>
                    </TableCell>
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
        </TabsContent>
      </Tabs>
    </div>
  )
}


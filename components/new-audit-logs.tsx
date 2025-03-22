"use client"

import { useState } from "react"
import { LockIcon, SearchIcon, ExternalLinkIcon, CheckCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("")

  const logEntries = [
    {
      timestamp: "21 Mar 2025 13:24 NZT",
      hash: "0xTxHash...j",
      action: "Occupant Change (#H1234)",
      performer: "0x...Gov",
    },
    {
      timestamp: "18 Mar 2025 09:11 NZT",
      hash: "0xTxHash...j",
      action: "Added New Housing (#H1237)",
      performer: "0x...Gov",
    },
    {
      timestamp: "14 Mar 2025 15:34 NZT",
      hash: "0xTxHash...j",
      action: "Waitlist Update",
      performer: "0x...Gov",
    },
    {
      timestamp: "10 Mar 2025 11:05 NZT",
      hash: "0xTxHash...j",
      action: "Housing Status Change (#H1235)",
      performer: "0x...Gov",
    },
    {
      timestamp: "08 Mar 2025 14:22 NZT",
      hash: "0xTxHash...j",
      action: "New Applicant Added to Waitlist",
      performer: "0x...Gov",
    },
  ]

  const treasuryEntries = [
    {
      timestamp: "22 Mar 2025 10:15 NZT",
      hash: "0xTrHash...k",
      action: "Fund Transfer (#F5678) - Wages Payment",
      performer: "0x...Trs",
      amount: "$45,000",
      type: "Expense",
    },
    {
      timestamp: "19 Mar 2025 16:30 NZT",
      hash: "0xTrHash...k",
      action: "Treasury Deposit (#F5680) - CHP-001 Allocation",
      performer: "0x...Trs",
      amount: "$200,000",
      type: "Allocation",
    },
    {
      timestamp: "15 Mar 2025 08:45 NZT",
      hash: "0xTrHash...k",
      action: "Budget Allocation (#F5682) - Supplies Payment",
      performer: "0x...Trs",
      amount: "$75,000",
      type: "Expense",
    },
    {
      timestamp: "12 Mar 2025 14:20 NZT",
      hash: "0xTrHash...k",
      action: "Emergency Fund Release (#F5684) - Escrow for Rent",
      performer: "0x...Trs",
      amount: "$125,000",
      type: "Escrow",
    },
    {
      timestamp: "07 Mar 2025 11:35 NZT",
      hash: "0xTrHash...k",
      action: "Quarterly Budget Update (#F5686) - CHP-002 Allocation",
      performer: "0x...Trs",
      amount: "$250,000",
      type: "Allocation",
    },
  ]

  const filterEntries = (entries) => {
    if (!searchQuery) return entries
    return entries.filter(
      (entry) =>
        entry.timestamp.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.performer.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-purple-700 rounded-md flex items-center justify-center">
              <span className="text-xs font-bold">W-C</span>
            </div>
            <span className="text-xl font-bold">WhareChain</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-purple-400">
              Registry
            </a>
            <a href="#" className="hover:text-purple-400">
              Housing Map
            </a>
            <a href="#" className="hover:text-purple-400">
              Waitlist
            </a>
            <a href="#" className="bg-purple-700 px-4 py-2 rounded-md">
              Audit Logs
            </a>
            <a href="#" className="hover:text-purple-400">
              My Status
            </a>
          </nav>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <span>Public User</span>
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
                className="lucide lucide-chevron-down"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="flex items-center space-x-3 mb-4">
          <LockIcon className="text-gray-400" />
          <h1 className="text-2xl font-bold">MSD Audit Logs</h1>
        </div>

        <ul className="list-disc pl-6 text-gray-400 space-y-2 mb-6">
          <li>Accessible to government officials, community auditors, NGOs, and general public.</li>
          <li>Shows all recent blockchain transactions related to housing registry updates.</li>
          <li>Treasury section displays fund allocations, expenditures, and escrow balances for all CHPs.</li>
        </ul>

        <Tabs defaultValue="logs" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="bg-transparent p-0">
              <TabsTrigger
                value="logs"
                className="data-[state=active]:bg-purple-700 data-[state=active]:text-white px-4 py-2 rounded-md mr-2"
              >
                Logs
              </TabsTrigger>
              <TabsTrigger
                value="treasury"
                className="data-[state=active]:bg-purple-700 data-[state=active]:text-white px-4 py-2 rounded-md"
              >
                Treasury
              </TabsTrigger>
            </TabsList>

            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
              <Input
                type="text"
                placeholder="Search logs..."
                className="pl-10 bg-black border border-gray-700 rounded-md w-[300px] focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value="logs" className="mt-0">
            <div className="border border-gray-800 rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left p-4">Timestamp</th>
                    <th className="text-left p-4">Transaction Hash</th>
                    <th className="text-left p-4">Action</th>
                    <th className="text-left p-4">Performed By (DID)</th>
                  </tr>
                </thead>
                <tbody>
                  {filterEntries(logEntries).map((entry, index) => (
                    <tr key={index} className="border-b border-gray-800 last:border-b-0">
                      <td className="p-4">{entry.timestamp}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span>{entry.hash}</span>
                          <ExternalLinkIcon size={14} className="ml-1 text-gray-500" />
                        </div>
                      </td>
                      <td className="p-4">{entry.action}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span>{entry.performer}</span>
                          <ExternalLinkIcon size={14} className="ml-1 text-gray-500" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="treasury" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-900 rounded-lg p-5">
                <div className="text-gray-400 text-sm mb-2">Main Treasury Total</div>
                <div className="text-white text-3xl font-semibold">$2,450,000</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-5">
                <div className="text-gray-400 text-sm mb-2">Total Spent</div>
                <div className="text-white text-3xl font-semibold">$1,275,000</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-5">
                <div className="text-gray-400 text-sm mb-2">Total in Escrow</div>
                <div className="text-white text-3xl font-semibold">$675,000</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-5">
                <div className="text-gray-400 text-sm mb-2">Total Allocated</div>
                <div className="text-white text-3xl font-semibold">$500,000</div>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-3">CHP Allocations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-900 rounded-lg p-5">
                <div className="text-gray-400 text-sm mb-2">CHP-001 Treasury</div>
                <div className="text-white text-3xl font-semibold">$175,000</div>
                <div className="mt-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Allocated:</span>
                    <span className="text-white">$200,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Spent:</span>
                    <span className="text-white">$125,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Escrow:</span>
                    <span className="text-white">$100,000</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-5">
                <div className="text-gray-400 text-sm mb-2">CHP-002 Treasury</div>
                <div className="text-white text-3xl font-semibold">$225,000</div>
                <div className="mt-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Allocated:</span>
                    <span className="text-white">$250,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Spent:</span>
                    <span className="text-white">$150,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Escrow:</span>
                    <span className="text-white">$125,000</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-5">
                <div className="text-gray-400 text-sm mb-2">CHP-003 Treasury</div>
                <div className="text-white text-3xl font-semibold">$100,000</div>
                <div className="mt-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Allocated:</span>
                    <span className="text-white">$150,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Spent:</span>
                    <span className="text-white">$100,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Escrow:</span>
                    <span className="text-white">$50,000</span>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-3">Transaction Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-900 rounded-lg p-5">
                <div className="text-gray-400 text-sm mb-2">Total Transactions</div>
                <div className="text-white text-3xl font-semibold">42</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-5">
                <div className="text-gray-400 text-sm mb-2">Expenses</div>
                <div className="text-white text-3xl font-semibold">27</div>
                <div className="text-red-400 text-sm mt-1">$1,275,000</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-5">
                <div className="text-gray-400 text-sm mb-2">Allocations</div>
                <div className="text-white text-3xl font-semibold">8</div>
                <div className="text-green-400 text-sm mt-1">$500,000</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-5">
                <div className="text-gray-400 text-sm mb-2">Escrow</div>
                <div className="text-white text-3xl font-semibold">7</div>
                <div className="text-blue-400 text-sm mt-1">$675,000</div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-5 mb-6">
              <div className="text-gray-400 text-sm mb-2">Compliance Status</div>
              <div className="flex items-center">
                <span className="text-green-400 text-3xl font-semibold mr-2">Yes</span>
                <CheckCircle className="text-green-400 h-6 w-6" />
              </div>
            </div>

            <div className="border border-gray-800 rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left p-4">Timestamp</th>
                    <th className="text-left p-4">Transaction Hash</th>
                    <th className="text-left p-4">Action</th>
                    <th className="text-left p-4">Amount</th>
                    <th className="text-left p-4">Type</th>
                    <th className="text-left p-4">Performed By (DID)</th>
                  </tr>
                </thead>
                <tbody>
                  {filterEntries(treasuryEntries).map((entry, index) => (
                    <tr key={index} className="border-b border-gray-800 last:border-b-0">
                      <td className="p-4">{entry.timestamp}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span>{entry.hash}</span>
                          <ExternalLinkIcon size={14} className="ml-1 text-gray-500" />
                        </div>
                      </td>
                      <td className="p-4">{entry.action}</td>
                      <td className="p-4">{entry.amount}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${entry.type === "Expense"
                              ? "bg-red-900/30 text-red-400"
                              : entry.type === "Allocation"
                                ? "bg-green-900/30 text-green-400"
                                : "bg-blue-900/30 text-blue-400"
                            }`}
                        >
                          {entry.type}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span>{entry.performer}</span>
                          <ExternalLinkIcon size={14} className="ml-1 text-gray-500" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}


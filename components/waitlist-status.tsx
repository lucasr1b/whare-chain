"use client"

import { useState, useEffect } from "react"
import { LinkIcon } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface WaitlistEntry {
  position: number;
  applicantDID: string;
  priorityScore: number;
  householdSize: number;
  housingNeed: string;
  specialRequirements: string;
  timeOnWaitlist: string;
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Housing Waitlist</h1>
        <div className="w-1/3">
          <div className="h-10 bg-muted animate-pulse rounded" />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position</TableHead>
              <TableHead>Applicant DID</TableHead>
              <TableHead>Priority Score</TableHead>
              <TableHead>Household Size</TableHead>
              <TableHead>Housing Need</TableHead>
              <TableHead>Time on Waitlist</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="h-4 w-8 bg-muted animate-pulse rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-8 bg-muted animate-pulse rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-6 w-20 bg-muted animate-pulse rounded" />
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

export function WaitlistStatus() {
  const [searchTerm, setSearchTerm] = useState("")
  const [waitlistData, setWaitlistData] = useState<WaitlistEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWaitlistData = async () => {
      try {
        setIsLoading(true);

        // Sample data for demo purposes
        const sampleWaitlistData: WaitlistEntry[] = [
          {
            position: 1,
            applicantDID: "0x1234...5678",
            priorityScore: 95,
            householdSize: 4,
            housingNeed: "Urgent",
            specialRequirements: "Ground floor access, wheelchair accessible",
            timeOnWaitlist: "18 months"
          },
          {
            position: 2,
            applicantDID: "0xabcd...efgh",
            priorityScore: 92,
            householdSize: 2,
            housingNeed: "Urgent",
            specialRequirements: "Close to medical facilities",
            timeOnWaitlist: "15 months"
          },
          {
            position: 3,
            applicantDID: "0xijkl...mnop",
            priorityScore: 88,
            householdSize: 3,
            housingNeed: "Medium",
            specialRequirements: "Near public transport",
            timeOnWaitlist: "12 months"
          },
          {
            position: 4,
            applicantDID: "0xqrst...uvwx",
            priorityScore: 85,
            householdSize: 1,
            housingNeed: "Medium",
            specialRequirements: "Quiet area, accessible bathroom",
            timeOnWaitlist: "10 months"
          },
          {
            position: 5,
            applicantDID: "0xyzaa...bbcc",
            priorityScore: 82,
            householdSize: 5,
            housingNeed: "Medium",
            specialRequirements: "Multiple bedrooms, garden space",
            timeOnWaitlist: "8 months"
          },
          {
            position: 6,
            applicantDID: "0xdddd...eeee",
            priorityScore: 80,
            householdSize: 2,
            housingNeed: "Low",
            specialRequirements: "Pet friendly",
            timeOnWaitlist: "6 months"
          },
          {
            position: 7,
            applicantDID: "0xffff...gggg",
            priorityScore: 78,
            householdSize: 1,
            housingNeed: "Low",
            specialRequirements: "Close to employment opportunities",
            timeOnWaitlist: "4 months"
          },
          {
            position: 8,
            applicantDID: "0xhhhh...iiii",
            priorityScore: 75,
            householdSize: 3,
            housingNeed: "Low",
            specialRequirements: "Near schools",
            timeOnWaitlist: "3 months"
          },
          {
            position: 9,
            applicantDID: "0xjjjj...kkkk",
            priorityScore: 72,
            householdSize: 2,
            housingNeed: "Low",
            specialRequirements: "Parking space",
            timeOnWaitlist: "2 months"
          },
          {
            position: 10,
            applicantDID: "0xllll...mmmm",
            priorityScore: 70,
            householdSize: 1,
            housingNeed: "Low",
            specialRequirements: "Studio or 1 bedroom",
            timeOnWaitlist: "1 month"
          }
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        setWaitlistData(sampleWaitlistData);
      } catch (error) {
        console.error("Failed to fetch waitlist data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWaitlistData();
  }, []);

  const filteredData = waitlistData.filter(
    (applicant) =>
      applicant.applicantDID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.priorityScore.toString().includes(searchTerm) ||
      applicant.timeOnWaitlist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.housingNeed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Housing Waitlist</h1>
      </div>

      <p className="text-muted-foreground">
        Shows clear transparency around who is on the waitlist (anonymized) and their position based on priority
        criteria:
      </p>

      <div className="flex justify-end">
        <div className="w-1/3">
          <Input
            placeholder="Search waitlist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position</TableHead>
              <TableHead>Applicant DID</TableHead>
              <TableHead>Priority Score</TableHead>
              <TableHead>Household Size</TableHead>
              <TableHead>Housing Need</TableHead>
              <TableHead>Time on Waitlist</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No waitlist entries found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((applicant) => (
                <TableRow key={applicant.position}>
                  <TableCell className="font-medium">{applicant.position}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {applicant.applicantDID} <LinkIcon className="ml-1 h-3 w-3" />
                    </div>
                  </TableCell>
                  <TableCell>{applicant.priorityScore}</TableCell>
                  <TableCell>{applicant.householdSize}</TableCell>
                  <TableCell>
                    {applicant.housingNeed === "Urgent" ? (
                      <Badge variant="outline" className="bg-red-500/20 text-red-500 border-red-500/50">
                        Urgent
                      </Badge>
                    ) : applicant.housingNeed === "Medium" ? (
                      <Badge variant="outline" className="bg-primary/20 text-primary border-primary/50">
                        Medium
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-primary/20 text-primary/80 border-primary/50">
                        Low
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{applicant.timeOnWaitlist}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


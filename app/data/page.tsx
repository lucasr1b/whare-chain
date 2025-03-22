"use client";
import { useState } from "react";
import { HousingRegistry } from "@/components/housing-registry";
import { WaitlistStatus } from "@/components/waitlist-status";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";

export default function DataPage() {
  const [activeTab, setActiveTab] = useState("housing");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Manage housing registry and waitlist data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="housing" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="housing">Housing Registry</TabsTrigger>
                  <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
                </TabsList>
                <TabsContent value="housing">
                  <HousingRegistry />
                </TabsContent>
                <TabsContent value="waitlist">
                  <WaitlistStatus />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
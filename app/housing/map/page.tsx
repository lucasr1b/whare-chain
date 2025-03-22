'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Building2, Home, Users, Filter, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";

// Helper function to generate random coordinates within Auckland bounds
const generateAucklandCoordinates = () => {
  const minLat = -36.92;
  const maxLat = -36.75;
  const minLng = 174.65;
  const maxLng = 174.85;

  const lat = Number((minLat + Math.random() * (maxLat - minLat)).toFixed(6));
  const lng = Number((minLng + Math.random() * (maxLng - minLng)).toFixed(6));

  return [lng, lat] as [number, number];
};

export default function HousingMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [housingData, setHousingData] = useState<any[]>([]);

  useEffect(() => {
    const data = Array.from({ length: 200 }, (_, index) => {
      const coordinates = generateAucklandCoordinates();
      const unitTypes = ['Studio', '1 Bedroom', '2 Bedroom', '3 Bedroom', '4+ Bedroom'];
      const unitType = unitTypes[Math.floor(Math.random() * unitTypes.length)];
      const bedrooms = unitType === 'Studio' ? 0 : parseInt(unitType);
      const bathrooms = Math.max(1, Math.floor(bedrooms / 2));
      const area = `${Math.floor(30 + bedrooms * 15)}m²`;

      return {
        id: `AKL-${String(index + 1).padStart(3, '0')}`,
        coordinates,
        unitType,
        bedrooms,
        bathrooms,
        area,
        status: Math.random() > 0.2 ? 'Available' : 'Occupied',
      };
    });
    setHousingData(data);
  }, []);

  useEffect(() => {
    if (!mapContainer.current || housingData.length === 0) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [174.7633, -36.8485], // Auckland CBD
      zoom: 11,
      maxZoom: 16,
      minZoom: 9,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    housingData.forEach((unit) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = unit.status === 'Available'
        ? 'hsl(var(--primary))'
        : 'hsl(var(--muted))';
      el.style.width = '16px';
      el.style.height = '16px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid hsl(var(--background))';
      el.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
      el.style.cursor = 'pointer';
      // el.style.transition = 'transform 0.2s';
      // el.style.transformOrigin = 'center center'; // Ensure scaling happens from the center

      // // Add hover effect
      // el.onmouseover = () => {
      //   el.style.transform = 'scale(1.5)'; // Scale up by 1.5x
      // };

      // el.onmouseout = () => {
      //   el.style.transform = 'scale(1)'; // Reset to original size
      // };

      const marker = new mapboxgl.Marker(el)
        .setLngLat(unit.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25, className: 'custom-popup' })
            .setHTML(`
              <div class="bg-background border rounded-lg shadow-lg w-[280px]">
                <div class="p-4">
                  <div class="flex items-center justify-between mb-4">
                    <div>
                      <h3 class="font-semibold text-lg">Unit ${unit.id}</h3>
                      <p class="text-sm text-muted-foreground mt-0.5">${unit.unitType}</p>
                    </div>
                    <span class="px-2.5 py-1 rounded-full text-xs font-medium ${unit.status === 'Available'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
              }">
                      ${unit.status}
                    </span>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-3 mb-4">
                    <div class="flex items-center gap-2 text-sm">
                      <svg class="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                      <span>${unit.bedrooms} beds</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                      <svg class="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                      </svg>
                      <span>${unit.bathrooms} baths</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                      <svg class="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <line x1="3" y1="9" x2="21" y2="9"/>
                      </svg>
                      <span>${unit.area}</span>
                    </div>
                  </div>
                </div>
              </div>
            `)
        )
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, [housingData]);

  const filteredData = housingData.filter(unit => {
    const matchesSearch = unit.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' ||
      unit.unitType.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Unit Statistics</CardTitle>
              <CardDescription>
                Overview of public housing units in Auckland
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">{housingData.length}</div>
                    <div className="text-sm text-muted-foreground">Total Units</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">
                      {housingData.filter(h => h.status === 'Available').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Available Units</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">
                      {housingData.filter(h => h.status === 'Occupied').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Occupied Units</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">
                      {Math.round((housingData.filter(h => h.status === 'Available').length / housingData.length) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Availability Rate</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Auckland Public Housing Map</CardTitle>
              <CardDescription>
                Explore public housing units across Auckland
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by unit ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="1 bedroom">1 Bedroom</SelectItem>
                    <SelectItem value="2 bedroom">2 Bedroom</SelectItem>
                    <SelectItem value="3 bedroom">3 Bedroom</SelectItem>
                    <SelectItem value="4+ bedroom">4+ Bedroom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-lg overflow-hidden border">
                <div ref={mapContainer} className="w-full h-[600px]" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
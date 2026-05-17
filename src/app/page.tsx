"use client";
import React, { useState, useEffect } from 'react';
import BottomNav, { TabType } from '@/components/BottomNav';
import MapComponent from '@/components/MapComponent';
import MapTab from '@/components/tabs/MapTab';
import RoutesTab from '@/components/tabs/RoutesTab';
import AlertsTab from '@/components/tabs/AlertsTab';
import { generateLiveAlerts, Alert } from '@/lib/api/alerts';

export default function MobileShell() {
  const [activeTab, setActiveTab] = useState<TabType>('map');
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [floodRisk, setFloodRisk] = useState<number>(0);
  
  // Directions state can be lifted here so both RoutesTab and MapComponent can access it
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);

  // Default coords (Islamabad)
  const LAT = 33.7215;
  const LON = 73.0433;

  useEffect(() => {
    async function loadData() {
      try {
        const { alerts: liveAlerts, floodRisk: liveRisk } = await generateLiveAlerts(LAT, LON);
        setAlerts(liveAlerts);
        setFloodRisk(liveRisk);
      } catch (e) {
        console.error("Failed to fetch dashboard data:", e);
      }
    }
    loadData();
  }, []);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-gray-950 text-slate-200 font-sans">
      
      {/* Map Background Layer 
          This remains mounted at all times. If Alerts is active, the AlertsTab renders a solid background to cover it. 
      */}
      <div className="absolute inset-0 z-0">
         <MapComponent lat={LAT} lng={LON} directionsResponse={directionsResponse} alerts={alerts} />
      </div>

      {/* Tab Content Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between">
         {activeTab === 'map' && <MapTab alerts={alerts} floodRisk={floodRisk} />}
         {activeTab === 'routes' && <RoutesTab setDirectionsResponse={setDirectionsResponse} />}
         {activeTab === 'alerts' && <AlertsTab alerts={alerts} />}
         {activeTab === 'profile' && (
           <div className="pointer-events-auto bg-[#0A0F16] h-full w-full flex items-center justify-center text-gray-400">
             <div className="text-center">
               <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
               <p className="text-xl font-medium text-white">Profile Under Construction</p>
             </div>
           </div>
         )}
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 w-full z-50 pointer-events-auto">
         <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

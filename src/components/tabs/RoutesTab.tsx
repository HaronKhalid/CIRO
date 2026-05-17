"use client";
import React, { useEffect, useState } from 'react';

export default function RoutesTab({ setDirectionsResponse }: { setDirectionsResponse: (res: google.maps.DirectionsResult | null) => void }) {
  const [origin, setOrigin] = useState("F-10 Markaz, Islamabad");
  const [destination, setDestination] = useState("NUML University, Islamabad");
  const [isCalculating, setIsCalculating] = useState(false);

  // Calculate route function
  const calculateRoute = () => {
    if (window.google && window.google.maps && origin && destination) {
      setIsCalculating(true);
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
        },
        (result, status) => {
          setIsCalculating(false);
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
          } else {
            console.error(`error fetching directions ${result}`);
            setDirectionsResponse(null);
          }
        }
      );
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    calculateRoute();
    
    return () => {
      // Clear route when unmounting
      setDirectionsResponse(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDirectionsResponse]); // Intentionally omitting origin/destination to prevent spamming on every keystroke.

  return (
    <div className="h-full w-full flex flex-col pointer-events-none pb-[90px] pt-12">
      
      {/* Top Search inputs (Absolute positioning, floating on map) */}
      <div className="px-4 pointer-events-auto">
        <div className="bg-[#1A222C] rounded-3xl p-4 shadow-2xl border border-gray-800 flex items-start">
          <button className="text-white mt-2 mr-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </button>
          <div className="flex-1 text-white space-y-3">
            <div className="flex items-center justify-between text-lg font-bold mb-1">
              <span>Navigation</span>
              <button><svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg></button>
            </div>

            <div className="bg-[#0A0F16] rounded-2xl p-3 flex flex-col relative border border-gray-800/80">
              {/* Vertical line connecting the two dots */}
              <div className="absolute left-[23px] top-[26px] bottom-[26px] w-[2px] bg-gray-700"></div>
              
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 rounded-full border-2 border-emerald-500 mr-3 bg-[#0A0F16] z-10"></div>
                <input 
                  type="text" 
                  value={origin} 
                  onChange={(e) => setOrigin(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && calculateRoute()}
                  placeholder="Starting point..."
                  className="bg-transparent border-none text-sm text-gray-200 outline-none w-full" 
                />
              </div>
              <div className="border-t border-gray-800/60 w-full mb-3 ml-6"></div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-3 z-10"></div>
                <input 
                  type="text" 
                  value={destination} 
                  onChange={(e) => setDestination(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && calculateRoute()}
                  placeholder="Destination..."
                  className="bg-transparent border-none text-sm text-gray-200 outline-none w-full" 
                />
              </div>

              {/* Search Button */}
              <button 
                onClick={calculateRoute}
                disabled={isCalculating}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg border border-gray-700 transition-colors ${isCalculating ? 'bg-gray-800 text-gray-500' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}>
                {isCalculating ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                )}
              </button>
            </div>

            {/* Transport Modes */}
            <div className="flex justify-between items-center mt-2 px-1">
              <button className="bg-emerald-600 text-white px-5 py-2 rounded-full"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg></button>
              <button className="text-gray-400 px-5 py-2 hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg></button>
              <button className="text-gray-400 px-5 py-2 hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></button>
              <button className="text-gray-400 px-5 py-2 hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg></button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1"></div>

      {/* Bottom Sheet for Route Options */}
      <div className="px-4 pointer-events-auto">
        <div className="bg-[#1A222C]/95 backdrop-blur-2xl rounded-[32px] p-5 border border-gray-800/80 shadow-2xl">
          <div className="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mb-4"></div>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Route Options</h2>
            <button className="bg-gray-800 p-1.5 rounded-full"><svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg></button>
          </div>

          <div className="space-y-3">
            {/* Recommended */}
            <div className="bg-[#0A0F16] border border-emerald-500/50 rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-emerald-400 font-semibold mb-1">Recommended (Safest)</h3>
                  <div className="flex items-end space-x-3">
                    <span className="text-white font-bold text-xl">12 min</span>
                    <span className="text-gray-400 text-sm mb-0.5">4.1 km</span>
                    <span className="text-gray-500 text-sm mb-0.5 ml-2">No flood risk</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <div className="bg-emerald-500 rounded-full p-1"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div className="flex space-x-1 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Fastest */}
            <div className="bg-[#0A0F16] border border-blue-500/50 rounded-2xl p-4 relative overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-blue-400 font-semibold mb-1">Fastest</h3>
                  <div className="flex items-end space-x-3">
                    <span className="text-white font-bold text-xl">8 min</span>
                    <span className="text-gray-400 text-sm mb-0.5">3.7 km</span>
                    <span className="text-gray-500 text-sm mb-0.5 ml-2">Moderate flood risk</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2 pt-5">
                  <div className="flex space-x-1 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                    <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Alert Banner */}
            <div className="bg-red-900/30 border border-red-500/40 rounded-2xl p-4 flex justify-between items-center mt-4">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                <div>
                  <p className="text-white font-semibold text-sm">Flooding reported on Kashmir Hwy</p>
                  <p className="text-red-400 text-xs">Rerouted automatically for your safety</p>
                </div>
              </div>
              <button className="bg-red-500/20 text-red-400 text-xs px-3 py-1.5 rounded-lg border border-red-500/30">Why changed?</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

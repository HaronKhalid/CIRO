"use client";
import React from 'react';

export default function AlertsTab() {
  return (
    <div className="h-full w-full bg-[#0A0F16] flex flex-col pb-[90px] pt-12 pointer-events-auto overflow-y-auto">
      <div className="px-5 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Alerts</h1>
        <button className="text-gray-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
        </button>
      </div>

      {/* Filter Pills */}
      <div className="px-5 flex space-x-3 overflow-x-auto hide-scrollbar mb-6">
        <button className="whitespace-nowrap px-4 py-1.5 bg-emerald-600/20 text-emerald-400 border border-emerald-600/50 rounded-full text-sm font-medium">All</button>
        <button className="whitespace-nowrap px-4 py-1.5 bg-[#1A222C] text-gray-300 rounded-full text-sm font-medium border border-transparent hover:bg-gray-800">Flooding</button>
        <button className="whitespace-nowrap px-4 py-1.5 bg-[#1A222C] text-gray-300 rounded-full text-sm font-medium border border-transparent hover:bg-gray-800">Fire</button>
        <button className="whitespace-nowrap px-4 py-1.5 bg-[#1A222C] text-gray-300 rounded-full text-sm font-medium border border-transparent hover:bg-gray-800">Road Block</button>
        <button className="whitespace-nowrap px-4 py-1.5 bg-[#1A222C] text-gray-300 rounded-full text-sm font-medium border border-transparent hover:bg-gray-800">AQI</button>
      </div>

      <h2 className="px-5 text-lg font-semibold text-white mb-4">Live Alerts</h2>

      <div className="px-5 space-y-4">
        {/* Alert Card 1 */}
        <div className="bg-[#131B24] rounded-3xl p-5 border border-gray-800/60 shadow-lg">
          <div className="flex items-start">
            <div className="bg-red-900/30 p-3.5 rounded-2xl mr-4 border border-red-500/20 flex-shrink-0">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start">
                <h3 className="text-white font-semibold text-[17px]">Urban Flooding</h3>
                <span className="px-2.5 py-0.5 bg-red-900/40 border border-red-800/60 text-red-400 text-xs rounded-lg font-semibold tracking-wide">High</span>
              </div>
              <p className="text-gray-400 text-sm mt-0.5">G-9, Islamabad</p>
              <p className="text-gray-300 text-sm mt-2 mb-4">Expected in 30 min • Water level: Medium</p>
              
              <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex space-x-4">
                  <span className="flex items-center"><svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 10 min ago</span>
                  <span className="flex items-center"><svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"></path></svg> 1.2 km away</span>
                </div>
                <button className="text-red-400 font-medium flex items-center hover:text-red-300">Avoid Area <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></button>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Card 2 */}
        <div className="bg-[#131B24] rounded-3xl p-5 border border-gray-800/60 shadow-lg">
          <div className="flex items-start">
            <div className="bg-orange-900/30 p-3.5 rounded-2xl mr-4 border border-orange-500/20 flex-shrink-0">
              <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start">
                <h3 className="text-white font-semibold text-[17px]">Road Block</h3>
                <span className="px-2.5 py-0.5 bg-orange-900/40 border border-orange-800/60 text-orange-400 text-xs rounded-lg font-semibold tracking-wide">Medium</span>
              </div>
              <p className="text-gray-400 text-sm mt-0.5">Kashmir Highway</p>
              <p className="text-gray-300 text-sm mt-2 mb-4">Heavy water logging due to rain</p>
              
              <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex space-x-4">
                  <span className="flex items-center"><svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 25 min ago</span>
                  <span className="flex items-center"><svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"></path></svg> 3.6 km away</span>
                </div>
                <button className="text-orange-400 font-medium flex items-center hover:text-orange-300">View Route <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></button>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Card 3 */}
        <div className="bg-[#131B24] rounded-3xl p-5 border border-gray-800/60 shadow-lg">
          <div className="flex items-start">
            <div className="bg-blue-900/30 p-3.5 rounded-2xl mr-4 border border-blue-500/20 flex-shrink-0">
              <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
            </div>
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start">
                <h3 className="text-white font-semibold text-[17px]">Heavy Rain</h3>
                <span className="px-2.5 py-0.5 bg-blue-900/40 border border-blue-800/60 text-blue-400 text-xs rounded-lg font-semibold tracking-wide">Low</span>
              </div>
              <p className="text-gray-400 text-sm mt-0.5">Islamabad & Rawalpindi</p>
              <p className="text-gray-300 text-sm mt-2 mb-4">Rain likely to continue for 2-3 hrs</p>
              
              <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex space-x-4">
                  <span className="flex items-center"><svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 15 min ago</span>
                  <span className="flex items-center"><svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"></path></svg> -</span>
                </div>
                <button className="text-blue-400 font-medium flex items-center hover:text-blue-300">Details <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

"use client";
import React from 'react';
import { Alert } from '@/lib/api/alerts';

export default function MapTab({ alerts, floodRisk, lat, lng }: { alerts: Alert[], floodRisk: number, lat: number, lng: number }) {
  // Find AQI from alerts, otherwise default to "Good"
  const aqiAlert = alerts.find(a => a.type === 'AQI');
  const displayAqi = aqiAlert ? aqiAlert.description.split('•')[0].replace('AQI ', '') : 'Good';
  
  // Find Fire/Heatwave alert for temp context
  const fireAlert = alerts.find(a => a.type === 'Fire');
  // Just grabbing numeric temp if available, else showing safe default
  const currentTemp = fireAlert ? fireAlert.description.replace(/[^0-9]/g, '') : '28';

  // Determine the highest priority alert for the bottom banner
  const highestAlert = alerts.length > 0 ? alerts[0] : null;

  return (
    <div className="h-full w-full flex flex-col justify-between pointer-events-none pb-[90px] pt-12">
      {/* Top Search & Filters */}
      <div className="px-4 pointer-events-auto space-y-3">
        <div className="flex items-center space-x-3">
          <button className="bg-[#1A222C] p-3 rounded-full text-white hover:bg-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
          <div className="flex-1 bg-[#1A222C] rounded-full px-4 py-3 flex items-center relative shadow-lg">
            <input type="text" placeholder="Search places or routes..." className="bg-transparent border-none outline-none text-white w-full text-sm" />
            <svg className="w-5 h-5 text-gray-400 absolute right-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
          </div>
          <button className="bg-[#1A222C] p-3 rounded-full text-white relative hover:bg-gray-700 shadow-lg">
            <span className={`absolute top-0 right-0 h-3 w-3 border-2 border-[#1A222C] rounded-full ${alerts.length > 0 ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex space-x-2 overflow-x-auto hide-scrollbar pb-2">
          <button className="whitespace-nowrap px-4 py-1.5 bg-emerald-600/20 text-emerald-400 border border-emerald-600/50 rounded-full text-sm font-medium">Default</button>
          <button className="whitespace-nowrap px-4 py-1.5 bg-orange-600/20 text-orange-400 border border-orange-600/50 rounded-full text-sm font-medium">Heatmap</button>
          <button className="whitespace-nowrap px-4 py-1.5 bg-[#1A222C] text-gray-300 rounded-full text-sm font-medium border border-transparent">AQI</button>
          <button className="whitespace-nowrap px-4 py-1.5 bg-[#1A222C] text-gray-300 rounded-full text-sm font-medium border border-transparent">Flood</button>
          <button className="whitespace-nowrap px-4 py-1.5 bg-[#1A222C] text-gray-300 rounded-full text-sm font-medium flex items-center border border-transparent">More <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
        </div>
      </div>

      {/* Map Action Buttons (Right) */}
      <div className="absolute right-4 top-1/3 flex flex-col space-y-3 pointer-events-auto">
         <button className="bg-[#1A222C]/90 backdrop-blur-md p-3 rounded-full text-white shadow-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button>
         <button className="bg-[#1A222C]/90 backdrop-blur-md p-3 rounded-full text-white shadow-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg></button>
         <button className="bg-[#1A222C]/90 backdrop-blur-md p-3 rounded-full text-blue-400 shadow-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></button>
      </div>

      {/* Bottom Information Card */}
      <div className="px-4 pointer-events-auto">
        <div className="bg-[#1A222C]/95 backdrop-blur-2xl rounded-[32px] p-5 border border-gray-800/80 shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div className={`${floodRisk > 50 ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'} p-3 rounded-2xl mr-4 border`}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
              </div>
              <div>
                <h2 className="text-[22px] font-bold text-white tracking-tight">Islamabad</h2>
                <span className={`inline-block mt-1 px-3 py-0.5 border text-xs rounded-lg font-semibold tracking-wide uppercase ${floodRisk > 50 ? 'bg-red-900/40 border-red-800 text-red-400' : 'bg-emerald-900/40 border-emerald-800 text-emerald-400'}`}>
                  {floodRisk > 50 ? 'High Risk' : 'Normal'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-5 border-t border-gray-800/60 pt-5">
            <div>
              <p className="text-gray-400 text-[11px] uppercase tracking-wider mb-1 font-medium">Flood Risk</p>
              <p className={`${floodRisk > 50 ? 'text-red-400' : 'text-emerald-400'} text-2xl font-bold`}>{floodRisk}%</p>
            </div>
            <div className="border-l border-gray-800/60 pl-4">
              <p className="text-gray-400 text-[11px] uppercase tracking-wider mb-1 font-medium">AQI</p>
              <p className="text-white text-2xl font-bold">{displayAqi}</p>
            </div>
            <div className="border-l border-gray-800/60 pl-4">
              <p className="text-gray-400 text-[11px] uppercase tracking-wider mb-1 font-medium">Temp.</p>
              <p className="text-white text-2xl font-bold">{currentTemp}°C</p>
            </div>
          </div>

          <div className="bg-[#0A0F16]/50 rounded-2xl p-4 flex justify-between items-center text-sm border border-gray-800/30">
            {highestAlert ? (
              <>
                <div className="flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-2 ${highestAlert.severity === 'High' ? 'bg-red-500 animate-pulse' : 'bg-orange-500'}`}></span>
                  <span className="text-gray-200 font-medium">{highestAlert.title}: {highestAlert.description.split('•')[0]}</span>
                </div>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </>
            ) : (
              <>
                <span className="text-gray-400 font-medium">No severe alerts in your area</span>
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

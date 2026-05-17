"use client";
import React from 'react';
import { Alert } from '@/lib/api/alerts';

export default function AlertsTab({ alerts }: { alerts: Alert[] }) {
  
  const getIconForType = (type: string) => {
    switch(type) {
      case 'Flooding':
        return <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>;
      case 'Road Block':
        return <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>;
      case 'Heavy Rain':
        return <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>;
      case 'Fire':
        return <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path></svg>;
      case 'AQI':
        return <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>;
      default:
        return <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>;
    }
  };

  const getColorsForSeverity = (severity: string) => {
    switch(severity) {
      case 'High': return { bg: 'bg-red-900/30', border: 'border-red-500/20', text: 'text-red-500', badgeBg: 'bg-red-900/40', badgeBorder: 'border-red-800/60', badgeText: 'text-red-400' };
      case 'Medium': return { bg: 'bg-orange-900/30', border: 'border-orange-500/20', text: 'text-orange-500', badgeBg: 'bg-orange-900/40', badgeBorder: 'border-orange-800/60', badgeText: 'text-orange-400' };
      case 'Low': return { bg: 'bg-blue-900/30', border: 'border-blue-500/20', text: 'text-blue-400', badgeBg: 'bg-blue-900/40', badgeBorder: 'border-blue-800/60', badgeText: 'text-blue-400' };
      default: return { bg: 'bg-gray-900/30', border: 'border-gray-500/20', text: 'text-gray-400', badgeBg: 'bg-gray-900/40', badgeBorder: 'border-gray-800/60', badgeText: 'text-gray-400' };
    }
  };

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
        {alerts.length === 0 ? (
          <div className="text-center py-10 bg-[#131B24] rounded-3xl border border-gray-800/60">
            <svg className="w-12 h-12 mx-auto text-emerald-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p className="text-gray-300 font-medium">All Clear!</p>
            <p className="text-gray-500 text-sm mt-1">No active intelligence alerts for your area.</p>
          </div>
        ) : (
          alerts.map(alert => {
            const c = getColorsForSeverity(alert.severity);
            return (
              <div key={alert.id} className="bg-[#131B24] rounded-3xl p-5 border border-gray-800/60 shadow-lg transition-transform hover:scale-[1.02]">
                <div className="flex items-start">
                  <div className={`${c.bg} p-3.5 rounded-2xl mr-4 border ${c.border} flex-shrink-0`}>
                    <div className={c.text}>{getIconForType(alert.type)}</div>
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="text-white font-semibold text-[17px]">{alert.title}</h3>
                      <span className={`px-2.5 py-0.5 ${c.badgeBg} border ${c.badgeBorder} ${c.badgeText} text-xs rounded-lg font-semibold tracking-wide`}>{alert.severity}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-0.5">{alert.location}</p>
                    <p className="text-gray-300 text-sm mt-2 mb-4">{alert.description}</p>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <div className="flex space-x-4">
                        <span className="flex items-center"><svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> {alert.timeAgo}</span>
                        <span className="flex items-center"><svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"></path></svg> {alert.distance}</span>
                      </div>
                      <button className={`${c.text} font-medium flex items-center hover:opacity-80`}>Details <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

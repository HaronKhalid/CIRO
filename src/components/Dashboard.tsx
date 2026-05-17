"use client";
import React, { useEffect, useState } from 'react';
import { fetchWeatherForecast, WeatherForecast } from '@/lib/api/weather';
import { fetchAqiData, AqiData } from '@/lib/api/aqi';
import MapComponent from './MapComponent';

export default function Dashboard() {
  const [weather, setWeather] = useState<WeatherForecast | null>(null);
  const [aqi, setAqi] = useState<AqiData | null>(null);
  const [loading, setLoading] = useState(true);

  // Default coordinates (e.g. Islamabad, from the python scripts)
  const LAT = 33.7215;
  const LON = 73.0433;

  useEffect(() => {
    async function loadData() {
      try {
        const [weatherData, aqiData] = await Promise.all([
          fetchWeatherForecast(LAT, LON),
          fetchAqiData(LAT, LON)
        ]);
        setWeather(weatherData);
        setAqi(aqiData);
      } catch (e) {
        console.error("Failed to fetch dashboard data:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  const currentTemp = weather?.hourly.temperature_2m[0] ?? '--';
  const currentAqi = aqi?.hourly.pm2_5[0] ?? '--';

  return (
    <div className="min-h-screen bg-gray-950 text-slate-200 font-sans p-6">
      <header className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            CIRO Dashboard
          </h1>
          <p className="text-gray-400 mt-1">Crises Intelligence & Response Orchestra</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">System Status</p>
            <p className="text-green-400 font-semibold flex items-center justify-end">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Map View */}
        <div className="lg:col-span-2 bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden relative" style={{ height: '500px' }}>
          <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-gray-700">
            <h3 className="font-semibold text-white">Live Operations Map</h3>
            <p className="text-xs text-gray-400">Monitoring Active Regions</p>
          </div>
          <MapComponent lat={LAT} lng={LON} />
        </div>

        {/* Intelligence Side Panel */}
        <div className="flex flex-col gap-6">
          <div className="bg-gray-900 rounded-xl p-6 shadow-2xl border border-gray-800 hover:border-gray-700 transition-colors">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Environmental Intelligence</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Current Temp</p>
                <p className="text-3xl font-bold mt-1">{currentTemp}°C</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400">PM2.5 AQI</p>
                <p className="text-3xl font-bold mt-1 text-red-400">{currentAqi}</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg col-span-2 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Wind Speed</p>
                  <p className="text-2xl font-bold mt-1">{weather?.hourly.wind_speed_10m[0] ?? '--'} km/h</p>
                </div>
                <div className="h-10 w-10 rounded-full border-2 border-blue-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 shadow-2xl border border-gray-800 hover:border-gray-700 transition-colors flex-grow">
            <h3 className="text-lg font-semibold mb-4 text-teal-400">Active Alerts</h3>
            <div className="space-y-4">
              <div className="flex items-start p-3 bg-red-900/20 border border-red-800/50 rounded-lg">
                <div className="mt-1 h-2 w-2 rounded-full bg-red-500 mr-3 animate-ping"></div>
                <div>
                  <h4 className="text-red-400 font-semibold text-sm">Poor Air Quality Warning</h4>
                  <p className="text-xs text-gray-400 mt-1">PM2.5 levels are elevated. Advisory for sensitive groups.</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 bg-yellow-900/20 border border-yellow-800/50 rounded-lg">
                <div className="mt-1 h-2 w-2 rounded-full bg-yellow-500 mr-3"></div>
                <div>
                  <h4 className="text-yellow-400 font-semibold text-sm">Precipitation Expected</h4>
                  <p className="text-xs text-gray-400 mt-1">{weather?.hourly.precipitation_probability[0] ?? 0}% chance of rain in the next hour.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

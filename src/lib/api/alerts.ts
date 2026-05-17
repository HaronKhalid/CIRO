import { fetchWeatherForecast } from './weather';
import { fetchAqiData } from './aqi';
import { fetchFloodData } from './flood';
import { fetchFirmsData } from './firms';

export type AlertType = 'Flooding' | 'Fire' | 'Road Block' | 'AQI' | 'Heavy Rain';
export type AlertSeverity = 'High' | 'Medium' | 'Low';

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  location: string;
  description: string;
  timeAgo: string;
  distance: string;
  lat: number;
  lng: number;
}

export async function generateLiveAlerts(lat: number, lon: number): Promise<{ alerts: Alert[], floodRisk: number }> {
  const alerts: Alert[] = [];
  
  // Utility to prevent one failed API from crashing the entire aggregation engine
  const safeFetch = async <T>(promise: Promise<T>, fallback: T): Promise<T> => {
    try {
      return await promise;
    } catch (e) {
      console.warn("API Fetch failed, using fallback", e);
      return fallback;
    }
  };

  const [weather, aqi, flood, fires] = await Promise.all([
    safeFetch(fetchWeatherForecast(lat, lon), null),
    safeFetch(fetchAqiData(lat, lon), null),
    safeFetch(fetchFloodData(lat, lon), null),
    safeFetch(fetchFirmsData(lat, lon), [])
  ]);

  const currentTemp = weather?.hourly.temperature_2m[0] ?? 28;
  const precipProb = weather?.hourly.precipitation_probability[0] ?? 0;
  const rain = weather?.hourly.rain[0] ?? 0;
  const currentAqi = aqi?.hourly.pm2_5[0] ?? 40;
  const riverDischarge = flood?.daily.river_discharge[0] ?? 0;

  // Calculate dynamic flood risk (0-100%) based on river discharge and rain probability
  const floodRisk = Math.min(100, Math.max(0, Math.round((precipProb * 0.4) + (riverDischarge * 0.6) + (rain * 10))));

  // 1. Flood / Rain Alert Logic
  if (floodRisk > 40 || rain > 5) {
    alerts.push({
      id: 'alert-flood',
      type: 'Flooding',
      severity: floodRisk > 70 ? 'High' : 'Medium',
      title: 'Urban Flooding',
      location: 'Local Sector',
      description: `Expected soon • Water level: ${floodRisk > 70 ? 'High' : 'Medium'}`,
      timeAgo: 'Just now',
      distance: '1.2 km away',
      lat: lat + 0.015,
      lng: lon - 0.015
    });
  } else if (precipProb > 20) {
    alerts.push({
      id: 'alert-rain',
      type: 'Heavy Rain',
      severity: 'Low',
      title: 'Precipitation Warning',
      location: 'Current Area',
      description: `${precipProb}% chance of rain in the next hour`,
      timeAgo: 'Just now',
      distance: '-',
      lat: lat + 0.005,
      lng: lon + 0.005
    });
  }

  // 2. Air Quality Logic
  if (currentAqi > 50) {
    alerts.push({
      id: 'alert-aqi',
      type: 'AQI',
      severity: currentAqi > 100 ? 'High' : 'Medium',
      title: 'Poor Air Quality',
      location: 'Current Area',
      description: `AQI ${Math.round(currentAqi)} • Unhealthy for sensitive groups`,
      timeAgo: 'Live',
      distance: '0 km away',
      lat: lat,
      lng: lon
    });
  }

  // 3. Fire / Heatwave Logic
  if (currentTemp > 35 || fires.length > 0) {
    alerts.push({
      id: 'alert-fire',
      type: 'Fire',
      severity: currentTemp > 40 ? 'High' : 'Medium',
      title: 'Extreme Heat / Fire Risk',
      location: 'Regional',
      description: `Temperatures reaching ${currentTemp}°C`,
      timeAgo: 'Live',
      distance: 'Regional',
      lat: lat - 0.01,
      lng: lon + 0.01
    });
  }

  // Generate a mock Road Block alert just to demonstrate the UI type, 
  // since we don't have a live traffic API currently.
  alerts.push({
    id: 'alert-road',
    type: 'Road Block',
    severity: 'Medium',
    title: 'Road Block',
    location: 'Kashmir Highway',
    description: 'Heavy traffic congestion detected',
    timeAgo: '25 min ago',
    distance: '3.6 km away',
    lat: lat - 0.02,
    lng: lon - 0.005
  });

  return { alerts, floodRisk };
}

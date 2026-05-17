export interface SatelliteData {
  latitude: number;
  longitude: number;
  timezone: string;
  elevation: number;
  hourly: {
    time: string[];
    shortwave_radiation: number[];
  };
}

export async function fetchSatelliteData(lat: number, lon: number): Promise<SatelliteData> {
  const url = `https://satellite-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&hourly=shortwave_radiation&models=satellite_radiation_seamless&timezone=auto&temporal_resolution=native`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch satellite radiation data');
  }
  return response.json();
}

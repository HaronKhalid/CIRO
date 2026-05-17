export interface AqiData {
  latitude: number;
  longitude: number;
  timezone: string;
  elevation: number;
  hourly: {
    time: string[];
    pm10: number[];
    pm2_5: number[];
  };
}

export async function fetchAqiData(lat: number, lon: number): Promise<AqiData> {
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5&timezone=auto`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch AQI data');
  }
  return response.json();
}

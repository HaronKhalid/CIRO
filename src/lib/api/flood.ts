export interface FloodData {
  latitude: number;
  longitude: number;
  timezone: string;
  elevation: number;
  daily: {
    time: string[];
    river_discharge: number[];
  };
}

export async function fetchFloodData(lat: number, lon: number): Promise<FloodData> {
  const url = `https://flood-api.open-meteo.com/v1/flood?latitude=${lat}&longitude=${lon}&daily=river_discharge&timezone=auto`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch flood data');
  }
  return response.json();
}

export interface FireData {
  latitude: number;
  longitude: number;
  brightness: number;
  confidence: number;
  acq_time: string;
}

export async function fetchFirmsData(lat: number, lon: number, radiusKm: number = 50): Promise<FireData[]> {
  // NASA FIRMS requires an API key for the live CSV endpoint.
  // In a production environment, this would hit the backend or use a secure proxy.
  // For now, we mock the FIRMS response or use a proxy if available.
  
  // Example FIRMS API URL (requires MAP_KEY):
  // const url = `https://firms.modaps.eosdis.nasa.gov/api/active_fire/csv/MAP_KEY/VIIRS_SNPP_NRT/world/1`;
  
  // Since we don't have the key, we'll simulate a fetch that resolves to empty,
  // allowing the Open-Meteo extreme temperature logic to take precedence for Fire/Heatwave alerts.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]); // Mocking no direct active satellite fires detected without key
    }, 500);
  });
}

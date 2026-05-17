export interface ClimateData {
  latitude: number;
  longitude: number;
  timezone: string;
  elevation: number;
  daily: {
    time: string[];
    temperature_2m_max: number[];
  };
}

export async function fetchClimateData(lat: number, lon: number): Promise<ClimateData> {
  const models = "CMCC_CM2_VHR4,FGOALS_f3_H,HiRAM_SIT_HR,MRI_AGCM3_2_S,EC_Earth3P_HR,MPI_ESM1_2_XR,NICAM16_8S";
  const url = `https://climate-api.open-meteo.com/v1/climate?latitude=${lat}&longitude=${lon}&start_date=1950-01-01&end_date=2050-12-31&models=${models}&daily=temperature_2m_max&timezone=auto`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch climate data');
  }
  // Open-Meteo returns an array when multiple models are requested.
  // We'll return the first one for simplicity, or we can handle the array on the frontend.
  const data = await response.json();
  return Array.isArray(data) ? data[0] : data;
}

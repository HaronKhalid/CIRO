export interface WeatherForecast {
  latitude: number;
  longitude: number;
  timezone: string;
  elevation: number;
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    showers: number[];
    rain: number[];
    precipitation: number[];
    precipitation_probability: number[];
    cloud_cover: number[];
    visibility: number[];
    wind_speed_10m: number[];
  };
}

export async function fetchWeatherForecast(lat: number, lon: number): Promise<WeatherForecast> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,showers,rain,precipitation,precipitation_probability,cloud_cover,visibility,wind_speed_10m&timezone=auto`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch weather forecast');
  }
  return response.json();
}

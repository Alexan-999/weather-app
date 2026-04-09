export interface ForecastDay {
  date: string;
  maxTemperature: number;
  minTemperature: number;
}

export interface Weather {
  temperature: number;
  windspeed: number;
  city: string;
  country: string;
  forecast: ForecastDay[];
}
// OpenWeather API Types

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  clouds: number;
  wind_speed: number;
  weather: WeatherCondition[];
}

export interface DailyWeather {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  wind_speed: number;
  weather: WeatherCondition[];
  clouds: number;
  pop: number; // Probability of precipitation
  rain?: number;
  uvi: number;
}

export interface HourlyWeather {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  clouds: number;
  wind_speed: number;
  weather: WeatherCondition[];
  pop: number;
}

export interface WeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}

export interface WeatherOverview {
  date: string;
  weather_overview: string;
}

export type WeatherForecastType = 'overview' | 'current' | 'hourly' | 'daily';

// Weather Service - OpenWeather One Call API

import { WEATHER_CONFIG } from '../constants/weather.constants';
import type { WeatherResponse, WeatherOverview } from '../types/weather.types';

export class WeatherService {
  /**
   * Fetch weather data for a specific location
   * @param lat - Latitude
   * @param lon - Longitude
   * @returns Weather data including current, hourly, and daily forecasts
   */
  static async getWeatherData(
    lat: number,
    lon: number
  ): Promise<WeatherResponse> {
    const url = new URL(WEATHER_CONFIG.BASE_URL);

    url.searchParams.append('lat', lat.toString());
    url.searchParams.append('lon', lon.toString());
    url.searchParams.append('appid', WEATHER_CONFIG.API_KEY);
    url.searchParams.append('units', WEATHER_CONFIG.UNITS);
    url.searchParams.append('lang', WEATHER_CONFIG.LANGUAGE);

    console.log('Fetching weather data from:', url.toString());

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }

    const data: WeatherResponse = await response.json();
    console.log('Weather data received:', data);

    return data;
  }

  /**
   * Fetch weather overview for a specific location
   * @param lat - Latitude
   * @param lon - Longitude
   * @returns Weather overview summary
   */
  static async getWeatherOverview(
    lat: number,
    lon: number
  ): Promise<WeatherOverview> {
    const url = new URL('https://api.openweathermap.org/data/3.0/onecall/overview');

    url.searchParams.append('lat', lat.toString());
    url.searchParams.append('lon', lon.toString());
    url.searchParams.append('appid', WEATHER_CONFIG.API_KEY);
    url.searchParams.append('units', WEATHER_CONFIG.UNITS);

    console.log('Fetching weather overview from:', url.toString());

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Weather Overview API error: ${response.status} ${response.statusText}`);
    }

    const data: WeatherOverview = await response.json();
    console.log('Weather overview received:', data);

    return data;
  }

  /**
   * Get weather icon URL from OpenWeather
   * @param iconCode - Icon code from weather data
   * @param size - Icon size (2x or 4x)
   */
  static getIconUrl(iconCode: string, size: '2x' | '4x' = '2x'): string {
    return `${WEATHER_CONFIG.ICON_URL}${iconCode}@${size}.png`;
  }

  /**
   * Format temperature with degree symbol
   */
  static formatTemp(temp: number): string {
    return `${Math.round(temp)}°C`;
  }

  /**
   * Format date from timestamp
   */
  static formatDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString('vi-VN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }

  /**
   * Format time from timestamp
   */
  static formatTime(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}

// Geocoding Service - Nominatim API

import { API_ENDPOINTS, API_CONFIG } from '../constants/api.constants';
import type { NominatimResult } from '../types/map.types';

export class GeocodingService {
  /**
   * Get location coordinates from place name
   * @param place - Place name to search for
   * @returns Array of location results
   */
  static async getLocation(place: string): Promise<NominatimResult[]> {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.NOMINATIM}?q=${encodeURIComponent(place)}&format=jsonv2&limit=1`,
        {
          headers: API_CONFIG.NOMINATIM_HEADERS
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Geocoding result:", data[0]);
      return data;
    } catch (error) {
      console.error("Geocoding error:", error);
      throw new Error(`Failed to geocode "${place}": ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Reverse geocoding - Get place name from coordinates
   * @param lat - Latitude
   * @param lon - Longitude
   * @returns Place information
   */
  static async reverseGeocode(lat: number, lon: number): Promise<any> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`,
        {
          headers: API_CONFIG.NOMINATIM_HEADERS
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      throw error;
    }
  }
}

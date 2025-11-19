// POI (Points of Interest) Service - Overpass API

import { API_ENDPOINTS, API_CONFIG, POI_CATEGORIES } from '../constants/api.constants';
import type { POI, OverpassResponse } from '../types/poi.types';

export class POIService {
  /**
   * Find nearby POIs using Overpass API
   * @param lat - Latitude
   * @param lon - Longitude
   * @param category - POI category (cafe, restaurant, etc.)
   * @param radius - Search radius in meters
   * @returns Array of POIs
   */
  static async findNearby(
    lat: number,
    lon: number,
    category: string = POI_CATEGORIES.CAFE,
    radius: number = API_CONFIG.OVERPASS_RADIUS
  ): Promise<POI[]> {
    try {
      const query = `
[out:json][timeout:${API_CONFIG.OVERPASS_TIMEOUT}];
nwr(around:${radius},${lat},${lon})["amenity"="${category}"];
out center ${API_CONFIG.OVERPASS_MAX_RESULTS};
      `;

      console.log("Sending Overpass query:", query);

      const response = await fetch(API_ENDPOINTS.OVERPASS, {
        method: "POST",
        body: query,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: OverpassResponse = await response.json();
      console.log("Overpass result:", data.elements);

      if (!data.elements || data.elements.length === 0) {
        console.log("No POIs found");
        return [];
      }

      // Transform Overpass elements to POI format
      const pois: POI[] = data.elements.slice(0, 5).map((element, index) => {
        const poiLat = element.center ? element.center.lat : element.lat!;
        const poiLon = element.center ? element.center.lon : element.lon!;
        const name = element.tags?.name || `${this.getCategoryName(category)} ${index + 1}`;

        return {
          id: element.id || `poi_${index}`,
          name,
          position: [poiLat, poiLon],
          tags: element.tags || {},
          type: element.type,
        };
      });

      console.log(`Found ${pois.length} POIs:`, pois);
      return pois;
    } catch (error) {
      console.error("Overpass error:", error);
      throw new Error(`Failed to find POIs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get friendly category name
   */
  private static getCategoryName(category: string): string {
    const names: Record<string, string> = {
      [POI_CATEGORIES.CAFE]: 'Quán cà phê',
      [POI_CATEGORIES.RESTAURANT]: 'Nhà hàng',
      [POI_CATEGORIES.HOTEL]: 'Khách sạn',
      [POI_CATEGORIES.HOSPITAL]: 'Bệnh viện',
      [POI_CATEGORIES.PHARMACY]: 'Nhà thuốc',
    };
    return names[category] || category;
  }
}

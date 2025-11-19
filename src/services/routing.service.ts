// Routing Service - OSRM API

import { API_ENDPOINTS } from '../constants/api.constants';
import type { RouteGeoJSON, OSRMResponse } from '../types/map.types';

export class RoutingService {
  /**
   * Get route between two points using OSRM
   * @param startPoint - Start coordinates [lat, lon]
   * @param endPoint - End coordinates [lat, lon]
   * @param destinationName - Name of destination for display
   * @returns Route GeoJSON object
   */
  static async getRoute(
    startPoint: [number, number],
    endPoint: [number, number],
    destinationName: string
  ): Promise<RouteGeoJSON> {
    try {
      const lat1 = startPoint[0];
      const lon1 = startPoint[1];
      const lat2 = endPoint[0];
      const lon2 = endPoint[1];

      // OSRM expects lon,lat format (not lat,lon!)
      const coords = `${lon1},${lat1};${lon2},${lat2}`;
      const url = `${API_ENDPOINTS.OSRM}/${coords}?geometries=geojson&overview=full`;

      console.log(`OSRM request: ${url}`);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: OSRMResponse = await response.json();
      console.log("OSRM result:", data);

      if (!data.routes || data.routes.length === 0) {
        throw new Error("No route found");
      }

      const route = data.routes[0];
      const distanceKm = (route.distance / 1000).toFixed(2);
      const durationMin = Math.round(route.duration / 60);

      const routeGeoJSON: RouteGeoJSON = {
        type: "Feature",
        geometry: route.geometry,
        properties: {
          distance: route.distance,
          distanceKm,
          duration: route.duration,
          durationMin,
          destination: destinationName,
        },
      };

      console.log(`Route: ${distanceKm} km, ${durationMin} phút`);
      return routeGeoJSON;
    } catch (error) {
      console.error("OSRM error:", error);
      throw new Error(`Failed to get route: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Calculate distance between two points (Haversine formula)
   * @param point1 - First point [lat, lon]
   * @param point2 - Second point [lat, lon]
   * @returns Distance in kilometers
   */
  static calculateDistance(point1: [number, number], point2: [number, number]): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRadians(point2[0] - point1[0]);
    const dLon = this.toRadians(point2[1] - point1[1]);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(point1[0])) *
        Math.cos(this.toRadians(point2[0])) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}

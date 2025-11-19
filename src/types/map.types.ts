// Map & Routing Types

export interface RouteGeoJSON {
  type: "Feature";
  geometry: any;
  properties: RouteProperties;
}

export interface RouteProperties {
  distance: number;
  distanceKm: string;
  duration: number;
  durationMin: number;
  destination: string;
}

export interface OSRMRoute {
  distance: number;
  duration: number;
  geometry: any;
}

export interface OSRMResponse {
  code: string;
  routes: OSRMRoute[];
}

export interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
  place_id: number;
}

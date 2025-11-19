// API Endpoints and Configuration

export const API_ENDPOINTS = {
  // OpenStreetMap Services
  NOMINATIM: 'https://nominatim.openstreetmap.org/search',
  OVERPASS: 'https://overpass-api.de/api/interpreter',
  OSRM: 'https://router.project-osrm.org/route/v1/driving',
  TILE_SERVER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
} as const;

export const API_CONFIG = {
  // Nominatim
  NOMINATIM_HEADERS: {
    'Accept': 'application/json',
    'User-Agent': 'OSM-Demo-Travel-App/1.0',
  },

  // Overpass
  OVERPASS_TIMEOUT: 30, // seconds
  OVERPASS_RADIUS: 500, // meters
  OVERPASS_MAX_RESULTS: 20,

  // Map
  DEFAULT_CENTER: [10.762486, 106.682765] as [number, number], // Ho Chi Minh City
  DEFAULT_ZOOM: 13,
} as const;

export const POI_CATEGORIES = {
  CAFE: 'cafe',
  RESTAURANT: 'restaurant',
  HOTEL: 'hotel',
  HOSPITAL: 'hospital',
  PHARMACY: 'pharmacy',
} as const;

// POI (Point of Interest) Types

export interface POI {
  id: string | number;
  name: string;
  position: [number, number];
  tags: POITags;
  type: string;
}

export interface POITags {
  phone?: string;
  website?: string;
  [key: string]: any;
}

export interface OverpassElement {
  id: number;
  type: string;
  lat?: number;
  lon?: number;
  center?: {
    lat: number;
    lon: number;
  };
  tags?: {
    name?: string;
    phone?: string;
    website?: string;
    [key: string]: any;
  };
}

export interface OverpassResponse {
  version: number;
  generator: string;
  elements: OverpassElement[];
}

// Map.tsx - FIXED VERSION (theo logic Python + FIX 504)
import React, { useState } from "react";
import { MapContainer, Popup, TileLayer, GeoJSON } from "react-leaflet";
import CustomMarker from "./custom-marker";
import Marker2Url from "./assets/mapMarker2.svg";
import type { Map as LeafletMap } from "leaflet";

// TypeScript interfaces
interface POI {
  id: string | number;
  name: string;
  position: [number, number];
  tags: {
    phone?: string;
    website?: string;
    [key: string]: any;
  };
  type: string;
}

interface RouteGeoJSON {
  type: "Feature";
  geometry: any;
  properties: {
    distance: number;
    distanceKm: string;
    duration: number;
    durationMin: number;
    destination: string;
  };
}

const mapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "500px",
  position: "relative",
};

const formStyle: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  left: "50px",
  zIndex: 1000,
  background: "white",
  padding: "10px",
  borderRadius: "5px",
  display: "flex",
  gap: "5px",
  flexWrap: "wrap",
  fontSize: "14px",
};

const buttonStyle = {
  padding: "6px 12px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "bold",
};

const searchButtonStyle = {
  ...buttonStyle,
  background: "#007bff",
  color: "white",
};

const clearButtonStyle = {
  ...buttonStyle,
  background: "#dc3545",
  color: "white",
};

const routeButtonStyle = {
  ...buttonStyle,
  background: "#28a745",
  color: "white",
  width: "100%",
  marginTop: "8px",
};

export default function Map() {
  const [inputValue, setInputValue] = useState<string>("");
  const [pois, setPois] = useState<POI[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([10.762486, 106.682765]);
  const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null);
  const [routeGeoJSON, setRouteGeoJSON] = useState<RouteGeoJSON | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!mapInstance) return;

    setLoading(true);
    setStatusMsg("Đang tìm kiếm...");

    try {
      const location = await getLocation(inputValue);
      if (location && location.length > 0) {
        const { lat, lon } = location[0];
        const newCenter: [number, number] = [parseFloat(lat), parseFloat(lon)];

        mapInstance.flyTo(newCenter, 13);
        setMapCenter(newCenter);

        setStatusMsg("Đang tìm quán ăn gần đây...");
        await findNearbyPOIs(parseFloat(lat), parseFloat(lon));
        setRouteGeoJSON(null);
      } else {
        alert("Không tìm thấy vị trí này.");
        setStatusMsg("Không tìm thấy vị trí");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert("Lỗi tìm kiếm: " + errorMessage);
      setStatusMsg("Lỗi tìm kiếm");
    } finally {
      setLoading(false);
    }
  };

  // Nominatim - Geocoding
  const getLocation = async (place: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=jsonv2&limit=1`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'OSM-Demo-Travel-App/1.0'
          }
        }
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      console.log("Geocoding result:", data[0]);
      return data;
    } catch (error) {
      console.error("Geocoding error:", error);
      throw error;
    }
  };

  // Overpass API - Tìm POI theo bán kính (NWR)
  // FIX 504: Thay timeout từ 60 → 30, RADIUS từ 1000 → 500
  const findNearbyPOIs = async (lat: number, lon: number) => {
    try {
      const RADIUS_M = 500; // THAY ĐỔI: 1000 → 500 (nhanh hơn, ít timeout)

      const query = `
[out:json][timeout:30];
nwr(around:${RADIUS_M},${lat},${lon})["amenity"="cafe"];
out center 20;
      `;

      console.log("Sending Overpass query:", query);

      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      console.log("Overpass result:", data.elements);

      if (data.elements && data.elements.length > 0) {
        // Lấy tối đa 5 POI
        const foundPois = data.elements.slice(0, 5).map((element: any, index: number) => {
          const poiLat = element.center ? element.center.lat : element.lat;
          const poiLon = element.center ? element.center.lon : element.lon;
          const name = element.tags?.name || `Quán cà phê ${index + 1}`;

          return {
            id: element.id || `poi_${index}`,
            name,
            position: [poiLat, poiLon],
            tags: element.tags || {},
            type: element.type,
          };
        });

        console.log(`Tìm thấy ${foundPois.length} quán cà phê:`, foundPois);
        setPois(foundPois);
        setStatusMsg(`Tìm thấy ${foundPois.length} quán cà phê`);
      } else {
        console.log("Không tìm thấy POI nào");
        setPois([]);
        setStatusMsg("Không tìm thấy quán cà phê gần đây");
      }
    } catch (error) {
      console.error("Overpass error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert("Lỗi tìm POI: " + errorMessage);
      setStatusMsg("Lỗi tìm quán");
    }
  };

  // OSRM - Routing
  const getRoute = async (startPoint: [number, number], endPoint: [number, number], poiName: string) => {
    try {
      const lat1 = startPoint[0];
      const lon1 = startPoint[1];
      const lat2 = endPoint[0];
      const lon2 = endPoint[1];

      const coords = `${lon1},${lat1};${lon2},${lat2}`;
      const url = `https://router.project-osrm.org/route/v1/driving/${coords}?geometries=geojson&overview=full`;

      console.log(`OSRM request: ${url}`);

      const response = await fetch(url);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      console.log("OSRM result:", data);

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const distanceKm = (route.distance / 1000).toFixed(2);
        const durationMin = Math.round(route.duration / 60);

        const routeGeoJSONFeature: RouteGeoJSON = {
          type: "Feature",
          geometry: route.geometry,
          properties: {
            distance: route.distance,
            distanceKm,
            duration: route.duration,
            durationMin,
            destination: poiName,
          },
        };

        setRouteGeoJSON(routeGeoJSONFeature);
        setStatusMsg(`Tuyến: ${distanceKm} km, ~${durationMin} phút tới "${poiName}"`);
        console.log(`Route: ${distanceKm} km, ${durationMin} phút`);
      } else {
        alert("Không thể tìm thấy đường đi");
        setStatusMsg("Không tìm thấy đường");
      }
    } catch (error) {
      console.error("OSRM error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert("Lỗi routing: " + errorMessage);
      setStatusMsg("Lỗi tìm đường");
    }
  };

  return (
    <div style={mapContainerStyle}>
      {/* Form tìm kiếm */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Tìm địa điểm (vd: Quận 1, TP.HCM)..."
          style={{ minWidth: "220px", padding: "6px 8px" }}
        />
        <button type="submit" style={searchButtonStyle} disabled={loading}>
          {loading ? "Đang tìm..." : "Tìm & Di chuyển"}
        </button>
        <button
          type="button"
          onClick={() => {
            setRouteGeoJSON(null);
            setStatusMsg("");
          }}
          style={clearButtonStyle}
        >
          Xóa đường
        </button>
        {/* Status message */}
        {statusMsg && (
          <div style={{
            width: "100%",
            fontSize: "12px",
            marginTop: "4px",
            padding: "4px 8px",
            background: "#f0f0f0",
            borderRadius: "3px",
            color: "#333"
          }}>
            {statusMsg}
          </div>
        )}
      </form>

      {/* Map */}
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
        ref={setMapInstance}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker điểm tìm kiếm gốc */}
        <CustomMarker position={mapCenter}>
          <Popup>
            <div style={{ minWidth: "220px" }}>
              <strong>Vị trí tìm kiếm</strong>
              <br />
              <small>
                Lat: {mapCenter[0].toFixed(6)}
                <br />
                Lon: {mapCenter[1].toFixed(6)}
              </small>
            </div>
          </Popup>
        </CustomMarker>

        {/* POI Markers */}
        {pois.map((poi, index) => (
          <CustomMarker
            key={poi.id}
            position={poi.position}
            iconUrl={Marker2Url}
          >
            <Popup>
              <div style={{ minWidth: "280px" }}>
                <strong>{poi.name}</strong>
                <br />
                <small style={{ color: "#666" }}>
                  Quán #{index + 1}/{pois.length}
                  <br />
                  Type: {poi.type}
                  <br />
                  Lat: {poi.position[0].toFixed(6)}
                  <br />
                  Lon: {poi.position[1].toFixed(6)}
                  {poi.tags.phone && (
                    <>
                      <br />
                      {poi.tags.phone}
                    </>
                  )}
                  {poi.tags.website && (
                    <>
                      <br />
                      {poi.tags.website}
                    </>
                  )}
                </small>
                <br />
                <button
                  onClick={() => {
                    if (mapInstance) {
                      console.log(`\nChỉ đường từ [${mapCenter}] đến [${poi.position}] - "${poi.name}"`);
                      getRoute(mapCenter, poi.position, poi.name);
                    }
                  }}
                  style={routeButtonStyle}
                >
                  Chỉ đường từ đây
                </button>
              </div>
            </Popup>
          </CustomMarker>
        ))}

        {/* Route visualization */}
        {routeGeoJSON && (
          <GeoJSON
            key={JSON.stringify(routeGeoJSON)}
            data={routeGeoJSON}
            style={{
              color: '#007bff',
              weight: 5,
              opacity: 0.7,
              lineCap: 'round',
              lineJoin: 'round'
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
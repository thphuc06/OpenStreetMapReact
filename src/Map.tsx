// Map.tsx - REFACTORED VERSION
// Uses service layer for API calls, imported types, and separated styles

import React, { useState } from "react";
import { MapContainer, Popup, TileLayer, GeoJSON } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";

// Components
import CustomMarker from "./custom-marker";

// Services
import { GeocodingService } from "./services/geocoding.service";
import { POIService } from "./services/poi.service";
import { RoutingService } from "./services/routing.service";

// Types
import type { POI } from "./types/poi.types";
import type { RouteGeoJSON } from "./types/map.types";

// Constants
import { API_CONFIG } from "./constants/api.constants";

// Styles
import {
  mapContainerStyle,
  formStyle,
  searchButtonStyle,
  clearButtonStyle,
  routeButtonStyle,
  statusStyle,
  popupStyle,
  popupSmallTextStyle,
} from "./styles/map.styles";

// Assets
import Marker2Url from "./assets/mapMarker2.svg";

export default function Map() {
  // State
  const [inputValue, setInputValue] = useState<string>("");
  const [pois, setPois] = useState<POI[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>(API_CONFIG.DEFAULT_CENTER);
  const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null);
  const [routeGeoJSON, setRouteGeoJSON] = useState<RouteGeoJSON | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string>("");

  // Event Handlers
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!mapInstance || !inputValue.trim()) return;

    setLoading(true);
    setStatusMsg("Đang tìm kiếm...");

    try {
      // Step 1: Geocode location
      const locations = await GeocodingService.getLocation(inputValue);

      if (!locations || locations.length === 0) {
        alert("Không tìm thấy vị trí này.");
        setStatusMsg("Không tìm thấy vị trí");
        return;
      }

      const { lat, lon } = locations[0];
      const newCenter: [number, number] = [parseFloat(lat), parseFloat(lon)];

      // Step 2: Move map to location
      mapInstance.flyTo(newCenter, API_CONFIG.DEFAULT_ZOOM);
      setMapCenter(newCenter);

      // Step 3: Find nearby POIs
      setStatusMsg("Đang tìm quán ăn gần đây...");
      const foundPois = await POIService.findNearby(
        parseFloat(lat),
        parseFloat(lon)
      );

      setPois(foundPois);
      setRouteGeoJSON(null);
      setStatusMsg(
        foundPois.length > 0
          ? `Tìm thấy ${foundPois.length} quán cà phê`
          : "Không tìm thấy quán cà phê gần đây"
      );

    } catch (error) {
      console.error("Search error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert("Lỗi tìm kiếm: " + errorMessage);
      setStatusMsg("Lỗi tìm kiếm");
    } finally {
      setLoading(false);
    }
  };

  const handleGetRoute = async (poi: POI) => {
    if (!mapInstance) return;

    try {
      console.log(`\nChỉ đường từ [${mapCenter}] đến [${poi.position}] - "${poi.name}"`);

      const route = await RoutingService.getRoute(mapCenter, poi.position, poi.name);

      setRouteGeoJSON(route);
      setStatusMsg(
        `Tuyến: ${route.properties.distanceKm} km, ~${route.properties.durationMin} phút tới "${poi.name}"`
      );
    } catch (error) {
      console.error("Routing error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert("Lỗi tìm đường: " + errorMessage);
      setStatusMsg("Lỗi tìm đường");
    }
  };

  const handleClearRoute = () => {
    setRouteGeoJSON(null);
    setStatusMsg("");
  };

  return (
    <div style={mapContainerStyle}>
      {/* Search Form */}
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
          onClick={handleClearRoute}
          style={clearButtonStyle}
        >
          Xóa đường
        </button>

        {/* Status Message */}
        {statusMsg && (
          <div style={statusStyle}>
            {statusMsg}
          </div>
        )}
      </form>

      {/* Map Container */}
      <MapContainer
        center={mapCenter}
        zoom={API_CONFIG.DEFAULT_ZOOM}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
        ref={setMapInstance}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Search Location Marker */}
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
              <div style={popupStyle}>
                <strong>{poi.name}</strong>
                <br />
                <small style={popupSmallTextStyle}>
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
                      📞 {poi.tags.phone}
                    </>
                  )}
                  {poi.tags.website && (
                    <>
                      <br />
                      🌐 {poi.tags.website}
                    </>
                  )}
                </small>
                <br />
                <button
                  onClick={() => handleGetRoute(poi)}
                  style={routeButtonStyle}
                >
                  Chỉ đường từ đây
                </button>
              </div>
            </Popup>
          </CustomMarker>
        ))}

        {/* Route Visualization */}
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

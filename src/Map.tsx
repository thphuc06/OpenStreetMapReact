// Map.tsx - REFACTORED VERSION
// Uses service layer for API calls, imported types, and separated styles

import React, { useState } from "react";
import { MapContainer, Popup, TileLayer, GeoJSON } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";

// Components
import CustomMarker from "./custom-marker";
import { WeatherCard } from "./components/WeatherCard";
import { SearchHistory } from "./components/SearchHistory";

// Services
import { GeocodingService } from "./services/geocoding.service";
import { POIService } from "./services/poi.service";
import { RoutingService } from "./services/routing.service";
import { WeatherService } from "./services/weather.service";
import { SearchHistoryService } from "./services/searchHistory.service";

// Context
import { useAuth } from "./contexts/AuthContext";

// Types
import type { POI } from "./types/poi.types";
import type { RouteGeoJSON } from "./types/map.types";
import type { WeatherResponse, WeatherOverview } from "./types/weather.types";

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
  inputStyle,
  mapModeSwitcherStyle,
  mapModeButtonStyle,
  mapModeButtonActiveStyle,
} from "./styles/map.styles";

// Assets
import Marker2Url from "./assets/mapMarker2.svg";

// Map tile layer configurations
type MapMode = 'standard' | 'satellite' | 'dark' | 'terrain';

interface TileLayerConfig {
  url: string;
  attribution: string;
  name: string;
}

const TILE_LAYERS: Record<MapMode, TileLayerConfig> = {
  standard: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    name: 'Standard',
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
    name: 'Satellite',
  },
  dark: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    name: 'Dark Mode',
  },
  terrain: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
    name: 'Terrain',
  },
};

export default function Map() {
  // Auth
  const { currentUser, signOut } = useAuth();

  // State
  const [inputValue, setInputValue] = useState<string>("");
  const [pois, setPois] = useState<POI[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>(API_CONFIG.DEFAULT_CENTER);
  const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null);
  const [routeGeoJSON, setRouteGeoJSON] = useState<RouteGeoJSON | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string>("");
  const [mapMode, setMapMode] = useState<MapMode>('standard');
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [weatherOverview, setWeatherOverview] = useState<WeatherOverview | null>(null);

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
      setStatusMsg("Đang tìm quán cà phê gần đây...");
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

      // Step 4: Fetch weather data and overview
      setStatusMsg("Đang tải thông tin thời tiết...");

      const [weather, overview] = await Promise.all([
        WeatherService.getWeatherData(parseFloat(lat), parseFloat(lon)),
        WeatherService.getWeatherOverview(parseFloat(lat), parseFloat(lon))
      ]);

      setWeatherData(weather);
      setWeatherOverview(overview);
      setStatusMsg(`Tìm thấy ${foundPois.length} quán cà phê. Thời tiết đã cập nhật.`);

      // Step 5: Save search history if user is logged in
      if (currentUser) {
        try {
          await SearchHistoryService.saveSearch(
            currentUser.uid,
            inputValue,
            parseFloat(lat),
            parseFloat(lon),
            foundPois.length
          );
        } catch (historyError) {
          console.error('Error saving search history:', historyError);
        }
      }

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

  const handleSelectHistory = async (lat: number, lon: number, query: string) => {
    if (!mapInstance) return;

    setInputValue(query);
    setLoading(true);
    setStatusMsg("Đang tải từ lịch sử...");

    try {
      const newCenter: [number, number] = [lat, lon];
      mapInstance.flyTo(newCenter, API_CONFIG.DEFAULT_ZOOM);
      setMapCenter(newCenter);

      setStatusMsg("Đang tìm quán cà phê gần đây...");
      const foundPois = await POIService.findNearby(lat, lon);

      setPois(foundPois);
      setRouteGeoJSON(null);

      const [weather, overview] = await Promise.all([
        WeatherService.getWeatherData(lat, lon),
        WeatherService.getWeatherOverview(lat, lon)
      ]);

      setWeatherData(weather);
      setWeatherOverview(overview);
      setStatusMsg(`Tìm thấy ${foundPois.length} quán cà phê. Thời tiết đã cập nhật.`);
    } catch (error) {
      console.error("History search error:", error);
      setStatusMsg("Lỗi tìm kiếm");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={mapContainerStyle}>
      {/* User Info & Logout */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          borderRadius: '12px',
          padding: '10px 16px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          fontSize: '14px',
          color: '#2d3748',
          fontWeight: '500',
        }}>
          {currentUser?.isAnonymous ? '👤 Khách' : `👤 ${currentUser?.email || 'User'}`}
        </div>
        <button
          onClick={() => signOut()}
          style={{
            background: '#e53e3e',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 16px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(229, 62, 62, 0.3)',
          }}
        >
          Đăng xuất
        </button>
      </div>

      {/* Search History */}
      <SearchHistory onSelectHistory={handleSelectHistory} />

      {/* Search Form */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Nhập địa điểm cần tìm (vd: Quận 1, TP.HCM)..."
          style={inputStyle}
        />
        <button type="submit" style={searchButtonStyle} disabled={loading}>
          {loading ? "Đang tìm..." : "Tìm và Di chuyển"}
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

      {/* Map Mode Switcher */}
      <div style={mapModeSwitcherStyle}>
        <div style={{
          fontSize: '11px',
          fontWeight: '700',
          color: '#718096',
          marginBottom: '4px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Chế độ bản đồ
        </div>
        {(Object.keys(TILE_LAYERS) as MapMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setMapMode(mode)}
            style={mapMode === mode ? mapModeButtonActiveStyle : mapModeButtonStyle}
          >
            {TILE_LAYERS[mode].name}
          </button>
        ))}
      </div>

      {/* Map Container */}
      <MapContainer
        center={mapCenter}
        zoom={API_CONFIG.DEFAULT_ZOOM}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
        ref={setMapInstance}
      >
        <TileLayer
          key={mapMode}
          attribution={TILE_LAYERS[mapMode].attribution}
          url={TILE_LAYERS[mapMode].url}
        />

        {/* Search Location Marker */}
        <CustomMarker position={mapCenter}>
          <Popup>
            <div style={{ minWidth: "220px" }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#2d3748',
                marginBottom: '8px',
                paddingBottom: '8px',
                borderBottom: '2px solid #e2e8f0'
              }}>
                Vị trí tìm kiếm
              </div>
              <small style={popupSmallTextStyle}>
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
                <div style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#2d3748',
                  marginBottom: '8px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid #e2e8f0'
                }}>
                  {poi.name}
                </div>
                <div style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Quán #{index + 1}/{pois.length}
                </div>
                <small style={popupSmallTextStyle}>
                  <div style={{ marginTop: '6px' }}>
                    Loại: {poi.type}
                  </div>
                  <div style={{ marginTop: '4px', fontSize: '11px', color: '#a0aec0' }}>
                    {poi.position[0].toFixed(6)}, {poi.position[1].toFixed(6)}
                  </div>
                  {poi.tags.phone && (
                    <div style={{ marginTop: '8px', color: '#4a5568' }}>
                      Điện thoại: {poi.tags.phone}
                    </div>
                  )}
                  {poi.tags.website && (
                    <div style={{ marginTop: '4px', color: '#4a5568' }}>
                      Website: {poi.tags.website}
                    </div>
                  )}
                </small>
                <button
                  onClick={() => handleGetRoute(poi)}
                  style={routeButtonStyle}
                >
                  Chỉ đường tới đây
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
              color: '#667eea',
              weight: 6,
              opacity: 0.8,
              lineCap: 'round',
              lineJoin: 'round'
            }}
          />
        )}
      </MapContainer>

      {/* Weather Card */}
      {weatherData && (
        <WeatherCard
          weatherData={weatherData}
          weatherOverview={weatherOverview}
          onClose={() => {
            setWeatherData(null);
            setWeatherOverview(null);
          }}
        />
      )}
    </div>
  );
}

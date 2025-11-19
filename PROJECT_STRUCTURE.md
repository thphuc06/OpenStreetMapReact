# 📁 Project Structure - Clean TypeScript/React

OpenStreetMap React App - Pure TypeScript implementation without Python backend.

## 🎯 Architecture

```
Browser (React)
    ↓ TypeScript Services
    ↓
External APIs (Direct calls)
    ├─ Nominatim (Geocoding)
    ├─ Overpass (POI Search)
    └─ OSRM (Routing)
```

**No backend required - 100% client-side!**

---

## 📂 Project Structure

```
24127505/
├── src/
│   ├── components/
│   │   ├── Map.tsx                  # Main map component (refactored)
│   │   └── custom-marker.tsx        # Custom marker component
│   ├── services/                    # API Service Layer
│   │   ├── geocoding.service.ts     # Nominatim API
│   │   ├── poi.service.ts           # Overpass API
│   │   └── routing.service.ts       # OSRM API
│   ├── types/                       # TypeScript Types
│   │   ├── poi.types.ts
│   │   └── map.types.ts
│   ├── constants/                   # Constants & Config
│   │   └── api.constants.ts
│   ├── styles/                      # Component Styles
│   │   └── map.styles.ts
│   ├── assets/                      # Images, SVG icons
│   ├── App.tsx                      # App component
│   ├── main.tsx                     # Entry point
│   ├── vite-env.d.ts               # Vite type declarations
│   └── styles.css
├── public/                          # Static files
├── dist/                            # Build output (gitignored)
├── index.html                       # HTML entry point
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── vite.config.ts                   # Vite config
├── firebase.json                    # Firebase Hosting config
├── .firebaserc                      # Firebase project
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Leaflet** - Map rendering
- **React Leaflet** - React wrapper for Leaflet

### APIs (All public, no authentication needed)
- **Nominatim** - Geocoding (location search)
- **Overpass API** - POI (Points of Interest) search
- **OSRM** - Routing (directions)
- **OpenStreetMap** - Map tiles

### Hosting
- **Firebase Hosting** - Static file hosting
- 10 GB storage, ~10 GB/month bandwidth
- **100% Free tier**

---

## 🏗️ Code Organization

### Service Layer Pattern

All external API calls are abstracted into service classes:

```typescript
// Before (❌ Bad - API calls in component)
const response = await fetch('https://nominatim.openstreetmap.org/...');
const data = await response.json();

// After (✅ Good - Use service)
import { GeocodingService } from './services/geocoding.service';
const locations = await GeocodingService.getLocation('Ho Chi Minh City');
```

**Benefits:**
- ✅ Reusable across components
- ✅ Easy to test
- ✅ Centralized error handling
- ✅ Type-safe with TypeScript
- ✅ Easy to mock for testing

---

## 📦 Available Services

### 1. GeocodingService
```typescript
import { GeocodingService } from './services/geocoding.service';

// Get coordinates from place name
const locations = await GeocodingService.getLocation('Paris, France');
// Returns: [{ lat: '48.8566', lon: '2.3522', ... }]

// Reverse geocoding (coordinates → place name)
const place = await GeocodingService.reverseGeocode(48.8566, 2.3522);
```

### 2. POIService
```typescript
import { POIService } from './services/poi.service';
import { POI_CATEGORIES } from './constants/api.constants';

// Find nearby cafes
const cafes = await POIService.findNearby(
  10.762,  // latitude
  106.682, // longitude
  POI_CATEGORIES.CAFE,
  500      // radius in meters
);

// Available categories: cafe, restaurant, hotel, hospital, pharmacy
```

### 3. RoutingService
```typescript
import { RoutingService } from './services/routing.service';

// Get route between two points
const route = await RoutingService.getRoute(
  [10.762, 106.682],  // start point
  [10.775, 106.695],  // end point
  'Destination Name'
);
// Returns: RouteGeoJSON with distance, duration, geometry

// Calculate distance
const distanceKm = RoutingService.calculateDistance(
  [10.762, 106.682],
  [10.775, 106.695]
);
```

---

## 🎨 Styling

All component styles are centralized in `src/styles/`:

```typescript
import { mapContainerStyle, formStyle } from './styles/map.styles';

<div style={mapContainerStyle}>...</div>
```

**Benefits:**
- ✅ Consistent styling
- ✅ Easy to update
- ✅ Type-safe with TypeScript
- ✅ No CSS-in-JS library needed

---

## 🚀 Development

### Install dependencies
```bash
npm install
```

### Run dev server
```bash
npm run dev
```
App runs at: http://localhost:5173

### Build for production
```bash
npm run build
```
Output in: `dist/`

### Preview production build
```bash
npm run preview
```

---

## 🌐 Deployment

### Firebase Hosting

```bash
# Build
npm run build

# Deploy
firebase deploy --only hosting
```

**Live at:**
- https://weather-f2f43.web.app
- https://weather-f2f43.firebaseapp.com
- Custom domain: osmWeatherWeb.com (if configured)

---

## 🔧 Configuration

### API Endpoints
`src/constants/api.constants.ts`

```typescript
export const API_ENDPOINTS = {
  NOMINATIM: 'https://nominatim.openstreetmap.org/search',
  OVERPASS: 'https://overpass-api.de/api/interpreter',
  OSRM: 'https://router.project-osrm.org/route/v1/driving',
  TILE_SERVER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};
```

### API Configuration
```typescript
export const API_CONFIG = {
  NOMINATIM_HEADERS: { ... },
  OVERPASS_TIMEOUT: 30,
  OVERPASS_RADIUS: 500,
  OVERPASS_MAX_RESULTS: 20,
  DEFAULT_CENTER: [10.762486, 106.682765], // Ho Chi Minh City
  DEFAULT_ZOOM: 13,
};
```

### POI Categories
```typescript
export const POI_CATEGORIES = {
  CAFE: 'cafe',
  RESTAURANT: 'restaurant',
  HOTEL: 'hotel',
  HOSPITAL: 'hospital',
  PHARMACY: 'pharmacy',
};
```

---

## 📊 Performance

### Bundle Size
- HTML: 0.40 kB
- CSS: 15.66 kB
- JS: ~308 kB (gzipped: ~95 kB)

### Loading Speed
- First load: < 1s (on good connection)
- Subsequent loads: < 0.3s (cached)

### API Response Times
- Nominatim: ~200-500ms
- Overpass: ~500-2000ms (depends on query)
- OSRM: ~100-300ms

---

## 🔒 Security

### API Keys
**No API keys needed!** All APIs used are public:
- ✅ Nominatim - Public geocoding
- ✅ Overpass - Public OSM data
- ✅ OSRM - Public routing

### Firebase
- Only using Firebase Hosting (static files)
- No authentication
- No database
- No backend functions

---

## 💰 Cost

**Total: $0.00/month**

| Service | Usage | Cost |
|---------|-------|------|
| Firebase Hosting | 10 GB storage, ~10 GB/month | **Free** |
| Nominatim | Public API | **Free** |
| Overpass | Public API | **Free** |
| OSRM | Public API | **Free** |

**Recommendation:** Add usage rate limiting to be a good API citizen.

---

## 🐛 Troubleshooting

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### TypeScript errors
```bash
# Check types
npx tsc --noEmit
```

### API timeouts (Overpass 504)
- Reduce search radius in `API_CONFIG.OVERPASS_RADIUS`
- Reduce timeout in `API_CONFIG.OVERPASS_TIMEOUT`
- Limit results in `API_CONFIG.OVERPASS_MAX_RESULTS`

---

## 📝 Code Quality

### Type Safety
- ✅ Full TypeScript
- ✅ Strict mode enabled
- ✅ No `any` types in production code

### Code Organization
- ✅ Service layer pattern
- ✅ Separation of concerns
- ✅ Single responsibility principle
- ✅ DRY (Don't Repeat Yourself)

### Best Practices
- ✅ Async/await for API calls
- ✅ Error handling with try-catch
- ✅ Type-safe error messages
- ✅ Proper loading states

---

## 🎯 Future Enhancements

Potential features to add (all client-side):

1. **Weather Integration**
   - Add OpenWeatherMap API (requires API key)
   - Create WeatherService

2. **Search History**
   - Store in localStorage
   - Recent searches dropdown

3. **Favorites**
   - Save favorite locations
   - localStorage persistence

4. **Route Options**
   - Walking, cycling, driving
   - Avoid highways, tolls

5. **Offline Support**
   - Service Worker
   - Cache map tiles
   - Offline routing

---

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Leaflet Documentation](https://leafletjs.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [OpenStreetMap Wiki](https://wiki.openstreetmap.org/)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)

---

**Built with ❤️ using React + TypeScript**

Last updated: November 2024

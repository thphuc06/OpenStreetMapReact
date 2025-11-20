# Coffee Shop Finder 🗺️☕

A web application for finding nearby coffee shops with map display, routing, and weather forecast features.

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Map:** Leaflet + OpenStreetMap
- **Backend:** Firebase (Authentication + Firestore)
- **APIs:** 
  - OpenStreetMap (Nominatim, Overpass, OSRM)
  - OpenWeather API

## 📋 Requirements

- Node.js >= 18.0.0
- npm or yarn

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/thphuc06/OpenStreetMapReact.git
cd OpenStreetMapReact
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Application will run at: `http://localhost:5173`

## 🔑 Authentication

**Note:** Firebase Authentication is pre-configured.

Users can:
- Sign in with Google
- Sign up/Sign in with Email
- Continue as Guest (Anonymous)

## ✨ Features

1. **Location Search** - Find coffee shops near any location
2. **Map Display** - 4 map modes: Standard, Satellite, Dark, Terrain
3. **Routing** - Show route and travel time to selected shop
4. **Weather Forecast** - Current, hourly, and daily weather
5. **Search History** - Save and revisit previous searches (for authenticated users)

## 📂 Project Structure
```
src/
├── components/      # React components
├── services/        # API services
├── contexts/        # React contexts (Auth)
├── types/          # TypeScript types
├── constants/      # API configurations
└── styles/         # Style definitions
```

## 🌐 Live Demo

URL: https://weather-f2f43.web.app

## 📝 Notes

- API keys are pre-configured and protected by Firebase Security Rules
- All features work out of the box after `npm install`
- No additional setup required

## 👤 Author

[thphuc06](https://github.com/thphuc06)

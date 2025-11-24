# Coffee Shop Finder 🗺️☕

A web application for finding nearby coffee shops with map display, routing, weather forecast, and English to Vietnamese translation features.

## ✨ Features

1. **Location Search** - Find coffee shops near any location
2. **Map Display** - 4 map modes: Standard, Satellite, Dark, Terrain
3. **Routing** - Show route and travel time to selected shop
4. **Weather Forecast** - Current, hourly, and daily weather
5. **Search History** - Save and revisit previous searches (for authenticated users)
6. **Translation** - English to Vietnamese translator for international visitors

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Map:** Leaflet + OpenStreetMap
- **Backend:** Firebase (Authentication + Firestore) + Flask (Translation API)
- **Deployment:** GitHub Actions CI/CD + Firebase Hosting + Railway
- **APIs:**
  - OpenStreetMap (Nominatim, Overpass, OSRM)
  - OpenWeather API
  - Google Translate API (via Flask backend)

## 📋 Requirements

- Node.js >= 18.0.0
- npm or yarn
- Git

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

## 🤝 Contributing & Deployment

### For Collaborators/Partners

This project uses **GitHub Actions CI/CD** for automatic deployment. You don't need Firebase CLI or any credentials!

#### Basic Workflow:
```bash
# 1. Create a new branch for your feature
git checkout -b feature/your-feature-name

# 2. Make your changes and test locally
npm run dev

# 3. Commit your changes
git add .
git commit -m "Add: your feature description"

# 4. Push to GitHub
git push origin feature/your-feature-name

# 5. Create Pull Request on GitHub
# Go to https://github.com/thphuc06/OpenStreetMapReact/pulls
# Click "New Pull Request"
```

#### Deployment Process:

- **Pull Request** → 🔍 Creates preview deployment for testing
- **Merge to `main`** → 🚀 Automatically deploys to production
- **No manual steps needed!** GitHub Actions handles everything

#### Important Notes:

✅ You need to be added as a **collaborator** on GitHub
✅ Always create a **new branch** for your changes
✅ Create a **Pull Request** instead of pushing directly to `main`
✅ Wait for **preview deployment** to test your changes
✅ Check **GitHub Actions** tab to see deployment status

### Deployment Status

- **Production:** https://weather-f2f43.web.app
- **Backend API:** https://openstreetmapreact-production.up.railway.app
- **Preview:** Automatic URL generated for each Pull Request

### Branch Protection (Best Practice)

If `main` branch is protected:
1. You **cannot** push directly to `main`
2. You **must** create a Pull Request
3. Code review may be required before merge
4. Tests must pass before deployment

## 📂 Project Structure
```
OpenStreetMapReact/
├── .github/
│   └── workflows/
│       ├── firebase-hosting-merge.yml         # Auto-deploy on merge
│       └── firebase-hosting-pull-request.yml  # Preview on PR
├── src/
│   ├── components/       # React components
│   ├── services/         # API services (Geocoding, POI, Routing, Weather)
│   ├── contexts/         # React contexts (Auth)
│   ├── types/           # TypeScript type definitions
│   ├── constants/       # API configurations
│   └── styles/          # CSS and style definitions
├── backend/             # Flask translation API
│   ├── app.py          # Main Flask application
│   ├── requirements.txt # Python dependencies
│   ├── Procfile        # Railway deployment config
│   └── README.md       # Backend documentation
├── public/              # Static assets
├── firebase.json        # Firebase hosting configuration
├── firestore.rules      # Firestore security rules
├── railway.toml         # Railway frontend config
└── .firebaserc          # Firebase project configuration
```

## 🚂 Railway Backend Deployment

This project uses Railway to host the Flask translation backend API.

### Quick Deploy Backend to Railway

1. **Create a Railway Account**
   - Go to [railway.app](https://railway.app) and sign up with GitHub

2. **Deploy from GitHub**
   - Click "New Project" on Railway dashboard
   - Select "Deploy from GitHub repo"
   - Choose this repository
   - **IMPORTANT:** Set Root Directory to `backend`

3. **Configure**
   - Railway will automatically detect `Procfile`
   - No additional environment variables needed

4. **Deploy**
   - Railway will automatically build and deploy your Flask API
   - You'll get a public URL like `https://your-app.up.railway.app`

### Local Testing for Railway Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

## 🔐 Environment & Secrets

**For contributors:** No setup needed! All credentials are pre-configured:

- ✅ Firebase configuration (in `src/firebaseConfig.ts`)
- ✅ Weather API key (in `src/constants/weather.constants.ts`)
- ✅ GitHub Secrets for CI/CD deployment
- ✅ Translation API backend (Railway)

### Security Notes

The Firebase configuration (API Keys) is included in the source code. These keys are protected by **Google Cloud API Restrictions** and are only authorized to run on:
- `localhost`
- `weather-f2f43.web.app`
- Your Railway deployment URL (add this in Firebase Console)

## 🐛 Troubleshooting

### Deployment Failed?
1. Check **GitHub Actions** logs in the "Actions" tab
2. Ensure you have **push permissions** to the repository
3. Verify build succeeds locally: `npm run build`
4. Check **Firebase Hosting** quota/limits

### Local Development Issues?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist

# Rebuild
npm run build
```

### Pull Request Workflow Issues?
```bash
# Make sure you're on the latest main branch
git checkout main
git pull origin main

# Create a new branch
git checkout -b feature/my-feature

# After making changes
git add .
git commit -m "Description of changes"
git push origin feature/my-feature
```

### Can't Push to Repository?
- Contact project maintainer to be added as a **collaborator**
- Check if you're pushing to the correct remote: `git remote -v`
- Verify your GitHub authentication: `git config user.name` and `git config user.email`

## 🌐 Live Demo

**Production URL:** https://weather-f2f43.web.app

## 📝 Notes

- API keys are pre-configured and protected by Firebase Security Rules
- All features work out of the box after `npm install`
- Authentication is required for search history feature
- Guest/anonymous users can use the app but won't have search history saved
- Translation feature uses Google Translate via Railway backend

## 👤 Author

[thphuc06](https://github.com/thphuc06)

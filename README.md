# OpenStreetMap React Weather App 🌦️🗺️

This project is a coffee shop finder application with weather information built with React (Vite) and OpenStreetMap. It includes an English to Vietnamese translator for international users.

## ✨ Features

- 🗺️ **Interactive Map**: Find coffee shops near you using OpenStreetMap
- 🌦️ **Weather Information**: Get real-time weather data for locations
- 🔐 **Authentication**: Secure login with Firebase Authentication
- 🔄 **Translation**: English to Vietnamese translator for international visitors
- 📱 **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

-   **Frontend:** React (Vite), TypeScript
-   **Map:** Leaflet / OpenStreetMap
-   **Hosting & Backend:** Firebase (Hosting, Authentication)
-   **CI/CD:** GitHub Actions

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### 1. Prerequisites

Make sure you have **Node.js** installed on your machine.
[Download Node.js here](https://nodejs.org/)

### 2. Clone the repository

Open your terminal and run:

```bash
git clone [https://github.com/thphuc06/OpenStreetMapReact.git](https://github.com/thphuc06/OpenStreetMapReact.git)
cd OpenStreetMapReact
````

Since `node_modules` is not included in the repository, you must install the required libraries:

```bash
npm install
```

### 4\. Run locally

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to see the app.

-----

## 📦 Building & Deployment

This project uses **GitHub Actions** for automatic deployment.

### Automatic Deployment

Just push your changes to the `main` branch, and GitHub will automatically build and deploy to Firebase:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### Manual Build (Optional)

If you want to build the production version locally:

```bash
npm run build
```

The output will be in the `dist` folder.

## 📂 Project Structure

```
OpenStreetMapReact/
├── .github/workflows/   # CI/CD configurations
├── dist/                # Production build (generated after build)
├── public/              # Static assets
├── src/                 # Source code
│   ├── assets/          # Images, icons
│   ├── components/      # React components
│   ├── firebaseConfig.ts # Firebase configuration
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Entry point
├── .gitignore           # Git ignore rules
├── firebase.json        # Firebase hosting config
├── index.html           # HTML entry point
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```

## 🚂 Railway Deployment

This project can also be deployed to Railway for easy hosting and deployment.

### Quick Deploy to Railway

1. **Create a Railway Account**
   - Go to [railway.app](https://railway.app) and sign up with GitHub

2. **Deploy from GitHub**
   - Click "New Project" on Railway dashboard
   - Select "Deploy from GitHub repo"
   - Choose this repository
   - Railway will automatically detect the configuration from `railway.toml`

3. **Configure Environment Variables**
   - No additional environment variables needed for basic deployment
   - Firebase config is already in the code (for development only)

4. **Deploy**
   - Railway will automatically build and deploy your app
   - You'll get a public URL like `https://your-app.railway.app`

### Railway Configuration

The project includes a `railway.toml` file that:
- Builds the project using `npm run build`
- Starts the server using Vite preview mode
- Automatically handles port binding

### Local Testing for Railway

To test the production build locally:

```bash
npm run build
npm run start
```

## 🛡️ Note on Security

The Firebase configuration (API Keys) is included in the source code. These keys are protected by **Google Cloud API Restrictions** and are only authorized to run on:

  - `localhost`
  - `weather-f2f43.web.app`
  - Your Railway deployment URL (add this in Firebase Console)

-----

**Author:** [thphuc06](https://www.google.com/search?q=https://github.com/thphuc06)


## 🔧 Administrator Guide (For Owner Only)

These steps are for the project owner (`thphuc06`) when setting up the project on a new machine to manage deployments manually.

### 1. One-time Setup on New Machine
If you are on a fresh computer, you need to install Firebase CLI globally and log in to your Google account.

```bash
# 1. Install Firebase Tools globally (if not installed)
npm install -g firebase-tools

# 2. Login to your Google Account (The one hosting the project)
firebase login
````

*Note: You **DO NOT** need to run `firebase init` again, as the configuration files (`firebase.json`, `.firebaserc`) are already in the repo.*

### 2\. Deployment Workflows

#### Method A: Automatic Deployment (Recommended)

Just push to the `main` branch. GitHub Actions will handle the build and deploy process.

```bash
git push origin main
```

#### Method B: Manual Deployment (Emergency only)

If GitHub Actions is down or you need to force a deploy from your local machine:

```bash
# 1. Build the project
npm run build

# 2. Deploy to Firebase
firebase deploy
```

### 3\. Troubleshooting

If you encounter permission errors during deployment, ensure you are logged in with the correct account:

```bash
firebase logout
firebase login
```
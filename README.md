# OpenStreetMap React Weather App 🌦️🗺️

This project is a weather application built with React (Vite) and OpenStreetMap, hosted on Firebase.

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

## 🛡️ Note on Security

The Firebase configuration (API Keys) is included in the source code. These keys are protected by **Google Cloud API Restrictions** and are only authorized to run on:

  - `localhost`
  - `weather-f2f43.web.app`

-----

**Author:** [thphuc06](https://www.google.com/search?q=https://github.com/thphuc06)

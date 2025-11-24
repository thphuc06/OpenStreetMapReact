import "leaflet/dist/leaflet.css";
import { useState } from "react";
import Map from "./Map";
import { LoginPage } from "./pages/LoginPage";
import { useAuth } from "./contexts/AuthContext";
import { TranslationCard } from "./components/TranslationCard";

type ActiveView = 'map' | 'translator';

export default function App() {
  const { currentUser } = useAuth();
  const [activeView, setActiveView] = useState<ActiveView>('map');

  // If not authenticated, show login page
  if (!currentUser) {
    return <LoginPage />;
  }

  // If authenticated, show main app
  return (
    <div className="App">
      <header style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        padding: '24px 32px',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        marginBottom: '-20px',
        position: 'relative',
        zIndex: 1,
      }}>
        <h1 style={{
          margin: 0,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontSize: '32px',
          fontWeight: '700',
          letterSpacing: '-0.5px',
          textAlign: 'center',
        }}>
          Tìm Quán Cà Phê Gần Bạn
        </h1>
        <p style={{
          margin: '8px 0 0 0',
          color: '#718096',
          fontSize: '14px',
          textAlign: 'center',
          fontWeight: '500',
        }}>
          Khám phá các quán cà phê và đường đi tới đó
        </p>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '20px',
        }}>
          <button
            onClick={() => setActiveView('map')}
            style={{
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: '600',
              color: activeView === 'map' ? 'white' : '#667eea',
              background: activeView === 'map'
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'white',
              border: '2px solid #667eea',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: activeView === 'map' ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none',
            }}
          >
            Coffee Map
          </button>
          <button
            onClick={() => setActiveView('translator')}
            style={{
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: '600',
              color: activeView === 'translator' ? 'white' : '#667eea',
              background: activeView === 'translator'
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'white',
              border: '2px solid #667eea',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: activeView === 'translator' ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none',
            }}
          >
            EN → VI Translator
          </button>
        </div>
      </header>

      {activeView === 'map' ? <Map /> : <TranslationCard />}
    </div>
  );
}
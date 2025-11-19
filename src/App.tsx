import "leaflet/dist/leaflet.css";
import Map from "./Map";

export default function App() {
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
      </header>
      <Map />
    </div>
  );
}
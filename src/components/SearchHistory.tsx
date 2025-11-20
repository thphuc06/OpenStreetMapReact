import { useEffect, useState } from 'react';
import { SearchHistoryService, SearchHistoryItem } from '../services/searchHistory.service';
import { useAuth } from '../contexts/AuthContext';

interface SearchHistoryProps {
  onSelectHistory: (lat: number, lon: number, query: string) => void;
}

export function SearchHistory({ onSelectHistory }: SearchHistoryProps) {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      loadHistory();
    }
  }, [currentUser]);

  const loadHistory = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      const data = await SearchHistoryService.getUserHistory(currentUser.uid);
      setHistory(data);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistory = (item: SearchHistoryItem) => {
    onSelectHistory(item.location.lat, item.location.lon, item.searchQuery);
    setIsOpen(false);
  };

  const formatDate = (timestamp: any) => {
    const date = timestamp.toDate();
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString('vi-VN');
  };

  if (!currentUser) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '180px',
      right: '20px',
      zIndex: 1000,
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          borderRadius: '12px',
          padding: '12px 20px',
          fontSize: '14px',
          fontWeight: '600',
          color: '#667eea',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span>📜</span>
        Lịch sử ({history.length})
      </button>

      {isOpen && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          marginTop: '8px',
          maxHeight: '400px',
          overflowY: 'auto',
          width: '320px',
        }}>
          <div style={{
            padding: '16px',
            borderBottom: '1px solid #e2e8f0',
            fontWeight: '600',
            color: '#2d3748',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span>Lịch sử tìm kiếm</span>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                color: '#a0aec0',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>

          {loading ? (
            <div style={{ padding: '32px', textAlign: 'center', color: '#718096' }}>
              Đang tải...
            </div>
          ) : history.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: '#718096' }}>
              Chưa có lịch sử tìm kiếm
            </div>
          ) : (
            <div>
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectHistory(item)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderBottom: '1px solid #f7fafc',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f7fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                >
                  <div style={{
                    fontWeight: '600',
                    color: '#2d3748',
                    marginBottom: '4px',
                    fontSize: '14px',
                  }}>
                    {item.searchQuery}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#718096',
                    marginBottom: '4px',
                  }}>
                    Tìm thấy {item.cafesFound} quán cà phê
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#a0aec0',
                  }}>
                    {formatDate(item.timestamp)}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

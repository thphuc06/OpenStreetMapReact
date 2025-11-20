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
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser && !currentUser.isAnonymous) {
      loadHistory();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const loadHistory = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      setError(null);

      console.log(`🔍 Loading history for user: ${currentUser.uid}`);

      // Limit to 3 most recent searches
      const data = await SearchHistoryService.getUserHistory(currentUser.uid, 3);

      console.log(`📊 Loaded ${data.length} history items`);
      setHistory(data);
    } catch (error) {
      console.error('❌ Error loading history:', error);
      setError('Không thể tải lịch sử tìm kiếm');
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistory = (item: SearchHistoryItem) => {
    console.log(`✓ Selected history: ${item.searchQuery}`);
    onSelectHistory(item.location.lat, item.location.lon, item.searchQuery);
    setIsOpen(false);
  };

  const formatDate = (timestamp: any) => {
    try {
      const date = timestamp.toDate();
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return 'Vừa xong';
      if (diffMins < 60) return `${diffMins} phút trước`;
      if (diffHours < 24) return `${diffHours} giờ trước`;
      if (diffDays < 7) return `${diffDays} ngày trước`;
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return 'Không xác định';
    }
  };

  // Don't show for anonymous users
  if (!currentUser || currentUser.isAnonymous) {
    return null;
  }

  return (
    <div style={{ width: '100%' }}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen && history.length === 0 && !loading) {
            loadHistory(); // Reload if empty
          }
        }}
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          borderRadius: '10px',
          padding: '10px 14px',
          fontSize: '13px',
          fontWeight: '600',
          color: history.length > 0 ? '#667eea' : '#a0aec0',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        }}
      >
        <span>{loading ? '⏳' : history.length > 0 ? '📜' : '📭'}</span>
        <span>Lịch sử ({history.length})</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(4px)',
              zIndex: 999,
              animation: 'fadeIn 0.2s ease-in-out',
            }}
          />

          {/* History Panel */}
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '70vh',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideUp 0.3s ease-out',
          }}>
            {/* Header */}
            <div style={{
              padding: '20px',
              borderBottom: '2px solid #e2e8f0',
              fontWeight: '700',
              fontSize: '18px',
              color: '#2d3748',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
              borderRadius: '16px 16px 0 0',
            }}>
              <span>📚 Lịch sử tìm kiếm</span>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '28px',
                  color: '#a0aec0',
                  cursor: 'pointer',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e2e8f0';
                  e.currentTarget.style.color = '#2d3748';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                  e.currentTarget.style.color = '#a0aec0';
                }}
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div style={{
              overflowY: 'auto',
              flex: 1,
              padding: '8px',
            }}>
              {loading ? (
                <div style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: '#718096',
                  fontSize: '14px',
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
                  Đang tải lịch sử...
                </div>
              ) : error ? (
                <div style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: '#e53e3e',
                  fontSize: '14px',
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>⚠️</div>
                  <div style={{ fontWeight: '600', marginBottom: '8px' }}>
                    {error}
                  </div>
                  <button
                    onClick={loadHistory}
                    style={{
                      marginTop: '12px',
                      padding: '8px 16px',
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Thử lại
                  </button>
                </div>
              ) : history.length === 0 ? (
                <div style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: '#718096',
                  fontSize: '14px',
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
                  <div style={{ fontWeight: '600', marginBottom: '8px', fontSize: '16px' }}>
                    Chưa có lịch sử
                  </div>
                  <div style={{ fontSize: '13px', color: '#a0aec0', lineHeight: '1.6' }}>
                    Lịch sử tìm kiếm của bạn sẽ hiển thị ở đây
                    <br />
                    Hãy thử tìm kiếm một địa điểm!
                  </div>
                </div>
              ) : (
                <div>
                  {history.map((item, index) => (
                    <button
                      key={item.id || index}
                      onClick={() => handleSelectHistory(item)}
                      style={{
                        width: '100%',
                        padding: '16px',
                        marginBottom: '8px',
                        background: 'white',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f7fafc';
                        e.currentTarget.style.borderColor = '#667eea';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {/* Index Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: '700',
                        padding: '4px 8px',
                        borderRadius: '12px',
                      }}>
                        #{index + 1}
                      </div>

                      {/* Query */}
                      <div style={{
                        fontWeight: '600',
                        color: '#2d3748',
                        marginBottom: '6px',
                        fontSize: '15px',
                        paddingRight: '40px',
                      }}>
                        📍 {item.searchQuery}
                      </div>

                      {/* Results */}
                      <div style={{
                        fontSize: '13px',
                        color: '#667eea',
                        marginBottom: '6px',
                        fontWeight: '500',
                      }}>
                        ☕ Tìm thấy {item.cafesFound} quán cà phê
                      </div>

                      {/* Timestamp */}
                      <div style={{
                        fontSize: '11px',
                        color: '#a0aec0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}>
                        <span>🕐</span>
                        {formatDate(item.timestamp)}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Info */}
            {history.length > 0 && (
              <div style={{
                padding: '12px 20px',
                borderTop: '1px solid #e2e8f0',
                background: '#f7fafc',
                borderRadius: '0 0 16px 16px',
                fontSize: '11px',
                color: '#718096',
                textAlign: 'center',
              }}>
                💡 Hiển thị 3 tìm kiếm gần nhất • Click để tải lại
              </div>
            )}
          </div>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translate(-50%, -40%);
              }
              to {
                opacity: 1;
                transform: translate(-50%, -50%);
              }
            }
          `}</style>
        </>
      )}
    </div>
  );
}
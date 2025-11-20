import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signInWithGoogle, signInWithEmail, signUpWithEmail, signInAsGuest } = useAuth();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInAsGuest();
    } catch (err: any) {
      setError(err.message || 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '48px',
        maxWidth: '480px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            margin: '0 0 12px 0',
            fontSize: '32px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Tìm Quán Cà Phê
          </h1>
          <p style={{
            margin: 0,
            color: '#718096',
            fontSize: '16px',
          }}>
            {mode === 'signin' ? 'Đăng nhập để tiếp tục' : 'Tạo tài khoản mới'}
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fed7d7',
            color: '#c53030',
            padding: '12px 16px',
            borderRadius: '12px',
            marginBottom: '24px',
            fontSize: '14px',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleEmailAuth} style={{ marginBottom: '24px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              marginBottom: '16px',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '15px',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              marginBottom: '20px',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '15px',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              fontFamily: 'inherit',
            }}
          >
            {loading ? 'Đang xử lý...' : mode === 'signin' ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </form>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px',
          gap: '16px',
        }}>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
          <span style={{ fontSize: '14px', color: '#718096' }}>hoặc</span>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            background: 'white',
            color: '#2d3748',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '12px',
            fontFamily: 'inherit',
          }}
        >
          🔍 Đăng nhập với Google
        </button>

        <button
          onClick={handleGuestSignIn}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            background: 'white',
            color: '#718096',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '24px',
            fontFamily: 'inherit',
          }}
        >
          👤 Tiếp tục với tư cách Khách
        </button>

        <div style={{ textAlign: 'center', fontSize: '14px', color: '#718096' }}>
          {mode === 'signin' ? (
            <>
              Chưa có tài khoản?{' '}
              <button
                onClick={() => setMode('signup')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#667eea',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontFamily: 'inherit',
                }}
              >
                Đăng ký ngay
              </button>
            </>
          ) : (
            <>
              Đã có tài khoản?{' '}
              <button
                onClick={() => setMode('signin')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#667eea',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontFamily: 'inherit',
                }}
              >
                Đăng nhập
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

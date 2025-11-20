import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
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
      onClose();
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
      onClose();
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
      onClose();
    } catch (err: any) {
      setError(err.message || 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      }}>
        <h2 style={{
          margin: '0 0 24px 0',
          fontSize: '24px',
          fontWeight: '700',
          color: '#2d3748',
          textAlign: 'center',
        }}>
          {mode === 'signin' ? 'Đăng nhập' : 'Đăng ký'}
        </h2>

        {error && (
          <div style={{
            background: '#fed7d7',
            color: '#c53030',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleEmailAuth} style={{ marginBottom: '20px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              boxSizing: 'border-box',
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
              padding: '12px',
              marginBottom: '16px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Đang xử lý...' : mode === 'signin' ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#718096',
          marginBottom: '16px',
        }}>
          hoặc
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            background: 'white',
            color: '#2d3748',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '12px',
          }}
        >
          Đăng nhập với Google
        </button>

        <button
          onClick={handleGuestSignIn}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            background: 'white',
            color: '#718096',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '16px',
          }}
        >
          Tiếp tục với tư cách Khách
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
                }}
              >
                Đăng ký
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
                }}
              >
                Đăng nhập
              </button>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            color: '#a0aec0',
            cursor: 'pointer',
            width: '32px',
            height: '32px',
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

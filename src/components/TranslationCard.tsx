import { useState } from 'react';

export const TranslationCard = () => {
  const [englishText, setEnglishText] = useState('');
  const [vietnameseText, setVietnameseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const translateText = async () => {
    if (!englishText.trim()) {
      setError('Please enter some text to translate');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Using Flask backend on Railway with Google Translate
      const API_URL = 'https://openstreetmapreact-production.up.railway.app';

      const response = await fetch(`${API_URL}/api/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: englishText,
          source: 'en',
          target: 'vi'
        })
      });

      const data = await response.json();

      if (data.success) {
        setVietnameseText(data.translated);
      } else {
        setError('Translation failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please check your internet connection.');
      console.error('Translation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearText = () => {
    setEnglishText('');
    setVietnameseText('');
    setError('');
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        padding: '32px',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        maxWidth: '800px',
        margin: '20px auto',
      }}
    >
      <h2
        style={{
          margin: '0 0 24px 0',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontSize: '28px',
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        English to Vietnamese Translator
      </h2>

      <div style={{ marginBottom: '20px' }}>
        <label
          htmlFor="english-input"
          style={{
            display: 'block',
            marginBottom: '8px',
            color: '#2D3748',
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          English Text:
        </label>
        <textarea
          id="english-input"
          value={englishText}
          onChange={(e) => setEnglishText(e.target.value)}
          placeholder="Enter English text here..."
          style={{
            width: '100%',
            minHeight: '120px',
            padding: '12px 16px',
            fontSize: '16px',
            border: '2px solid #E2E8F0',
            borderRadius: '12px',
            outline: 'none',
            transition: 'border-color 0.2s',
            fontFamily: 'inherit',
            resize: 'vertical',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#667eea';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#E2E8F0';
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button
          onClick={translateText}
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            color: 'white',
            background: isLoading
              ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '12px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
          }}
        >
          {isLoading ? 'Translating...' : 'Translate'}
        </button>

        <button
          onClick={clearText}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            color: '#718096',
            background: 'white',
            border: '2px solid #E2E8F0',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#CBD5E0';
            e.currentTarget.style.background = '#F7FAFC';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E2E8F0';
            e.currentTarget.style.background = 'white';
          }}
        >
          Clear
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: '12px 16px',
            marginBottom: '20px',
            background: '#FEE2E2',
            color: '#991B1B',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          {error}
        </div>
      )}

      {vietnameseText && (
        <div style={{ marginTop: '20px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              color: '#2D3748',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            Vietnamese Translation:
          </label>
          <div
            style={{
              padding: '16px',
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
              borderRadius: '12px',
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#1E293B',
              border: '2px solid #BAE6FD',
            }}
          >
            {vietnameseText}
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: '24px',
          padding: '12px',
          background: '#F7FAFC',
          borderRadius: '8px',
          fontSize: '12px',
          color: '#718096',
          textAlign: 'center',
        }}
      >
        Powered by Google Translate via Railway Backend
      </div>
    </div>
  );
};

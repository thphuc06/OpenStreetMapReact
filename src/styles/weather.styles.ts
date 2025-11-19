// Weather Component Styles

import type React from 'react';

export const weatherContainerStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '20px',
  left: '20px',
  right: '20px',
  maxWidth: '600px',
  zIndex: 1000,
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
  backdropFilter: 'blur(20px)',
  padding: '20px',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.8)',
  maxHeight: '300px',
  overflowY: 'auto',
};

export const weatherHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
  paddingBottom: '12px',
  borderBottom: '2px solid #e2e8f0',
};

export const weatherTitleStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: '700',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  margin: 0,
};

export const weatherCloseButtonStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  color: '#718096',
  padding: '4px 8px',
  borderRadius: '6px',
  transition: 'all 0.3s ease',
};

export const forecastTypeButtonsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  marginBottom: '16px',
};

export const forecastTypeButtonStyle: React.CSSProperties = {
  padding: '6px 12px',
  border: '2px solid rgba(102, 126, 234, 0.2)',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '11px',
  fontWeight: '600',
  transition: 'all 0.3s ease',
  background: 'white',
  color: '#4a5568',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

export const forecastTypeButtonActiveStyle: React.CSSProperties = {
  ...forecastTypeButtonStyle,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  borderColor: 'transparent',
  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
};

export const currentWeatherStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '16px',
  background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  borderRadius: '12px',
  marginBottom: '16px',
};

export const weatherIconLargeStyle: React.CSSProperties = {
  fontSize: '64px',
  lineHeight: 1,
};

export const currentTempStyle: React.CSSProperties = {
  fontSize: '48px',
  fontWeight: '700',
  color: '#2d3748',
  lineHeight: 1,
  margin: 0,
};

export const weatherDescriptionStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#4a5568',
  fontWeight: '500',
  textTransform: 'capitalize',
  margin: '4px 0 0 0',
};

export const weatherDetailsStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '12px',
  fontSize: '12px',
  color: '#718096',
};

export const weatherDetailItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

export const dailyForecastStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  overflowX: 'auto',
  paddingBottom: '8px',
};

export const dailyCardStyle: React.CSSProperties = {
  minWidth: '100px',
  padding: '12px',
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
  borderRadius: '10px',
  textAlign: 'center',
  border: '2px solid rgba(102, 126, 234, 0.2)',
  transition: 'all 0.3s ease',
};

export const hourlyForecastStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  overflowX: 'auto',
  paddingBottom: '8px',
};

export const hourlyCardStyle: React.CSSProperties = {
  minWidth: '80px',
  padding: '10px',
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
  borderRadius: '10px',
  textAlign: 'center',
  border: '2px solid rgba(102, 126, 234, 0.2)',
  fontSize: '12px',
};

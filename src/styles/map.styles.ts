// Map Component Styles - Modern UI/UX Design

import type React from 'react';

export const mapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "calc(100vh - 180px)",
  minHeight: "600px",
  position: "relative",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)",
  flex: 1,
};

export const formStyle: React.CSSProperties = {
  position: "absolute",
  top: "20px",
  left: "20px",
  right: "20px",
  maxWidth: "550px",
  zIndex: 1000,
  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)",
  backdropFilter: "blur(20px)",
  padding: "20px",
  borderRadius: "16px",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  fontSize: "14px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.8)",
  transition: "all 0.3s ease",
};

export const buttonStyle: React.CSSProperties = {
  padding: "10px 18px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  letterSpacing: "0.3px",
};

export const searchButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  position: "relative",
  overflow: "hidden",
};

export const clearButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  color: "white",
};

export const routeButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  color: "white",
  width: "100%",
  marginTop: "12px",
  padding: "12px 18px",
  fontSize: "14px",
};

export const statusStyle: React.CSSProperties = {
  width: "100%",
  fontSize: "13px",
  marginTop: "8px",
  padding: "10px 14px",
  background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  borderRadius: "10px",
  color: "#2d3748",
  fontWeight: "500",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.5)",
};

export const popupStyle: React.CSSProperties = {
  minWidth: "300px",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

export const popupSmallTextStyle: React.CSSProperties = {
  color: "#718096",
  lineHeight: "1.6",
};

// New: Input field style
export const inputStyle: React.CSSProperties = {
  minWidth: "220px",
  padding: "10px 14px",
  border: "2px solid rgba(102, 126, 234, 0.2)",
  borderRadius: "10px",
  fontSize: "14px",
  outline: "none",
  transition: "all 0.3s ease",
  background: "white",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

// Map Mode Switcher Styles
export const mapModeSwitcherStyle: React.CSSProperties = {
  position: "absolute",
  top: "20px",
  right: "20px",
  zIndex: 1000,
  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)",
  backdropFilter: "blur(20px)",
  padding: "12px",
  borderRadius: "12px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.8)",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  minWidth: "140px",
};

export const mapModeButtonStyle: React.CSSProperties = {
  padding: "8px 12px",
  border: "2px solid rgba(102, 126, 234, 0.2)",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "600",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  background: "white",
  color: "#4a5568",
  textAlign: "left",
};

export const mapModeButtonActiveStyle: React.CSSProperties = {
  ...mapModeButtonStyle,
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  borderColor: "transparent",
  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
};

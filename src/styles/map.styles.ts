// Map Component Styles

import type React from 'react';

export const mapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "500px",
  position: "relative",
};

export const formStyle: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  left: "50px",
  zIndex: 1000,
  background: "white",
  padding: "10px",
  borderRadius: "5px",
  display: "flex",
  gap: "5px",
  flexWrap: "wrap",
  fontSize: "14px",
};

export const buttonStyle: React.CSSProperties = {
  padding: "6px 12px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "bold",
};

export const searchButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: "#007bff",
  color: "white",
};

export const clearButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: "#dc3545",
  color: "white",
};

export const routeButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: "#28a745",
  color: "white",
  width: "100%",
  marginTop: "8px",
};

export const statusStyle: React.CSSProperties = {
  width: "100%",
  fontSize: "12px",
  marginTop: "4px",
  padding: "4px 8px",
  background: "#f0f0f0",
  borderRadius: "3px",
  color: "#333"
};

export const popupStyle: React.CSSProperties = {
  minWidth: "280px",
};

export const popupSmallTextStyle: React.CSSProperties = {
  color: "#666",
};

// custom-marker.tsx
import React from "react";
import L from "leaflet";
import MakrerUrl from "./assets/mapMarker.svg";
import { Marker } from "react-leaflet";

interface CustomMarkerProps {
  position: L.LatLngExpression;
  children: React.ReactNode;
  iconUrl?: string;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
  position,
  children,
  iconUrl
}) => {
  const customIcon = L.icon({
    iconUrl: iconUrl || MakrerUrl,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
  });

  return (
    <Marker position={position} icon={customIcon}>
      {children}
    </Marker>
  );
};

export default CustomMarker;

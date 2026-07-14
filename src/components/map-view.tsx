"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { company, fullAddress } from "@/data/company";

// Approximate coordinates for Rua da Missão, Ingombota, Luanda.
// [[NEEDS CLIENT INPUT: confirm exact building coordinates]]
const POSITION: [number, number] = [-8.8146, 13.2306];

// Brand pin as an inline SVG divIcon (no external image — CSP-safe).
const pinIcon = L.divIcon({
  className: "",
  html: `
    <svg width="34" height="44" viewBox="0 0 34 44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17 0C7.6 0 0 7.6 0 17c0 12 17 27 17 27s17-15 17-27C34 7.6 26.4 0 17 0z" fill="#FF6400"/>
      <circle cx="17" cy="17" r="7" fill="#052459"/>
    </svg>`,
  iconSize: [34, 44],
  iconAnchor: [17, 44],
  popupAnchor: [0, -40],
});

export default function MapView() {
  return (
    <MapContainer
      center={POSITION}
      zoom={16}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ minHeight: "20rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={POSITION} icon={pinIcon}>
        <Popup>
          <strong>{company.brandName}</strong>
          <br />
          {fullAddress}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

"use client";

import dynamic from "next/dynamic";

// Leaflet touches `window`, so load the map client-side only.
const MapView = dynamic(() => import("@/components/map-view"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-80 items-center justify-center bg-surface text-sm text-ink-muted">
      …
    </div>
  ),
});

export function ContactMap({ label }: { label: string }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="h-80 overflow-hidden rounded-lg border border-border-subtle"
    >
      <MapView />
    </div>
  );
}

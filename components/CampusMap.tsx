'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Link from 'next/link';
import type { Plant } from '@/lib/content/plants';

// Leaflet's default marker icons reference image paths that don't
// resolve correctly through bundlers — this is the standard fix.
function useLeafletIconFix() {
  useEffect(() => {
    // @ts-expect-error - _getIconUrl is a private Leaflet internal we're patching
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);
}

type PlantWithCoords = Plant & { latitude?: number; longitude?: number };

function groupByLocation(plants: PlantWithCoords[]) {
  const groups = new Map<string, PlantWithCoords[]>();
  for (const p of plants) {
    if (p.latitude == null || p.longitude == null) continue;
    const key = `${p.latitude},${p.longitude}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(p);
  }
  return groups;
}

export default function CampusMap({ plants }: { plants: PlantWithCoords[] }) {
  useLeafletIconFix();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const withCoords = plants.filter((p) => p.latitude != null && p.longitude != null);
  if (withCoords.length === 0 || !ready) {
    return (
      <div className="feature-card flex items-center justify-center h-64">
        <p className="font-body text-sm text-ink/50">Loading map…</p>
      </div>
    );
  }

  const groups = groupByLocation(withCoords);
  const center: [number, number] = [withCoords[0].latitude!, withCoords[0].longitude!];

  return (
    <div className="feature-card overflow-hidden p-0">
      <MapContainer center={center} zoom={16} style={{ height: '420px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {Array.from(groups.entries()).map(([key, group]) => {
          const [lat, lng] = key.split(',').map(Number);
          const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
          return (
            <Marker key={key} position={[lat, lng]}>
              <Popup>
                <div className="font-body text-sm min-w-[160px]">
                  <p className="font-bold mb-1">{group[0].location}</p>
                  <ul className="mb-2 space-y-0.5">
                    {group.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/atlas/${p.slug}`} className="text-clay hover:underline">
                          {p.commonName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-widest text-ink underline"
                  >
                    Get Directions →
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

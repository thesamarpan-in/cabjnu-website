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
              <Popup maxWidth={280} minWidth={240}>
                <div className="font-body text-sm">
                  <p className="font-bold mb-2 text-ink">{group[0].location}</p>
                  <div className="space-y-3 mb-3 max-h-[280px] overflow-y-auto">
                    {group.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/atlas/${p.slug}`}
                        className="flex gap-2.5 items-start hover:bg-black/[0.03] -mx-1 px-1 py-1 rounded transition-colors"
                      >
                        {p.photo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={p.photo}
                            alt={p.commonName}
                            className="w-12 h-12 object-cover rounded flex-shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded flex-shrink-0 bg-clay/10" />
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-ink leading-tight truncate">
                            {p.commonName}
                          </p>
                          <p className="text-[11px] italic text-ink/50 truncate">
                            {p.scientificName}
                          </p>
                          <p className="text-[11px] text-ink/60 mt-0.5">{p.family}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-widest text-white bg-clay px-3 py-2 rounded block text-center hover:bg-clay-dark transition-colors"
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

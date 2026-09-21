'use client';

import dynamic from 'next/dynamic';
import type { Plant } from '@/lib/content/plants';

// Leaflet touches `window` at module-import time, which crashes Next.js's
// static-export prerender pass on the server. ssr:false is disallowed in
// Server Components, so this thin Client Component wrapper exists purely
// to host the dynamic() call somewhere it's legal — the actual map only
// ever loads in the browser.
const CampusMap = dynamic(() => import('./CampusMap'), {
  ssr: false,
  loading: () => (
    <div className="feature-card flex items-center justify-center h-64">
      <p className="font-body text-sm text-ink/50">Loading map…</p>
    </div>
  ),
});

export default function CampusMapLoader({ plants }: { plants: Plant[] }) {
  return <CampusMap plants={plants} />;
}

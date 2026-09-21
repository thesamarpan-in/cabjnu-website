import { MetadataRoute } from 'next';
import { plants } from '@/lib/content/plants';

export const dynamic = 'force-static';

const SITE_URL = 'https://ayurveda.thesamarpan.co.in';

// Static export generates this once at build time into sitemap.xml.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/about',
    '/research-areas',
    '/atlas',
    '/resources',
    '/news',
    '/ayurveda-day',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const plantRoutes = plants.map((plant) => ({
    url: `${SITE_URL}/atlas/${plant.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...plantRoutes];
}

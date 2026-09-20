import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { plants } from '@/lib/content/plants';

const colors = ['#4A5D4F', '#3A4A6B', '#C5A059', '#6B4A85', '#D95D39', '#2F6B66', '#8B5E34'];

export default function Atlas() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <p className="eyebrow mb-2">Atlas</p>
      <h1 className="font-display text-4xl text-ink mb-3">
        Medicinal Plant Atlas
      </h1>
      <p className="font-body text-ink/70 max-w-prose mb-4">
        A pilot record of {plants.length} medicinal plants documented on the
        JNU campus. Entries currently record traditional/folk use as
        recorded on campus signage — phytochemical, molecular-target, and
        clinical-evidence data will be added as faculty verify each entry.
      </p>
      <p className="font-body text-sm text-clay mb-12 max-w-prose">
        Evidence status: traditional/folk use only, not yet independently
        verified against primary literature.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {plants.map((plant, i) => {
          const color = colors[i % colors.length];
          return (
            <Link key={plant.slug} href={`/atlas/${plant.slug}`} className="plant-card block">
              {plant.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={plant.photo} alt={plant.scientificName} className="w-full h-full object-cover" />
              ) : (
                <div
                  className="plant-bg"
                  style={{ background: `linear-gradient(135deg, ${color}18, ${color}38)` }}
                >
                  <Leaf size={36} strokeWidth={1.25} color={color} />
                </div>
              )}
              <div className="plant-overlay">
                <p className="plant-name">{plant.commonName}</p>
                <p className="plant-sci">{plant.scientificName}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

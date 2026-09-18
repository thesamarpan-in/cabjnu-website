import Link from 'next/link';
import { notFound } from 'next/navigation';
import { plants } from '@/lib/content/plants';
import PlantDetail from '@/components/PlantDetail';

// Required for static export (output: 'export') — tells Next.js every
// possible /atlas/[slug] path to pre-render at build time, since there's
// no server to render one on demand.
export function generateStaticParams() {
  return plants.map((plant) => ({ slug: plant.slug }));
}

export default async function PlantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plant = plants.find((p) => p.slug === slug);
  if (!plant) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/atlas"
        className="font-body text-sm text-moss hover:text-moss-dark transition-colors"
      >
        ← Back to Atlas
      </Link>

      <p className="specimen-index mt-8 mb-2">{plant.family}</p>
      <h1 className="font-display text-4xl text-ink italic">
        {plant.scientificName}
      </h1>
      <p className="font-body text-lg text-ink/70 mt-1">
        {plant.commonName}
      </p>

      <PlantDetail plant={plant} />

      <div className="hairline mt-8 pt-6">
        <p className="font-body text-sm tag-ayurvedic inline-block px-3 py-1">
          Evidence status: traditional/folk use, not yet independently
          verified
        </p>
        <p className="font-body text-sm text-ink/60 mt-4 max-w-prose">
          Phytochemical, molecular-target, and research-paper data for this
          plant have not yet been added to the Centre&apos;s research
          database. This page will be updated as that evidence is verified.
        </p>
      </div>

      <div className="hairline mt-8 pt-6">
        <p className="specimen-index mb-2">QR code</p>
        <img
          src={`/qr/${plant.slug}.png`}
          alt={`QR code linking to this page for ${plant.scientificName}`}
          width={140}
          height={140}
          className="border border-line"
        />
        <p className="font-body text-xs text-ink/50 mt-2">
          Generated at build time — scans to this page.
        </p>
      </div>
    </div>
  );
}

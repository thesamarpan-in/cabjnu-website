import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { plants } from '@/lib/content/plants';
import PlantDetail from '@/components/PlantDetail';
import PlantQuiz from '@/components/PlantQuiz';

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
        className="font-body text-sm text-clay hover:text-ink transition-colors inline-flex items-center gap-1"
      >
        <ArrowLeft size={16} /> Back to Atlas
      </Link>

      <p className="eyebrow mt-8 mb-2">{plant.family}</p>
      <h1 className="font-display text-4xl text-ink italic">
        {plant.scientificName}
      </h1>
      <p className="font-body text-lg text-ink/70 mt-1">
        {plant.commonName}
      </p>

      <PlantDetail plant={plant} />

      <div className="feature-card mt-8">
        <p className="font-body text-sm tag-ayurvedic inline-block px-3 py-1 rounded-full">
          Evidence status: traditional/folk use, not yet independently
          verified
        </p>
        <p className="font-body text-sm text-ink/60 mt-4 max-w-prose">
          Phytochemical, molecular-target, and research-paper data for this
          plant have not yet been added to the Centre&apos;s research
          database. This page will be updated as that evidence is verified.
        </p>
      </div>

      <div className="mt-8">
        <p className="eyebrow mb-3">Test what you learned</p>
        <PlantQuiz plant={plant} />
      </div>

      <div className="feature-card mt-8">
        <p className="eyebrow mb-3">QR code</p>
        <img
          src={`/qr/${plant.slug}.png`}
          alt={`QR code linking to this page for ${plant.scientificName}`}
          width={140}
          height={140}
          className="rounded-lg border border-line"
        />
        <p className="font-body text-xs text-ink/50 mt-2">
          Generated at build time — scans to this page.
        </p>
      </div>
    </div>
  );
}

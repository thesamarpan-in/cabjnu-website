import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin } from 'lucide-react';
import { plants } from '@/lib/content/plants';
import PlantDetail from '@/components/PlantDetail';
import PlantQuiz from '@/components/PlantQuiz';
import CampusMapLoader from '@/components/CampusMapLoader';

export function generateStaticParams() {
  return plants.map((plant) => ({ slug: plant.slug }));
}

const statusLabels: Record<string, { label: string; tag: string }> = {
  experimentally_demonstrated: { label: 'Experimentally demonstrated', tag: 'tag-bio' },
  proposed: { label: 'Proposed (related-species literature)', tag: 'tag-ayurvedic' },
  hypothesized: { label: 'Hypothesized', tag: 'tag-molecular' },
  not_established: { label: 'Not established', tag: 'tag-molecular' },
};

export default async function PlantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plant = plants.find((p) => p.slug === slug);
  if (!plant) return notFound();

  const status = plant.research
    ? statusLabels[plant.research.evidenceStatus]
    : { label: 'Traditional/folk use, not yet independently verified', tag: 'tag-ayurvedic' };

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

      {/* Research evidence */}
      <div className="feature-card mt-8">
        <p className={`font-body text-sm ${status.tag} inline-block px-3 py-1 rounded-full mb-4`}>
          Evidence status: {status.label}
        </p>
        {plant.research ? (
          <>
            <p className="font-body text-sm text-ink/80 mb-4">
              {plant.research.evidenceNote}
            </p>
            <p className="font-body text-xs text-ink/50 mb-1">
              Evidence base: {plant.research.evidenceModel}
            </p>
            <p className="font-body text-xs text-ink/60 border-t border-line pt-3 mt-3">
              {plant.research.citation.authors} ({plant.research.citation.year ?? 'n.d.'}).{' '}
              <em>{plant.research.citation.title}</em>.{' '}
              {plant.research.citation.journal}.
              {plant.research.citation.doi && (
                <>
                  {' '}
                  <a
                    href={`https://doi.org/${plant.research.citation.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-clay hover:underline"
                  >
                    doi:{plant.research.citation.doi}
                  </a>
                </>
              )}
              {plant.research.citation.pmid && (
                <>
                  {' '}
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${plant.research.citation.pmid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-clay hover:underline"
                  >
                    PMID:{plant.research.citation.pmid}
                  </a>
                </>
              )}
            </p>
          </>
        ) : (
          <p className="font-body text-sm text-ink/60 max-w-prose">
            Phytochemical, molecular-target, and research-paper data for this
            plant have not yet been added to the Centre&apos;s research
            database. This page will be updated as that evidence is verified.
          </p>
        )}
      </div>

      {/* Location map */}
      {plant.latitude && plant.longitude && (
        <div className="mt-8">
          <p className="eyebrow mb-3 flex items-center gap-1">
            <MapPin size={13} /> Find it on campus
          </p>
          <CampusMapLoader plants={[plant]} />
        </div>
      )}

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

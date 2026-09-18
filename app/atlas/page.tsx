import Link from 'next/link';
import { plants } from '@/lib/content/plants';

export default function Atlas() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="specimen-index mb-3">Atlas</p>
      <h1 className="font-display text-4xl text-ink mb-3">
        Medicinal Plant Atlas
      </h1>
      <p className="font-body text-ink/70 max-w-prose mb-4">
        A pilot record of {plants.length} medicinal plants documented on the
        JNU campus. Entries currently record traditional/folk use as
        recorded on campus signage — phytochemical, molecular-target, and
        clinical-evidence data will be added as faculty verify each entry.
      </p>
      <p className="font-body text-sm text-clay mb-12 max-w-prose border-l-2 border-clay pl-4">
        Evidence status: traditional/folk use only, not yet independently
        verified against primary literature. This will be graded per-claim
        (experimentally demonstrated / proposed / hypothesized / not
        established) as the Centre&apos;s research database grows.
      </p>

      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
        {plants.map((plant) => (
          <Link
            key={plant.slug}
            href={`/atlas/${plant.slug}`}
            className="hairline pt-5 block hover:bg-ink/[0.02] transition-colors -mx-2 px-2"
          >
            <p className="specimen-index mb-1">{plant.family}</p>
            <h2 className="font-display text-xl text-ink italic">
              {plant.scientificName}
            </h2>
            <p className="font-body text-sm text-ink/70 mt-1">
              {plant.commonName}
            </p>
            <p className="font-body text-xs text-moss mt-2">
              {plant.location}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

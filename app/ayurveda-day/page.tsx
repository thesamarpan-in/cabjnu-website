import Link from 'next/link';
import { plants } from '@/lib/content/plants';

export default function AyurvedaDay() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="specimen-index mb-3">Ayurveda Day 2026 · 23 September</p>
      <h1 className="font-display text-4xl sm:text-5xl text-ink leading-tight mb-4">
        Ayurveda Biology: Tradition → Evidence → Discovery
      </h1>
      <p className="font-body text-ink/80 mb-2">
        National theme: &ldquo;Ayurveda for a Healthier Tomorrow.&rdquo;
      </p>
      <p className="font-body text-ink/70 max-w-prose mb-10">
        The Centre for Ayurveda Biology marks Ayurveda Day 2026 by opening
        the first public version of its digital research ecosystem — a
        platform for studying medicinal plants, their traditional use, and
        their biological evidence, side by side.
      </p>

      <div className="flex flex-wrap gap-4 mb-14">
        <Link
          href="/atlas"
          className="font-body text-sm text-paper bg-moss px-5 py-2.5 hover:bg-moss-dark transition-colors"
        >
          Explore the Medicinal Plant Atlas
        </Link>
        <Link
          href="/research-areas"
          className="font-body text-sm text-ink self-center hover:text-moss transition-colors"
        >
          Explore Research Areas
        </Link>
      </div>

      <div className="hairline pt-8">
        <h2 className="font-display text-2xl text-ink mb-6">
          What we&apos;re building
        </h2>
        <ul className="space-y-4 font-body text-sm">
          <li className="flex gap-3">
            <span className="tag-bio px-2 py-0.5 h-fit">Live</span>
            <span className="text-ink/80">
              Centre website — About, Research Areas, Faculty Directory
            </span>
          </li>
          <li className="flex gap-3">
            <span className="tag-bio px-2 py-0.5 h-fit">Live</span>
            <span className="text-ink/80">
              Research database schema with an evidence-status framework
              (experimentally demonstrated / proposed / hypothesized / not
              established) built in from the start
            </span>
          </li>
          <li className="flex gap-3">
            <span className="tag-bio px-2 py-0.5 h-fit">Live — pilot</span>
            <span className="text-ink/80">
              Medicinal Plant Atlas — {plants.length} plants documented on
              the JNU campus, each with a QR code linking to its page
            </span>
          </li>
          <li className="flex gap-3">
            <span className="tag-ayurvedic px-2 py-0.5 h-fit">In progress</span>
            <span className="text-ink/80">
              Verified phytochemical, molecular-target, and citation data
              for each Atlas entry
            </span>
          </li>
          <li className="flex gap-3">
            <span className="tag-ayurvedic px-2 py-0.5 h-fit">In progress</span>
            <span className="text-ink/80">
              Research Repository — publications, theses, and protocols
            </span>
          </li>
          <li className="flex gap-3">
            <span className="tag-molecular px-2 py-0.5 h-fit">Planned</span>
            <span className="text-ink/80">
              An interactive knowledge graph, once enough verified
              plant-compound-evidence data exists to make one meaningful
            </span>
          </li>
        </ul>
      </div>

      <p className="font-body text-sm text-ink/50 mt-14 border-t border-line pt-6">
        Evidence status is reported according to available scientific
        literature and may be updated as new evidence emerges.
      </p>
    </div>
  );
}

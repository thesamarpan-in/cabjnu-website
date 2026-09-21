import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { plants } from '@/lib/content/plants';

export default function AyurvedaDay() {
  return (
    <>
      <div className="bg-paper2 border-b border-line">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <p className="eyebrow mb-3">Ayurveda Day 2026 · 23 September</p>
          <h1 className="font-display text-4xl sm:text-5xl leading-tight mb-4 text-ink">
            Ayurveda Biology: Tradition → Evidence → Discovery
          </h1>
          <p className="font-body text-ink/70 mb-2">
            National theme: &ldquo;Ayurveda for a Healthier Tomorrow.&rdquo;
          </p>
          <p className="font-body text-ink/60 max-w-prose mb-10">
            The Centre for Ayurveda Biology marks Ayurveda Day 2026 by opening
            the first public version of its digital research ecosystem.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/atlas"
              className="font-body text-sm bg-clay hover:bg-clay-dark text-white px-6 py-3 rounded-full transition-colors inline-flex items-center gap-2"
            >
              Explore the Atlas <ArrowRight size={16} />
            </Link>
            <Link
              href="/research-areas"
              className="font-body text-sm border border-line hover:border-clay text-ink px-6 py-3 rounded-full transition-colors"
            >
              Explore Research Areas
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="font-display text-2xl text-ink mb-6">
          What we&apos;re building
        </h2>
        <div className="space-y-4">
          {[
            { status: 'Live', tag: 'tag-bio', text: 'Centre website — About, Research Areas, Medicinal Plant Atlas' },
            { status: 'Live', tag: 'tag-bio', text: 'Research database schema with an evidence-status framework built in from the start' },
            { status: 'Live — pilot', tag: 'tag-bio', text: `Medicinal Plant Atlas — ${plants.length} plants documented on the JNU campus, each with a QR code linking to its page` },
            { status: 'In progress', tag: 'tag-ayurvedic', text: 'Verified phytochemical, molecular-target, and citation data for each Atlas entry' },
            { status: 'In progress', tag: 'tag-ayurvedic', text: 'Research Repository — publications, theses, and protocols' },
            { status: 'Planned', tag: 'tag-molecular', text: 'An interactive knowledge graph, once enough verified plant-compound-evidence data exists' },
          ].map((item, i) => (
            <div key={i} className="feature-card flex flex-col sm:flex-row sm:items-center gap-3">
              <span className={`font-body text-xs px-3 py-1 rounded-full w-fit ${item.tag}`}>
                {item.status}
              </span>
              <span className="font-body text-sm text-ink/80">{item.text}</span>
            </div>
          ))}
        </div>

        <p className="font-body text-sm text-ink/50 mt-10 border-t border-line pt-6">
          Evidence status is reported according to available scientific
          literature and may be updated as new evidence emerges.
        </p>
      </div>
    </>
  );
}

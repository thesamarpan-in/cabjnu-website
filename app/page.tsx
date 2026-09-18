import Link from 'next/link';
import { researchAreas } from '@/lib/content/research-areas';
import { plants } from '@/lib/content/plants';
import ResearchNetworkDiagram from '@/components/ResearchNetworkDiagram';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Hero — specimen-label treatment, not a stat block */}
      <section className="pt-16 pb-14">
        <p className="specimen-index mb-3">Est. — JNU School of Life Sciences</p>
        <h1 className="font-display text-5xl sm:text-6xl leading-[1.05] text-ink max-w-3xl">
          Bridging traditional wisdom with molecular biology.
        </h1>
        <p className="font-body text-lg text-ink/80 mt-6 max-w-xl">
          The Centre for Ayurveda Biology studies medicinal plants, their
          phytochemistry, and their mechanisms — reading classical Ayurvedic
          properties alongside modern biological evidence, not in place of it.
        </p>
        <div className="flex gap-6 mt-8">
          <Link
            href="/research-areas"
            className="font-body text-sm text-paper bg-moss px-5 py-2.5 hover:bg-moss-dark transition-colors"
          >
            Explore research areas
          </Link>
          <Link
            href="/about"
            className="font-body text-sm text-ink self-center hover:text-moss transition-colors"
          >
            About the Centre
          </Link>
        </div>
      </section>

      {/* 01 — Medicinal Plant Atlas teaser */}
      <section className="hairline pt-10 pb-14">
        <div className="grid grid-cols-[3rem_1fr] gap-x-6">
          <p className="specimen-index">01</p>
          <div>
            <h2 className="font-display text-2xl text-ink mb-2">
              Medicinal Plant Atlas
            </h2>
            <p className="font-body text-sm text-ink/70 max-w-md mb-4">
              A pilot record of {plants.length} medicinal plants documented
              on the JNU campus — traditional use, botanical family, and
              campus location for each, with scientific evidence to be
              added as the Centre&apos;s database grows.
            </p>
            <Link
              href="/atlas"
              className="font-body text-sm text-moss hover:text-moss-dark transition-colors"
            >
              Explore the Atlas
            </Link>
          </div>
        </div>
      </section>

      {/* 02 — Research network (conceptual diagram, not the real graph) */}
      <section className="hairline pt-10 pb-14">
        <div className="grid grid-cols-[3rem_1fr] gap-x-6">
          <p className="specimen-index">02</p>
          <div>
            <h2 className="font-display text-2xl text-ink mb-2">
              How the Centre studies a plant
            </h2>
            <p className="font-body text-sm text-ink/70 max-w-md mb-6">
              A conceptual view of the research chain — the actual,
              data-driven version of this will grow as the Centre&apos;s
              database is populated with verified evidence.
            </p>
            <ResearchNetworkDiagram />
          </div>
        </div>
      </section>

      {/* 03 — Research Areas */}
      <section className="hairline pt-10 pb-14">
        <div className="grid grid-cols-[3rem_1fr] gap-x-6">
          <p className="specimen-index">03</p>
          <div>
            <h2 className="font-display text-2xl text-ink mb-6">
              Research Areas
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
              {researchAreas.map((area) => (
                <div key={area.slug}>
                  <h3 className="font-body font-medium text-ink">
                    {area.name}
                  </h3>
                  <p className="font-body text-sm text-ink/70 mt-1">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Faculty preview */}
      <section className="hairline pt-10 pb-16">
        <div className="grid grid-cols-[3rem_1fr] gap-x-6">
          <p className="specimen-index">04</p>
          <div>
            <h2 className="font-display text-2xl text-ink mb-3">Faculty</h2>
            <p className="font-body text-sm text-ink/70 max-w-md mb-4">
              Directory entries are added once each faculty member confirms
              their bio, research areas, and publication links.
            </p>
            <Link
              href="/faculty"
              className="font-body text-sm text-moss hover:text-moss-dark transition-colors"
            >
              View the Faculty Directory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

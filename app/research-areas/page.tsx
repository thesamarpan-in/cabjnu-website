import { researchAreas } from '@/lib/content/research-areas';

export default function ResearchAreas() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="specimen-index mb-3">Research</p>
      <h1 className="font-display text-4xl text-ink mb-10">
        Research Areas
      </h1>

      <div className="divide-y divide-line">
        {researchAreas.map((area, i) => (
          <div
            key={area.slug}
            className="grid grid-cols-[3rem_1fr] gap-x-6 py-8"
          >
            <p className="specimen-index">
              {String(i + 1).padStart(2, '0')}
            </p>
            <div>
              <h2 className="font-display text-2xl text-ink mb-2">
                {area.name}
              </h2>
              <p className="font-body text-ink/80 max-w-prose">
                {area.description}
              </p>
              <p className="font-body text-sm text-ink/50 mt-3">
                {/* TODO: link to real faculty/projects once assigned */}
                Faculty and active projects — to be added
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

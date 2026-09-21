import { Leaf } from 'lucide-react';
import { researchAreas } from '@/lib/content/research-areas';
import { researchAreaIcons } from '@/lib/research-area-icons';

export default function ResearchAreas() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <p className="eyebrow mb-2">Research</p>
      <h1 className="font-display text-4xl text-ink mb-10">
        Research Areas
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {researchAreas.map((area) => {
          const Icon = researchAreaIcons[area.slug] ?? Leaf;
          return (
            <div key={area.slug} className="feature-card">
              <span className="icon-badge mb-4">
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <h2 className="font-display text-lg text-ink mb-2">
                {area.name}
              </h2>
              <p className="font-body text-sm text-ink/70">
                {area.description}
              </p>
              <p className="font-body text-xs text-ink/40 mt-4">
                Active projects — to be added
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

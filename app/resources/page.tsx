import { BookOpen } from 'lucide-react';

export default function Resources() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <p className="eyebrow mb-2">Resources</p>
      <h1 className="font-display text-4xl text-ink mb-6">
        Research Repository
      </h1>
      <div className="feature-card max-w-2xl">
        <span className="icon-badge mb-4">
          <BookOpen size={20} strokeWidth={1.75} />
        </span>
        <p className="font-body text-ink/80">
          Publications, theses, protocols, and datasets will be listed here
          as the Centre&apos;s research output grows. This section is not
          yet populated — check back as the Centre&apos;s work develops.
        </p>
      </div>
    </div>
  );
}

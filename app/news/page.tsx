import { CalendarDays, Newspaper } from 'lucide-react';

export default function NewsAndEvents() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <p className="eyebrow mb-2">Stay Updated</p>
      <h1 className="font-display text-4xl text-ink mb-10">
        News & Events
      </h1>

      <div className="grid sm:grid-cols-2 gap-8">
        <div className="feature-card">
          <span className="icon-badge mb-4">
            <Newspaper size={20} strokeWidth={1.75} />
          </span>
          <h2 className="font-display text-xl text-ink mb-2">News</h2>
          <p className="font-body text-sm text-ink/70">
            No news posted yet. Updates on the Centre&apos;s research and
            activities will appear here.
          </p>
        </div>
        <div className="feature-card">
          <span className="icon-badge mb-4">
            <CalendarDays size={20} strokeWidth={1.75} />
          </span>
          <h2 className="font-display text-xl text-ink mb-2">Events</h2>
          <p className="font-body text-sm text-ink/70">
            No events scheduled yet. Seminars, workshops, and field visits
            will be listed here once confirmed.
          </p>
        </div>
      </div>
    </div>
  );
}

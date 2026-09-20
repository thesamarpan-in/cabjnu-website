import { faculty } from '@/lib/content/faculty';
import { Users } from 'lucide-react';

export default function FacultyDirectory() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <p className="eyebrow mb-2">People</p>
      <h1 className="font-display text-4xl text-ink mb-10">Faculty</h1>

      {faculty.length === 0 ? (
        <div className="feature-card max-w-prose">
          <span className="icon-badge mb-4">
            <Users size={20} strokeWidth={1.75} />
          </span>
          <p className="font-body text-ink/80">
            No faculty profiles have been published yet. Entries are added to{' '}
            <code className="text-sm">lib/content/faculty.ts</code> once each
            faculty member has confirmed their own bio, research area, and
            publication links.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((person) => (
            <div key={person.slug} className="feature-card">
              <h2 className="font-display text-xl text-ink">{person.name}</h2>
              <p className="font-body text-sm text-clay mt-1">
                {person.designation}
              </p>
              <p className="font-body text-ink/80 mt-3">{person.bio}</p>
              {person.scholarUrl && (
                <a
                  href={person.scholarUrl}
                  className="font-body text-sm text-indigo hover:underline mt-3 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Scholar
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

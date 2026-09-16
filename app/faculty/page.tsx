import { faculty } from '@/lib/content/faculty';

export default function FacultyDirectory() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="specimen-index mb-3">Directory</p>
      <h1 className="font-display text-4xl text-ink mb-10">Faculty</h1>

      {faculty.length === 0 ? (
        <div className="hairline pt-8 max-w-prose">
          <p className="font-body text-ink/80">
            No faculty profiles have been published yet. Entries are added to{' '}
            <code className="text-sm">lib/content/faculty.ts</code> once each
            faculty member has confirmed their own bio, research area, and
            publication links.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
          {faculty.map((person) => (
            <div key={person.slug} className="hairline pt-6">
              <h2 className="font-display text-xl text-ink">{person.name}</h2>
              <p className="font-body text-sm text-moss mt-1">
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

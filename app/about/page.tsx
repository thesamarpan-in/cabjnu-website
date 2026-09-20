export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <p className="eyebrow mb-2">About</p>
      <h1 className="font-display text-4xl text-ink mb-8">
        Centre for Ayurveda Biology
      </h1>

      <div className="grid sm:grid-cols-[3fr_2fr] gap-8">
        <div className="feature-card max-w-prose">
          <h2 className="font-display text-xl text-ink mb-3">History</h2>
          <p className="font-body text-ink/80 mb-8">
            [ Placeholder — add the Centre&apos;s founding history, its place
            within the School of Life Sciences, and how it came to bridge
            Ayurveda and molecular biology. ]
          </p>

          <h2 className="font-display text-xl text-ink mb-3">Objectives</h2>
          <ul className="font-body text-ink/80 space-y-2 mb-8 list-none">
            <li>
              [ Placeholder objective — e.g. train interdisciplinary
              researchers across Ayurveda and molecular biology. ]
            </li>
            <li>
              [ Placeholder objective — e.g. build a verified, evidence-graded
              digital record of medicinal plant research. ]
            </li>
            <li>
              [ Placeholder objective — e.g. produce publishable research
              connecting classical and modern evidence. ]
            </li>
          </ul>

          <h2 className="font-display text-xl text-ink mb-3">
            Academic Philosophy
          </h2>
          <p className="font-body text-ink/80">
            The Centre treats Ayurvedic and biomedical frameworks as two
            evidence traditions to be studied rigorously side by side —
            neither substituting for the other, and every claim connecting
            them graded by the strength of evidence behind it.
          </p>
        </div>

        <aside className="feature-card h-fit">
          <p className="eyebrow mb-2">Note for editors</p>
          <p className="font-body text-sm text-ink/60">
            Every bracketed placeholder on this page needs real content from
            the Centre before this site goes live publicly. See{' '}
            <code className="text-xs">docs/data-entry-guide.md</code> in the
            repository for how to edit this without touching code.
          </p>
        </aside>
      </div>
    </div>
  );
}

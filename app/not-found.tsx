import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24 text-center">
      <p className="eyebrow mb-3">Not found</p>
      <h1 className="font-display text-4xl text-ink mb-4">
        This page doesn&apos;t exist.
      </h1>
      <p className="font-body text-ink/70 mb-8">
        The page you&apos;re looking for may have moved or hasn&apos;t been
        published yet.
      </p>
      <Link
        href="/"
        className="font-body text-sm bg-clay hover:bg-clay-dark text-white px-6 py-3 rounded-full transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}

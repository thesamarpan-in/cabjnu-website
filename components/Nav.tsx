import Link from 'next/link';
import { Leaf } from 'lucide-react';

const leftLinks = [
  { href: '/about', label: 'About' },
  { href: '/research-areas', label: 'Research' },
];

const rightLinksBeforeCta = [
  { href: '/atlas', label: 'Plants' },
  { href: '/faculty', label: 'People' },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-paper border-b border-line">
      <div className="max-w-6xl mx-auto px-6 py-4 grid grid-cols-2 lg:grid-cols-3 items-center">
        <nav className="hidden lg:flex gap-6">
          {leftLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-body text-[11px] uppercase tracking-widest font-bold text-ink/80 hover:text-clay transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="flex flex-col items-center">
          <Leaf size={22} strokeWidth={1.5} className="text-clay mb-1" />
          <span className="font-accent text-[13px] tracking-[0.2em] uppercase text-clay">
            CAB &middot; JNU
          </span>
        </Link>

        <div className="flex justify-end items-center gap-6">
          <nav className="hidden lg:flex gap-6">
            {rightLinksBeforeCta.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-body text-[11px] uppercase tracking-widest font-bold text-ink/80 hover:text-clay transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/atlas"
            className="font-body text-[11px] font-bold uppercase tracking-widest bg-clay hover:bg-clay-dark text-white px-5 py-2.5 rounded-sm transition-colors whitespace-nowrap"
          >
            Explore the Atlas
          </Link>
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="lg:hidden max-w-6xl mx-auto px-6 pb-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
        {[...leftLinks, ...rightLinksBeforeCta].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="font-body text-[11px] uppercase tracking-widest font-bold text-ink/80 hover:text-clay transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

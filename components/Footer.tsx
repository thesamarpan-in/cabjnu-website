import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/research-areas', label: 'Research' },
  { href: '/atlas', label: 'Plants' },
  { href: '/faculty', label: 'People' },
  { href: '/resources', label: 'Resources' },
  { href: '/news', label: 'News & Events' },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <p className="font-accent text-lg tracking-[0.2em] uppercase text-clay">
              CAB &middot; JNU
            </p>
            <p className="font-body text-xs text-white/50 mt-1">
              Centre for Ayurveda Biology, Jawaharlal Nehru University
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-body text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row justify-between gap-2 text-center sm:text-left">
          <p className="font-body text-[11px] text-white/40">
            {/* TODO: replace with the Centre's real contact email once confirmed */}
            Contact details — to be added
          </p>
          <p className="font-body text-[11px] text-white/40">
            Building a bridge between tradition and science &middot; JNU
          </p>
        </div>
      </div>
    </footer>
  );
}

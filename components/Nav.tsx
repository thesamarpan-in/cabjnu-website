import Link from 'next/link';

const links = [
  { href: '/about', label: 'About' },
  { href: '/research-areas', label: 'Research Areas' },
  { href: '/faculty', label: 'Faculty' },
];

export default function Nav() {
  return (
    <header className="border-b border-line">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-baseline justify-between">
        <Link
          href="/"
          className="font-display text-lg text-ink leading-none"
        >
          Centre for Ayurveda Biology
          <span className="block font-body text-xs text-moss mt-1 tracking-wide">
            Jawaharlal Nehru University
          </span>
        </Link>
        <nav className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-ink hover:text-moss transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

import Link from 'next/link';
import {
  Leaf, Dna, FlaskConical, Cpu, ArrowRight,
} from 'lucide-react';
import { researchAreas } from '@/lib/content/research-areas';
import { plants } from '@/lib/content/plants';
import HomeQuiz from '@/components/HomeQuiz';
import CommentsSection from '@/components/CommentsSection';

// Colored icon badges for the highlight row — matches the reference
// site's varied-color "Research Highlights" cards. Cycled across our
// real 7 research areas (only first 4 shown here; full list on
// /research-areas).
const highlightAreas = [
  { area: researchAreas[0], color: '#4A5D4F', icon: Leaf },
  { area: researchAreas[1], color: '#3A4A6B', icon: Dna },
  { area: researchAreas[2], color: '#C5A059', icon: FlaskConical },
  { area: researchAreas[6], color: '#6B4A85', icon: Cpu },
];

export default function Home() {
  return (
    <>
      {/* HERO — real JNU campus photo, dark overlay, centered text */}
      <header className="relative w-full overflow-hidden flex items-end justify-center" style={{ height: '88vh' }}>
        <img
          src="/images/campus/school-sanskrit-indic-studies.jpg"
          alt="Jawaharlal Nehru University campus"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,.25) 0%, rgba(0,0,0,.35) 55%, rgba(28,28,28,.55) 100%)',
          }}
        />
        <div className="relative z-10 text-center text-white px-4 pb-16 max-w-3xl">
          <p className="font-display italic text-lg md:text-xl mb-4 text-white/90">
            Bridging Ayurvedic Wisdom with Modern Biological Science
          </p>
          <h1 className="font-display font-light text-5xl md:text-7xl mb-6 leading-none">
            Centre for
            <br />
            Ayurveda Biology
          </h1>
          <p className="font-body text-xs md:text-sm tracking-[0.2em] uppercase text-white/70 mb-8">
            Ayurveda &middot; Plant Biology &middot; Biotechnology &middot; Research &middot; JNU
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/about" className="border border-white/60 px-6 py-3 text-[11px] uppercase tracking-widest hover:bg-white hover:text-ink transition-colors">
              About CAB-JNU
            </Link>
            <Link href="/atlas" className="border border-white/60 px-6 py-3 text-[11px] uppercase tracking-widest hover:bg-white hover:text-ink transition-colors">
              Browse Plants
            </Link>
            <a href="#quiz" className="bg-clay hover:bg-clay-dark px-6 py-3 text-[11px] uppercase tracking-widest transition-colors">
              Take the Quiz
            </a>
          </div>
        </div>
      </header>

      {/* GOLD-DIVIDER QUOTE SECTION */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="divider-gold mb-6" />
          <h2 className="font-display text-3xl md:text-4xl mb-4 text-ink">
            A Home for Ayurveda Biology
          </h2>
          <div className="ornament">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          </div>
          <p className="font-display italic text-lg md:text-xl mb-6 text-gold">
            &ldquo;Where classical Ayurvedic wisdom meets rigorous biological evidence.&rdquo;
          </p>
          <p className="font-display italic text-sm text-ink/60">
            Tradition studied rigorously. Evidence graded honestly.
            Discovery shared openly.
          </p>
        </div>
      </section>

      {/* EXPLORE BY TOPIC — plant grid */}
      <section id="atlas" className="py-16 px-6 bg-paper2">
        <div className="max-w-6xl mx-auto">
          <p className="eyebrow text-center mb-3">Explore by Topic</p>
          <h2 className="font-display text-3xl md:text-4xl text-center mb-10 text-ink">
            Everything we study, with one purpose:{' '}
            <span style={{ color: '#4A5D4F' }}>evidence-based Ayurveda.</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {plants.map((plant, i) => {
              const colors = ['#4A5D4F', '#3A4A6B', '#C5A059', '#6B4A85', '#D95D39', '#2F6B66', '#8B5E34'];
              const color = colors[i % colors.length];
              return (
                <Link key={plant.slug} href={`/atlas/${plant.slug}`} className="plant-card block">
                  {plant.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={plant.photo} alt={plant.scientificName} className="w-full h-full object-cover" />
                  ) : (
                  <div
                    className="plant-bg"
                    style={{ background: `linear-gradient(135deg, ${color}18, ${color}38)` }}
                  >
                    <Leaf size={40} strokeWidth={1.25} color={color} />
                  </div>
                  )}
                  <div className="plant-overlay">
                    <p className="plant-name">{plant.commonName}</p>
                    <p className="plant-sci">{plant.family}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* RESEARCH HIGHLIGHTS — colored icon-badge cards */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_2fr] gap-8 items-start">
          <div>
            <p className="eyebrow mb-2">Research Areas</p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight text-ink">
              Tradition. Biology.
              <br />
              Discovery.
            </h2>
            <p className="font-body text-sm mt-3 text-ink/60">
              Bridging classical Ayurvedic concepts with modern biological
              methods across {researchAreas.length} research areas.
            </p>
            <Link
              href="/research-areas"
              className="font-body text-xs font-bold uppercase tracking-widest text-clay inline-flex items-center gap-1 mt-4"
            >
              View all areas <ArrowRight size={13} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {highlightAreas.map(({ area, color, icon: Icon }) => (
              <div key={area.slug} className="highlight-card">
                <div className="highlight-icon" style={{ backgroundColor: `${color}1a`, color }}>
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-lg mb-1 text-ink">{area.name}</h3>
                <p className="font-body text-xs mb-3 text-ink/60">{area.description}</p>
                <Link
                  href="/research-areas"
                  className="font-body text-xs font-bold uppercase tracking-widest"
                  style={{ color }}
                >
                  View All &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUIZ */}
      <section id="quiz" className="py-20 px-6 bg-paper2">
        <div className="max-w-md mx-auto text-center">
          <p className="eyebrow mb-2">Test Yourself</p>
          <h2 className="font-display text-3xl mb-6 text-ink">Quick Quiz</h2>
          <HomeQuiz />
        </div>
      </section>

      {/* COMMENTS */}
      <section className="py-20 px-6 bg-paper2">
        <div className="max-w-2xl mx-auto text-center">
          <p className="eyebrow mb-2">Your Voice</p>
          <h2 className="font-display text-3xl mb-8 text-ink">Comments &amp; Feedback</h2>
          <div className="text-left">
            <CommentsSection />
          </div>
        </div>
      </section>
    </>
  );
}

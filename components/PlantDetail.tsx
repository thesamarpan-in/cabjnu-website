'use client';

import { useState } from 'react';
import type { Plant } from '@/lib/content/plants';

type Lang = 'en' | 'hi' | 'sa';

const langLabels: Record<Lang, string> = {
  en: 'English',
  hi: 'हिंदी',
  sa: 'संस्कृतम्',
};

export default function PlantDetail({ plant }: { plant: Plant }) {
  const [lang, setLang] = useState<Lang>('en');
  const [imgError, setImgError] = useState(false);

  return (
    <>
      {/* Photo — shows a clean placeholder until a real photo is provided.
          Never a stock/AI image on an official record of a specific
          campus specimen. */}
      <div className="hairline mt-8 pt-6">
        {plant.photo && !imgError ? (
          <img
            src={plant.photo}
            alt={`${plant.scientificName} at ${plant.location}`}
            className="w-full max-w-md h-auto border border-line"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full max-w-md aspect-[4/3] border border-line flex items-center justify-center bg-ink/[0.03]">
            <p className="font-body text-sm text-ink/40 text-center px-6">
              Photo not yet added.
              <br />
              Add one at /public/images/plants/{plant.slug}.jpg
            </p>
          </div>
        )}
      </div>

      {/* Language toggle */}
      <div className="flex gap-1 mt-8">
        {(Object.keys(langLabels) as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`font-body text-sm px-3 py-1.5 border transition-colors ${
              lang === l
                ? 'bg-moss text-paper border-moss'
                : 'border-line text-ink/70 hover:border-moss'
            }`}
          >
            {langLabels[l]}
          </button>
        ))}
      </div>

      <div className="hairline mt-4 pt-6 grid sm:grid-cols-[8rem_1fr] gap-y-4 gap-x-4">
        <p className="specimen-index">Location</p>
        <p className="font-body text-ink/80">{plant.location}</p>

        <p className="specimen-index">Traditional use</p>
        <p
          className="font-body text-ink/80"
          lang={lang}
        >
          {plant.traditionalUse[lang]}
        </p>
      </div>

      {(lang === 'hi' || lang === 'sa') && (
        <p className="font-body text-xs text-clay mt-3">
          {lang === 'sa'
            ? 'This Sanskrit translation is AI-drafted and has not yet been reviewed for accuracy — several modern biomedical terms have no classical equivalent.'
            : 'This Hindi translation is AI-drafted and has not yet been reviewed by a native/expert speaker.'}
        </p>
      )}
    </>
  );
}

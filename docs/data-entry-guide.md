# Adding or editing content — no coding experience needed

This guide is for faculty and students adding real content to the site.
You do not need to understand Next.js or React to make these edits — you
are only ever editing plain lists of information inside two files.

## Adding a faculty profile

1. Open `lib/content/faculty.ts` on GitHub (click the file, then the pencil
   icon to edit).
2. Copy this block and paste it inside the square brackets, after any
   existing entries:

   ```
   {
     slug: 'your-name-here',
     name: 'Dr. Your Name',
     designation: 'Associate Professor',
     researchArea: 'molecular-ayurveda',
     bio: 'One or two sentences, written or approved by you.',
     scholarUrl: 'https://scholar.google.com/citations?user=...',
   },
   ```

3. Fill in your own details. `researchArea` must match one of the slugs in
   `lib/content/research-areas.ts` (e.g. `medicinal-plant-biology`,
   `molecular-ayurveda`, `natural-product-discovery`,
   `ayurveda-microbiology`, `yoga-neuroscience`, `integrative-medicine`,
   `computational-ayurveda`).
4. Commit the change with a message like "Add [Your Name] to faculty
   directory." The site rebuilds and deploys automatically within a few
   minutes.

**Important:** only add your own entry, or an entry you have that
person's explicit permission to publish. Do not add placeholder or
invented names — see the comment at the top of `faculty.ts`.

## Editing research area descriptions

Open `lib/content/research-areas.ts` and edit the `description` field for
the relevant area. Do not change the `slug` value unless you also update
every faculty entry that references it.

## Editing About page text

Open `app/about/page.tsx`. Every `[ Placeholder — ... ]` block is text
that should be replaced with real content. Leave the surrounding code
(anything starting with `<` or `{`) untouched — only change the plain
English text between the tags.

## Adding a medicinal plant

Plants currently live in `lib/content/plants.ts` (a plain data file, not
a live database yet — this keeps the Atlas fast and reliable before
Ayurveda Day). To add one, open that file on GitHub and copy this block
inside the square brackets:

```
{
  slug: 'plant-scientific-name',
  commonName: 'Common Name',
  scientificName: 'Genus species',
  family: 'Family name',
  location: 'Real location on JNU campus',
  traditionalUse: {
    en: 'English description, hedged as "traditionally used for..." — never a flat cure claim.',
    hi: 'Hindi translation.',
    sa: 'Sanskrit translation — mark as unreviewed if you are not confident in it.',
  },
},
```

Two options for translating `hi`/`sa`:
- Ask Claude to draft them (as done for the first 10 plants) — but treat
  the Sanskrit especially as a first draft needing review, since modern
  biomedical terms (blood sugar, cholesterol, antioxidant) have no
  classical equivalent.
- Write them yourself if you're confident in the terminology.

**Adding a photo:** put a real photo of the actual specimen at
`public/images/plants/<slug>.jpg` (matching the plant's `slug` exactly)
and add `photo: '/images/plants/<slug>.jpg'` to its entry. Until a real
photo exists, leave `photo` unset — the page shows a clean "photo not
yet added" placeholder rather than a stock or AI-generated image, since
this is meant to be a record of the actual campus specimen.

**QR codes are automatic** — the build script
(`scripts/generate-qr.js`) reads plant slugs and generates a QR PNG for
every plant at build time. When you add a plant to `plants.ts`, also
add its `slug` to the `slugs` array at the top of
`scripts/generate-qr.js` (the script can't read the `.ts` file
directly) — then commit and push; the next deploy generates its QR
automatically.

Every phytochemical, molecular target, or disease claim beyond
traditional/folk use should ideally trace to a row in `research_papers`
(with a real DOI or PubMed ID) in Supabase, once that's populated —
not typed in as free text with no source.

**If you'd rather not edit files yourself:** send the plant's name,
family, campus location, and traditional-use description in a message,
and it can be added and a ready-to-push update prepared for you instead.

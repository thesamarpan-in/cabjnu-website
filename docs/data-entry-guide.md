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

Plants live in Supabase, not in these content files, since the atlas
needs to support search, GPS coordinates, and QR codes. See
`supabase/migrations/0001_init.sql` for the table structure. Until an
admin data-entry form exists (a later phase), add plants directly via
the Supabase dashboard's Table Editor:

1. Log in to the project's Supabase dashboard.
2. Table Editor -> `plants` -> Insert row.
3. Fill in the fields you have verified information for; leave the rest
   blank rather than guessing.
4. Leave `published` unchecked until a faculty member has verified the
   entry — unpublished rows aren't shown on the public site but are
   visible to anyone with a researcher/faculty/admin account.

Every phytochemical, molecular target, or disease claim should ideally
trace to a row in `research_papers` (with a real DOI or PubMed ID) linked
through `paper_evidence` — not typed in as free text with no source.

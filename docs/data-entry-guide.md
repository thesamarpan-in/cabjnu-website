# Adding or editing content — no coding experience needed

This guide is for students adding real content to the site. You do not
need to understand Next.js or React to make these edits — you are only
ever editing plain lists of information inside a few files.

## Editing research area descriptions

Open `lib/content/research-areas.ts` and edit the `description` field for
the relevant area.

## Editing About page text

Open `app/about/page.tsx`. Every `[ Placeholder — ... ]` block is text
that should be replaced with real content. Leave the surrounding code
(anything starting with `<` or `{`) untouched — only change the plain
English text between the tags.

## Adding a medicinal plant (via Google Sheet — no code needed)

Plant data now lives in a Google Sheet that anyone the Centre trusts can
edit, with no GitHub or coding knowledge required.

### One-time setup (do this once)

1. Create a Google Sheet. Import `data-templates/plants-template.csv`
   (File -> Import -> Upload) to start with the current 10 plants
   already filled in as a reference.
2. Columns, left to right: `slug`, `commonName`, `scientificName`,
   `family`, `location`, `photo`, `traditionalUseEn`,
   `traditionalUseHi`, `traditionalUseSa`.
   - `slug` can be left blank for new rows — it auto-generates from
     `scientificName` (e.g. "Ocimum sanctum" -> `ocimum-sanctum`).
   - `photo` stays blank until a real photo exists at
     `public/images/plants/<slug>.jpg` in the repo.
   - `traditionalUseHi`/`traditionalUseSa` can be left blank if no
     translation is ready yet — ask Claude to draft them, but treat
     Sanskrit especially as unreviewed until checked.
3. File -> Share -> Publish to web -> select the sheet -> format
   **Comma-separated values (.csv)** -> Publish. Copy the URL it gives
   you.
4. In the GitHub repo: Settings -> Secrets and variables -> Actions ->
   New repository secret -> name it `PLANTS_SHEET_CSV_URL`, paste the
   URL.
5. Also add it to your own `.env.local` (see `.env.example`) if you
   want to test sheet changes locally before they go live.

### Adding or editing a plant (the normal, ongoing workflow)

1. Open the Google Sheet, add a new row or edit an existing one.
2. That's it — no commit, no push. The site rebuilds automatically once
   a day (see `.github/workflows/deploy.yml`'s schedule) and picks up
   whatever is in the sheet at that time.
3. Want it live sooner? In the GitHub repo's **Actions** tab, open
   "Deploy to GitHub Pages" and click **Run workflow** to trigger an
   immediate rebuild.

### Safety net

`scripts/sync-plants.js` never lets a sheet mistake take the whole site
down: a blank required field skips just that row (logged in the Actions
build log), and if the sheet is unreachable or empty entirely, the
previous good data in `data/plants.json` is kept unchanged instead of
wiping the Atlas. Check the Actions log after adding a plant if it
doesn't show up — it'll say exactly which row/field was the problem.

**Important:** only add real, verified information. Every phytochemical,
molecular target, or disease claim beyond traditional/folk use should
ideally trace to a row in `research_papers` (with a real DOI or PubMed
ID) in Supabase, once that's populated — not typed into the sheet as
free text with no source.

### Fallback: editing data/plants.json directly

If the sheet isn't set up yet, `data/plants.json` can still be edited
directly on GitHub (same shape as the CSV columns, just as JSON). This
is what `sync-plants.js` overwrites once the sheet is live, so treat it
as temporary until the sheet takes over.

**If you'd rather not touch any of this yourself:** send the plant's
name, family, campus location, and traditional-use description in a
message, and it can be added to the sheet (or `plants.json`) for you.

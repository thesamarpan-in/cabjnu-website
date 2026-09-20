// Pulls plant data from the Centre's Google Sheet (published as CSV) and
// regenerates data/plants.json — the real source of truth for the Atlas.
//
// This is deliberately fail-safe: if PLANTS_SHEET_CSV_URL isn't set yet,
// or the fetch fails for any reason (network hiccup, sheet unpublished,
// bad URL), this script logs why and exits WITHOUT touching
// data/plants.json — the site keeps building from whatever data was
// there before. A broken sync should never take the whole site down.
//
// Setup (see docs/data-entry-guide.md for the full walkthrough):
// 1. Create a Google Sheet with columns matching the header row in
//    data-templates/plants-template.csv.
// 2. File -> Share -> Publish to web -> select the sheet -> CSV -> Publish.
// 3. Copy the published URL into the PLANTS_SHEET_CSV_URL secret
//    (GitHub repo Settings -> Secrets -> Actions) and into .env.local
//    for local testing.
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const SHEET_URL = process.env.PLANTS_SHEET_CSV_URL;
const DATA_PATH = path.join(__dirname, '..', 'data', 'plants.json');

const REQUIRED_FIELDS = [
  'slug',
  'commonName',
  'scientificName',
  'family',
  'location',
  'traditionalUseEn',
];

function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  if (!SHEET_URL) {
    console.log(
      'PLANTS_SHEET_CSV_URL not set — skipping sheet sync, using existing data/plants.json as-is.'
    );
    return;
  }

  let csvText;
  try {
    const res = await fetch(SHEET_URL);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    csvText = await res.text();
  } catch (err) {
    console.error(
      `Could not fetch the plants sheet (${err.message}) — keeping existing data/plants.json unchanged. Check PLANTS_SHEET_CSV_URL is still published and correct.`
    );
    return;
  }

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  if (parsed.errors.length > 0) {
    console.error(
      'CSV parsing had errors, keeping existing data/plants.json unchanged:',
      parsed.errors
    );
    return;
  }

  const plants = [];
  const seenSlugs = new Set();

  for (const [i, row] of parsed.data.entries()) {
    const rowNum = i + 2; // +2: header row + 1-indexed

    // Auto-generate slug from scientific name if the sheet left it blank.
    if (!row.slug && row.scientificName) {
      row.slug = slugify(row.scientificName);
    }

    const missing = REQUIRED_FIELDS.filter((f) => !row[f] || !row[f].trim());
    if (missing.length > 0) {
      console.warn(
        `Row ${rowNum}: skipping — missing required field(s): ${missing.join(', ')}`
      );
      continue;
    }

    if (seenSlugs.has(row.slug)) {
      console.warn(`Row ${rowNum}: skipping — duplicate slug "${row.slug}"`);
      continue;
    }
    seenSlugs.add(row.slug);

    plants.push({
      slug: row.slug.trim(),
      commonName: row.commonName.trim(),
      scientificName: row.scientificName.trim(),
      family: row.family.trim(),
      location: row.location.trim(),
      photo: (row.photo || '').trim(),
      traditionalUseEn: row.traditionalUseEn.trim(),
      traditionalUseHi: (row.traditionalUseHi || '').trim(),
      traditionalUseSa: (row.traditionalUseSa || '').trim(),
    });
  }

  if (plants.length === 0) {
    console.error(
      'Sheet sync produced zero valid plants — keeping existing data/plants.json unchanged (this is almost certainly a sheet formatting problem, not an empty Atlas).'
    );
    return;
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(plants, null, 2) + '\n', 'utf-8');
  console.log(`Synced ${plants.length} plants from sheet -> data/plants.json`);
}

main().catch((err) => {
  console.error('Unexpected error during sheet sync:', err);
  // Non-fatal: never break the build over a sync issue.
  process.exit(0);
});

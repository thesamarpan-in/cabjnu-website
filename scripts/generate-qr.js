// Generates one QR PNG per plant, pointing at its live Atlas page.
// Runs at build time (see package.json) since GitHub Pages has no
// server to generate these on demand.
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

// Must match public/CNAME.
const SITE_URL = 'https://ayurveda.thesamarpan.co.in';

// Importing the .ts content file directly from a plain Node script isn't
// straightforward without a TS loader, so this script re-reads the same
// slugs from a tiny JSON mirror kept in sync with lib/content/plants.ts.
// If you add a plant, add its slug here too.
const slugs = [
  'opuntia-ficus-indica',
  'justicia-adhatoda',
  'costus-igneus',
  'coleus-scutellarioides',
  'citrus-limon',
  'moringa-oleifera',
  'hamelia-patens',
  'cassia-fistula',
  'dianthus-praecox',
  'canna-indica',
];

async function main() {
  const outDir = path.join(__dirname, '..', 'public', 'qr');
  fs.mkdirSync(outDir, { recursive: true });

  for (const slug of slugs) {
    const url = `${SITE_URL}/atlas/${slug}`;
    const outPath = path.join(outDir, `${slug}.png`);
    await QRCode.toFile(outPath, url, {
      width: 512,
      margin: 2,
      color: { dark: '#1E2A22', light: '#F1EEE2' },
    });
    console.log(`QR generated: ${slug}.png -> ${url}`);
  }
}

main().catch((err) => {
  console.error('QR generation failed:', err);
  process.exit(1);
});

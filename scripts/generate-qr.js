// Generates one QR PNG per plant, pointing at its live Atlas page.
// Runs at build time (see package.json) since GitHub Pages has no
// server to generate these on demand.
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

// Must match public/CNAME.
const SITE_URL = 'https://ayurveda.thesamarpan.co.in';

async function main() {
  const dataPath = path.join(__dirname, '..', 'data', 'plants.json');
  const plants = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const outDir = path.join(__dirname, '..', 'public', 'qr');
  fs.mkdirSync(outDir, { recursive: true });

  for (const plant of plants) {
    const url = `${SITE_URL}/atlas/${plant.slug}`;
    const outPath = path.join(outDir, `${plant.slug}.png`);
    await QRCode.toFile(outPath, url, {
      width: 512,
      margin: 2,
      color: { dark: '#122A1E', light: '#FAF7F1' },
    });
    console.log(`QR generated: ${plant.slug}.png -> ${url}`);
  }
}

main().catch((err) => {
  console.error('QR generation failed:', err);
  process.exit(1);
});

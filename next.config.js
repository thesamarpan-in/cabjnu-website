/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages serves static files only — no Node runtime, no server
  // components with server actions. This forces a fully static build.
  output: 'export',

  // next/image's optimizer needs a server; GitHub Pages can't run one.
  images: {
    unoptimized: true,
  },

  // Not using a custom domain path prefix since ayurveda.thesamarpan.co.in
  // is the site root (see public/CNAME) — leave basePath/assetPrefix empty.
};

module.exports = nextConfig;

import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Matches Samarpan's actual production palette exactly (from
        // their live index.html :root CSS variables) — light cream,
        // near-black text, clay orange + gold accents. No green.
        ink: '#1C1C1C',
        paper: '#FDFBF7',
        paper2: '#F9F7F4',
        line: '#e8e4de',
        textMuted: '#666666',
        clay: {
          DEFAULT: '#D95D39',
          dark: '#B84A2C',
        },
        gold: {
          DEFAULT: '#C5A059',
        },
        blush: '#F6ECE4', // soft warm tint for icon badges / quote blocks
        // Kept for the evidence-status tag system (Ayurvedic-property vs
        // molecular-target claims still need two distinguishable accents
        // beyond clay/gold) — a neutral slate, used sparingly, not as a
        // structural color.
        slate: {
          DEFAULT: '#5B6068',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        accent: ['var(--font-marcellus)', 'Georgia', 'serif'],
        body: ['var(--font-lato)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '42rem',
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1C1C1C',
        paper: '#FAF7F1',
        moss: {
          DEFAULT: '#8A9A7E',
          dark: '#6E7D64',
        },
        clay: {
          DEFAULT: '#D95D39',
        },
        indigo: {
          DEFAULT: '#3A4A52',
        },
        gold: {
          DEFAULT: '#C9A227',
        },
        line: '#D9D2C4',
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

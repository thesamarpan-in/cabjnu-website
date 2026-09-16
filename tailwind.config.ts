import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1E2A22',
        paper: '#F1EEE2',
        moss: {
          DEFAULT: '#48604C',
          dark: '#34452F',
        },
        clay: {
          DEFAULT: '#A15A32',
        },
        indigo: {
          DEFAULT: '#33415A',
        },
        line: '#C9C2AC',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '42rem',
      },
    },
  },
  plugins: [],
};

export default config;

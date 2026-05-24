import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#ff1f71',
        'soft-pink': '#ffb3cc',
        'deep-bg': '#070011',
      },
      fontFamily: {
        syne: ["'Syne'", 'sans-serif'],
        dm: ["'DM Sans'", 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

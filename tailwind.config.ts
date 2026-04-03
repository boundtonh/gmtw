import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'gmt-green':    '#009440',
        'gmt-cream':    '#F7F5F0',
        'gmt-offwhite': '#FAFAF7',
        'gmt-mist':     '#EFF5EC',
        'gmt-sage':     '#C8DFC0',
        'gmt-forest':   '#1A3D21',
        'gmt-charcoal': '#111714',
        'gmt-stone':    '#6B7066',
      },
      fontFamily: {
        display: ['ivypresto-display', 'Georgia', 'serif'],
        body:    ['alwyn-new-rounded-web', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./GauntletPresentation.jsx",
  ],
  safelist: [
    'bg-gauntlet',
    'text-gauntlet',
    'border-gauntlet',
    'bg-gauntlet/10',
    'bg-gauntlet/20',
    'bg-gauntlet/30',
    'text-gauntlet-300',
    'bg-gauntlet-300/10',
    'border-gauntlet/20',
    'border-gauntlet/30',
    'border-gauntlet-300/20',
    'border-gauntlet-300/30',
    'shadow-gauntlet/25',
    'shadow-gauntlet/30',
    'from-gauntlet',
    'to-gauntlet',
    'via-gauntlet-300',
    'from-gauntlet-300',
    'to-gauntlet-600',
    'from-gauntlet-600',
    'from-gauntlet/10',
    'to-gauntlet/0',
    'from-gauntlet-300/10',
    'to-gauntlet-300/10',
  ],
  theme: {
    extend: {
      colors: {
        gauntlet: {
          DEFAULT: '#7180F5',
          50: '#E3E6FD',
          100: '#C6CCFB',
          200: '#AAB3F9',
          300: '#8D99F7',
          400: '#7180F5',
          500: '#5A66C4',
          600: '#444D93',
          700: '#2D3362',
          800: '#1a1f3d',
          900: '#0d0f1f',
        }
      }
    },
  },
  plugins: [],
}


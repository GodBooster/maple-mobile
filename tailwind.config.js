/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./MaplePresentation.jsx",
  ],
  safelist: [
    'bg-maple',
    'text-maple',
    'border-maple',
    'bg-maple/10',
    'bg-maple/20',
    'bg-maple/30',
    'text-maple-300',
    'bg-maple-300/10',
    'border-maple/20',
    'border-maple/30',
    'border-maple-300/20',
    'border-maple-300/30',
    'shadow-maple/25',
    'shadow-maple/30',
    'from-maple',
    'to-maple',
    'via-maple-300',
    'from-maple-300',
    'to-maple-600',
    'from-maple-600',
    'from-maple/10',
    'to-maple/0',
    'from-maple-300/10',
    'to-maple-300/10',
  ],
  theme: {
    extend: {
      colors: {
        maple: {
          DEFAULT: '#0E121B', // Основной темный цвет
          accent: '#FC784A', // Оранжевый акцент
          bg: '#F5F7FA', // Основной фон
          'bg-alt': '#F2F7FC', // Альтернативный фон
          'bg-dark': '#0E121B', // Темный фон
          text: 'rgba(0, 0, 0, 0.9)', // Основной текст (контраст на светлом фоне)
          'text-secondary': '#3D4451', // Вторичный текст (достаточный контраст)
          'text-muted': '#5C6472', // Приглушенный текст (не слишком светлый на светлом фоне)
          structure: '#DEE8F0', // Границы и разделители
          icon: '#566074', // Иконки
          // Legacy support
          50: '#F5F7FA',
          100: '#F5F7FA',
          200: '#F2F7FC',
          300: '#DEE8F0',
          400: '#99A0AE',
          500: '#525866',
          600: '#0E121B',
          700: '#0E121B',
          800: '#0E121B',
          900: '#0E121B',
          dark: '#0E121B',
        }
      }
    },
  },
  plugins: [],
}


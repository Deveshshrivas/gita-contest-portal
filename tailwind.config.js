/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vedic: {
          dark: '#032e29',
          primary: '#044e45',
          teal: '#08695d',
          accent: '#0b8677',
          light: '#e6f4f2',
          gold: '#f59e0b',
          goldDark: '#d97706',
          saffron: '#ff7700',
          saffronDark: '#ea580c',
          cream: '#faf8f5',
          creamDark: '#f3ece2',
          maroon: '#881337',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
        devanagari: ['"Noto Serif Devanagari"', 'serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'card': '0 10px 25px -5px rgba(4, 78, 69, 0.06), 0 8px 10px -6px rgba(4, 78, 69, 0.04)',
        'elevated': '0 20px 30px -10px rgba(4, 78, 69, 0.12), 0 10px 15px -5px rgba(4, 78, 69, 0.06)',
      }
    },
  },
  plugins: [],
}

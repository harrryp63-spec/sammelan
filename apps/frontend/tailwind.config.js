/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff7ed',
          500: '#f97316',
          700: '#c2410c'
        }
      }
    }
  },
  plugins: []
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2f7ff',
          100: '#e6efff',
          200: '#bfd5ff',
          300: '#99bbff',
          400: '#4d88ff',
          500: '#0055ff',
          600: '#004dde',
          700: '#0042b9',
          800: '#003494',
          900: '#002a78'
        },
        accent: '#00c897',
        slate: {
          950: '#0f172a'
        }
      },
      boxShadow: {
        card: '0 10px 30px -20px rgba(15, 23, 42, 0.35)'
      }
    }
  },
  plugins: []
};

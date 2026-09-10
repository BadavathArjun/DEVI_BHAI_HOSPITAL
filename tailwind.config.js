/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f5fa',
          100: '#e1ecf5',
          200: '#c4d9ec',
          300: '#97bfdf',
          400: '#649ecd',
          500: '#4082b9',
          600: '#2d679b',
          700: '#25537d',
          800: '#1e4365',
          900: '#0a2540', // Primary Medical Navy
          950: '#061729',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488', // Secondary Clinical Teal
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        emergency: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          500: '#ef4444',
          600: '#dc2626', // Professional Medical Red
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'medical': '0 4px 20px -2px rgba(10, 37, 64, 0.06), 0 2px 6px -1px rgba(10, 37, 64, 0.04)',
        'medical-hover': '0 12px 30px -4px rgba(10, 37, 64, 0.12), 0 4px 10px -2px rgba(10, 37, 64, 0.06)',
        'emergency': '0 4px 20px -2px rgba(220, 38, 38, 0.25)',
      }
    },
  },
  plugins: [],
}

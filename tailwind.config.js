/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ordo-green': {
          900: '#1B4D3E',
          700: '#2D6B5A',
          600: '#3D8B6F',
          500: '#4DA87F',
          400: '#5DC591',
          300: '#7DD4A8',
          100: '#E8F5F2',
          50: '#F3F9F7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      lineHeight: {
        tight: '1.2',
        snug: '1.3',
        normal: '1.4',
        relaxed: '1.6',
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-out',
        'slideUp': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

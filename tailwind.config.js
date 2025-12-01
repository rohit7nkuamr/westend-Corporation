/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF9F0',
          100: '#FFF3E0',
          200: '#FFE4C2',
          300: '#FFD5A3',
          400: '#EBB976',
          500: '#D4A574', // Logo gold
          600: '#B8905F',
          700: '#9C7A4A',
          800: '#806535',
          900: '#644F20',
        },
        accent: {
          50: '#FEF3E8',
          100: '#FCE7D1',
          200: '#F9CFA3',
          300: '#F5B675',
          400: '#F29E47',
          500: '#E67E22', // Logo orange
          600: '#CF6D1A',
          700: '#A05716',
          800: '#704112',
          900: '#402B0E',
        },
        forest: {
          50: '#F2F7EF',
          100: '#E5EFDE',
          200: '#CBDFBD',
          300: '#B1CF9C',
          400: '#97BF7B',
          500: '#2D5016', // Logo dark green
          600: '#244012',
          700: '#1A300E',
          800: '#112009',
          900: '#081005',
        },
        cream: {
          50: '#FEFDFB',
          100: '#FDFAF7',
          200: '#F5EFE7', // Base cream
          300: '#EDE4D7',
          400: '#E5D9C7',
          500: '#DDCEB7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

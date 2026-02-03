/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#0A0A0A',
        'dark-gray': '#1A1A1A',
        gray: {
          DEFAULT: '#2A2A2A',
          light: '#A0A0A0',
        },
        primary: {
          DEFAULT: '#E8D5C4',  // Beige sofisticado
          dark: '#C9B7A8',
          light: '#F5EDE5',
        },
        accent: {
          DEFAULT: '#8B7355',  // Marrón tierra
          dark: '#6B5544',
          light: '#A89078',
        },
        success: '#7FA98F',
        danger: '#C17167',
        warning: '#D4A574',
        info: '#7C9AAD',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

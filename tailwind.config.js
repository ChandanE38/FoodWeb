/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e74c3c',
          dark: '#c0392b',
        },
        text: {
          DEFAULT: '#2c3e50',
          light: '#666',
        },
        bg: {
          DEFAULT: '#fff',
          secondary: '#f8f9fa',
        },
        border: {
          DEFAULT: '#eee',
        },
        card: {
          DEFAULT: '#fff',
        },
        header: {
          DEFAULT: '#fff',
        },
        footer: {
          bg: '#2c3e50',
          text: '#ecf0f1',
        },
        nav: {
          link: '#2c3e50',
          hover: '#e74c3c',
          active: '#e74c3c',
        }
      },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        }
      },
      animationDelay: {
        '2000': '2s',
        '4000': '4s',
      }
    },
  },
  plugins: [],
  darkMode: ['class', '[data-theme="dark"]'],
}

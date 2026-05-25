/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B4A',
        secondary: '#C1121F',
        accent: '#FFB703',
        dark: '#1A1A1A',
        light: '#FFFAF0',
        warm: '#E07A5F',
        burnt: '#8B4513',
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem',
      },
      fontFamily: {
        sans: 'system-ui, -apple-system, sans-serif',
        brutal: 'Georgia, serif',
      },
      borderWidth: {
        8: '8px',
        12: '12px',
        16: '16px',
      },
      spacing: {
        14: '3.5rem',
        18: '4.5rem',
        24: '6rem',
      },
      animation: {
        'bounce-brutal': 'bounceBrutal 0.6s ease-in-out',
        'pulse-brutal': 'pulseBrutal 2s cubic-bezier(0.4, 0, 0.6, 1)',
      },
      keyframes: {
        bounceBrutal: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseBrutal: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};

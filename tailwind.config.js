/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'crt-flicker': 'crtFlicker 4s ease-in-out infinite',
      },
      keyframes: {
        crtFlicker: {
          '0%, 100%': { opacity: '0.005' },
          '50%': { opacity: '0.015' },
        },
      },
    },
  },
  plugins: [],
}

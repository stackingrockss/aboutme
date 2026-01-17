/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'subtle-pulse': 'subtlePulse 4s ease-in-out infinite',
      },
      keyframes: {
        subtlePulse: {
          '0%, 100%': { opacity: '0.01' },
          '50%': { opacity: '0.03' },
        },
      },
    },
  },
  plugins: [],
}

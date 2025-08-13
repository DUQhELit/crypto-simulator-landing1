/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,md,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './content/learn/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00A3FF',
        dark: '#0A192F',
        accent: '#01BFA6'
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
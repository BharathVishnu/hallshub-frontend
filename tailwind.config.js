/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      linearGradientColors: {
        'mainbg': ['#5268DA', '#495CC3'],
      },
    },
  },
  plugins: [
    require('tailwindcss-font-inter')(),
  ],
}

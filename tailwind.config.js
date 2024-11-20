/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'kanit':  ['Kanit', 'sans-serif'],
        'junge':  ['Junge', 'sans-serif'],
    },
    colors: {
      '2E6F40': '#2E6F40',
      '0C4F1E': '#0C4F1E'
    }
  },
  plugins: [],
}
}


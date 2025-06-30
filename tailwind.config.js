/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,html}", // Adjusted to include html for Lit templates
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

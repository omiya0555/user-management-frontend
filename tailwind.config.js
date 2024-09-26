/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // これにより、VueファイルにTailwindが適用される
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
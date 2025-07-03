/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // if using Next.js app router
    "./pages/**/*.{js,ts,jsx,tsx}",     // if you have a pages folder
    "./components/**/*.{js,ts,jsx,tsx}",// your React components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

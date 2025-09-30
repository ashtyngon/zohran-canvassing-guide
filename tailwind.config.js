/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zohran-blue': '#2619d1',
        'zohran-orange': '#f89206',
        'zohran-red': '#ea2f15',
      },
      fontFamily: {
        'sans': ['Gotham', 'Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
        'headline': ['Gotham', 'Montserrat', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

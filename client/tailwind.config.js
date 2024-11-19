/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "purple-600": "#5046e4",
        "purple-400": "#b9bbf2",
        "white-500": "#f9fafb",
        "grey-200": "#e9ebee",
      },
    },
  },
  plugins: [],
};

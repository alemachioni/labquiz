/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: {
          primary: "#c6273f",
          dark: "#910101",
          bg: "#f0ecec",
        },
        green: {
          correct: "#0e9c0e",
        },
      },
      fontFamily: {
        gugi: ["'Gugi'", "sans-serif"],
      },
    },
  },
  plugins: [],
}


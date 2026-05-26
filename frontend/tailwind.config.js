/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: {
          primary: "#c6273f",
          dark:    "#910101",
          bg:      "#f0ecec",
          answer:         "#e8e1e1",
          "answer-hover": "#d6cccc",
          "answer-wrong": "#d9374f",
          "answer-dim":   "#ccc6c6",
        },
        green: {
          correct:      "#0e9c0e",
          "correct-bg": "#94e494",
        },
      },
      fontFamily: {
        gugi: ["'Gugi'", "sans-serif"],
      },
      minHeight: {
        dvh: "100dvh",
      },
      height: {
        dvh: "100dvh",
      },
    },
  },
  plugins: [],
}

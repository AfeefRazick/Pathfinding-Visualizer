/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        visited: {
          "0%": {
            transform: "scale(0.3)",
            backgroundColor: "rgba(0, 0, 66, 0.75)",
            borderRadius: "100%",
          },
          "50%": {
            backgroundColor: "rgba(17, 104, 217, 0.75)",
          },
          "75%": {
            transform: "scale(1.2)",
            backgroundColor: "rgba(0, 217, 159, 0.75)",
          },
          "100%": {
            transform: "scale(1)",
            backgroundColor: "#00beda",
          },
        },
        shortestpath: {
          "0%": {
            transform: "scale(0.3)",
            backgroundColor: "#a2f294",
            borderRadius: "100%",
          },
          "50%": {
            backgroundColor: "#6bf553",
          },
          "75%": {
            transform: "scale(1.2)",
            backgroundColor: "#208a0e",
          },
          "100%": {
            transform: "scale(1)",
            backgroundColor: "#39fc17",
          },
        },
      },
    },
  },
  plugins: [],
};

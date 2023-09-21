/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        visited: {
          "0%": {
            transform: "scale(0.3)",
            backgroundColor: "rgba(0, 120, 255, 0.5)",
            borderRadius: "100%",
          },
          "50%": {
            backgroundColor: "rgba(0, 120, 255, 0.8)",
          },
          "75%": {
            transform: "scale(1.2)",
            backgroundColor: "rgba(0, 120, 255, 1)",
          },
          "100%": {
            transform: "scale(1)",
            backgroundColor: "rgba(0, 190, 218, 1)",
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

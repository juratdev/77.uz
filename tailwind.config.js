/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#16191D",
        secondary: "#8E9297",
        secondaryGray: "#EAEDF0",
        blue: "#388FF3",
      },
      boxShadow: {
        "3xl": "0 12px 36px #0e11161a",
        "3.5xl": "0px 4px 16px 0px rgba(23, 24, 26, 0.02)",
        "3.6xl": "0 2px 28px #17181a33",
      },
    },
  },
  plugins: [],
};

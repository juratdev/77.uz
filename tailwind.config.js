/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBg: "#F0F3F7",
        dark: "#16191D",
        blue: "#388FF3",
        secondary: "#8E9297",
        secondaryGray: "#EAEDF0",
        "gray-1": "#63676c",
        "gray-2": "#f0f3f7",
        "gray-3": "#D6D6D6",
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

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#388FF3",
      },
      boxShadow: {
        "3xl": "0 12px 36px #0e11161a",
      },
    },
  },
  plugins: [],
};

import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        background: {
          100: "#fefefe",
          200: "#fdfdfc",
          300: "#fdfdfb",
          400: "#fcfcf9",
          500: "#fbfbf8",
          600: "#c9c9c6",
          700: "#979795",
          800: "#646463",
          900: "#323232",
        },
        primary: {
          100: "#ffffcc",
          200: "#ffff99",
          300: "#ffff66",
          400: "#ffff33",
          500: "#ffff00",
          600: "#cccc00",
          700: "#999900",
          800: "#666600",
          900: "#333300",
        },
        secondary: {
          100: "#ccffcc",
          200: "#99ff99",
          300: "#66ff66",
          400: "#33ff33",
          500: "#00ff00",
          600: "#00cc00",
          700: "#009900",
          800: "#006600",
          900: "#003300",
        },
        accent: {
          100: "#d5d5d5",
          200: "#ababab",
          300: "#808080",
          400: "#565656",
          500: "#2c2c2c",
          600: "#232323",
          700: "#1a1a1a",
          800: "#121212",
          900: "#090909",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

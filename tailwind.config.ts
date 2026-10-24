import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#07172B",
          900: "#050F1E",
          800: "#0B2140",
          700: "#132E52",
        },
        royal: {
          DEFAULT: "#075FCB",
          600: "#0654B3",
          700: "#054A9C",
        },
        bright: {
          DEFAULT: "#27A9F5",
          600: "#1E93DD",
        },
        charcoal: "#101216",
        silver: {
          DEFAULT: "#C7CCD4",
          600: "#8B94A3",
        },
        soft: "#F3F5F7",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "var(--font-inter)",
          ...defaultTheme.fontFamily.sans,
        ],
        heading: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "var(--font-inter)",
          ...defaultTheme.fontFamily.sans,
        ],
        body: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "var(--font-inter)",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      boxShadow: {
        card: "0 1px 1px rgba(16, 24, 40, 0.03), 0 4px 14px rgba(16, 24, 40, 0.05)",
        "card-hover":
          "0 2px 4px rgba(16, 24, 40, 0.05), 0 14px 34px rgba(16, 24, 40, 0.10)",
        frame: "0 1px 2px rgba(16, 24, 40, 0.05), 0 12px 32px rgba(16, 24, 40, 0.09)",
        tab: "0 8px 32px rgba(7, 23, 43, 0.18), 0 1px 2px rgba(7, 23, 43, 0.10)",
        sheet: "0 -8px 40px rgba(7, 23, 43, 0.22)",
      },
      maxWidth: {
        content: "76rem",
      },
    },
  },
  plugins: [],
};

export default config;

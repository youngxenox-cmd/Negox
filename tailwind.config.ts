import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E8500A",
        navy: "#1A1A2E",
        amber: { DEFAULT: "#F5A623", accent: "#F5A623" },
        success: "#27AE60",
        error: "#E74C3C",
        cream: "#FFF5EE",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
      },
      boxShadow: {
        card: "0 4px 14px rgba(26, 26, 46, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;

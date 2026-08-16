import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep graphite / dark theme surfaces
        background: "#050816",
        surface: "#0A0D1F",
        card: "#111529",
        border: "#1E2540",
        
        // Brand accents (Cyan, Violet, Pink)
        primary: {
          DEFAULT: "#00F5FF", // Vibrant Cyan
          dark: "#00A8B0",
          light: "#55FAFF",
        },
        secondary: {
          DEFAULT: "#6C63FF", // Elegant Violet
          dark: "#4B44B8",
          light: "#958FFF",
        },
        accent: {
          DEFAULT: "#FF008C", // Vibrant Pink
          dark: "#B80064",
          light: "#FF4DAE",
        },
        
        text: {
          primary: "#FFFFFF",
          secondary: "#A0AEC0",
          muted: "#718096",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "gradient-shift": "gradient-shift 15s ease infinite",
        "fade-in": "fade-in 0.5s ease-out",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

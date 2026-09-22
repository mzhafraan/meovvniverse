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
        void: "#08080C",
        "void-light": "#0F0F14",
        concrete: "#1A1A1A",
        "concrete-dark": "#121214",
        "concrete-light": "#252528",
        chrome: "#C0C0C0",
        "chrome-dim": "#8A8A8E",
        fog: "#6B6B75",
        ash: "#F0F0F0",
        glitch: "#FFFFFF",
        rust: "#3A2E2E",
        blood: "#4A121A",
        volt: "#CCFF00",
        "volt-dim": "#A3CC00",
        "volt-dark": "#1C2405",
        "cyan-baffait": "#5FF2DE",
      },
      fontFamily: {
        romellis: ['"Romellis Light Semi Condensed Italic"', '"Romellis"', '"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        glyphius: ['"BT Glyphius Regular"', '"BT Glyphius Regular Placeholder"', 'sans-serif'],
        bathory: ["'Bathory'", "'UnifrakturMaguntia'", "'Pirata One'", "'Cormorant Garamond'", "Georgia", "serif"],
        pixel: ["var(--font-geist-pixel-square)", "'Pixelify Sans'", "'Silkscreen'", "'VT323'", "monospace"],
        editorial: ['"BT Glyphius Regular"', '"BT Glyphius Regular Placeholder"', 'sans-serif'],
        gothic: ['"BT Glyphius Regular"', '"BT Glyphius Regular Placeholder"', 'sans-serif'],
        mono: ['"BT Glyphius Regular"', '"BT Glyphius Regular Placeholder"', "'JetBrains Mono'", 'Courier New', 'monospace'],
        sans: ['"BT Glyphius Regular"', '"BT Glyphius Regular Placeholder"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-3px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(3px, 1px)" },
          "80%": { transform: "translate(1px, -2px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        flicker: {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": {
            opacity: "0.99",
          },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": {
            opacity: "0.4",
          },
        },
      },
      animation: {
        glitch: "glitch 0.25s infinite linear alternate-reverse",
        scanline: "scanline 8s linear infinite",
        flicker: "flicker 0.15s infinite",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ink: "#151A21",
        paper: "#F2F1EC",
        accent: {
          DEFAULT: "#E8672B",
          dark: "#C6541E",
          soft: "#FBE4D3",
        },
        success: {
          DEFAULT: "#2F9166",
          soft: "#DCEEE3",
        },
        danger: {
          DEFAULT: "#D64545",
          soft: "#F8DEDE",
        },
        info: {
          DEFAULT: "#2A6F97",
          soft: "#DCE9F1",
        },
        line: "#E3E1DA",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
// Latest Tailwind CSS config for Vite + DaisyUI (2025)
import { defineConfig } from "tailwindcss";
import daisyui from "daisyui";

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        xl: "1.5rem",
        '2xl': "2rem",
      },
      boxShadow: {
        card: "0 2px 12px 0 rgba(38,38,38,0.08)",
        input: "0 1px 4px 0 rgba(38,38,38,0.06)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        kurakani: {
          "primary": "#0095f6", // Instagram blue
          "primary-focus": "#2563eb",
          "primary-content": "#fff",
          "secondary": "#fafafa", // Instagram light background
          "secondary-focus": "#f1f1f1",
          "secondary-content": "#262626",
          "accent": "#ed4956", // Instagram red
          "accent-focus": "#e8433f",
          "accent-content": "#fff",
          "neutral": "#efefef", // Instagram neutral
          "neutral-focus": "#dbdbdb",
          "neutral-content": "#262626",
          "base-100": "#fff", // Instagram white
          "base-200": "#fafafa",
          "base-300": "#efefef",
          "base-content": "#262626",
          "info": "#3797f0",
          "success": "#51cb20",
          "warning": "#fbbc05",
          "error": "#ed4956",
          "--rounded-box": "1.5rem",
          "--rounded-btn": "1.5rem",
          "--rounded-badge": "1.5rem",
          "--tab-radius": "1.5rem",
          "--navbar-padding": "2rem",
          "--btn-text-case": "none",
        },
      },
      "dark"
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: "",
  },
});

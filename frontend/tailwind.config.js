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
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        kurakani: {
          "primary": "#1e3a8a",
          "primary-focus": "#2563eb",
          "primary-content": "#fff",
          "secondary": "#64748b",
          "secondary-focus": "#334155",
          "secondary-content": "#fff",
          "accent": "#fbbf24",
          "accent-focus": "#f59e42",
          "accent-content": "#fff",
          "neutral": "#f1f5f9",
          "neutral-focus": "#e2e8f0",
          "neutral-content": "#1e293b",
          "base-100": "#f9fafb",
          "base-200": "#f1f5f9",
          "base-300": "#e2e8f0",
          "base-content": "#1e293b",
          "info": "#0ea5e9",
          "success": "#22c55e",
          "warning": "#facc15",
          "error": "#ef4444",
          "--rounded-box": "1.25rem",
          "--rounded-btn": "1.25rem",
          "--rounded-badge": "1.25rem",
          "--tab-radius": "1.25rem",
          "--navbar-padding": "1.5rem",
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

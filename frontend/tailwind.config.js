/** @type {import('tailwindcss').Config} */
export default {
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
        xl: "1.25rem",
        '2xl': "1.5rem",
      },
      boxShadow: {
        card: "0 4px 32px 0 rgba(30,41,59,0.10)",
        input: "0 2px 8px 0 rgba(30,41,59,0.06)",
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        kurakani: {
          "primary": "#1e3a8a", // deep blue
          "primary-focus": "#2563eb",
          "primary-content": "#fff",
          "secondary": "#64748b", // slate
          "secondary-focus": "#334155",
          "secondary-content": "#fff",
          "accent": "#fbbf24", // soft yellow
          "accent-focus": "#f59e42",
          "accent-content": "#fff",
          "neutral": "#f1f5f9", // light neutral
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
};

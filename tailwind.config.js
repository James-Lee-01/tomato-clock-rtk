/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
      themes: [
        {
          mytheme: {
                      
            "primary": "#fbbf24",
                      
            "secondary": "#2563eb",
                      
            "accent": "#854d0e",
                      
            "neutral": "#6b7280",
                      
            "base-100": "#1E293B",
                      
            "info": "#009cff",
                      
            "success": "#509b00",
                      
            "warning": "#f97316",
                      
            "error": "#e11d48",
          },
        },
      ],
    },
  plugins: [daisyui],
}


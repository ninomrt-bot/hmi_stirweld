import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#071039",   // bleu Stirweld
          light:  "#0d1648",
          accent: "#ff6600",    // orange Stirweld
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

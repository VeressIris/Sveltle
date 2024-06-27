import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        "orange-link": "#eb6732",
      },
    },
  },

  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"],
  },
} as Config;

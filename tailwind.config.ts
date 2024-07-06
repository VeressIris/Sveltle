import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        key: {
          light: "#c7c9cc",
          dark: "#313531",
        },
      },
    },
    screens: {
      phone: "320px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
  },

  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#eb6732",
          "primary-content": "#130401",
          secondary: "#c45060",
          "secondary-content": "#0e0203",
          accent: "#0089ff",
          "accent-content": "#000716",
          neutral: "#f5f5f4",
          "neutral-content": "#151514",
          "base-100": "#1f231f",
          "base-200": "#191d19",
          "base-300": "#090b09",
          "base-content": "#cdcecd",
          info: "#165dba",
          "info-content": "#d0dff3",
          success: "#00a801",
          "success-content": "#000a00",
          warning: "#d8bd3a",
          "warning-content": "#161006",
          error: "#b24052",
          "error-content": "#f3d9da",
        },
        light: {
          primary: "#eb6732",
          "primary-content": "#130401",
          secondary: "#c45060",
          "secondary-content": "#0e0203",
          accent: "#0089ff",
          "accent-content": "#000716",
          neutral: "#e5e7eb",
          "neutral-content": "#121313",
          "base-100": "#f3f4f6",
          "base-200": "#d3d4d6",
          "base-300": "#9c9da0",
          "base-content": "#141415",
          info: "#165dba",
          "info-content": "#d0dff3",
          success: "#00a801",
          "success-content": "#000a00",
          warning: "#ffd687",
          "warning-content": "#161006",
          error: "#b24052",
          "error-content": "#f3d9da",
        },
      },
    ],
  },
  darkMode: ["class", '[data-theme="dark"]'],
} as Config;

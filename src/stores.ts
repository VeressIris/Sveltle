import { writable } from "svelte/store";

let stored: boolean;

if (typeof window !== "undefined") {
  stored = localStorage.getItem("isDark") === "true";
} else {
  stored = false; // or your default value
}

export const isDark = writable(stored);

if (typeof window !== "undefined") {
  isDark.subscribe((value) => {
    localStorage.setItem("isDark", String(value));
  });
}

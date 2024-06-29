import { writable } from "svelte/store";

// isDark store
let storedTheme: boolean;

if (typeof window !== "undefined") {
  storedTheme = localStorage.getItem("isDark") === "true";
} else {
  storedTheme = false;
}

export const isDark = writable(storedTheme);

if (typeof window !== "undefined") {
  isDark.subscribe((value) => {
    localStorage.setItem("isDark", String(value));
  });
}

// currentWord store
let storedWord: string;

if (typeof window !== "undefined") {
  storedWord = localStorage.getItem("currentWord") || "";
} else {
  storedWord = "";
}

export const currentWord = writable(storedWord);

if (typeof window !== "undefined") {
  currentWord.subscribe((value) => {
    localStorage.setItem("currentWord", String(value));
  });
}

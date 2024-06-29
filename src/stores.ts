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

// word history store
let storedWords: string[];

if (typeof window !== "undefined") {
  // quite frankly i'm not entirely sure why exactly this try-catch block is necessary but without I think it's so that I can ignore the compiler errors
  try {
    const pastWordsFromStorage = localStorage.getItem("pastWords");
    if (pastWordsFromStorage) {
      storedWords = JSON.parse(pastWordsFromStorage);
    }
  } catch (error) {
    console.error("Failed to parse pastWords from localStorage:", error);
    storedWords = [];
  }
}

export const pastWords = writable(storedWords!);

if (typeof window !== "undefined") {
  pastWords.subscribe((value) => {
    localStorage.setItem("pastWords", JSON.stringify(value));
  });
}

// number of tries store
let storedTries: number;

if (typeof window !== "undefined") {
  // same as for the pastWords store ^
  try {
    storedTries = parseInt(localStorage.getItem("numberOfTries") || "0", 10);
    if (isNaN(storedTries)) {
      storedTries = 0;
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    storedTries = 0;
  }
} else {
  storedTries = 0;
}

export const numOfTries = writable(storedTries);

if (typeof window !== "undefined") {
  numOfTries.subscribe((value) => {
    try {
      localStorage.setItem("numberOfTries", String(value));
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  });
}

// board store
let storedBoard: string[][];

function createDefaultBoard() {
  return Array.from({ length: 6 }, () => Array(5).fill(""));
}

if (typeof window !== "undefined") {
  try {
    const boardFromStorage = localStorage.getItem("board");
    if (boardFromStorage) {
      storedBoard = JSON.parse(boardFromStorage);
      if (
        !Array.isArray(storedBoard) ||
        storedBoard.length !== 6 ||
        !storedBoard.every((row) => Array.isArray(row) && row.length === 5)
      ) {
        console.warn(
          "Invalid board data in localStorage, creating default board"
        );
        storedBoard = createDefaultBoard();
      }
    } else {
      storedBoard = createDefaultBoard();
    }
  } catch (error) {
    console.error("Failed to parse board from localStorage:", error);
    storedBoard = createDefaultBoard();
  }
} else {
  storedBoard = createDefaultBoard();
}

export const board = writable(storedBoard);

if (typeof window !== "undefined") {
  board.subscribe((value) => {
    localStorage.setItem("board", JSON.stringify(value));
  });
}

// current word store
export const currentWord = writable("");

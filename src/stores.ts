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

// winning word store
// TODO: add this to LOCAL STORAGE so that a new word is generated only when the puzzle is completed
export const winningWord = writable("");

// color board store
let storedColorBoard: string[][];

if (typeof window !== "undefined") {
  try {
    const boardFromStorage = localStorage.getItem("colorBoard");
    if (boardFromStorage) {
      storedColorBoard = JSON.parse(boardFromStorage);
      if (
        !Array.isArray(storedColorBoard) ||
        storedColorBoard.length !== 6 ||
        !storedColorBoard.every((row) => Array.isArray(row) && row.length === 5)
      ) {
        console.warn(
          "Invalid color board data in localStorage, creating default board"
        );
        storedColorBoard = createDefaultBoard();
      }
    } else {
      storedColorBoard = createDefaultBoard();
    }
  } catch (error) {
    console.error("Failed to parse color board from localStorage:", error);
    storedColorBoard = createDefaultBoard();
  }
} else {
  storedColorBoard = createDefaultBoard();
}

export const colorBoard = writable(storedColorBoard);

if (typeof window !== "undefined") {
  colorBoard.subscribe((value) => {
    localStorage.setItem("colorBoard", JSON.stringify(value));
  });
}

// incorrect keys store
let storedKeys: string;

if (typeof window !== "undefined") {
  storedKeys = localStorage.getItem("incorrectKeys")! || "";
} else {
  storedKeys = "";
}

export const incorrectKeys = writable(storedKeys);

if (typeof window !== "undefined") {
  incorrectKeys.subscribe((value) => {
    localStorage.setItem("incorrectKeys", String(value));
  });
}

// won store
export const won = writable(false);

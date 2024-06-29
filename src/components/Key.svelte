<script lang="ts">
  import { isDark, board, numOfTries, pastWords, currentWord } from "../stores";
  import { get } from "svelte/store";

  export let key: string;

  board.set(Array.from({ length: 6 }, () => Array(5).fill("")));

  function handleKeyPress() {
    let $currentWord = get(currentWord);
    let $numOfTries = get(numOfTries);
    let $board = get(board);

    // Delete characters
    if (key === "bcksp") {
      if ($currentWord.length > 0) {
        $currentWord = $currentWord.slice(0, -1);
        $board[$numOfTries][$currentWord.length] = "";
        currentWord.set($currentWord);
        board.set($board);
      }
      return;
    }

    // Check entered word
    if (key === "enter" && $currentWord.length === 5) {
      pastWords.update((words) => [...words, $currentWord]);
      currentWord.set("");
      numOfTries.update((n) => n + 1);
      return;
    }

    // Add characters
    if ($currentWord.length < 5 && key.length === 1) {
      $currentWord += key;
      $board[$numOfTries][$currentWord.length - 1] = key;
      currentWord.set($currentWord);
      board.set($board);
    }
  }
</script>

<button
  on:click={handleKeyPress}
  class="text-3xl rounded-md m-1 min-w-10 h-12 p-3 flex justify-center items-center"
  class:bg-key-light={$isDark === false}
  class:bg-key-dark={$isDark === true}
>
  {#if key === "bcksp"}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="40px"
      viewBox="0 -960 960 960"
      width="40px"
      fill={$isDark ? "#c7c9cc" : "#313531"}
      ><path
        d="M360-200q-21.33 0-39.17-10.67-17.83-10.66-30.16-28L120-480l170.67-241.33q12.33-17.34 30.16-28Q338.67-760 360-760h413.33q27.5 0 47.09 19.58Q840-720.83 840-693.33v426.66q0 27.5-19.58 47.09Q800.83-200 773.33-200H360Zm413.33-66.67v-426.66 426.66Zm-420.66 0h420.66v-426.66H352.67L202.67-480l150 213.33Zm98-57.33L560-433.33 669.33-324l47.34-47.33-110-108.67 108.66-108.67L668-636 560-526.67 450.67-636l-47.34 47.33 110 108.67-110 108.67L450.67-324Z"
      /></svg
    >
  {:else}
    {key}
  {/if}
</button>

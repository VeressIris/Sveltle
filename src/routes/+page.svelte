<script lang="ts">
  import Board from "../components/Board.svelte";
  import Keyboard from "../components/Keyboard.svelte";
  import { isDark, winningWord, won, numOfTries } from "../stores";
  import { generate } from "random-words";

  $winningWord = generate({ minLength: 5, maxLength: 5 }).toString();
  if ($numOfTries === 6) {
    $numOfTries = 0;
  }
</script>

<div class="flex flex-row justify-end mt-4 mr-4">
  <label class="grid cursor-pointer place-items-center">
    <input
      value="dark"
      type="checkbox"
      bind:checked={$isDark}
      class="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
    />
    <svg
      class="stroke-base-100 fill-base-100 col-start-1 row-start-1"
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <path
        d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
      />
    </svg>
    <svg
      class="stroke-base-100 fill-base-100 col-start-2 row-start-1"
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  </label>
</div>
<div class="flex flex-col items-center h-screen py-10 px-10">
  <h1 class="text-4xl"><span class="text-primary">Svelt</span>le</h1>
  <p class="my-2 text-lg text-center">
    A <a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a>
    clone built with <a href="https://svelte.dev/">Svelte</a> and
    <a href="https://www.typescriptlang.org/">Typescript</a>.
  </p>
  {#if $won}
    <h1 class="text-4xl mt-10">You <span class="text-success">won</span>!</h1>
  {:else if $numOfTries === 6}
    <h1 class="text-4xl mt-10">The word was {$winningWord}.</h1>
  {:else}
    <Board />
    <Keyboard />
  {/if}
</div>

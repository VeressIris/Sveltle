<script lang="ts">
  import Square from "../components/Square.svelte";
  import { onMount } from "svelte";
  const board: string[][] = new Array(6);
  // initialize the board with empty strings
  for (let i = 0; i < 6; i++) {
    board[i] = new Array(5).fill("");
  }

  // checks if key pressed is a letter
  function isLetter(key: string) {
    return key >= "a" && key <= "z";
  }

  let currentWord = "";

  onMount(() => {
    // listen to key presses
    document.addEventListener(
      "keydown",
      (event) => {
        var keyValue = event.key;
        if (isLetter(keyValue)) {
          currentWord += keyValue;
        }
        if (keyValue === "Enter") {
          console.log(currentWord);
        }
        if (keyValue === "Backspace") {
          currentWord = currentWord.slice(0, -1);
          console.log(currentWord);
        }
      },
      false
    );
  });
</script>

<div class="flex flex-col mt-8">
  {#each board as row}
    <div class="flex flex-row">
      {#each row as j}
        <Square letter={j} />
      {/each}
    </div>
  {/each}
</div>

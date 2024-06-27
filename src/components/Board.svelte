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
  let tries = 0;
  onMount(() => {
    // listen to key presses
    document.addEventListener(
      "keydown",
      (event) => {
        var keyValue = event.key;

        // add characters
        if (isLetter(keyValue) && currentWord.length < 5) {
          currentWord += keyValue;
          board[tries][currentWord.length - 1] =
            currentWord[currentWord.length - 1];
          console.log(currentWord);
        }

        // check entered word
        if (keyValue === "Enter" && currentWord.length === 5) {
          tries++;
        }

        // delete characters
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

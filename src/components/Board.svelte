<script lang="ts">
  import Square from "../components/Square.svelte";
  import { onMount } from "svelte";
  import { generate, count } from "random-words";
  import { pastWords, numOfTries, board, currentWord, winningWord } from "../stores";
  import { get } from "svelte/store";

  // checks if key pressed is a letter
  function isLetter(key: string) {
    return key >= "a" && key <= "z";
  }

  // TODO: THIS CAN BE REMOVED ONCE I'M DONE WITH TESTING
  $pastWords = [];
  $numOfTries = 0;
  board.set(Array.from({ length: 6 }, () => Array(5).fill("")));

  let colorBoard = get(board).map((row) => row.map(() => ""));

  onMount(() => {
    console.log(`The word you're looking for is: ${$winningWord}`);

    // listen to key presses
    document.addEventListener(
      "keydown",
      (event) => {
        var keyValue = event.key;
        // ignore ctrl key (ctrl+r used to add r to the word)
        if (event.ctrlKey) return;

        // add characters
        if (isLetter(keyValue) && $currentWord.length < 5) {
          $currentWord += keyValue;
          $board[$numOfTries][$currentWord.length - 1] =
            $currentWord[$currentWord.length - 1];
          console.log($currentWord);
        }

        // check entered word
        if (keyValue === "Enter" && $currentWord.length === 5) {
          for (let i = 0; i < 5; i++) {
            if ($currentWord[i] !== $winningWord[i]) {
              if ($winningWord.includes($currentWord[i])) {
                colorBoard[$numOfTries][i] = "warning";
              } else {
                colorBoard[$numOfTries][i] = "base-100";
              }
            } else {
              colorBoard[$numOfTries][i] = "success"; 
            }
          }

          $pastWords = [...$pastWords, $currentWord]; //keep track of word tried
          $currentWord = ""; //reset current word
          $numOfTries++; // increment tries
        }

        // delete characters
        if (keyValue === "Backspace") {
          $currentWord = $currentWord.slice(0, -1);
          $board[$numOfTries][$currentWord.length] = "";
          console.log($currentWord);
        }
      },
      false
    );
  });
</script>

<div class="flex flex-col mt-8">
  {#each $board as row, i}
    <div class="flex flex-row">
      {#each row as j, k}
        <Square letter={j} color={colorBoard[i][k]} />
      {/each}
    </div>
  {/each}
</div>

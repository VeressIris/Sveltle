<script lang="ts">
  import Square from "../components/Square.svelte";
  import { onMount } from "svelte";
  import { generate, count } from "random-words";

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
  const winningWord = generate({ minLength: 5, maxLength: 5 });

  let colorBoard = board.map((row) => row.map(() => ""));

  onMount(() => {
    console.log(`The word you're looking for is: ${winningWord}`);

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
          console.log("checking");
          for (let i = 0; i < 5; i++) {
            if (currentWord[i] !== winningWord[i]) {
              if (winningWord.includes(currentWord[i])) {
                colorBoard[tries][i] = "warning";
              } else {
                colorBoard[tries][i] = "base-100";
              }
            } else {
              colorBoard[tries][i] = "success";
            }
          }

          currentWord = ""; //reset current word
          tries++; // increment tries
          console.log(colorBoard);
        }

        // delete characters
        if (keyValue === "Backspace") {
          currentWord = currentWord.slice(0, -1);
          board[tries][currentWord.length] = "";
          console.log(currentWord);
        }
      },
      false
    );
  });
</script>

<div class="flex flex-col mt-8">
  {#each board as row, i}
    <div class="flex flex-row">
      {#each row as j, k}
        <Square letter={j} color={colorBoard[i][k]} />
      {/each}
    </div>
  {/each}
</div>

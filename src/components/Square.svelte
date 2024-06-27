<script lang="ts">
  export let letter: string;
  export let color: string;
</script>

<div
  class="w-20 h-20 border-solid border-2 border-black mx-1 my-1 flex justify-center items-center text-4xl font-medium"
  class:bg-correct={color === "correct"}
  class:bg-orange-link={color === "orange-link"}
  class:bg-wrong={color === "wrong"}
>
  {letter}
</div>

<script lang="ts">
  import Key from "./Key.svelte";

  let keyboardLayout = [
    "qwertyuiop".split(""),
    "asdfghjkl".split(""),
    "bcksp,z,x,c,v,b,n,m,enter".split(","),
  ];
</script>

<div class="tablet:mt-16 mt-4">
  {#each keyboardLayout as row}
    <div class="flex justify-center">
      {#each row as key}
        <Key {key} />
      {/each}
    </div>
  {/each}
</div>

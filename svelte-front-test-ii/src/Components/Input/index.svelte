<script>
 import { fillInputCombo } from "../../Store/index.js";

 export let inputTitle = "Ainda não foi definido o nome do label";
 export let sub = "";
 export let forName = "";
 export let combo = false;
 export let submit = false;
 export let qtyInputs = undefined;
 export let value = [];
 export let id = undefined;

 $: if (value) {
  $fillInputCombo = value;
 }
</script>

{#if combo}
 <li class="combo">
  <label for={forName}>{inputTitle}</label>
  {#each { length: qtyInputs } as _, i}
   <div class="combo_input">
    <span class="combo_input_title">Campo {i + 1}</span>
    <input bind:value={value[i]} {...$$restProps} />
   </div>
  {/each}
  <span class="combo_sub">{sub}</span>
 </li>
{:else if submit}
 <li class="submit">
  <input {...$$restProps} />
 </li>
{:else}
 <li>
  <label {id} for={forName}>{inputTitle}</label>
  <input {...$$restProps} bind:value />
  <span>{sub}</span>
 </li>
{/if}

<style lang="scss">
 @import "./_input.scss";
</style>

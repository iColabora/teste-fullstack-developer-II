<script>
 export let selectTitle = undefined;
 export let sub = undefined;
 export let value;
 export let selectName;
 export let options = {
  texto: "Texto",
  texto_grande: "Texto Grande",
  combo: "Combo",
 };
</script>

<li>
 <label for="url">{selectTitle}</label>
 <div class="___select">
  <select name={selectName} class="___adjust" bind:value>
   {#each Object.entries(options) as [value, text]}
    <option {value}>{text}</option>
   {/each}
  </select>
 </div>
 <span>{sub}</span>
</li>

<style lang="scss">
 @import "./_select.scss";
</style>

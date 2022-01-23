<script>
 import { route } from "../../Store/index.js";

 export let routePage;
 export let text;
 export let marginTop = "25px";

 function Route(r) {
  $route = r;
 }
</script>

<div
 class="route"
 style="--marginTop: {marginTop}"
 on:click={() => Route(routePage)}
>
 <div class="button_route">
  <div class="button_route__title">
   <h1>{text}</h1>
  </div>
 </div>
</div>

<style lang="scss">
 @import "./_button-route.scss";
</style>

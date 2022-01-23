<script>
 import ButtonRoute from "../ButtonRoute/index.svelte";
</script>

<ButtonRoute text={"Criar novo campo"} routePage={"NewField"} />
<ButtonRoute
 text={"Verificar campos existentes"}
 routePage={"ShowFields"}
 marginTop={"0px"}
/>

<style lang="scss">
 @import "./_home.scss";
</style>

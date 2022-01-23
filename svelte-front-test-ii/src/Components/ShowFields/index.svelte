<script>
 import ButtonRoute from "../ButtonRoute/index.svelte";

 // Internal Libs
 import { fields } from "../../Store/index.js";

 // Internal Components
 import Input from "../Input/index.svelte";

 // set names can be choose in combo
 $: showName = {
  texto: "Texto",
  texto_grande: "Texto Grande",
  combo: "Combo",
 };
</script>

<ButtonRoute text={"Voltar para tela principal"} routePage={"Home"} />

<div class="new_field">
 <div class="new_field__title">
  <h1>Lista de campos criados</h1>
 </div>
 <form class="form-style-7">
  <ul>
   {#each $fields as { tipo_campo, label, id_campo, dados_campo }, i}
    <Input
     combo={tipo_campo === "combo"}
     inputTitle={label}
     type={"text"}
     name={id_campo}
     forName={id_campo}
     id={id_campo}
     qtyInputs={dados_campo.length}
     readonly={true}
     value={dados_campo}
    />
   {/each}
  </ul>
 </form>

 <div class="new_field__fields" />
</div>

<style lang="scss">
 @import "./_show-fields.scss";
</style>

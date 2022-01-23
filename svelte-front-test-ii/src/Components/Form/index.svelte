<script>
 // Internal Libs
 import { fieldType, fillInputCombo } from "../../Store/index.js";
 import { FetchPost } from "../../Libs/fetch.js";

 // Internal Components
 import Input from "../Input/index.svelte";
 import Select from "../Select/index.svelte";
 import Divider from "../Divider/index.svelte";

 let bindLabel;
 let bindIdCampo;
 let maxLength;
 let qtyInputFields;
 let bindaDataField;

 // set names can be choose in combo
 $: showName = {
  texto: "Texto",
  texto_grande: "Texto Grande",
  combo: "Combo",
 };

 // set qty of fields
 $: qtyField = {
  1: 1,
  2: 2,
  3: 3,
 };

 // maxlength field treatment for 'texto' and 'texto_grande'
 $: if ($fieldType === "texto") {
  maxLength = "30";
 } else if ($fieldType === "texto_grande") {
  maxLength = "100";
 }

 // handler for submit info
 function handleOnSubmit() {
  let body = {
   label: bindLabel,
   id_campo: bindIdCampo,
   tipo_campo: $fieldType,
   dados_campo: $fillInputCombo.slice(0, qtyInputFields),
  };
  if ($fieldType !== "combo") {
   body.dados_campo = bindaDataField;
  }
  FetchPost(body);
  clearForm();
 }

 // clear all data in form
 function clearForm() {
  bindLabel = "";
  bindIdCampo = "";
  $fieldType = "texto";
  $fillInputCombo = [];
  bindaDataField = [];
 }
</script>

<form class="form-style-7" on:submit|preventDefault={handleOnSubmit}>
 <ul>
  <Input
   inputTitle={"Label"}
   sub={"Adicione o texto da label"}
   required={true}
   type={"text"}
   maxlength="30"
   name="label"
   forName={"label"}
   bind:value={bindLabel}
  />
  <Input
   inputTitle={"ID do campo"}
   sub={"Adicione o ID do campo"}
   required={true}
   type={"text"}
   maxlength="15"
   name="id_campo"
   forName={"id_campo"}
   bind:value={bindIdCampo}
  />
  <Select
   selectTitle={"Tipo de campo"}
   sub={"Selecione o tipo de campo que deseja"}
   selectName={"combo_field"}
   bind:value={$fieldType}
   options={showName}
  />
  {#if showName[$fieldType] === "Combo"}
   <Select
    selectTitle={"Quantidade de campos"}
    sub={"Selecione quantos campos deseja no combo"}
    selectName={"qty_field"}
    bind:value={qtyInputFields}
    options={qtyField}
   />
  {/if}
  <Divider title={"Preview"} />
  <Input
   combo={showName[$fieldType] === "Combo"}
   inputTitle={bindLabel}
   sub={"Preencha o(s) campo"}
   required={true}
   type={"text"}
   maxlength={maxLength}
   name={bindIdCampo}
   forName={bindIdCampo}
   id={bindIdCampo}
   qtyInputs={qtyInputFields}
   bind:value={bindaDataField}
  />
  <Input
   on:submit={handleOnSubmit}
   submit="true"
   type="submit"
   value="Gravar campo"
  />
 </ul>
</form>

<style lang="scss">
 @import "./_form.scss";
</style>



<template>
  <div class="container content text-center">
    <span>O que você deseja fazer?</span>
    <div class="buttons">
      <NuxtLink to="/createField">
        <button class="create">Criar campo</button>
      </NuxtLink>
      <button class="fill">Preencher campos</button>
    </div>
    <span v-if="$fetchState.pending" class="loading-error">
      Carregando campos, aguarde :)
    </span>
    <span v-else-if="$fetchState.error" class="loading-error">
      Ops, não foi possível carregar os campos! :´(
    </span>
    <span v-else-if="Object.keys(fieldsList).length === 0" class="loading-error">
      Ops...Nenhum campo cadastrado, que tal criar um? :)
    </span>
    <div v-else class="table-fields">
      <div v-for="(field, fieldKey) in fieldsList" :key="fieldKey">
        <label>{{ field.label }}</label>
        <input v-if="field.type!=='combo'" :value="field.fieldId" type="text" :maxlength="field.typeRules.maxlength">
        <select v-else :name="field.fieldId">
          <option v-for="(comboOptions, typeRulesKey) in field.typeRules" :key="typeRulesKey" :value="comboOptions.value">{{ comboOptions.description }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fieldsList: [],
      }
    },
    async fetch() {
      const response = await this.$axios.get('http://localhost:3333/fields');
      this.fieldsList = response.data;
    }
  }
</script>

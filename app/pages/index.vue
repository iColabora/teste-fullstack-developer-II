

<template>
  <div class="container content text-center">
    <span>O que você deseja fazer?</span>
    <div class="buttons">
      <NuxtLink to="/createField">
        <button class="create">Criar campo</button>
      </NuxtLink>
      <NuxtLink to="/fillFields">
        <button class="fill">Preencher campos</button>
      </NuxtLink>
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
    <table v-else class="table-fields">
      <thead>
        <tr>
          <th class="">Posição</th>
          <th>ID</th>
          <th>Descrição</th>
          <th>Tipo</th>
          <th>...</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(field, fieldKey) in fieldsList" :key="fieldKey">
          <td>{{ field.position }}</td>
          <td>{{ field.fieldId }}</td>
          <td>{{ field.label }}</td>
          <td>{{ field.type }}</td>
        </tr>
      </tbody>
    </table>
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
    },
    methods: {

    }
  }
</script>

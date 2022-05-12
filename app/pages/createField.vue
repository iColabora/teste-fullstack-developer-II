<script>
export default {
  data() {
    return {
      newField: {
        fieldId: '',
        label: '',
        position: 1,
        type: 'text'
      }
    }
  },
  methods: {
    createField() {
      this.$axios.post("http://localhost:3333/fields", this.newField)
        .then(response => console.log(response.data.status))
        .catch(error => {
          this.errorMessage = error.message;
        });
    }
  }
};
</script>

<template>
  <div class="container content text-center">
    <span>Opa! Você está criando um novo campo :)</span>
    <div>
      <label>ID / Name</label>
      <input v-model="newField.fieldId" type="text">
    </div>
    <div>
      <label>Label</label>
      <input v-model="newField.label" type="text">
    </div>
    <div>
      <label>Posição</label>
      <input v-model="newField.position" type="text">
    </div>
    <div>
      <label>Tipo</label>
      <select v-model="newField.type">
        <option value="text">Texto com 30 caracteres</option>
        <option value="bigtext">Texto com 100 caracteres</option>
        <option value="combo">Combo com 3 opções</option>
      </select>
    </div>

    <div class="buttons">
      <button class="create" @click="createField">Criar</button>
      <NuxtLink to="/">
        <button class="fill">Voltar</button>
      </NuxtLink>
    </div>
  </div>
</template>

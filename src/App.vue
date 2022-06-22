<template>
  <CriaTabelaVue></CriaTabelaVue>
</template>

<script>
import CriaTabelaVue from './components/CriaTabela.vue'
export default {
  name: 'App',
  components: {
    CriaTabelaVue
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

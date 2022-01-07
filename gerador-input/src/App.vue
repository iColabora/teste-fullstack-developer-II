<template>
  <div id="app">
    <Header />
    <GenerateInput />
  </div>
</template>

<script>
import GenerateInput from './components/GenerateInput.vue'
import Header from './components/Header.vue'

import './styles/globals.css'
export default {
  name: 'App',
  components: {
    Header,
    GenerateInput
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
}
</style>

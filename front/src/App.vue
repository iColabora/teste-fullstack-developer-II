<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style lang="scss">
* {
  outline: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  &:focus {
    outline: 0;
  }

  &::-webkit-scrollbar {
    height: 5px;
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 50%;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(200, 200, 200);
    opacity: 0.4;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(190, 190, 190);
  }
}

html {
  height: 100%;
  background-color: #f4f5fa !important;
}

body {
  height: 100%;
  width: 100%;
  background: #f4f5fa;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
  text-rendering: optimizeLegibility !important;
  letter-spacing: 0 !important;
}
</style>

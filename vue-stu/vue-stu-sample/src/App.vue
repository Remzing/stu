<template>
  <div id="app">
    <Comp />
  </div>
</template>

<script>
import Comp from "./components/life-cycle/Comp.vue";

export default {
  name: "App",
  components: {
    Comp
  }
};
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

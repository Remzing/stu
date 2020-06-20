<template>
  <div style="background:#aaa;width:40%;margin:10px auto;padding:10px;">CompGrandson2</div>
</template>
<script>
export default {
  name: "CompGrandson2",
  data() {
    return {};
  },
  beforeCreate() {
    console.log("CompGrandson2-beforeCreate");
  },
  created() {
    console.log("CompGrandson2-created");
  },
  beforeMount() {
    console.log("CompGrandson2-beforeMount");
  },
  mounted() {
    console.log("CompGrandson2-mounted");
  },
  beforeDestroy() {
    console.log("CompGrandson2-beforeDestroy");
  },
  destroyed() {
    console.log("CompGrandson2-destroyed");
  }
};
</script>
<style scoped lang='less'>
</style>
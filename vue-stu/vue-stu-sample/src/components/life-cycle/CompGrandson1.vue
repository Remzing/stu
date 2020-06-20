<template>
  <div style="background:#aaa;width:40%;margin:10px auto;padding:10px;">CompGrandson1</div>
</template>
<script>
export default {
  name: "CompGrandson1",
  data() {
    return {};
  },
  beforeCreate() {
    console.log("CompGrandson1-beforeCreate");
  },
  created() {
    console.log("CompGrandson1-created");
  },
  beforeMount() {
    console.log("CompGrandson1-beforeMount");
  },
  mounted() {
    console.log("CompGrandson1-mounted");
  },
  beforeDestroy() {
    console.log("CompGrandson1-beforeDestroy");
  },
  destroyed() {
    console.log("CompGrandson1-destroyed");
  }
};
</script>
<style scoped lang='less'>
</style>
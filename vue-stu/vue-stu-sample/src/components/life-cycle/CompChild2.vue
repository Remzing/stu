<template>
  <div style="background:#999;width:70%;margin:10px auto;padding:10px;">
    CompChild2
    <CompGrandson2 />
  </div>
</template>
<script>
import CompGrandson2 from "./CompGrandson2";

export default {
  name: "CompChild2",
  components: {
    CompGrandson2
  },
  data() {
    return {};
  },
  beforeCreate() {
    console.log("CompChild2-beforeCreate");
  },
  created() {
    console.log("CompChild2-created");
  },
  beforeMount() {
    console.log("CompChild2-beforeMount");
  },
  mounted() {
    console.log("CompChild2-mounted");
  },
  beforeDestroy() {
    console.log("CompChild2-beforeDestroy");
  },
  destroyed() {
    console.log("CompChild2-destroyed");
  }
};
</script>
<style scoped lang='less'>
</style>
<template>
  <div style="background:#bbb;width:70%;margin:10px auto;padding:10px;">
    CompChild1
    <CompGrandson1 />
  </div>
</template>
<script>
import CompGrandson1 from "./CompGrandson1";

export default {
  name: "CompChild1",
  components: {
    CompGrandson1
  },
  data() {
    return {};
  },
  beforeCreate() {
    console.log("CompChild1-beforeCreate");
  },
  created() {
    console.log("CompChild1-created");
  },
  beforeMount() {
    console.log("CompChild1-beforeMount");
  },
  mounted() {
    console.log("CompChild1-mounted");
  },
  beforeDestroy() {
    console.log("CompChild1-beforeDestroy");
  },
  destroyed() {
    console.log("CompChild1-destroyed");
  }
};
</script>
<style scoped lang='less'>
</style>
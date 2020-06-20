<template>
  <div style="background:#ddd;padding:10px;">
    <div>Comp</div>
    <CompChild1 />
    <CompChild2 />
  </div>
</template>
<script>
import CompChild1 from "./CompChild1";
import CompChild2 from "./CompChild2";
export default {
  name: "Comp",
  components: {
    CompChild1,
    CompChild2
  },
  data() {
    return {};
  },
  beforeCreate() {
    console.log("Comp-beforeCreate");
  },
  created() {
    console.log("Comp-created");
  },
  beforeMount() {
    console.log("Comp-beforeMount");
  },
  mounted() {
    console.log("Comp-mounted");
  },
  beforeDestroy() {
    console.log("Comp-beforeDestroy");
  },
  destroyed() {
    console.log("Comp-destroyed");
  }
};
</script>
<style scoped lang='less'>
</style>
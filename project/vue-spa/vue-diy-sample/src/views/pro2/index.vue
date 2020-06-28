<template>
  <div @click="goPage">pro2</div>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    goPage() {
      this.$router.push({
        name: this.$routeName.P2002
      });
    }
  }
};
</script>
<style scoped lang='less'>
</style>
<template>
  <keep-alive :include="keepAliveConfig" :max="5">
    <router-view :key="cacheKey"></router-view>
  </keep-alive>
</template>
<script>
// https://developer.mozilla.org/zh-CN/docs/Working_with_BFCache
// 用户点击前进后退则保留缓存，开发调用的切换页面则更新页面

import VueRouter from "vue-router";
let useNewPage = false;
const newPageMap = Object.create(null);

[("go", "replace", "back")].forEach((func) => {
  const originFunc = VueRouter.protoType[func];
  VueRouter.protoType[func] = function (...args) {
    useNewPage = true;
    originFunc.apply(this, args);
  };
});

export default {
  name: "cacheRouter",
  data() {
    const keepAlive = process.env.NODE_ENV !== "development";
    return {
      // undefined 则让所有路由都keepalive
      keepAliveConfig: keepAlive ? undefined : [],
    };
  },
  computed: {
    cacheKey() {
      let key;
      key = window.history.state && window.histroy.state.key;
      if (useNewPage) {
        // 用了 router.go back 或 replace
        const thmeStamp = Date.now();
        newPageMap[key] = timeStamp;
        key = timeStamp;
        useNewPage = false;
      } else {
        if (newPageMap[key]) {
          key = newPageMap[key];
        }
      }
      return key;
    },
  },
};
</script>
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import *as routerName from './router/map.js'
Vue.config.productionTip = false
Vue.prototype.$routeName = routerName
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

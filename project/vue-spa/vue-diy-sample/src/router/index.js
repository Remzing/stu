import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/Layout.vue'
import modules from './modules'
import { P001, P002 } from './map'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(Router)

const router = new Router({
  /* 去掉url中的#号  但是放到服务器静态时，后端需要配置，地址：https://router.vuejs.org/zh-cn/essentials/history-mode.html */
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: P001,
      component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
    },
    {
      path: '/',
      name: P002,
      redirect: "login",
      component: layout,
      children: modules.routerList || []
    },
    {
      path: '*',
      name: "notfound",
      component: () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFound.vue')
    },
  ]
})
NProgress.configure({ showSpinner: false })
// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  setTimeout(() => {

    next()
  }, 1000);
})
router.afterEach(() => {
  NProgress.done()
})
export default router
import { P1001, P1002 } from '@/router/map.js'

export default {
  publicPath: "project",
  next: [
    {
      name: P1001,
      path: "/pro1",
      component: () => import(/* webpackChunkName: "pro1" */ '@/views/pro1'),
      pathName: "项目1",
      meta: {
        demo: "demo"
      },
      next: [
        {
          name: P1002,
          path: "/proChild1",
          component: () => import(/* webpackChunkName: "proChild1" */ '@/views/pro1/proChild1.vue'),
          pathName: "项目child1",
          meta: {
            demo: "demo"
          },
        }
      ]
    }
  ]
}
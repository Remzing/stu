import { P2001, P2002 } from '@/router/map.js'

export default {
  publicPath: "project2",
  next: [
    {
      name: P2001,
      path: "/pro2",
      component: () => import(/* webpackChunkName: "pro1" */ '@/views/pro2'),
      pathName: "项目2",
      meta: {
        demo: "demo"
      },
      next: [
        {
          name: P2002,
          path: "/proChild2",
          component: () => import(/* webpackChunkName: "proChild1" */ '@/views/pro2/proChild2.vue'),
          pathName: "项目child2",
          meta: {
            demo: "demo"
          },
        }
      ]
    }
  ]
}
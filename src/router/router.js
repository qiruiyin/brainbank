import Vue from 'vue'
import VueRouter from 'vue-router'
// import routerLink from './router-link'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})

// ({
// 	routes: routerLink
// })

// router.beforeEach((to, from, next) => {
//   next()
// })

// router.afterEach((to, from, next) => {
//   // 设置标题
//   global.document.title = to.meta.title || '汉字思维课'
//   // 滚动条回到头部
//   global.scrollTo(0, 0)
// })

export default router

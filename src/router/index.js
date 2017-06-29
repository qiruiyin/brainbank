import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import routerLink from './router-link'

Vue.use(Router)

const router = new Router({
  routes: routerLink
})

router.beforeEach((to, from, next) => {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach((to, from, next) => {
  store.commit('updateLoadingStatus', {isLoading: false})
  // 设置标题
  global.document.title = to.meta.title || '大脑银行'
  // 滚动条回到头部
  global.scrollTo(0, 0)
})

export default router

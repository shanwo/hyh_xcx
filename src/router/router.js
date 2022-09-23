// router.js
import { RouterMount, createRouter } from 'uni-simple-router'

const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routes: [...ROUTES]
})
// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  // #ifdef H5
  if (to.meta.auth) {
    if (sessionStorage.getItem('token')) {
      next()
    } else {
      next('/pages/login/login')
    }
  } else {
    next()
  }
  // #endif
})
// 全局路由后置守卫
router.afterEach((to, from) => {
  console.log('跳转结束')
})

export {
  router,
  RouterMount
}

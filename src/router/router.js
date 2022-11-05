// router.js
import { RouterMount, createRouter } from 'uni-simple-router'

const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routes: [...ROUTES]
})
// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  // #ifdef H5
  // if (to.meta.auth) {
  //   if (sessionStorage.getItem('token')) {
  //     next()
  //   } else {
  //     next('/pages/login/login')
  //   }
  // } else {
  //   next()
  // }
  // #endif
  // #ifndef H5

  // #endif
  next()
})

export {
  router,
  RouterMount
}

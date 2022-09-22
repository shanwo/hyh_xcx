// router.js
import { RouterMount, createRouter } from 'uni-simple-router'

const router = createRouter({
    platform: process.env.VUE_APP_PLATFORM,
    routes: [...ROUTES]
})
// 全局路由前置守卫
router.beforeEach((to, from, next) => {
    console.log(to)
    if (to.meta.auth) {
        if (uni.getStorageSync('uid')) {
            next()
        } else {
            next('/pages/login/login')
        }
    } else {
        next()
    }
})
// 全局路由后置守卫
router.afterEach((to, from) => {
    console.log('跳转结束')
})

export {
    router,
    RouterMount
}

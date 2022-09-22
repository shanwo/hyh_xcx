import Vue from 'vue'
import App from './App'
import Vconsole from 'vconsole'

if (process.env.NODE_ENV == 'test') {
  new Vconsole()
}
import { common } from '@/utils/tools' // 路径换成自己的
Vue.prototype.$common = common
import { router, RouterMount } from './router/router'
Vue.use(router)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount() // 为了兼容小程序及app端必须这样写才有效果
// #endif

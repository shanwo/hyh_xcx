import Vue from 'vue'
import App from './App'

import uView from 'uview-ui'
Vue.use(uView)
import mixin from './mixin/index'
// import Vconsole from 'vconsole'
// if (process.env.NODE_ENV === 'test') {
//   new Vconsole()
// }
Vue.mixin(mixin)
console.log('process.env', process.env)

import { common } from '@/utils/tools' // 路径换成自己的
Vue.prototype.$common = common

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()


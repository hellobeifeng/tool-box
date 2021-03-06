import Vue from 'vue'
import VueCookie from 'vue-cookie'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store/store'
import App from './app.vue'
import axios from 'axios'
import _ from 'lodash'

import './assets/styles/global.styl'
import './assets/styles/index.styl'

Vue.config.productionTip = false

Vue.use(VueCookie)
Vue.use(ElementUI)

Object.defineProperty(Vue.prototype, '$lodash', { value: _ })
Vue.prototype.axios = axios

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')

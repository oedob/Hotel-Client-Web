import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import BaiduMap from 'vue-baidu-map'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.config.silent = true

Vue.use(BaiduMap, {
  ak: 'GlCoPQS5YK419UZKOaxVlGTweqUTDDI9'
})

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

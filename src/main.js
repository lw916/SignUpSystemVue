// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/style/reset.css'
import './assets/style/border.css'
import fastClick from 'fastclick'
import './assets/style/iconfont.css'
import './assets/style/iconfont/iconfont'
import './assets/style/icon.css'
import axios from 'axios'
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'KLDGRlKLCMKoiB5LbBvASQQQxsLCoW0i'
})

Vue.config.productionTip = false
Vue.prototype.$axios = axios
fastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

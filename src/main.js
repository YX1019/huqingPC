// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import store from './store'
import axios from 'axios'
import {url} from './common/js/url'
require('../static/js/common')
require('../static/js/silder')
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.axios = axios
Vue.prototype.url = url

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  $,
  store, // 使用store
  components: { App },
  template: '<App/>'
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App'
import myFilter from './filter'
import wordBook from './commons/wordBook'

import commonFun from './commons'

// console.log(Vue)

import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

import  { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)

Vue.http.defaults.timeout = 5000;                        //响应时间
Vue.http.defaults.headers.post['Content-Type'] = 'application/raw';           //配置请求头
// Vue.http.defaults.baseURL = 'http://192.168.1.151:8080/wechat/';

// console.log(Vue.http.defaults)
// 点击延迟
// const FastClick = require('fastclick')
// FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

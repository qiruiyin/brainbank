// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App'
import myFilter from './filter'
import wordBook from './commons/wordBook'

import commonFun from './commons'

import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

import  { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)

// 微信
import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)

Vue.http.defaults.timeout = 5000;                        //响应时间
Vue.http.defaults.headers.post['Content-Type'] = 'application/raw';           //配置请求头
// Vue.http.defaults.baseURL = 'http://192.168.1.151:8080/wechat/';

// window.localStorage.setItem("openId", "oOVVesxGmkmuqC8MU3XKR19I3m0g");
// window.localStorage.setItem("userCode", "20170718220214960433651736252496");

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

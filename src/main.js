// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App'
import myFilter from './filter'
import wordBook from './commons/wordBook'
import hold from 'src/commons/hold'

import commonFun from './commons'
// 微信签名
import weixinFun from './commons/weixin.js'

import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

import  { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)

// 微信
import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)

Vue.http.defaults.timeout = 5000;                        //响应时间
Vue.http.defaults.headers.post['Content-Type'] = 'application/raw';           //配置请求头
// Vue.http.defaults.baseURL = '';

// 清楚缓存
// window.localStorage.clear()
// 未绑定
// window.localStorage.setItem("openId", "oOVVes2YmKf-O6ChTa5CrOAELfnU");
// window.localStorage.setItem("openId", "oOVVes7rzHEB4HOXruZiNOkaXNRg");
window.localStorage.setItem("openId", "oOVVesyAwayTie9oX2qAh0wbz9ss");

// 赵陵
// window.localStorage.setItem("openId", "oOVVes2x6v6Iv4wHuDv6dUwvfNTM");
// window.localStorage.setItem("userCode", "20170718220214960433651736252496");
// james 
// window.localStorage.setItem("userCode", "201707281605164831276233257855888");
// 自己
// window.localStorage.setItem("openId", "oOVVesxAHQ4C78mSV8FmQTDUpjPQ");
// window.localStorage.setItem("userCode", "20170718161939537457373403958833");

// frank
// window.localStorage.setItem("openId", "oOVVesy6LW3Vp5YGDRzkFi9HUzIc");
// window.localStorage.setItem("userCode", "20170719115339110483535886346825");

// 马一鸣
// window.localStorage.setItem("openId", "oOVVesw9m3Q8SQbYebfQ05u53BqE");
// window.localStorage.setItem("userCode", "20170721160758734671595511675408");

// ceshi
// window.localStorage.setItem("openId", "oOVVes2x6v6Iv4wHuDv6dUwvfNTM");
// window.localStorage.setItem("userCode", "201708021130406511691757423092769");

// if(!store.state.user.userCode && hold.storage.get("userCode")) {
// 	store.commit('updateUserUserCode', {userCode: hold.storage.get("userCode")});
// }

// if(!store.state.user.openId && hold.storage.get("openId")) {
// 	store.commit('updateUserOpenId', {openId: hold.storage.get("openId")});
// }

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

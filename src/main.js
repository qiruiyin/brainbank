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


// window.localStorage.setItem("openId", "oOVVesxggAc3RBs5XTU0Uf7jIazw");
// 自己
// window.localStorage.setItem("openId", "oOVVesxAHQ4C78mSV8FmQTDUpjPQ");
// 赵陵
// window.localStorage.setItem("userCode", "20170718220214960433651736252496");
// 定向
// window.localStorage.setItem("userCode", "201707281605164831276233257855888");
// 自己
// window.localStorage.setItem("userCode", "20170718161939537457373403958833");

if(!store.state.user.userCode) {
	store.commit('updateUserUserCode', {userCode: hold.storage.get("userCode")});
}
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

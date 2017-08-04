import Vue from 'vue'
import store from '../store'

import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)

// 分享到微信朋友圈
let weChatMoments = (title, desc, promoteUrl, imgUrl) => {
	Vue.wechat.onMenuShareTimeline({
		title : title,
		desc : desc,
		link : promoteUrl,
		imgUrl : imgUrl,
		success : function() {},
		cancel : function() {}
	});
}

// 分享到微信好友
let weChatFriend = (title, desc, promoteUrl, imgUrl) => {
	Vue.wechat.onMenuShareAppMessage({
		title : title,
		desc : desc,
		link : promoteUrl,
		imgUrl : imgUrl,
		success : function() {},
		cancel : function() {}
	});
}

// 分享到qq好友
let tencentQFriend = (title, desc, promoteUrl, imgUrl) => {
	Vue.wechat.onMenuShareQQ({
		title : title,
		desc : desc,
		link : promoteUrl,
		imgUrl : imgUrl,
		success : function() {},
		cancel : function() {}
	});
}

// 分享到腾讯微博
let tencentWeiBo = (title, desc, promoteUrl, imgUrl) => {
	Vue.wechat.onMenuShareWeibo({
		title : title,
		desc : desc,
		link : promoteUrl,
		imgUrl : imgUrl,
		success : function() {},
		cancel : function() {}
	});
}


let setShareProductUrl = (title, desc, promoteUrl, imgUrl) => {
	// showTopMenu(true);
	weChatMoments(title, desc, promoteUrl, imgUrl);
	weChatFriend(title, desc, promoteUrl, imgUrl);
	tencentQFriend(title, desc, promoteUrl, imgUrl);
	tencentWeiBo(title, desc, promoteUrl, imgUrl);
}

let openShare = (baseUrl, title, desc, openId, imgUrl) => {
	if(!openId || openId == null || openId == ''){
		// toastr.error("分享码未取到,不能分享!");
		return false;
	}
	//toastr.info("正在获取分享二维码,请稍后...");
	Vue.http.post("/wechat/wx/qrcode/create",{openId:openId}).then(function(e) {
		let qrcodePath = e.data.data.qrcodePath;
		if(qrcodePath && qrcodePath != null && qrcodePath.length > 0){
			// $("#share-tip").show();
			store.commit("updateUserQrcode", { 'qrcode': baseUrl+qrcodePath + "?time=" + Date.parse(new Date())})
			setShareProductUrl(title, desc, baseUrl+qrcodePath, baseUrl+imgUrl);
		} else {
			// toastr.error("二维码获取失败,请稍后再试!");
			// Vue.vux.toast.text('二维码获取失败,请稍后再试!', 'top')
		}
	});
}

// 微信分享
Vue.prototype.signUrl = (url) => {
	store.commit("updateUserPay", { 'pay': false})
	// store.
  Vue.http.post("/wechat/wx/sign/url",{url: url}).then(function(e) {
  	let data = e.data.data.signature;
  	
  	if(data.status != 0){
			return false;
		}

		store.commit("updateUserPay", { 'pay': true});

		Vue.wechat.config({
			debug : false,
			appId : data.signature.appId,
			timestamp : data.signature.timestamp,
			nonceStr : data.signature.nonceStr,
			signature : data.signature.signature,
			jsApiList : [ 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'showMenuItems', 'hideOptionMenu', 'showOptionMenu', 'hideAllNonBaseMenuItem', 'closeWindow' ]
		});
		Vue.wechat.ready(function() {
			Vue.wechat.checkJsApi({
				jsApiList : [ 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'showMenuItems', 'hideOptionMenu', 'showOptionMenu', 'hideAllNonBaseMenuItem', 'closeWindow' ]
			});
		});
		
		Vue.wechat.error(function(res) {
			if(res.err_msg){
				alert(res.err_msg);
			}
		});

		// openShare("http://test.yoao.com/", "分享", "分享二维码", window.localStorage.getItem("openId"), "");
		openShare("http://glyh.qibeisoft.com/", "分享", "分享二维码", window.localStorage.getItem("openId"), "");
  });
}



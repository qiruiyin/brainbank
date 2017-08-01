import Vue from 'vue'
import router from '../router'
import store from '../store'
import hold from './hold'

import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)

import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)


// 图片链接拼接
Vue.prototype.resolveImg =  function(img) {
	// let imgUrl = 'http://glyh.qibeisoft.com/';
	let imgUrl = 'http://test.yoao.com/';

	// let imgUrl = 'http://192.168.1.170:8080/csm/';
	if(!img || img.substr(0, 4) == "http") {
		return img
	} else {
		return imgUrl + img.replace(/\\/g, '/');
	}
}

// 富文本图片链接地址处理
Vue.prototype.resolveRichTextImg = function(text) {
	// let textUrl = 'http://glyh.qibeisoft.com';
	let textUrl = 'http://test.yoao.com';
	if(!text) return text;
	text = text.replace(/<img\ssrc=\"http/g, '-CC309AB4-89E6-44D2-9A7C-A8F33F40F3BB-');
	text = text.replace(/<img\ssrc=\"/g, "<img src=\""+ textUrl);
	text = text.replace(/\-CC309AB4\-89E6\-44D2\-9A7C\-A8F33F40F3BB\-/g, "<img src=\"http");
	return text;
}

// 视频链接拼接
Vue.prototype.resolveVideo =  function(video) {
	// let imgUrl = 'http://glyh.qibeisoft.com/';
	let imgUrl = 'http://test.yoao.com/';
	// let videoUrl = 'http://192.168.1.170:8080/csm/';
	if(!video) {
		return video
	} else {
		return videoUrl + video.replace(/\\/g, '/');
	}
}

// 处理首页通用的字段转换
Vue.prototype.resolveField =  function (_this, $obj, datas, img, link, url = "") {
	// 获取banner数据并处理
	let arr = [];

	if(datas && datas.length > 0) {
		arr = datas.map((item, i) => {
			let data = "";
			// if(url != "" && item[url]) 
			// data =  item[url].replace("http://test.yoao.com/mobile/wechat/index.html", "http://localhost:9001")

			return {
				img: Vue.prototype.resolveImg(item[img]),
				link: link,
				url: data,
				name: item.name,
				desc: item.description,
				price: item.price,
				code: item.code
			}
		})
	}

	_this[$obj] = arr;
}

// 判断数组中是否包含指定元素
Vue.prototype.arrContain = function(arr, obj) {
	let status = false;

	if(arr && arr.length > 0) {
		arr.map(function(item, index){
			if(item == obj) {
				status = true
				return
			}
		})
	}
	return status;
}

// 支付订单

// Vue.prototype.payOrder = (_this) => {
// 	_this.$http.post('/wechat/order/pay/prepare',
// 			{
// 				"openId": _this.$store.state.user.openId,
// 				"orderCode": _this.pay.list[0].value,
// 			}
// 		).then(function(e) {
// 			// let responseData = e.data.data,
// 			// 		weixinConfig = {
// 			// 			"appId": responseData.payment.appId,     //公众号名称，由商户传入     
//    //         	"timeStamp": responseData.payment.timeStamp,         //时间戳，自1970年以来的秒数     
//    //          "nonceStr": responseData.payment.nonceStr, //随机串     
//    //          "package": responseData.payment.packageValue,     
//    //          "signType": "MD5",         //微信签名方式：     
//    //          "paySign": responseData.payment.paySign //微信签名 
// 			// 		};
// 			// WeixinJSBridge.invoke(
//    //     'getBrandWCPayRequest', weixinConfig,
//    //     function(res){
//    //     		alert(res.err_msg)
//    //        if(res.err_msg == "get_brand_wcpay_request:ok" ) {
//    //        	// alert("")
//    //        }
//    //         // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
//    //     })
// 	});
// }

// 是否登录
Vue.prototype.isLogin = () => {
  if(store.state.user.userCode == '') {
		Vue.$vux.confirm.show({
	    content: '您还没有绑定信息, 确定去绑定信息',
	    onCancel () {
	    	return false
	    },
	    onConfirm () {
	      router.push({name: 'bangding'});
	    }
	  });
  } else {
  	return true
	} 
}

// 登陆后页面跳转方法
Vue.prototype.goBeforeLoginUrl = () => {
  let url = hold.session.get('beforeLoginUrl')
  if(!url || url.indexOf('/author') != -1){
    router.push('/index')
  }else{
    if(url == '/'){
      url = '/index'
    }
    router.push(url)
    hold.session.set('beforeLoginUrl', '')
  }
}

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
  Vue.http.post("/wechat/wx/sign/url",{url: url}).then(function(e) {
  	let data = e.data.data.signature;
  	
  	if(data.status != 0){
			return false;
		}

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
		// showTopMenu(false);
		
		Vue.wechat.error(function(res) {
			if(res.err_msg){
				alert(res.err_msg);
			}
		});

		openShare("http://test.yoao.com/", "分享", "分享二维码", window.localStorage.getItem("openId"), "");
		// openShare("http://glyh.qibeisoft.com/", "分享", "分享二维码", window.localStorage.getItem("openId"), "");
  });
}



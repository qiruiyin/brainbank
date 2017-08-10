import Vue from 'vue'
import router from '../router'
import store from '../store'
import hold from './hold'

import wordBook from './wordBook'

import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)

import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

// 获取userCode
Vue.prototype.getUserCode = (openId,url = "") => {
	Vue.http.post('/wechat/discover/usercode/get',
			{
				"openId": openId
			}
		).then(function(e) {
			Vue.prototype.getUserInfo(openId, e.data.data.userCode, url);
	});
};

// 获取用户信息
Vue.prototype.getUserInfo = (openId, userCode = "", url = "") => {
	hold.storage.set("openId", openId);
	hold.storage.set("userCode", userCode);
	store.commit("updateUserUserCode", { userCode: userCode });
	store.commit("updateUserOpenId", { openId: openId });

	if(userCode) {
		store.commit('updateUserBangdingStatus', {bangdingStatus: true});
	}

  Vue.http.post('/wechat/discover/userinfo/get',
			{
				"userCode": userCode,
				"openId": openId
			}
		).then(function(e) {
			let responseData = e.data.data,
					headerUrl = Vue.prototype.resolveImg(responseData.headerUrl);

			store.commit('updateUserImg', {img: headerUrl});
			store.commit('updateUserName', {name: responseData.name})
			store.commit('updateUserCourse', {course: responseData.levelName})

			if(url) {
				router.push(url);
			}
		}); 
}

// 图片链接拼接
Vue.prototype.resolveImg =  function(img) {
	let imgUrl = 'http://glyh.qibeisoft.com/';
	// let imgUrl = 'http://test.yoao.com/';

	if(!img || img.substr(0, 4) == "http") {
		return img
	} else {
		return imgUrl + img.replace(/\\/g, '/');
	}
}

// 富文本图片链接地址处理
Vue.prototype.resolveRichTextImg = function(text) {
	let textUrl = 'http://glyh.qibeisoft.com';
	// let textUrl = 'http://test.yoao.com';
	if(!text) return text;
	text = text.replace(/<img\ssrc=\"http/g, '-CC309AB4-89E6-44D2-9A7C-A8F33F40F3BB-');
	text = text.replace(/<img\ssrc=\"/g, "<img src=\""+ textUrl);
	text = text.replace(/\-CC309AB4\-89E6\-44D2\-9A7C\-A8F33F40F3BB\-/g, "<img src=\"http");
	return text;
}

// 视频链接拼接
Vue.prototype.resolveVideo =  function(video) {
	let imgUrl = 'http://glyh.qibeisoft.com/';
	// let imgUrl = 'http://test.yoao.com/';

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

// 是否登录
Vue.prototype.isLogin = () => {
  if(store.state.user.userCode == '') {
		Vue.$vux.confirm.show({
	    content: '为倡导绿色、安全的网络学习环境，敬请您进行身份证实名认证，认证成功即可获得1000积分！',
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

// 商品访问统计
Vue.prototype.visitCount = (code) => {
	Vue.http.post('/wechat/discover/addProductViewCount',
		{
			"code": code
		}
	).then(function(e) {

	});
} 

Vue.prototype.invokePay = (data, url) => {
	let weixinConfig = {
			"appId": data.payment.appId,     //公众号名称，由商户传入     
     	"timeStamp": data.payment.timeStamp,         //时间戳，自1970年以来的秒数     
      "nonceStr": data.payment.nonceStr, //随机串     
      "package": data.payment.packageValue,     
      "signType": "MD5",         //微信签名方式：     
      "paySign": data.payment.paySign //微信签名 
		};
	WeixinJSBridge.invoke(
   'getBrandWCPayRequest', weixinConfig,
   function(res){
      if(res.err_msg == "get_brand_wcpay_request:ok" ) {
     		if(url != "") {
     			router.push(url);
     		} else {
     			router.go(0);
     		}
      } else if(res.err_msg == "get_brand_wcpay_request:cancel" ) {
     		router.go(0);
      } else if(res.err_msg == "get_brand_wcpay_request:fail" ) {
      	// Vue.
      	Vue.$vux.alert.show({
      		content: "调取微信接口失败"
      	})
      } 
       // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
   })
}

// 支付订单
Vue.prototype.payWeixinOrder = (orderCode, url = "", orderType = "4", type) => {
	// orderType : 1 课程 2 音视频 3 奖赏 4 商城
	// type 

	if(type == 1) {
		Vue.http.post('/wechat/order/pay/enroll/prepare',
			{
				"openId": store.state.user.openId,
				"groupCode": orderCode,
			}).then(function(e) {
				if(e.data.errcode == 1) {
					Vue.prototype.invokePay(e.data.data, url)
				} else {
					Vue.$vux.alert.show({
						content: e.data.errmsg
					})
				}
		})
	} else {
		Vue.http.post('/wechat/order/pay/prepare',
				{
					"openId": store.state.user.openId,
					"orderCode": orderCode,
				}
			).then(function(e) {
				if(e.data.errcode == 1) {
					Vue.prototype.invokePay(e.data.data, url)
				} else {
					Vue.$vux.alert.show({
						content: e.data.errmsg
					})
				}
		});
	}
}

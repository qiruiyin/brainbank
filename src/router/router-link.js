// 路由到path

// 例如：复训retrain

// query参数传递 :/retain?lessonCode=值&lessonType=值

// 例如：courseOrder

// path上的冒号参数传递：/confirm-order/1 1为参数值

import loadView from './async-view-loader'

const routes = [
	{
		path: '*',
		redirect: '/index' 
	},{
		path: '/index',
		name: 'index',
		component:  loadView(loaded => {
			require(['../modules/index/index.vue'], loaded)
		}),
		meta: {
			title: '大脑银行',
			routerTitle: '公众号首页'
		}
	},{
		path: '/author',
		name: 'author',
		component:  loadView(loaded => {
			require(['../modules/author/author.vue'], loaded)
		}),
		meta: {
			title: '大脑银行'
		}
	},{
		path: '/bangding',
		name: 'bangding',
		component:  loadView(loaded => {
			require(['../modules/index/bangding.vue'], loaded)
		}),
		meta: {
			title: '信息绑定'
		}
	},{
		path: '/sign-code',
		name: 'signCode',
		query: {
			code: "", // ticketcode
		},
		component:  loadView(loaded => {
			require(['../modules/index/sign-code.vue'], loaded)
		}),
		meta: {
			title: '签到二维码'
		}
	},{
		path: '/retrain',
		name: 'retrain',
		query: {
			lessonCode: "", // 课程期数code
			lessonType: "" // 课程期数类型
		},
		component:  loadView(loaded => {
			require(['../modules/index/header/retrain.vue'], loaded)
		}),
		meta: {
			title: '学员须知'
		}
	},{
		// 废弃
		path: '/register',
		name: 'register',
		component:  loadView(loaded => {
			require(['../modules/index/register.vue'], loaded)
		}),
		meta: {
			title: '注册'
		}
	},{
		// 废弃
		path: '/info-add',
		name: 'infoAdd',
		component:  loadView(loaded => {
			require(['../modules/index/info-add.vue'], loaded)
		}),
		meta: {
			title: '信息补充'
		}
	},{
		path: '/questionnaire',
		name: 'questionnaire',
		query: {
			productCode: "", // 产品code
			groupCode: "", // 组code
			orderCode: "" // 订单code
		},
		component:  loadView(loaded => {
			require(['../modules/index/questionnaire.vue'], loaded)
		}),
		meta: {
			title: '问卷调查'
		}
	},{
		path: '/confirm-order/:payType', // 支付类型1: 复训， 0：报名
		name: 'courseOrder',
		component:  loadView(loaded => {
			require(['../modules/index/course-order.vue'], loaded)
		}),
		meta: {
			title: '大脑银行'
		}
	},{
		path: '/order-done',
		name: 'orderDone',
		query: {
			groupCode: "", // 组code
			orderCode: "" // 订单code
		},
		component:  loadView(loaded => {
			require(['../modules/order/order-done.vue'], loaded)
		}),
		meta: {
			title: '订单完成'
		}
	},{
		path: '/order-done-mall',
		name: 'orderDoneMall',
		query: {
			orderCode: "" // 订单code (是否传类别，待定)
		},
		component:  loadView(loaded => {
			require(['../modules/order/order-done-mall.vue'], loaded)
		}),
		meta: {
			title: '订单完成'
		}
	},{
		// 废弃
		path: '/pay',
		name: 'pay',
		component:  loadView(loaded => {
			require(['../modules/index/pay.vue'], loaded)
		}),
		meta: {
			title: '大脑银行'
		}
	// },{
	// 	path: '/upgrade/:payType',
	// 	name: 'upgrade',
	// 	component:  loadView(loaded => {
	// 		require(['../modules/index/pay.vue'], loaded)
	// 	}),
	// 	meta: {
	// 		title: '大脑银行'
	// 	}
	},{
		// 废弃
		path: '/banner/:bannerCode',
		name: 'banner',
		component:  loadView(loaded => {
			require(['../modules/banner/banner.vue'], loaded)
		}),
		meta: {
			title: '大脑银行'
		}
	},{
		path: '/rank/:type', // video：视频， audio: 音频
		name: 'rankList',
		component:  loadView(loaded => {
			require(['../modules/rank/list.vue'], loaded)
		}),
		meta: {
			title: '排行榜',
			routerTitle: {
				video: '视频程序首页',
				audio: '音频程序首页'
			}
		}
	},{
		path: '/list-download',
		name: 'downloadList',
		component:  loadView(loaded => {
			require(['../modules/rank/list-download.vue'], loaded)
		}),
		meta: {
			title: '资料下载'
		}
	},{
		path: '/list-course', 
		name: 'courseList',
		query: {
			typeCode: "" // 资料类型
		},
		component:  loadView(loaded => {
			require(['../modules/rank/list-course.vue'], loaded)
		}),
		meta: {
			title: '资料下载'
		}
	},{
		path: '/quotation',
		name: 'quotation',
		component:  loadView(loaded => {
			require(['../modules/quotation/quotation.vue'], loaded)
		}),
		meta: {
			title: '经典语录',
			routerTitle: '经典语录'
		}
	},{
		path: '/quotation-send',
		name: 'quotationSend',
		component:  loadView(loaded => {
			require(['../modules/quotation/send.vue'], loaded)
		}),
		meta: {
			title: '发送语录'
		}
	},{
		path: '/quotation-add',
		name: 'quotationAdd',
		component:  loadView(loaded => {
			require(['../modules/quotation/add.vue'], loaded)
		}),
		meta: {
			title: '发布语录'
		}
	},{
		// 课程
		path: '/course',
		name: 'course',
		query: {
			type: "", // 1：近期课程，0：所有课程，只是课程切换
		},
		component:  loadView(loaded => {
			require(['../modules/course/course.vue'], loaded)
		}),
		meta: {
			title: '课程',
			routerTitle: '课程首页'
		}
	},{
		// 课程详情
		path: '/course-detail',
		name: 'courseDetail',
		force: true,
		query: {
			courseCode: "" // 课程code
		},
		component:  loadView(loaded => {
			require(['../modules/course/detail-course.vue'], loaded)
		}),
		meta: {
			title: '课程详情',
			routerTitle: '课程详情'
		}
	},{
		// 视频及音频详情
		path: '/course-type-detail', // type: video视频、audio音频，code产品code
		name: 'courseTypeDetail',
		force: true,
		query: {
			type: "", // type: video视频、audio音频、course：课程视频
			code: "" // code产品code
		},
		component: loadView(loaded => {
			require(['../modules/course/detail-type.vue'], loaded)
		}),
		meta: {
			title: '详情',
			routerTitle: {
				video: "视频播放页面",
				audio: "音频播放页面"
			}
		}
	// },{
	// 	// 课程 audio详情
	// 	path: '/audio/detail/:id',
	// 	name: 'audioDetail',
	// 	component:  loadView(loaded => {
	// 		require(['../modules/course/audio-detail.vue'], loaded)
	// 	}),
	// 	meta: {
	// 		title: '音频课详情'
	// 	}
	},{
		// 消息
		path: '/msg',
		name: 'msg',
		component:  loadView(loaded => {
			require(['../modules/msg/msg.vue'], loaded)
		}),
		meta: {
			title: '消息列表',
			routerTitle: '消息列表页'
		}
	},{
		// 消息
		path: '/msg-detail',
		name: 'msgDetail',
		query: {
			// openId: "", // openId
			sendUser: "", // sendUser
			msgType: "" // 消息类型：1：系统消息，2：订单消息，3：普通用户消息
		},
		component:  loadView(loaded => {
			require(['../modules/msg/msg-detail.vue'], loaded)
		}),
		meta: {
			title: '消息详情'
		}
	},{
		// 消息（废弃）
		path: '/msg/add',
		name: 'msgAdd',
		component:  loadView(loaded => {
			require(['../modules/msg/add.vue'], loaded)
		}),
		meta: {
			title: '发送消息'
		}
	},{
		// 用户中心
		path: '/user-center',
		name: 'userCenter',
		component:  loadView(loaded => {
			require(['../modules/user-center/user-center.vue'], loaded)
		}),
		meta: {
			title: '大脑银行',
			routerTitle: '个人中心列表页'
		}
	},{
		path: '/kefu',
		name: 'kefu',
		component:  loadView(loaded => {
			require(['../modules/user-center/kefu/kefu.vue'], loaded)
		}),
		meta: {
			title: '我的客服'
		}
	},{
		path: '/kefu-detail', 
		name: 'kefuDetail',
		query: {
			serviceCode: "" // serviceCode是客服的CODE
		},
		component:  loadView(loaded => {
			require(['../modules/user-center/kefu/kefu-detail.vue'], loaded)
		}),
		meta: {
			title: '我的客服详情'
		}
	},{
		path: '/share',
		name: 'share',
		component:  loadView(loaded => {
			require(['../modules/user-center/share/share.vue'], loaded)
		}),
		meta: {
			title: '分享有奖'
		}
	},{
		path: '/personal-edit',
		name: 'personalEdit',
		component:  loadView(loaded => {
			require(['../modules/user-center/personal/edit.vue'], loaded)
		}),
		meta: {
			title: '修改资料'
		}
	},{
		path: '/integral',
		name: 'integral',
		component:  loadView(loaded => {
			require(['../modules/user-center/integral/integral.vue'], loaded)
		}),
		meta: {
			title: '我的好友'
		}
	},{
		path: '/feedback',
		name: 'feedback',
		component:  loadView(loaded => {
			require(['../modules/user-center/feedback/feedback.vue'], loaded)
		}),
		meta: {
			title: '问题反馈'
		}
	},{
		path: '/tuisong',
		name: 'tuisong',
		component:  loadView(loaded => {
			require(['../modules/user-center/tuisong/tuisong.vue'], loaded)
		}),
		meta: {
			title: '推送设置'
		}
	},{
		// 商城
		path: '/mall',
		name: 'mall',
		component:  loadView(loaded => {
			require(['../modules/mall/mall.vue'], loaded)
		}),
		meta: {
			title: '商城首页'
		}
	},{
		// 商城产品列表
		path: '/mall-list', // 商品类型：book: 书籍, cd: 光盘，如需新增，直接在后台新增即可
		name: 'mallList',
		query: {
			type: "" // 商品类型：book: 书籍, cd: 光盘，如需新增，直接在后台新增即可
		},
		component:  loadView(loaded => {
			require(['../modules/mall/list.vue'], loaded)
		}),
		meta: {
			title: '产品列表'
		}
	},{
		// 商城详情
		path: '/mall-detail',
		name: 'mallDetail',
		query: {
			goodsCode: "", // 商品code
			type: '' // 显示tab
		},
		component:  loadView(loaded => {
			require(['../modules/mall/detail.vue'], loaded)
		}),
		meta: {
			title: '商品详情'
		}
	},{
		// 课程订单
		path: '/order-list-course',
		name: 'orderCourseList',
		component:  loadView(loaded => {
			require(['../modules/order/order-course.vue'], loaded)
		}),
		meta: {
			title: '订单列表'
		}
	},{
		// 商城订单
		path: '/order-list-mall',
		name: 'orderMallList',
		// query: {
		// 	type: '' // 订单状态，可以不传，不传就是tab第一个，1：tab第二个，2：tab第三个
		// },
		component:  loadView(loaded => {
			require(['../modules/order/mall-list.vue'], loaded)
		}),
		meta: {
			title: '订单列表'
		}
	},{
		// 资料订单
		path: '/order-list-source',
		name: 'orderSourceList',
		component:  loadView(loaded => {
			require(['../modules/order/source-list.vue'], loaded)
		}),
		meta: {
			title: '订单列表'
		}
	},{
		// 订单
		path: '/confirm-order',
		name: 'confirmOrder',
		query: {
			orderCode: "" // 订单code
		},
		component:  loadView(loaded => {
			require(['../modules/order/confirm-order.vue'], loaded)
		}),
		meta: {
			title: '订单'
		}
	},{
		// 购物车
		path: '/shop-cart',
		name: 'shopCart',
		component:  loadView(loaded => {
			require(['../modules/shop-cart/shop-cart.vue'], loaded)
		}),
		meta: {
			title: '购物车'
		}
	},{
		// 地址信息
		path: '/address',
		name: 'address', 
		query: {
			orderCode: "" // 订单code,用来判定是不是来自订单
		},
		component:  loadView(loaded => {
			require(['../modules/address/address.vue'], loaded)
		}),
		meta: {
			title: '地址信息'
		}
	},{
		// 地址信息
		path: '/address/add',
		name: 'addressAdd',
		query: {
			orderCode: "", // 订单code,用来判定是不是来自订单
			url: "", // 上一个url路由名字
		},
		component:  loadView(loaded => {
			require(['../modules/address/address-add.vue'], loaded)
		}),
		meta: {
			title: '地址新增'
		}
	},{
		// 地址编辑
		path: '/address-edit',
		name: 'addressEdit',
		query: {
			orderCode: "" // 订单code,用来判定是不是来自订单
		},
		component:  loadView(loaded => {
			require(['../modules/address/address-edit.vue'], loaded)
		}),
		meta: {
			title: '地址编辑'
		}
	// },{
	// 	// 订单
	// 	path: '/order/detail',
	// 	name: 'orderDetail',
	// 	component:  loadView(loaded => {
	// 		require(['../modules/order/detail.vue'], loaded)
	// 	}),
	// 	meta: {
	// 		title: '订单详情'
	// 	}
	}
]

export default routes
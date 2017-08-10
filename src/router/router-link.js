import loadView from './async-view-loader'

const routes = [
	{
		path: '*',
		redirect: '/index' 
	},{
		path: '/form',
		name: 'form',
		component:  loadView(loaded => {
			require(['../components/form/form.vue'], loaded)
		}),
		meta: {
			title: '大脑银行'
		}
	},{
		path: '/index',
		name: 'index',
		component:  loadView(loaded => {
			require(['../modules/index/index.vue'], loaded)
		}),
		meta: {
			title: '大脑银行'
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
		path: '/header/:introType',
		name: 'intro',
		component:  loadView(loaded => {
			require(['../modules/index/header/intro.vue'], loaded)
		}),
		meta: {
			title: '复训须知'
		}
	},{
		path: '/register',
		name: 'register',
		component:  loadView(loaded => {
			require(['../modules/index/register.vue'], loaded)
		}),
		meta: {
			title: '注册'
		}
	},{
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
		component:  loadView(loaded => {
			require(['../modules/index/questionnaire.vue'], loaded)
		}),
		meta: {
			title: '问卷调查'
		}
	},{
		path: '/confirm-order/:payType',
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
		component:  loadView(loaded => {
			require(['../modules/order/order-done.vue'], loaded)
		}),
		meta: {
			title: '订单完成'
		}
	},{
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
		path: '/banner/:bannerCode',
		name: 'banner',
		component:  loadView(loaded => {
			require(['../modules/banner/banner.vue'], loaded)
		}),
		meta: {
			title: '大脑银行'
		}
	},{
		path: '/rank/:type',
		name: 'rankList',
		component:  loadView(loaded => {
			require(['../modules/rank/list.vue'], loaded)
		}),
		meta: {
			title: '排行榜'
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
		path: '/list-course/:typeCode',
		name: 'courseList',
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
			title: '经典语录'
		}
	},{
		// 课程
		path: '/course',
		name: 'course',
		component:  loadView(loaded => {
			require(['../modules/course/course.vue'], loaded)
		}),
		meta: {
			title: '课程'
		}
	},{
		// 课程详情
		path: '/course-detail/:courseCode',
		name: 'courseDetail',
		component:  loadView(loaded => {
			require(['../modules/course/detail-course.vue'], loaded)
		}),
		meta: {
			title: '课程详情'
		}
	},{
		// 视频及音频详情
		path: '/course-type-detail/:type/:code',
		name: 'courseTypeDetail',
		component: loadView(loaded => {
			require(['../modules/course/detail-type.vue'], loaded)
		}),
		meta: {
			title: '详情'
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
			title: '消息列表'
		}
	},{
		// 消息
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
			title: '大脑银行'
		}
	},{
		path: '/user-center/kefu',
		name: 'kefu',
		component:  loadView(loaded => {
			require(['../modules/user-center/kefu/kefu.vue'], loaded)
		}),
		meta: {
			title: '我的客服'
		}
	},{
		path: '/user-center/kefu-detail/:serviceCode',
		name: 'kefuDetail',
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
		path: '/user-center/personal-edit',
		name: 'personalEdit',
		component:  loadView(loaded => {
			require(['../modules/user-center/personal/edit.vue'], loaded)
		}),
		meta: {
			title: '修改资料'
		}
	},{
		path: '/user-center/integral',
		name: 'integral',
		component:  loadView(loaded => {
			require(['../modules/user-center/integral/integral.vue'], loaded)
		}),
		meta: {
			title: '我的推广积分'
		}
	},{
		path: '/user-center/feedback',
		name: 'feedback',
		component:  loadView(loaded => {
			require(['../modules/user-center/feedback/feedback.vue'], loaded)
		}),
		meta: {
			title: '问题反馈'
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
		path: '/mall/list/:type',
		name: 'mallList',
		component:  loadView(loaded => {
			require(['../modules/mall/list.vue'], loaded)
		}),
		meta: {
			title: '产品列表'
		}
	},{
		// 商城详情
		path: '/mall/detail/:goodsCode',
		name: 'mallDetail',
		component:  loadView(loaded => {
			require(['../modules/mall/detail.vue'], loaded)
		}),
		meta: {
			title: '商品详情'
		}
	},{
		// 课程订单
		path: '/order/list/course',
		name: 'orderCourseList',
		component:  loadView(loaded => {
			require(['../modules/order/course.vue'], loaded)
		}),
		meta: {
			title: '订单列表'
		}
	},{
		// 商城订单
		path: '/order/list/mall',
		name: 'orderMallList',
		component:  loadView(loaded => {
			require(['../modules/order/mall-list.vue'], loaded)
		}),
		meta: {
			title: '订单列表'
		}
	},{
		// 资料订单
		path: '/order/list/source',
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
		component:  loadView(loaded => {
			require(['../modules/address/address-add.vue'], loaded)
		}),
		meta: {
			title: '地址新增'
		}
	},{
		// 地址编辑
		path: '/address/edit/:code',
		name: 'addressEdit',
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
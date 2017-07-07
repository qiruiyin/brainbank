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
			title: '大脑银行'
		}
	},{
		path: '/retrain',
		name: 'retrain',
		component:  loadView(loaded => {
			require(['../modules/index/enlist.vue'], loaded)
		}),
		meta: {
			title: '大脑银行'
		}
	},{
		path: '/upgrade',
		name: 'upgrade',
		component:  loadView(loaded => {
			require(['../modules/index/enlist.vue'], loaded)
		}),
		meta: {
			title: '大脑银行'
		}
	},{
		path: '/banner/:bannerId',
		name: 'banner',
		component:  loadView(loaded => {
			require(['../modules/banner/banner.vue'], loaded)
		}),
		meta: {
			title: '富文本'
		}
	},{
		path: '/list/:type',
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
		path: '/list-course',
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
		// 课程 video详情
		path: '/detail/video/:id',
		name: 'videoDetail',
		component:  loadView(loaded => {
			require(['../modules/course/video-detail.vue'], loaded)
		}),
		meta: {
			title: '视频课详情'
		}
	},{
		// 课程 audio详情
		path: '/detail/audio/:id',
		name: 'audioDetail',
		component:  loadView(loaded => {
			require(['../modules/course/audio-detail.vue'], loaded)
		}),
		meta: {
			title: '音频课详情'
		}
	},{
		// 消息
		path: '/msg',
		name: 'msg',
		component:  loadView(loaded => {
			require(['../modules/msg/msg.vue'], loaded)
		}),
		meta: {
			title: '大脑银行'
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
		path: '/user-center/kefu-detail',
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
	}
]

export default routes
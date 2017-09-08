<!-- 
	用户中心
 -->

<template>
	<div class="user-center" v-cloak>
		<div class="user-center-header">
			<div class="img" @click="checkLogin({name: personData.url}, personData.click)">
				<img :src="user.img" alt="">
				<p>{{ user.name }}
					<span>{{ user.course }}</span>
				</p>
			</div>
			<div class="qrcode" @click="checkLogin({name: shareData.url}, shareData.click)"></div>
		</div>

		<main>
			<div v-show="item.show" class="user-center-block" v-for="(item, index) in operations" :key="index">
				<div v-if="item.name" class="user-center-block-title">{{ item.name }}</div>
				<div class="user-center-block-content">
					<template v-for="(listItem, listInd) in item.list">
						<div v-if="listItem.show" class="user-center-operate" @click="checkLogin({name: listItem.url}, listItem.click)">
							<i :class="['icon', 'icon-user-' + listItem.icon]"></i>
							{{ listItem.name }}
						</div>
					</template>
				</div>
			</div>
		</main>	
	</div>
</template>

<script type="text/babel">
	import { mapState } from 'vuex'
	import { Group, Cell } from 'vux'
	import hold from 'src/commons/hold'
	
	export default {
		components: {
			Group, Cell
		},
		data () {
			return {
				title: '用户中心',
				kefuUrl: 'kefu',
				personData: {
					value: '',
					name: '个人资料',
					url: 'personal',
					icon: 'person',
					click: false,  // 不绑定是否可点击
					show: true
				},
				shareData: {
					value: '',
					name: '分享给好友',
					url: 'share',
					icon: 'share',
					click: true, // 不绑定是否可点击
					show: true,
				},
				operations: [
					{
						name: "",
						show: true,
						list: [
							{
								value: '',
								name: '我的客服',
								url: 'kefu',
								icon: 'kefu',
								click: true, // 不绑定是否可点击
								show: true
							},{
								value: '',
								name: '分享给好友',
								url: 'share',
								icon: 'share',
								click: true, // 不绑定是否可点击
								show: true,
							},{
								value: '',
								name: '我的好友',
								url: 'integral',
								icon: 'haoyou',
								click: false,
								show: true
							}
						]
					},{
						name: "我的交易",
						show: true,
						list: [
							{
								value: '',
								name: '商城订单',
								url: 'orderMallList',
								icon: 'mall',
								click: false,
								show: true
							},{
								value: '',
								name: '课程订单',
								url: 'orderCourseList',
								icon: 'course',
								click: false,
								show: true
							},{
								value: '',
								name: '我的学习',
								url: 'orderSourceList',
								icon: 'study',
								click: false,
								show: true
							},
						]
					},{
						name: "我的设置",
						show: true,
						list: [
							{
								value: '',
								name: '经典语录',
								url: 'quotationSend',
								icon: 'quotation',
								click: true,
								show: false
							},{
								value: '',
								name: '意见反馈',
								url: 'feedback',
								icon: 'feedback',
								click: true,
								show: true
							},{
								value: '',
								name: '推送设置',
								url: 'tuisong',
								icon: 'tuisong',
								click: true,
								show: true
							},{
								value: 'clear',
								name: '清空缓存',
								url: '',
								icon: 'clear',
								click: true,
								show: true
							}
						]
					},{
						name: "我的助手",
						show: false,
						list: [
							{
								value: '',
								name: '业务办理',
								url: 'http://m.yoao.com/mobile/index.jsp?openId=' + this.$store.state.user.openId,
								icon: 'yewu',
								click: true,
								show: true
							},{
								value: '',
								name: '协同办公',
								url: 'http://m.yoao.com/mobile/index.jsp?openId=' + this.$store.state.user.openId,
								icon: 'xietong',
								click: true,
								show: true
							}
						]
					}
				]
			}
		},
		computed: {
	    ...mapState({
	      user: state => state.user,
	    })
	  },
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;
				this.$http.post('/wechat/usercenter/zjl',
					{
						openId: _this.user.openId
					}).then(function(e) {
						if(e.data.errcode == 1) {
							_this.operations[2].list[0].show = true;
						}
					})
				this.$http.post('/wechat/usercenter/isSysUser',
					{
						openId: _this.user.openId
					}).then(function(e) {
						if(e.data.errcode == 1) {
							_this.operations[3].show = e.data.data.isUser;
							// _this.operations[_this.operations.length - 1].list[0].show = true;
						}
					})
			},
			clearStorage () {
				hold.storage.clear();
				this.$router.push({name: 'index'})
			},
			checkLogin (url, data) {
				if(!data) {
					if(!this.isLogin()) return false
				}

				if(url.name) {
					if(/http/.test(url.name)) {
						location.href = url.name;
					} else {
						this.$router.push(url); 
					}
				} else {
					this.clearStorage(); 
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	@import '~assets/css/icon';
	
	$userCenterheaderImgW: 50px;
	
	$userCenterIconW: 22px;

	.user-center-header {
		position: relative;
		padding: 15px;
		padding-right: 80px;
		border-top: $uiMarginH solid $uiMarginBg;
		border-bottom: $uiMarginH solid $uiMarginBg;

		.img {
			position: relative;
			padding-left: 60px + 15px;
			height: 60px;
			@extend %clearfix;
			color: $fontColorBlack;
			line-height: 2;

			p {
				font-size: 16px;
				@include ellipsisMore(1);
			}

			span {
				font-size: 14px;
				display: block;
			}
		}

		img {
			position: absolute;
			top: 0;
			left: 0;
			width: 60px;
			height: 60px;
			border-radius: $borderRadius;
		}

		.qrcode {
			position: absolute;
			right: $padding + 20px;
			top: 50%;
			width: 19px;
			height: 19px;
			margin-top: -10px;
			background: url("~assets/img/icon/user-qrcode.png") no-repeat;
			background-size: 100%;

			&:before {
				content: "";
				position: absolute;
				top: 50%;
				right: -20px;
				width: 10px;
				height: 17px;
				margin-top: -9px;
				background: url("~assets/img/icon/you.png") no-repeat;
				background-size: 100%;
			}
		}
	}

	.user-center-block {

	}

	.user-center-block-title {
		line-height: 30px;
		text-indent: $padding;
		background: $uiMarginBg;
	}

	.user-center-block-content {
		@extend %clearfix;
		text-align: center;
	}

	.user-center-operate {
		@include halfpxline(0, $uiMarginBg, 0, 2px, 2px, 0);
		position: relative;
		float: left;
		width: 33.33%;
		height: 90px;
		padding-top: 60px;
		padding-left: 0;
		background-color: #fff;

		&:nth-child(3n) {
			@include halfpxline(0, $uiMarginBg, 0, 0, 2px, 0);
		}
		
		i {
			position: absolute;
			top: 30px;
			left: 50%;
			margin-left: -15px;
			display: block;
		}
	}
</style>
<!-- 
	用户中心
 -->

<template>
	<div class="user-center" v-cloak>
		<header>
			<img :src="user.img" alt="">
			<!-- <p>{{ user.openId }}</p> -->
			<div class="header-info">
				<p>{{ user.name }}</p>
				<p>{{ user.course }}</p>
			</div>
		</header>

		<main>
			<group v-for="(groupItem, groupIndex) in operations" :key="groupIndex">
				<cell v-show="item.show" v-for="(item, index) in groupItem.list" @click.native="checkLogin({name: item.url}, item.click)" :title="item.name" :key="index" is-link>
	        <i slot="icon" :class="['icon', 'icon-user-' + item.icon]"></i>
	      </cell>
			</group>
      <!-- <cell @click.native="clearStorage" :title="clearData.name" >
        <i slot="icon" :class="['fa', 'fa-' + clearData.icon ]"></i>
      </cell> -->
		</main>	
	</div>
</template>

<script type="text/babel">
	import { mapState } from 'vuex'
	import { Group, Cell } from 'vux'
	
	export default {
		components: {
			Group, Cell
		},
		data () {
			return {
				title: '用户中心',
				kefuUrl: 'kefu',
				operations: [
					{
						list: [
							{
								value: '',
								name: '我的客服',
								url: 'kefu',
								icon: 'kefu',
								click: false, // 不绑定是否可点击
								show: true
							},{
								value: '',
								name: '分享给好友',
								url: 'share',
								icon: 'share',
								click: true, // 不绑定是否可点击
								show: true,
							}
						]
					},{
						list: [
							{
								value: '',
								name: '个人资料',
								url: 'personalEdit',
								icon: 'person',
								click: false,  // 不绑定是否可点击
								show: true
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
						list: [
							{
								value: '',
								name: '地址管理',
								url: 'address',
								icon: 'address',
								click: false,
								show: true
							}
						]
					},{
						list: [
							{
								value: '',
								name: '编辑语录',
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
							_this.operations[_this.operations.length - 1].list[0].show = true;
						}
					})
			},
			clearStorage () {
				window.localStorage.clear();
				this.$router.push({name: 'index'})
			},
			checkLogin (url, data) {
				if(data) {
					if(url.name) {
						this.$router.push(url); 
					} else {
						this.clearStorage(); 
					}
				} else {
					if(!this.isLogin()) return false

					this.$router.push(url);
				}
			}
		}
	}
</script>


<style lang="scss">
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.user-center {
		
		main {
			border-bottom: $uiMarginH solid $uiMarginBg;
		}

		.weui-cell_access .weui-cell__ft:after {
			width: 10px;
			height: 10px;
		}

		.weui-cells {
			margin-top: 0;
			border-top: $uiMarginH solid $uiMarginBg;

			&:before {
				border-top: 0;
			}
			&:after {
				border-bottom: 0;
			}
		}
	}
</style>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	@import '~assets/css/icon';
	
	$userCenterheaderImgW: 50px;
	
	$userCenterIconW: 22px;

	.user-center {
		.icon {
			padding-left: $userCenterIconW + 6px;

			&:before {
				width: $userCenterIconW;
				height: $userCenterIconW;
				margin-top: -$userCenterIconW/2;
			}
		}
	}

	header {
		padding: $paddingTop 0;
		background-color: $colorOrange;
		text-align: center;
		color: #fff;

		img {
			width: $userCenterheaderImgW;
			height: $userCenterheaderImgW;
			margin: 0 auto;
			border-radius: $userCenterheaderImgW;
		}
		
		.header-info {
			width: 100%;
			line-height: 2;
			@extend %clearfix;

			p {
				float: left;
				width: 50%;
				padding: 0 .5em;
				text-align: right;

				&:last-child {
					text-align: left;
				}
			}
		}
	}
</style>
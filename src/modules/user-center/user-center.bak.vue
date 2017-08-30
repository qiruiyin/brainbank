<!-- 
	用户中心
 -->

<template>
	<div class="user-center">
		<header>
			<div class="header-btn" @click="checkLogin({ 'name': 'kefu' })">我的客服</div>
			<div class="header-msg">
				<img :src="user.img" alt="">
				<p>{{ user.name }}<span>{{ user.course }}</span></p>
			</div>
			<div class="header-btn" @click="checkLogin({ 'name': 'share' })">分享有奖</div>
		</header>

		<main>
			<cell v-for="item in operations" @click.native="checkLogin({name: item.url}, item.click)" :title="item.name" :key="item.value" is-link>
        <i slot="icon" :class="['fa', 'fa-' + item.icon ]"></i>
      </cell>
      <cell @click.native="clearStorage" :title="clearData.name" >
        <i slot="icon" :class="['fa', 'fa-' + clearData.icon ]"></i>
      </cell>
		</main>	
	</div>
</template>

<script type="text/babel">
	import { mapState } from 'vuex'
	import { Cell } from 'vux'
	
	import imgUser from 'assets/img/user-center/user.png'
	import imgIcon01 from 'assets/img/user-center/icon01.png'
	import imgIcon02 from 'assets/img/user-center/icon02.png'
	import imgIcon03 from 'assets/img/user-center/icon03.png'
	import imgIcon04 from 'assets/img/user-center/icon04.png'
	import imgIcon05 from 'assets/img/user-center/icon05.png'

	export default {
		components: {
			Cell
		},
		data () {
			return {
				title: '用户中心',
				kefuUrl: 'kefu',
				operations: [
					{
						value: '',
						name: '修改个人资料',
						url: 'personalEdit',
						img: imgIcon01,
						icon: 'address-card-o',
						click: false // 不绑定是否可点击
					},{
						value: '',
						name: '我的推广积分',
						url: 'integral',
						img: imgIcon02,
						icon: 'diamond',
						click: false 
					},{
						value: '',
						name: '我的商城订单',
						url: 'orderMallList',
						img: imgIcon04,
						icon: 'shopping-cart',
						click: false 
					},{
						value: '',
						name: '我的课程订单',
						url: 'orderCourseList',
						img: imgIcon04,
						icon: 'shopping-cart',
						click: false 
					},{
						value: '',
						name: '我的学习',
						url: 'orderSourceList',
						img: imgIcon04,
						icon: 'shopping-cart',
						click: false 
					},{
						value: '',
						name: '地址管理',
						url: 'address',
						img: imgIcon04,
						icon: 'bookmark-o',
						click: false 
					},{
						value: '',
						name: '意见反馈',
						url: 'feedback',
						img: imgIcon05,
						icon: 'info-circle',
						click: true
					}
				],
				clearData: {
					value: '',
					name: '清空缓存',
					url: '',
					img: imgIcon05,
					icon: 'info-circle'
				}
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

			},
			clearStorage () {
				window.localStorage.clear();
				this.$router.push({name: 'index'})
			},
			checkLogin (url, data) {
				if(data) {
					this.$router.push(url); 
				} else {
					if(!this.isLogin()) return false

					this.$router.push(url);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	$headerPadding: 40px;

	.user-center {
		background-color: $bgGray;
	}
	
	header {
		position: relative;
		padding-top: $headerPadding;
		padding-bottom: $padding*2;
		margin-bottom: $padding;
		text-align: center;
		background: #fff;
		// background: #fff url("~assets/img/user-center/user-bg.png") no-repeat;
		// background-size: 100% auto;

		&:before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 56%;
			background: $colorBlue;
		}

		.header-btn {
			// @include halfpxline($borderRadius, #fff, 1px, 1px, 1px, 1px);
			position: absolute;
			top: $headerPadding;
			left: auto;
			right: 30px;
			line-height: 30px;
			padding: 0 1em;
			color: #fff;
			z-index: 2;

			&:first-child {
				left: 30px;
				right: auto;
			}
		}
	}

	.header-msg {
		margin: 0 auto;
		text-align: center;
		z-index: 1;
    position: relative;

		img {
			width: 80px;
			margin: 0 auto;
    	border-radius: 80px;
		}

		p {
			padding-top: 5px;
			line-height: 1;
		}

		span {
			margin-left: 1em;
			// border-left: 1px solid $borderColor;
			padding-left: 1em;
		}
	}

	main {
		background-color: #fff;
	}

	.fa {
		width: 1em;
		text-align: center;
		margin-right: 1em;
		color: $colorBlue;
		font-size: 24px;
	}
</style>
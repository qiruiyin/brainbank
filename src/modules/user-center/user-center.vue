<!-- 
	用户中心
 -->

<template>
	<div class="user-center">
		<header>
			<router-link :to="{ name: kefuUrl }">我的客服</router-link>
			<div class="header-msg">
				<img :src="header.img" alt="">
				<p>{{ header.name }}<span>{{ header.course }}</span></p>
			</div>
			<router-link :to="{ name: 'share' }">分享有奖</router-link>
		</header>

		<main>
			<cell v-for="item in operations" :link="{name: item.url}" :title="item.name" :key="item.value" is-link>
        <!-- <img slot="icon" width="40" style="display:block;margin-right:5px;" :src="item.img"> -->
        <i slot="icon" :class="['fa', 'fa-' + item.icon ]"></i>
      </cell>
		</main>	
	</div>
</template>

<script type="text/babel">
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
				header: {
					img: imgUser,
					name: this.$store.state.user.name,
					course: this.$store.state.user.course
				},
				operations: [
					{
						value: '',
						name: '修改个人资料',
						url: 'personalEdit',
						img: imgIcon01,
						icon: 'address-card-o'
					},{
						value: '',
						name: '我的推广积分',
						url: 'integral',
						img: imgIcon02,
						icon: 'diamond'
					},{
						value: '',
						name: '我的商城订单',
						url: '',
						img: imgIcon04,
						icon: 'shopping-cart'
					},{
						value: '',
						name: '我上过的课程',
						url: '',
						img: imgIcon04,
						icon: 'bookmark-o'
					},{
						value: '',
						name: '意见反馈',
						url: 'feedback',
						img: imgIcon05,
						icon: 'info-circle'
					}
				]
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;
				this.$http.post('/wechat/usercenter/customerService',
						{
							"userCode": _this.$store.state.user.userCode,
						}
					).then(function(e) {
					}
				);
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
		padding-bottom: $padding;
		margin-bottom: $padding;
		text-align: center;
		background: #fff url("~assets/img/user-center/user-bg.png") no-repeat;
		background-size: 100% auto;

		a {
			@include halfpxline($borderRadius, #fff, 1px, 1px, 1px, 1px);
			position: absolute;
			top: $headerPadding;
			left: auto;
			right: 30px;
			line-height: 30px;
			padding: 0 1em;
			color: #fff;

			&:first-child {
				left: 30px;
				right: auto;
			}
		}
	}

	.header-msg {
		margin: 0 auto;
		text-align: center;

		img {
			width: 120px;
			margin: 0 auto;
    	border-radius: 120px;
		}

		p {
			padding-top: 5px;
			line-height: 1;
		}

		span {
			margin-left: 1em;
			border-left: 1px solid $borderColor;
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
		color: red;
		font-size: 20px;
	}
</style>
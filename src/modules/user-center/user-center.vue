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
        <img slot="icon" width="40" style="display:block;margin-right:5px;" :src="item.img">
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
					name: '梁熙颖',
					course: '商业思维'
				},
				operations: [
					{
						value: '',
						name: '修改个人资料',
						url: 'personalEdit',
						img: imgIcon01
					},{
						value: '',
						name: '我的推广积分',
						url: 'integral',
						img: imgIcon02
					},{
						value: '',
						name: '我的访问记录',
						url: '',
						img: imgIcon03
					},{
						value: '',
						name: '我的商城订单',
						url: '',
						img: imgIcon04
					},{
						value: '',
						name: '意见反馈',
						url: 'feedback',
						img: imgIcon05
					}
				]
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
	}

	main {
		background-color: #fff;
	}
</style>
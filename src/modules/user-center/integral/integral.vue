<!-- 
	我的推广积分页面
 -->

<template>
	<div class="integral">
		<el-header-index></el-header-index>

		<div class="container">
			<div class="integral-header">
				<img src="~assets/img/user-center/integral.png" alt="">
				<p>{{ integral.now }}分</p>
			</div>

			<div class="tab">
	      <tab v-model="tabSelected">
	        <tab-item :selected="tabSelected == index" v-for="(item, index) in tabDatas" @click="tabSelected = index" :key="index">{{ item.title }}</tab-item>
	      </tab>
	      <swiper class="list" height="500px" v-model="tabSelected" :show-dots="false">
	        <swiper-item v-for="(tabContentDatasData, index) in tabContentDatas" :key="index">
	          <div class="integral-man" v-for="(item, ind) in tabContentDatasData.data" :key="ind">
							<img :src="item.img">
							<div class="title">
								<p>{{ item.name }}</p>
								<span>到期时间：{{ item.date }}</span>
							</div>
						</div>
	        </swiper-item>
	      </swiper>
	    </div>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
	import elHeaderIndex from 'components/header/header-index'

	import imgHeader from 'assets/img/header.png'

	export default {
		name: 'integral',
		components: { Tab, TabItem, Swiper, SwiperItem, elHeaderIndex },
		data () {
			return {
				title: '我的积分',
				integral: {
					now: 20,
					all: 20
				},
				tabDatas: [
					{
						value: '',
						title: '已邀请普通学员2位',
					},{
						value: 'free',
						title: '1位报名总裁商业思维',
					}
				],
				tabSelected: 0,
				tabContentDatas: [
					{
						value: 'yiyaoqing',
						data: [
							{
								value: '',
								name: '苏引华',
								date: '2017.08.02',
								img: imgHeader
							}
						]
					},{
						value: 'yiyaoqing',
						data: [
							{
								value: '',
								name: '苏引华',
								date: '2017.08.02',
								img: imgHeader
							},{
								value: '',
								name: '苏引华',
								date: '2017.08.02',
								img: imgHeader
							},{
								value: '',
								name: '苏引华',
								date: '2017.08.02',
								img: imgHeader
							}
						]
					}
				],
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
  $imgW: 44px;
	.integral {

	}

	.integral-header {
		padding: 40px $padding $padding;
		text-align: center;
		line-height: 1.75;

		img {
			margin: 0 auto;
			margin-bottom: $padding;
		}

		// .btn {
		// 	width: 4em;
		// 	margin: 0 auto;
		// 	margin-top: $padding;
		// 	margin-bottom: $padding;
		// 	border-radius: $borderRadius;
		// 	background: $colorRed;
		// 	color: #fff;
		// }
	}

	.integral-man {
  	padding: $padding;
  	display: flex;
		@include halfpxline(0, $borderColor, 1px, 0, 1px, 0);

  	img {
  		width: $imgW;
  		height: $imgW;
  		border-radius: $imgW;
  	}
		
		.title {
			padding-left: $padding;
			flex: 1;
		}

  	p {
			font-size: 18px;
  	}
  }
	
</style>
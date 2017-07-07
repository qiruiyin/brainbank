<!-- 
	商城
 -->

<template>
	<div class="mall">
		<el-header-index></el-header-index>

		<div class="container">
			<div class="banner">
	    	<swiper auto :list="bannerDatas" dots-position="center" :aspect-ratio="768/1366"></swiper>
			</div>

			<search 
				@result-click="resultClick"
				@on-change="getResult" 
				:results="results"
				v-model="value"
				position="absolute"
				auto-scroll-to-top top="60px"
				@on-focus="onFocus"
				@on-cancel="onCancel"
				@on-submit="onSubmit"
				ref="search">
			</search>
			
			<!-- 经典推荐(图片) -->
			<div class="tuijian-img">
				<div class="tuijian-img-left">
					<img :src="tuijianImg.imgBig" alt="">
				</div>
				<div class="tuijian-img-right">
					<img :src="tuijianImg.imgSmall1" alt="">
					<img :src="tuijianImg.imgSmall2" alt="">
				</div>
			</div>

			<!-- 阅读推荐 -->
			<div class="tuijain-card">
				<div class="tuijian-card-header">
					<h3>{{ tuijianBook.title }}</h3>
					<p>{{ tuijianBook.desc }}</p>
				</div>
				<div class="tuijian-card-body">
					<div class="goods" v-for="(item, index) in tuijianBook.list" :key="index">
						<img :src="item.img" alt="">
						<h5>{{ item.name }}</h5>
						<p>{{ item.desc }}</p>
						<div class="price">￥{{ item.price }}</div>
					</div>

					<cell title="查看更多" :link="{name: 'index'}" is-link></cell>
				</div>
			</div>

			<!-- 职场推荐 -->
			<div class="tuijain-card">
				<div class="tuijian-card-header">
					<h3>{{ tuijianCarrer.title }}</h3>
					<p>{{ tuijianCarrer.desc }}</p>
				</div>
				<div class="tuijian-card-body">
					<div class="goods" v-for="(item, index) in tuijianCarrer.list" :key="index">
						<img :src="item.img" alt="">
						<h5>{{ item.name }}</h5>
						<p>{{ item.desc }}</p>
						<div class="price">￥{{ item.price }}</div>
					</div>

					<cell title="查看更多" :link="{name: 'index'}" is-link></cell>
				</div>
			</div>

			<!-- 学员产品推荐 -->
			<div class="tuijain-card">
				<div class="tuijian-card-header">
					<h3>{{ tuijianStudent.title }}</h3>
					<p>{{ tuijianStudent.desc }}</p>
				</div>
				<div class="tuijian-card-body">
					<div class="goods" v-for="(item, index) in tuijianStudent.list" :key="index">
						<img :src="item.img" alt="">
						<h5>{{ item.name }}</h5>
						<p>{{ item.desc }}</p>
						<div class="price">￥{{ item.price }}</div>
					</div>

					<cell title="查看更多" :link="{name: 'index'}" is-link></cell>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Group, Cell, Swiper, Card, Panel, Search } from 'vux'
	
	import elHeaderIndex from 'components/header/header-index'
	
	import { getterIndex } from 'services/index';

	import imgGoods from 'assets/img/book01.png'
	import imgBig from 'assets/img/mall/big.jpg'
	import imgSmall1 from 'assets/img/mall/small1.jpg'
	import imgSmall2 from 'assets/img/mall/small2.jpg'

	export default {
		components: {
			Group, Cell, Swiper, Card, Panel, Search, elHeaderIndex
		},
		data () {
			return {
				title: '商城',
	      bannerDatas: getterIndex.bannerDatas,
	      results: [],
      	value: 'test',
      	tuijianImg: {
      		imgBig: imgBig,
      		imgSmall1: imgSmall1,
      		imgSmall2: imgSmall2
      	},
      	tuijianBook: {
      		title: '阅读是一种乐趣',
      		desc: '经典书籍推荐',
      		list: [
      			{
      				img: imgGoods,
      				name: '《经典小说》典藏版',
      				desc: '艺术暑假限量套装',
      				price: '1231'
      			},{
      				img: imgGoods,
      				name: '《经典小说》典藏版',
      				desc: '艺术暑假限量套装',
      				price: '1231'
      			},{
      				img: imgGoods,
      				name: '《经典小说》典藏版',
      				desc: '艺术暑假限量套装',
      				price: '1231'
      			},{
      				img: imgGoods,
      				name: '《经典小说》典藏版',
      				desc: '艺术暑假限量套装',
      				price: '1231'
      			}
      		]
      	},
      	tuijianCarrer: {
      		title: '提升职场竞争力',
      		desc: '经典DVD光盘推荐',
      		list: [
      			{
      				img: imgGoods,
      				name: '《经典小说》典藏版',
      				desc: '艺术暑假限量套装',
      				price: '1231'
      			},{
      				img: imgGoods,
      				name: '《经典小说》典藏版',
      				desc: '艺术暑假限量套装',
      				price: '1231'
      			},{
      				img: imgGoods,
      				name: '《经典小说》典藏版',
      				desc: '艺术暑假限量套装',
      				price: '1231'
      			},{
      				img: imgGoods,
      				name: '《经典小说》典藏版',
      				desc: '艺术暑假限量套装',
      				price: '1231'
      			}
      		]
      	},
      	tuijianStudent: {
      		title: '提升你的生活质量',
      		desc: '思维商学院学员优质产品推荐',
      		list: [
      			{
      				img: imgGoods,
      				name: '《经典小说》典藏版',
      				desc: '艺术暑假限量套装',
      				price: '1231'
      			},{
      				img: imgGoods,
      				name: '《经典小说》典藏版',
      				desc: '艺术暑假限量套装',
      				price: '1231'
      			},{
      				img: imgGoods,
      				name: '《经典小说》典藏版',
      				desc: '艺术暑假限量套装',
      				price: '1231'
      			},{
      				img: imgGoods,
      				name: '《经典小说》典藏版',
      				desc: '艺术暑假限量套装',
      				price: '1231'
      			}
      		]
      	}
			}
		},
		methods: {
	    setFocus () {
	      this.$refs.search.setFocus()
	    },
	    resultClick (item) {
	      window.alert('you click the result item: ' + JSON.stringify(item))
	    },
	    getResult (val) {
	      this.results = val ? getResult(this.value) : []
	    },
	    onSubmit () {
	      this.$refs.search.setBlur()
	      this.$vux.toast.show({
	        type: 'text',
	        position: 'top',
	        text: 'on submit'
	      })
	    },
	    onFocus () {
	      console.log('on focus')
	    },
	    onCancel () {
	      console.log('on cancel')
	    }
	  },
	}

	function getResult (val) {
	  let rs = []
	  for (let i = 0; i < 20; i++) {
	    rs.push({
	      title: `${val} result: ${i + 1} `,
	      other: i
	    })
	  }
	  return rs
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	$tuijianPadding: 5px;

	.mall {
		background-color: $bgGray;
	}
	.tuijian-img {
		display: flex;
		padding: $padding;
		background: #fff;
	}

	.tuijian-img-left, .tuijian-img-right {
		flex: 1;

		img {
			width: 100%;
			padding-right: $tuijianPadding;
		}
	}

	.tuijian-img-right {
		img {
			padding-left: $tuijianPadding;
			padding-bottom: $tuijianPadding;

			&:last-child {
				padding-top: $tuijianPadding;
			}
		}
	}

	.tuijain-card {

	}

	.tuijian-card-header {
		position: relative;
		text-align: center;
		padding: $padding 0;
		// @include halfpxline(0, #fff, 0 , 0, 1px, 0);

		h3 {
			font-size: 20px;
		}

		p {
			position: relative;
			width: auto;
			display: inline;

			&:before, &:after {
				content: "";
				position: absolute;
				top: 6px;
				left: -26px;
				width:0;
		    height:0;
		    border-width: 8px 8px 0;
		    border-style: solid;
		    border-color: $fontColorGray transparent transparent;
			}

			&:after {
				left: auto;
				right: -26px;
			}
		}
	}

	.tuijian-card-body {
		@extend %clearfix;
		padding: $padding;
	}

	.goods {
		float: left;
		width: 50%;
		margin-bottom: $padding;
		line-height: 1.5;
		text-align: center;
		background: #fff;

		&:nth-child(odd) {
			border-right: $padding/2 solid $bgGray;
    }
		&:nth-child(even) {
			border-left: $padding/2 solid $bgGray;
    }

		img {
			width: 80%;
			margin: 0 auto;
		}

		h5 {
			font-size: 18px;
			
		}
	}
</style>
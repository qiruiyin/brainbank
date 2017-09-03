<!-- 
	商城
 -->

<template>
	<div :class="['mall', { 'active': searchData.popup }]" v-cloak>
		<el-header-index></el-header-index>

		<div class="container mall-container">
			<div class="banner">
	    	<swiper auto :list="bannerTopDatas" dots-position="center" :aspect-ratio="bannerWidthHeight" loop></swiper>
			</div>
			
			<el-search search-type=""></el-search>
			
			<!-- 经典推荐(图片) -->
			<div class="tuijian-img">
				<div class="tuijian-img-left">
					<a v-for="(item, index) in tuijianImgLeft" :href="item.url" :key="index">
						<img :src="item.img" alt="">
					</a>
				</div>
				<div class="tuijian-img-right">
					<a v-for="(item, index) in tuijianImgRight" :href="item.url" :key="index">
						<img :src="item.img" alt="">
					</a>
				</div>
			</div>

			<el-mall-card :mall-card-data="item" v-for="(item, index) in tuijianList" :key="index"></el-mall-card>
			
			<el-cart-frame></el-cart-frame>
		</div>

	</div>
</template>

<script type="text/babel">
	import { TransferDom, Group, Cell, Swiper, Card, Panel, Search, Popup } from 'vux'
	
	import elHeaderIndex from 'components/header/header-index'
	import elMallCard from 'components/mall/card'
	import elCartFrame from 'components/cart/cart-frame'
	import elSearch from 'components/search/search'
	
	import { getterIndex } from 'services/index';

	// import imgGoods from 'assets/img/book01.png'
	// import imgBig from 'assets/img/mall/big.jpg'
	// import imgSmall1 from 'assets/img/mall/small1.jpg'
	// import imgSmall2 from 'assets/img/mall/small2.jpg'

	export default {
		name: "mall",
		directives: {
	    TransferDom
	  },
		components: {
			Group, Cell, Swiper, Card, Panel, Search, Popup, elHeaderIndex, elMallCard, elCartFrame, elSearch
		},
		data () {
			return {
				title: '商城',
	    	bannerWidthHeight: this.wordBook.bannerWidthHeight,
	      bannerTopDatas: [],
      	tuijianImgLeft: {},
      	tuijianImgRight: {},
      	tuijianList: [{
      		desc: "",
  				type: "",
  				title: "",
  				list: []
      	}],
      	searchData: {
      		popup: false,
      		value: "",
      		list: [
      			{
      				img: "",
      				title: "经营思维",
      				desc: "经营思维经营思维经营思维经营思维经营思维经营思维经营思维经营思维经营思维",
      				price: "12",
      				sellNum: "111"
      			}
      		]
      	}
			}
		},
		mounted ()  {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;
				_this.$http.post('/wechat/shop/index',{}).then(function(e) {
					let responseData = e.data.data;
		  		// 顶部长banner
		  		_this.resolveField(_this, 'bannerTopDatas', responseData.bannerTop, 'ad_code', '', 'ad_link');
		  		_this.resolveField(_this, 'tuijianImgLeft', responseData.bannerLeft, 'ad_code', "", 'ad_link');
		  		_this.resolveField(_this, 'tuijianImgRight', responseData.bannerRight, 'ad_code', "", 'ad_link');

		  		// 产品类型列表展示
		  		if(responseData.list && responseData.list.length > 0) {
			  		_this.tuijianList = responseData.list.map(function(item, index) {
			  			let listData = [];
			  			if(item.list && item.list.length > 0) {
			  				listData = item.list.map(function(listItem, listIndex){
			  					return {
			  						img: _this.resolveImg(listItem.thumbnail),
										name: listItem.name,
										desc: listItem.DESCRIPTION,
										price: listItem.price,
										code: listItem.code,
										type: '1'
			  					}
			  				})
			  			}

			  			return {
			  				desc: item.desc,
			  				type: item.type,
			  				title: item.title,
			  				list: listData
			  			}
			  		})
		  		}
				});
			},
	  }
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	$tuijianPadding: 5px;

	$productImgW: $imgTextImgW;
	$productImgH: $imgTextImgH;

	.mall {
		width: 100%;
		height: 100%;
		background-color: $bgGray;

		&.active {
	    overflow: hidden;
		}
	}

	.mall-container {
		padding-bottom: $containerBottom;
		
	}

	.tuijian-img {
		display: flex;
		padding: 10px 10px;
		background: #fff;
		
		a {
			width: 100%;
			padding-right: 5px;
			display: block;
		}

		img {
			border-radius: 5px;
		}
	}

	.tuijian-img-left, .tuijian-img-right {
		flex: 1;

		img {
			width: 100%;
		}
	}

	.tuijian-img-right {
		a {
			padding-right: 0;
			padding-left: 5px;
		}

		a:last-child {
			img {
				margin-top: 5px;
			}
		}
	}
</style>
<!-- 
	商城
 -->

<template>
	<div class="mall">
		<el-header-index></el-header-index>

		<div class="container">
			<div class="banner">
	    	<swiper auto :list="bannerTopDatas" dots-position="center" :aspect-ratio="600/1500"></swiper>
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
	import { Group, Cell, Swiper, Card, Panel, Search } from 'vux'
	
	import elHeaderIndex from 'components/header/header-index'
	import elMallCard from 'components/mall/card'
	import elCartFrame from 'components/cart/cart-frame'
	
	import { getterIndex } from 'services/index';

	import imgGoods from 'assets/img/book01.png'
	import imgBig from 'assets/img/mall/big.jpg'
	import imgSmall1 from 'assets/img/mall/small1.jpg'
	import imgSmall2 from 'assets/img/mall/small2.jpg'

	export default {
		components: {
			Group, Cell, Swiper, Card, Panel, Search, elHeaderIndex, elMallCard, elCartFrame
		},
		data () {
			return {
				title: '商城',
	      bannerTopDatas: [],
	      results: [],
      	value: 'test',
      	tuijianImgLeft: {},
      	tuijianImgRight: {},
      	tuijianList: [{
      		desc: "",
  				type: "",
  				title: "",
  				list: []
      	}]
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
										link: 'mallDetail',
										url: "",
										name: listItem.name,
										desc: listItem.description,
										price: listItem.price,
										code: listItem.code
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
			padding-right: 0;
			padding-left: $tuijianPadding;
		}

		a:last-child {
			img {
				padding-top: $tuijianPadding;
			}
		}
	}
</style>
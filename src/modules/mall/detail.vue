<!-- 
	商城详情
 -->

<template>
	<div class="detail">
		<div class="detail-body">
			<div class="banner">
				<img :src="goodsMsg.img" alt="">
	    	<!-- <swiper auto dots-position="center" :list="bannerTopDatas" :aspect-ratio="600/1500"></swiper> -->
			</div>

			<div class="msg">
				<div class="msg-header">{{ goodsMsg.title }}</div>
				<div class="msg-body">
					<div class="msg-body-info">
						<span>已购买：{{ goodsMsg.sellNum }}</span>
						<span>{{ goodsMsg.author }} 著</span>
						<div class="price">单价<i>￥</i>{{ goodsMsg.price }}</div>
					</div>
					<div class="num">
						<x-number title="数量" :min="1" class="num-data" v-model="goodsMsg.num"></x-number>
					</div>
				</div>
			</div>
			
			
			<el-cart :product-info="goodsMsg"></el-cart>
			
			<div class="tab">
				<div class="tab">
		      <tab v-model="tabSelected">
		        <tab-item :selected="tabSelected == index" v-for="(item, index) in tabDatas" @click="tabSelected = index" :key="index">{{ item.title }}</tab-item>
		      </tab>
		      <div class="list">
	      		<template v-if="tabSelected == 0">	      			
		          <div v-html="goodsMsg.details"></div>
	      		</template>
	      		<template v-if="tabSelected == 1">
	          	<el-comment :comment-data="commentData"></el-comment>
	      		</template>
	      		<template v-if="tabSelected == 2">
		      		<div class="record" v-for="(item, index) in recordData" :key="index">
								<img :src="item.img">
								<div class="title">
									<p>{{ item.name }}</p>
									<span>购买时间：{{ item.date }}</span>
								</div>
							</div>
	      		</template>
	      	</div>
		    </div>
	    </div>
		</div>

		<el-back-index></el-back-index>
	</div>
</template>

<script type="text/babel">
	import { XNumber, Swiper, Card, Tab, TabItem, SwiperItem } from 'vux'

	import elComment from 'components/comment/comment'
	import elCart from 'components/cart/cart'
	import elBackIndex from 'components/cart/back-index'

	import hold from 'src/commons/hold'
	import { getterIndex } from 'services/index';

	export default {
		name: "mallDatail",
		components: { XNumber, Swiper, Card, Tab, TabItem, SwiperItem, elComment, elCart, elBackIndex },
		data () {
			return {
				title: "商城详情",
				cartNum: 0,
				bannerTopDatas: getterIndex.bannerDatas,
				productCode: this.$route.params.goodsCode,
				goodsMsg: {
					img: "",
					title: "商品名字",
					price: "5",
					sellNum: "100",
					num: 1,
					author: "苏引华",
					address: "江苏苏州",
					code: "",
					details: ""
				},
				tabDatas: [
					{
						value: 'detail',
						title: '详情',
					},{
						value: 'comment',
						title: '评论',
					},{
						value: 'record',
						title: '购买记录',
					}
				],
				tabSelected: 0,
				tabContentDatas: {
					detail: [],
					comment: [],
					record: []
				},
				details: "",
				commentData: {
					productCode: this.$route.params.goodsCode,
					pagesize: 1,
					pagecount: this.wordBook.pageCount
				},
				recordData: []
			}
		},
		mounted () {
			this.fetchData();
			this.addRecode();
		},
		methods: {
			fetchData () {
				let _this = this,
						goodsCode = _this.$route.params.goodsCode;

				_this.$http.post('/wechat/shop/productDetail',
					{
						code: goodsCode
					}).then(function(e) {
						let responseData = e.data.data;
		  			_this.goodsMsg.code = responseData.code;
		  			_this.goodsMsg.title = responseData.name;
		  			_this.goodsMsg.author = responseData.author;
		  			_this.goodsMsg.price = responseData.PRICE;
		  			_this.goodsMsg.details = _this.resolveRichTextImg(responseData.CONTENT);
		  			_this.goodsMsg.img = _this.resolveImg(responseData.thumbnail);
		  			_this.commentData.productcode =  _this.$route.params.goodsCode;
				});

				_this.payRecord(1, 10);	
			},
			payRecord (pageSize = 1, pageCount = 10) {
				let _this = this;
				_this.$http.post('/wechat/shop/productByHistory',
					{
						code: this.$route.params.goodsCode,
						userCode: "",
						pageSize: pageSize,
						pageCount: pageCount
					}).then(function(e) {
						let responseData = e.data.data;
						if(responseData.list.length > 0) {
							if(pageSize > 0) {
								let listData = responseData.list.map(function(item, index) {
									return {
										img: _this.resolveImg(item.header),
										name: item.name,
										date: item.time
									}
								});
								_this.recordData.push.apply(_this.recordData, listData);
							} else {
								_this.recordData = responseData.list.map(function(item, index) {
									return {
										img: _this.resolveImg(item.header),
										name: item.name,
										date: item.time
									}
								});
							}
						}
				});	
			},
			addRecode () {
				let _this = this;
				this.$http.post('/wechat/discover/addProductViewCount',
						{
							"code": _this.$route.params.goodsCode
						}
					).then(function(e) {

					});
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
  
  $imgW: 44px;

  .detail {
  	padding-bottom: $containerBottom;
  }
	
	.banner {
		img {
			width: 100%;
			padding: $padding*2 0;
		}
	}

	.msg {
	  padding: $padding;
	  line-height: 2;
	}

	.msg-header {
		font-size: 20px;
		color: $fontColorBlack;	
	}

	.msg-body {
		.msg-body-info {
			span {
				display: inline-block;

				&:last-child {
					float: right;
				}
			}
		}
	}

	.msg-footer {
		color: $colorYellow;
		
		.price {
			font-size: 22px;
			display: inline-block;

			i {
				font-size: 16px;
				font-style: normal;
			}
		}

		.cart {
			float: right;
			font-size: 22px;
		}
	}

	.record {
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
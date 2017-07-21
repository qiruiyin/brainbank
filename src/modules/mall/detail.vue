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
						<!-- <span>售价：{{ goodsMsg.price }}</span> -->
						<span>已购买：{{ goodsMsg.sellNum }}</span>
						<span>{{ goodsMsg.author }} 著</span>
					</div>
				</div>
				<div class="msg-footer">
					<div class="price"><i>￥</i>{{ goodsMsg.price }}</div>
					<div class="cart fa fa-shopping-cart" @click="addCart"></div>
				</div>
			</div>

			<div @click="goCart">购物车</div>
			
			<div class="tab">
				<div class="tab">
		      <tab v-model="tabSelected">
		        <tab-item :selected="tabSelected == index" v-for="(item, index) in tabDatas" @click="tabSelected = index" :key="index">{{ item.title }}</tab-item>
		      </tab>
		      <swiper class="list" height="100%" v-model="tabSelected" :show-dots="false">
		        <swiper-item v-for="(tabContentDatasList, index) in tabDatas" :key="index">
		          <template v-if="tabContentDatasList.value == 'detail'">
		          	
		          </template>
		          <template v-if="tabContentDatasList.value == 'comment'">
		          	<el-comment :comment-data="commentData"></el-comment>
		          </template>
		          <template v-if="tabContentDatasList.value == 'record'">
		          	
		          </template>
		        </swiper-item>
		      </swiper>
		    </div>
	    </div>

		</div>
	</div>
</template>

<script type="text/babel">
	import { Swiper, Card, Tab, TabItem, SwiperItem } from 'vux'

	import elComment from 'components/comment/comment'

	import { getterIndex } from 'services/index';

	export default {
		name: "mallDatail",
		components: { Swiper, Card, Tab, TabItem, SwiperItem, elComment },
		data () {
			return {
				title: "商城详情",
				bannerTopDatas: getterIndex.bannerDatas,
				goodsMsg: {
					img: "",
					title: "商品名字",
					price: "5",
					sellNum: "100",
					author: "苏引华",
					address: "江苏苏州",
					code: ""
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
				commentData: {
					productcode: '',
					pagesize: 1,
					pagecount: 10
				}
			}
		},
		mounted () {
			this.fetchData();
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
		  			_this.goodsMsg.title = responseData.name;
		  			_this.goodsMsg.author = responseData.author;
		  			_this.goodsMsg.price = responseData.PRICE;
		  			_this.goodsMsg.img = _this.resolveImg(responseData.thumbnail);
		  			_this.commentData.productcode =  _this.$route.params.goodsCode;
				});
			},
			addCart (num = 1) {
				let _this = this;
				
				_this.$http.post('/wechat/shop/addCart',
					{
						userCode: _this.$store.state.user.userCode,
						productCode: _this.$route.params.goodsCode,
						shopCount: 1
					}).then(function(e) {
						// alert("加入购物车成功")
		  			// _this.$router.push({name: 'shopCart'});
				});
			},
			goCart () {
				this.$router.push({name: "shopCart"})
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.banner {
		img {
			width: 100%;
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

</style>
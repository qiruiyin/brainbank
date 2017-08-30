<!-- 
	商城支付完成
 -->

<template>
	<div class="order-done order-mall" v-cloak>
		<div class="order-done-content">
			<div class="order-done-succcess">
				<img src="~assets/img/tips/success.png">
				<p>购买成功</p>
				<p>工作人员正在给您快递，请耐心等待！</p>
			</div>

			<div class="order-btn">
				<x-button type="primary" @click.native="goPage('orderMallList')">查看订单</x-button>
				<x-button @click.native="goPage('mall')">继续逛逛</x-button>
			</div>
		</div>

		<div class="order-done-like">
			<h5>猜你喜欢</h5>
			<div>
				<el-mall-product-like :mall-product-data="item" v-for="(item, index) in likeData.list" :key="index"></el-mall-product-like>			
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import { XButton, Group, Cell, Rater } from 'vux'

	import elMallProductLike from 'components/mall/product-like'

	export default {
		name: "orderDoneMall",
		components: {
			XButton, Group, Cell, Rater, elMallProductLike
		},
		data () {
			return {
				title: "订单完成页面",
				orderCode: this.$route.query.orderCode,
				likeData: {
					type: "", // 1:商城， 2：视频，3：音频
					list: []
				}
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;
				this.$http.post('/wechat/order/getRecommendProduct',
					{
						"orderCode": _this.orderCode,
					}).then(function(e) {
						if(e.data.errcode == 1) {
							let type = e.data.data.type;
							_this.likeData.type = type;
							_this.likeData.list = e.data.data.list.map(function(item, index){
								return {
									img: _this.resolveImg(item.thumbnail),
									name: item.name,
									desc: item.description,
									price: item.price,
									code: item.code,
									type: type // 判别是音频，视频还是商品
								}
							});
						} else {
							_this.$vux.alert.show({
								content: e.data.errmsg
							})
						}
					})
			},
			goPage (url) {
				this.$router.push({name: url});
			}
		}
	}
</script>	

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.order-done {
		position: relative;
		width: 100%;
		height: 100%;
		// padding: 0 $padding;
	}

	.order-done-succcess {
		line-height: 2;
		padding-top: 30px;
		text-align: center;
		color: $fontColorBlack;

		img {
			width: 60px;
			margin: 0 auto;
			margin-bottom: 1em;
			border-radius: 60px;
		}
	}

	.order-btn {
		margin-top: 40px;
		text-align: center;

		button {
			width: 6em;
			margin: 0 1em;
			display: inline-block;
		}
	}

	.order-done-like {
		margin-top: $paddingTop*2;
		border-top: $uiMarginH solid $uiMarginBg;

		h5 {
			@include halfpxline(0, $borderColor, 0 , 0, 1px, 0);
			padding: 0 $padding;
			line-height: 36px;
			color: $fontColorBlack;
			font-size: 14px;
		}
	}
</style>
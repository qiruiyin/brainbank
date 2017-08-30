<!-- 
	商城订单
 -->

<template>
	<div class="order-mall" v-cloak>
		<div class="order-mall-body">
			<template v-if="address.address">
				<div class="address" @click="addressChoose">
					<div class="address-msg">
						<p class="address-man">收货人：{{ address.name }}</p>
						<span class="address-tel">{{ address.phone }}</span>
					</div>
					<div class="address-detail">
						<i class="address-icon"></i>
						收货地址：{{ address.address }}
						<i class="angle-icon fa fa-angle-right"></i>
					</div>
				</div>
			</template>

			<template v-else>
				<div class="btns">
					<x-button class="order-add-address fa fa-plus" @click.native="addressAdd">添加收货地址</x-button>
				</div>
			</template>
			
			<!-- <div class="btns">
				<x-button  class="order-add-address fa fa-plus-circle" @click.native="addressChoose">添加收货地址</x-button>
			</div> -->
			
			<div class="card-product-list">
				<el-card-mall class="card-mall-padding" :card-mall-data="item" v-for="(item, index) in cartDatas" :key="index"></el-card-mall>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Group, Selector, XInput, XButton, FormPreview, Popup, Toast, TransferDomDirective as TransferDom  } from 'vux'
	import elImgTextCart from 'components/img-text/img-text-cart'
	import elCardMall from 'components/card/card-mall'

	export default {
		name: "order",
		directives: {
	    TransferDom
	  },
		components: {
			Group, Selector, XInput, XButton, FormPreview, Popup, Toast, elCardMall
		},
		props: ["orderMallData"],
		data () {
			return {
				address: {
					address: "",
					name: "",
					phone: "",
					code: ""
				},
				orderData: {
					address: {
						address: "",
						name: "",
						phone: "",
						code: ""
					},
					cartDatas: [],
					pay: {
						show: false,
						allPrice: 0,
						list: [
							{
				        label: '订单号',
				        value: ''
				      }, {
				        label: '联系人',
				        value: ''
				      }, {
				        label: '电话',
				        value: ''
				      }, {
				        label: '地址',
				        value: ''
				      }, {
				        label: '时间',
				        value: ''
				      }
				    ]
					}
				}
			}
		},
		computed: {
			cartDatas () {
				let _this = this,
						data ;

				data = _this.orderMallData.list.map(function(item, index){
						return {
							description: "",
							productCode: item.code,
							productCount: item.count,
							productName: item.name,
							productPrice: item.amount,
							img: _this.resolveImg(item.thumbnail)
						}
				});

				return data;
			},
		},
		mounted () {
			this.getAddress();
		},
		methods: {
			addressChoose() {
				this.$router.push({ name: "address", query: { orderCode: this.orderMallData.code }});
			},
			addressAdd () {
  			this.$router.push({ name: "addressAdd", query: { orderCode: this.orderMallData.code, url: 'confirmOrder' } });
			},
			getAddress () {
				let _this = this;

				if(this.orderMallData.address.address) {
					_this.address = this.orderMallData.address;
				} else {
					_this.$http.post('/wechat/shop/queryDefaultCustomerAddress',
						{
							userCode: _this.$store.state.user.userCode
						}).then(function(e) {
							if(e.data.errcode == 1) {
								_this.address = e.data.data.result;
								if(_this.address.address) {
									_this.updateOrder(_this.orderMallData.code, _this.address.code);

									_this.$emit("update-address", true);
								}
							}
					});					
				}
			},
			updateOrder (orderCode, address) {
				let _this = this;

				_this.$http.post('/wechat/shop/updateOrderAddress',{
	  			"orderCode": orderCode,
	  			"address": address
	  			}).then(function(e) {

	  			});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.card-product-list {

		& > div.product.mall-product {
			padding: $padding;
  		border-top: $uiMarginH solid $uiMarginBg;
		}
	}


	.btns, .pay-btn {
		padding: $padding;
	}

	.address {
		padding: $paddingTop $padding $paddingTop + 10px;
		padding-left: $padding + 30px;
		padding-right: $padding + 20px;
		line-height: 1.75;
    background: #fff url("~assets/img/shop-cart/location-bg.png") repeat-x;
		background-position: bottom;


		&.active {
		}

		.address-msg {
			font-size: 16px;
			display: flex;
			color: $fontColorBlack;
			
			p {
				flex: 1;
				@include ellipsisOne();
			}

			span {
				width: 7em;
				text-align: right;
				display: block;
			}
		}

		.address-detail {
			position: relative;
			text-align: justify;

			.fa {
				position: absolute;
				top: 50%;
				margin-top: -.75em;
				line-height: 1.5;
				font-size: 18px;
			}

			.address-icon {
				position: absolute;
				top: 50%;
				left: -20px;
				width: 15px;
				height: 20px;
				margin-top: -10px;
				background: url("~assets/img/shop-cart/location.png") center no-repeat;
				background-size: 100%;
				display: block;
			}

			.angle-icon {
				right: -20px;
			}
		}
	}

	.order-add-address {
		background: $colorOrange;
		color: #fff;

		&:not(.weui-btn_disabled):active {
			color: #fff;
			background: $colorOrange;
		}
	}
</style>
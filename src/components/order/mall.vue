<!-- 
	商城订单
 -->

<template>
	<div class="order-mall">
		<div class="order-mall-body">
			<template v-if="orderMallData.address.address">
				<div class="address" @click="addressChoose">
					<div class="block">
						<div class="block-address">{{ orderMallData.address.address }}</div>
						<div class="block-msg">{{ orderMallData.address.name }} {{ orderMallData.address.phone }}</div>
						<div class="fa fa-check checked"></div>
					</div>
				</div>
			</template>

			<template v-else>
				<div class="btns" >
					<x-button type="primary" @click.native="addressChoose">地址选择</x-button>
				</div>
			</template>

			<el-img-text-cart :ref="'imgText'+index" :img-text-data="item" v-for="(item, index) in cartDatas" :key="index"></el-img-text-cart>
		</div>

		
	</div>
</template>


<script type="text/babel">
	import { Group, Selector, XInput, XButton, FormPreview, Popup, Toast, TransferDomDirective as TransferDom  } from 'vux'
	import elImgTextCart from 'components/img-text/img-text-cart'

	export default {
		name: "order",
		directives: {
	    TransferDom
	  },
		components: {
			Group, Selector, XInput, XButton, FormPreview, Popup, Toast, elImgTextCart
		},
		props: ["orderMallData"],
		data () {
			return {
				
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
							imgPath: _this.resolveImg(item.thumbnail),
							title: item.name,
							price: (item.amount/item.count).toFixed(2),
							num: item.count,
							code: item.code
						}
				});

				return data;
			}
		},
		mounted () {
		},
		methods: {
			addressChoose() {
				this.$router.push({ name: "address", query: { orderCode: this.orderMallData.code } });
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	

	.btns, .pay-btn {
		padding: $padding;
	}

	.block {
		@include halfpxline(0, $borderColor, 0 , 0, 1px, 0);
		padding: $padding;
		// margin: $padding;
		// border-radius: $borderRadius;

		&.active {
			// background: $fontColorBlue;
			// color: #fff;
		}
	}

	.checked {
		position: absolute;
		right: $padding;
		top: 50%;
		line-height: 1;
		margin-top: -12px;
		font-size: 24px;
		color: $colorGreen
	}
	

</style>
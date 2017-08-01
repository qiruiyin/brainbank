<!-- 
	订单
 -->

<template>
	<div class="order">
		<div class="order-body">
			<template v-if="orderInfo.type == '2'">
				<el-order-mall :order-mall-data="orderMallDatas"></el-order-mall>
			</template>
		</div>

		<el-cart-pay :order-info="orderInfo"></el-cart-pay>
	</div>
</template>

<script type="text/babel">
	import { Group, Selector, XInput, XButton, FormPreview, Popup, Toast, TransferDomDirective as TransferDom  } from 'vux'
	import elOrderMall from 'components/order/mall'
	import elCartPay from 'components/cart/cart-pay'

	export default {
		name: "order",
		directives: {
	    TransferDom
	  },
		components: {
			Group, Selector, XInput, XButton, FormPreview, Popup, Toast, elOrderMall, elCartPay
		},
		data () {
			return {
				show: true,
				orderInfo: {
					code: this.$route.query.orderCode,
					type: "", // 1:课程 2:商城 3:视频或音频
					num: 0,
					money: "",
					address: {}
				},
				orderMallDatas: {},
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
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;
				_this.$http.post('/wechat/shop/queryOrderInfoByCode',
					{
						"orderCode": _this.orderInfo.code
					}).then(function(e) {
						let responseData = e.data,
								num = 0;
						if(responseData.errcode == 1) {
							_this.orderInfo.address = responseData.data.address;
							_this.orderInfo.money = responseData.data.money;
							_this.orderInfo.type = responseData.data.type;
							_this.orderMallDatas = responseData.data;

							responseData.data.list.map(function(item, index) {
								num += item.count;
							})

							_this.orderInfo.num = num;
						}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.address {
		.block {
			@include halfpxline($borderRadius, $borderColor, 1px, 1px, 1px, 1px);
			padding: $padding;
			margin: $padding;
			border-radius: $borderRadius;

			&.active {
				background: $fontColorBlue;
				color: #fff;
			}
		}
	}

	.demo {
		position: absolute;
		z-index: 1000;
		top: 0;
		left: 0;
		right:　0;
		bottom: 0;
	}
</style>
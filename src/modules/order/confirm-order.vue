<!-- 
	订单
 -->

<template>
	<div class="order">
		<div class="order-body">
			<template v-if="orderInfo.type == '2'">
				<el-order-mall :order-mall-data="orderMallDatas" @update-address="setCartPayStatus"></el-order-mall>
			</template>

			<template v-if="orderInfo.type == '1'">
				<el-order-course :order-course-data="orderCourseData"></el-order-course>
			</template>

			<template v-if="orderInfo.type == '3'">
				<el-order-audio :order-audio-data="orderAudioData"></el-order-audio>
			</template>
		</div>

		<el-cart-pay :order-info="orderInfo" :is-active="orderInfo.isActive"></el-cart-pay>
	</div>
</template>

<script type="text/babel">
	import { Group, Selector, XInput, XButton, FormPreview, Popup, Toast, TransferDomDirective as TransferDom  } from 'vux'
	import elOrderMall from 'components/order/mall'
	import elOrderCourse from 'components/order/course'
	import elOrderAudio from 'components/order/audio'
	import elCartPay from 'components/cart/cart-pay'

	export default {
		name: "order",
		directives: {
	    TransferDom
	  },
		components: {
			Group, Selector, XInput, XButton, FormPreview, Popup, Toast, elOrderMall, elCartPay, elOrderCourse, elOrderAudio
		},
		data () {
			return {
				show: true,
				payClick: false, 
				orderInfo: {
					code: this.$route.query.orderCode,
					type: "", // 1:课程 2:商城 3:视频或音频
					num: 0,
					money: "",
					address: {},
					isActive: '' //// 支付按钮是否可点击
				},
				orderMallDatas: {},
				orderCourseData: {},
				orderAudioData: {},
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

							if(responseData.data.type == 1) {
								_this.orderCourseData = responseData.data.list[0];
							}

							if(responseData.data.type == 2) {
								_this.orderMallDatas = responseData.data;
							}

							if(responseData.data.type == 3) {
								_this.orderAudioData = responseData.data.list[0];
							}

							if(_this.orderInfo.type != 2) {
								_this.orderInfo.isActive = true;
							} else if (_this.orderInfo.address.address) {
								_this.orderInfo.isActive = true;
							}

							responseData.data.list.map(function(item, index) {
								num += item.count;
							})

							_this.orderInfo.num = num;
						}
				});
			},
			setCartPayStatus (data) {
				this.orderInfo.isActive = data
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	@import '~assets/css/icon';
	
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
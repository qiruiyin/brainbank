<!-- 
	订单支付按钮
 -->

<template>
	<div class="cart cart-pay" v-transfer-dom>
		<p>共<span>{{ orderInfo.num }}</span>件，总金额 <span><i>￥</i>{{ orderInfo.money }}</span></p>
		<div @click="payOrder" class="pay-order">支付</div>
	</div>	
</template>

<script type="text/babel">
	import { TransferDom } from 'vux'
	
	export default {
		directives: {
	    TransferDom
	  },
	  props: ["orderInfo"],
		data () {
			return {
				title: "",
				cartPay: {
					num: 1,
					money: "60",
					orderCode: ""
				}
			}
		},
		methods: {
			payOrder () {
				let _this = this;

				// if(_this.orderInfo.address)
				if(_this.orderInfo.type == 2 && _this.orderInfo.address.name) {

				} else {
					this.$http.post('/wechat/order/pay/prepare',
							{
								"openId": _this.$store.state.user.openId,
								"orderCode": _this.orderInfo.code,
							}
						).then(function(e) {
							let responseData = e.data.data,
									weixinConfig = {
										"appId": responseData.payment.appId,     //公众号名称，由商户传入     
				           	"timeStamp": responseData.payment.timeStamp,         //时间戳，自1970年以来的秒数     
				            "nonceStr": responseData.payment.nonceStr, //随机串     
				            "package": responseData.payment.packageValue,     
				            "signType": "MD5",         //微信签名方式：     
				            "paySign": responseData.payment.paySign //微信签名 
									};
							WeixinJSBridge.invoke(
				       'getBrandWCPayRequest', weixinConfig,
				       function(res){
				       		alert(res.err_msg)
				          if(res.err_msg == "get_brand_wcpay_request:ok" ) {
				          	// alert("")
				          }
				           // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
				       })
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.cart {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: $cartH;
		background: #fff;
		z-index: 10;
		display: flex;
		font-size: 15px;

		div {
			width: 50%;
			line-height: $cartH;
			text-align: center;
			color: #fff;
		}
	}

	.cart-pay {

		p {
			padding-right: $padding;
			flex: 1;
			line-height: $cartH;
			text-align: right;

			span {
				color: $cartColorYellow;
				
				i {
					font-style: normal;
				}
			}
		}

		.pay-order {
			width: 100px;
			background: $cartColorYellow;
		}
	}

	

</style>
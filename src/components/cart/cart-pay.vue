<!-- 
	订单支付按钮
 -->

<template>
	<div v-transfer-dom v-cloak>
		<div class="cart cart-pay">
			<!-- <p>共<span>{{ orderInfo.num }}</span>件，总金额 <span><i>￥</i>{{ orderInfo.money }}</span></p> -->
			<p>总金额 <span><i>￥</i>{{ orderInfo.money }}</span></p>
			<div @click="payOrder" :class="['pay-order', { 'disabled': !isActive }]">提交订单</div>
		</div>	
	</div>
</template>

<script type="text/babel">
	import { TransferDom } from 'vux'
  import { mapState } from 'vuex'
	
	export default {
		name: 'cartPay',
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
		computed: {
      ...mapState({
        user: state => state.user,
        loadbar: state => state.loadbar
      }),
      isActive () {
      	return this.orderInfo.isActive && this.user.pay
      }
    },
		methods: {
			payOrder () {
				let _this = this;
				if(_this.isActive) {
					if(_this.orderInfo.isActive) {
						this.pay();
					} else {
						this.$vux.alert.show({
							content: "请选择收货地址"
						})
					}
				}
			},
			pay () {
				let _this = this;
				if(_this.orderInfo.type == 1) {
					// 跳过支付看问题
					// _this.$router.push({name: 'questionnaire', query: { productCode: _this.orderInfo.productCode, groupCode: "", orderCode: _this.orderInfo.code }})
					this.payWeixinOrder(_this.orderInfo.code, {name: 'questionnaire', query: { productCode: _this.orderInfo.productCode, groupCode: "", orderCode: _this.orderInfo.code }}, 1)
      	} else {
					this.payWeixinOrder(_this.orderInfo.code, {name: "orderDoneMall", query: { orderCode: _this.orderInfo.code }});
      	}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	@import '~assets/css/cart';
	
	.cart {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: $cartH;
		background: $cartBg;
		z-index: 10;
		display: flex;
		font-size: $cartBtnFontSize;
		border-top: 1px solid $borderColor;
		color: $cartColor;

		div {
			width: 50%;
			line-height: $cartH;
			text-align: center;
		}
	}

	.cart-pay {

		p {
			padding-right: $padding;
			flex: 1;
			line-height: $cartH;
			text-align: right;

			span {
				color: $cartColor;
				
				i {
					font-style: normal;
				}
			}
		}

		.pay-order {
			width: 100px;
			background: $cartColorYellow;
	
			&.disabled {
				background: $disabledPay;
			}
		}
	}

	

</style>
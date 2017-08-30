<!-- 
	购物车按钮
 -->

<template>
	<div v-transfer-dom v-cloak>
		<div class="cart">
			<div @click="goShopCart" class="balance fa fa-shopping-cart"><span>购物车</span><i>{{ cartNum }}</i></div>
			<div @click="addCart" class="add-cart">加入购物车</div>
			<div @click="goBalance" class="go-balance">立即购买</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import { TransferDom } from 'vux'
	import { mapState } from 'vuex'

	export default {
		name: "cart",
		directives: {
	    TransferDom
	  },
		props: ["productInfo"],
		data () {
			return {
				title: "购物车按钮"
			}
		},
		computed: {
	    ...mapState({
	      cart: state => state.cart
	    }),
	    cartNum () {
	    	if(this.cart.num > 99) {
	    		return 99 + "+"
	    	} else if (this.cart.num == 0) {
	    		return ""
	    	}
	    	return this.cart.num
	    }
	  },
		mounted () {
			if(this.$store.state.user.userCode) this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;
				this.$http.post('/wechat/shop/queryCart',
						{
							"userCode": _this.$store.state.user.userCode
						}
					).then(function(e) {
						if(e.data.errcode == 1) {
							_this.$store.commit("updateCartNum", { num: e.data.data.number });
							// _this.$store.commit("updateCartHasAjax", { hasAjax: true });
						}
					});
			},
			addCart () {
				if(!this.isLogin()) return false;
				// this.$emit("on-addCart-click");
				let _this = this;
				
				_this.$http.post('/wechat/shop/updateCart',
					{
						userCode: _this.$store.state.user.userCode,
						productCode: _this.productInfo.code,
						shopCount: _this.productInfo.num
					}).then(function(e) {
						if(e.data.errcode == 1) {
							_this.$vux.toast.show({
								text: "加入购物车成功"
							});
							let num = _this.productInfo.num + _this.$store.state.cart.num;

							_this.$store.commit("updateCartNum", { num: num});
						}
				});
			},
			goShopCart () {
				if(!this.isLogin()) return false;
				this.$router.push({name: "shopCart"});
			},
			goBalance () {
				if(!this.isLogin()) return false;
				let _this = this,
						allMoney = (_this.productInfo.price * _this.productInfo.num).toFixed(2);

				this.$http.post('/wechat/order/create',
							{
								"userCode": _this.$store.state.user.userCode,
								"productCode": _this.productInfo.code,
								"amount": _this.productInfo.num,
								"money": _this.productInfo.price,
								"allMoney": allMoney,
								"orderType":  3,
								"lessonCode": "",
								"address": ""
							}
						).then(function(e) {
							if(e.data.errcode == 1)
							_this.$router.push({ name: "confirmOrder", query: { orderCode: e.data.data.order.code } })
						});
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
		background: $cartBg;
		z-index: 10;
		display: flex;
		color: $cartColor;
		font-size: $cartBtnFontSize;

		div {
			width: 50%;
			line-height: $cartH;
			text-align: center;
		}
	}

	.add-cart, .go-balance {
		background: $cartColorYellow;
		color: #fff;	
	}

	.go-balance {
		background: $cartColorRed;
	}

	.balance {
		position: relative;
		padding: 5px;
		// background: red;
		line-height: 1;

		&:before {
			height: auto;
			line-height: 1;
			display: block;
		}
		
		span {
			height: auto;
			line-height: 1.35;
			font-size: 14px;
			display: block;
		}

		i {
			position: absolute;
			font-style: normal;
			left: 50%;
			top: 0;
			margin-left: 1em;
			line-height: 1;
			font-size: 14px;
			color: #fff;
		}
	}


</style>

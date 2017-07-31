<!-- 
	购物车浮窗
 -->

<template>
	<div @click="goCart" class="cart-frame fa fa-shopping-cart">
				
	</div>
</template>

<script type="text/babel">
	export default {
		name: "cartFrame",
		data () {
			return {
				title: "漂浮的悬窗",
				num: this.$store.state.cart.num
			}
		},
		methods: {
			goCart () {
				this.$router.push({name: "shopCart"});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	$cartH: 80px;

	.cart-frame {
		position: fixed;
		bottom: 100px;
		right: $padding;

		width: $cartH;
		height: $cartH;
		border-radius: $cartH;

		background: red;
		color: #fff;
		line-height: $cartH;
		text-align: center;
		font-size: 36px;
	}
	
</style>
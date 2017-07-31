<!-- 
	购物车按钮
 -->

<template>
	<div class="cart">
		<div @click="goShopCart" class="balance fa fa-shopping-cart"><span>购物车</span><i>{{ cartNum }}</i></div>
		<div @click="addCart" class="add-cart">添加购物车</div>
	</div>
</template>

<script type="text/babel">
	export default {
		name: "cart",
		props: ["cartNum"],
		data () {
			return {
				title: "购物车按钮"
			}
		},
		methods: {
			addCart () {
				this.$emit("on-addCart-click");
			},
			goShopCart () {
				this.$router.push({name: "shopCart"});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
 	
 	$cartH: 50px;

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
		font-size: 20px;
		letter-spacing: .2em;

		div {
			width: 50%;
			line-height: $cartH;
			text-align: center;
		}
	}

	.add-cart {
		background: blue;
		color: #fff;	
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
			color: red;

		}
	}


</style>

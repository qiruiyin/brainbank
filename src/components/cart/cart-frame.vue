<!-- 
	购物车浮窗
 -->

<template>
	<div @click="goCart" class="cart-frame fa fa-shopping-cart">
		<span>{{ cartNum }}</span>
	</div>
</template>

<script type="text/babel">
	import { mapState } from 'vuex'

	export default {
		name: "cartFrame",
		data () {
			return {
				title: "漂浮的购物车悬窗"
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
			// 如果还没有取过购物车信息
			if(!this.$store.state.cart.hasAjax) this.fetchData();
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
							_this.$store.commit("updateCartHasAjax", { hasAjax: true });
						}
					});
			},
			goCart () {
				this.$router.push({name: "shopCart"});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	$cartH: 40px;

	.cart-frame {
		position: fixed;
		bottom: 100px;
		right: $padding;

		width: $cartH;
		height: $cartH;
		border-radius: $cartH;

		background: #FF5000;
		color: #fff;
		line-height: $cartH;
		text-align: center;
		font-size: 20px;

		span {
	    position: absolute;
		  top: 50%;
		  left: 50%;
		  height: 15px;
		  width: 15px;
		  line-height: 15px;
		  font-size: 12px;
		  color: #fff;
		  margin: -16px 0 0 6px;
		  background: yellow;
		  border-radius: 30px;
		  display: none;
		}
	}
	
</style>
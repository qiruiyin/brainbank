<!-- 
	购物车
 -->
<template>
	<div class="shop-cart">
		<imgTextCart :ref="'imgText'+index" :img-text-data="item" v-for="(item, index) in cartDatas" :key="index" @on-check="onCheck">
		</imgTextCart>

		<div class="all-price">
			<group>
		 		<cell title="总价格" :value="allPrice"></cell>
			</group>
		</div>
		<div class="btns">
			<div class="delete" @click="deleteAll">清空</div>
			<div class="next" @click="next">下订单</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Cell, Group } from 'vux'
	import imgTextCart from 'components/img-text/img-text-cart'
	// import "" from 'assets/img/shop-cart.jpg'

	export default {
		components: {
			Cell, Group, imgTextCart
		},
		data () {
			return {
				cartDatas: []
			}
		},
		computed: {
			allPrice () {
				let data = 0;
				this.cartDatas.map(function(item, index){
					data += item.price * item.num;
				});
				return data.toFixed(2);
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;

				_this.$http.post('/wechat/shop/queryCart',
					{
						userCode: _this.$store.state.user.userCode,
					}).then(function(e) {
						let responseData = e.data;
						if(responseData.errcode == 1) {
							_this.cartDatas = responseData.data.list.map(function(item, index){
								return {
									imgPath: _this.resolveImg(item.thumbnail),
									title: item.name,
									price: item.price,
									num: item.shop_count,
									code: item.code,
									check: true
								}
							})

						}
		  			// _this.$router.push({name: 'shopCart'});
				});
			},
			deleteAll () {
				let _this = this;
				this.cartDatas = [];
				_this.$http.post('/wechat/shop/emptyCart',
					{
						userCode: _this.$store.state.user.userCode,
					}).then(function(e) {
		  			
				});
			},
			next () {
				this.$router.push({name: 'confirmOrder'});
			},
			
			// selectAll () {
			// 	this.checkAll = true
			// 	for (let key in this.$refs) {
			// 		this.$refs[key][0].setChecked()
			// 	}
			// },
			onCheck (val) {
				let data;
				if (val) {
					data = this.cartDatas.every(function(elem) {
						return elem.check == true
					})
					if (data) this.checkAll = true
				} else {
					this.checkAll = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/vars', '~assets/css/core/functions';
	
	.btns {
		@extend %clearfix;
		width: 100%;
		padding: $padding;
		background-color: #fff;
		text-align: center;

		.delete {
			float: left;
		}

		.next {
			float: right;
			width: 4em;
		}
	}

	.select-all {
		.checkbox {
			position: absolute;
			top: 50%;
		}
	}
</style>
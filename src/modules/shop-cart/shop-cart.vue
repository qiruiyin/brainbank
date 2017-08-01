<!-- 
	购物车
 -->
<template>
	<div class="shop-cart">
		<swipeout>

      <swipeout-item v-for="(item, index) in cartDatas" :key="index" transition-mode="follow">
        <div slot="right-menu">
          <swipeout-button @click.native="deleteCart(item, index)" type="warn">删除</swipeout-button>
        </div>

        <imgTextCart slot="content" :ref="'imgText'+index" :img-text-data="item"  @on-check="onCheck"></imgTextCart>
      </swipeout-item>
    
    </swipeout>

		<div v-if="allPrice > 0" class="all-price">
			<group>
		 		<cell title="总价格" :value="allPrice"></cell>
			</group>
		</div>
		<div class="btns">
			<x-button type="primary" class="delete" @click.native="deleteAll">清空</x-button>
			<x-button type="primary" class="next" @click.native="next">下订单</x-button>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Cell, Group, XButton, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
	import imgTextCart from 'components/img-text/img-text-cart'

	export default {
		components: {
			Cell, Group, XButton, Swipeout, SwipeoutItem, SwipeoutButton, imgTextCart
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
									check: true,
									hasCheck: true
								}
							})
						}
				});
			},
			deleteCart (obj, ind = -1) {
				let _this = this;
				console.log(obj)
				if(ind > -1) {
					_this.cartDatas.splice(ind, 1);;
				}
				_this.$store.commit("updateCartNum", { num: _this.$store.state.cart.num - obj.num });
	
				_this.$http.post('/wechat/shop/delCart',
					{
						userCode: _this.$store.state.user.userCode,
						productCode: obj.code
					}).then(function(e) {
				});
			},
			deleteAll () {
				let _this = this;
				if(_this.cartDatas.length > 0) {
					this.cartDatas = [];
					_this.$http.post('/wechat/shop/emptyCart',
						{
							userCode: _this.$store.state.user.userCode,
						}).then(function(e) {
			  			_this.$store.commit("updateCartNum", { num: 0 });
					});
				}
			},
			next () {
				let _this = this,
						payCartNum = 0, // 订单商品总数量
	    	 		productCode = "", // 商品code
	    	 		amount = "", // 商品单价
	    	 		money = "", // 订单总价
			    	cartDatas = _this.cartDatas.filter(function(item, index){
			    		if(item.check) {
			    			productCode += productCode == "" ? item.code : "," + item.code;
			    			amount += amount == "" ? item.num : "," + item.num;
			    			money += money == "" ? (item.price * item.num).toFixed(2): "," + (item.price * item.num).toFixed(2);
			    			payCartNum += item.num;
			    		}
		    			return item.check;
			    	});

	    	if(cartDatas[0]) {
					this.$http.post('/wechat/order/create',
							{
								"userCode": _this.$store.state.user.userCode,
								"productCode": productCode,
								"amount": amount,
								"money": money,
								"allMoney": _this.allPrice,
								"orderType":  3,
								"lessonCode": "",
								"address": ""
							}
						).then(function(e) {
							if(e.data.errcode == 1) {
								// 移除下了订单的产品
								cartDatas.map(function(item, index) {
									_this.deleteCart(item)
								});
								// 更新购物车数量
								_this.$store.commit("updateCartNum", { num: _this.$store.state.cart.num - payCartNum });

								_this.$router.push({name: 'confirmOrder', query: { "orderCode": e.data.data.order.code }});
							}
						});
	    	} else {
	    		_this.$vux.toast.show({
	    			text: "请至少选择一个商品"
	    		})
	    	}
			},
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
			// width: 4em;
		}
	}

	.select-all {
		.checkbox {
			position: absolute;
			top: 50%;
		}
	}
</style>
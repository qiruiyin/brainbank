<!-- 
	地址信息
 -->

<template>
	<div class="address" v-cloak>
		<swipeout class="swiper">
      <swipeout-item transition-mode="follow" v-for="(item, index) in addressDatas" :key="index">
        <div slot="right-menu">
          <swipeout-button type="primary" @click.native="editClick(item.code, index)">编辑</swipeout-button>
          <swipeout-button type="warn" @click.native="deleteClick(item.code, index)">删除</swipeout-button>
        </div>
        <div slot="content" @click="setCheck(item.code, index)" class="block">
       		<div class="block-address">{{ item.address }}</div>
					<div class="block-msg">{{ item.name }}{{ item.phone }}</div>

					<div v-if="index == addressState" class="checked"></div>
       	</div>
      </swipeout-item>
    </swipeout>

		<div class="btns">
			<x-button type="primary" @click.native="addAddress">新增地址</x-button>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Radio, Group , XButton, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'

	export default {
		name: "address",
		components: { Radio, Group, XButton, Swipeout, SwipeoutItem, SwipeoutButton },
		data () {
			return {
				// 来自订单的传参
				orderCode: this.$route.query.orderCode || "",
				addressDatas: [
					{
						address: "",
						name: "",
						phone: "",
						code: "",
						state: ""
					}
				],
				addressState: -1
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;
	  		_this.$http.post('/wechat/shop/queryCustomerAddress',{
	  			"userCode": _this.$store.state.user.userCode
	  			}).then(function(e) {
						let responseData = e.data.data;
						_this.addressDatas = responseData.list;
						responseData.list.map(function(item, index){
							if (item.state == 1) {
								_this.addressState = index
							}
						})
	  		});
			},
			setCheck (code, ind) {
				let _this = this;

				if(_this.orderCode) {
					_this.$http.post('/wechat/shop/updateOrderAddress',{
		  			"orderCode": _this.orderCode,
		  			"address": code
		  			}).then(function(e) {
		  				_this.$router.push({ name: "confirmOrder", query: { orderCode: _this.orderCode } });
		  			});
				} else {
					_this.$http.post('/wechat/shop/setDefaultArea',{
		  			"userCode": _this.$store.state.user.userCode,
		  			"code": code
		  			}).then(function(e) {
		  				if(e.data.errcode == 1) {
		  					_this.addressState = ind
		  				}
		  				_this.$vux.toast.show({
			          text: e.data.errmsg
			        })
		  		});
				}
			},
			editClick (code) {
				let _this = this;
				if(_this.orderCode) {
					this.$router.push({name: "addressEdit", params: { code: code }, query: { orderCode: _this.orderCode }})
				} else {
					this.$router.push({name: "addressEdit", params: { code: code }})
				}
			},
			deleteClick (code, ind) {
				let _this = this;

				_this.$http.post('/wechat/shop/delArea',{
	  			"code": code
	  			}).then(function(e) {
	  				if(e.data.errcode == 1) {
	  					if(_this.addressState == ind) {
	  						_this.addressState = -1;	
	  					}
	  					_this.addressDatas.splice(ind,1)
	  				}
	  				_this.$vux.toast.show({
		          text: e.data.errmsg
		        })
	  		});
			},
			addAddress () {
				let _this = this;
				if(_this.orderCode) {
  				_this.$router.push({ name: "addressAdd", query: { orderCode: _this.orderCode, url: 'address' } });
				} else {
					this.$router.push({name: "addressAdd", query: { url: 'address' }});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.address {
		padding-top: $padding;
	}
	
	.swiper {
		@include halfpxline(0, $borderColor, 1px, 0, 0, 0);
	}
	
	.block {
		@include halfpxline(0, $borderColor, 0 , 0, 1px, 0);
		padding: $padding;
	}

	.checked {
		position: absolute;
		right: $padding;
		top: 50%;
		width: 20px;
		height: 20px;
		margin-top: -10px;
		background: url("~assets/img/user-center/address-check.png") no-repeat;
		background-size: 100%;
		// line-height: 1;
		// margin-top: -12px;
		// font-size: 24px;
		// color: $colorGreen;
	}
	
	.btns {
		margin-top: 40px;
		padding: $padding;
	}
</style>

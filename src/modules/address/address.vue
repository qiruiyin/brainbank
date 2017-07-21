<!-- 
	地址信息
 -->

<template>
	<div class="address">
		<swipeout class="swiper">
      <swipeout-item transition-mode="follow" v-for="(item, index) in addressDatas" :key="index">
        <div slot="right-menu">
          <swipeout-button type="primary" @click.native="editClick(item.code, index)">编辑</swipeout-button>
          <swipeout-button type="warn" @click.native="deleteClick(item.code, index)">删除</swipeout-button>
        </div>
        <div slot="content" @click="setCheck(item.code, index)" class="block">
       		<div class="block-address">{{ item.address }}</div>
					<div class="block-msg">{{ item.name }}{{ item.phone }}</div>

					<div v-if="index == addressState" class="fa fa-check checked"></div>
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
							if(item.state == 1) {
								_this.addressState = index
							}
						})
	  		});
			},
			setCheck (code, ind) {
				let _this = this;

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
			},
			editClick (code) {
				this.$router.push({name: "addressEdit", params: { code: code }})
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
				this.$router.push({name: "addressAdd"})
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
		// margin: $padding;
		// border-radius: $borderRadius;

		&.active {
			// background: $fontColorBlue;
			// color: #fff;
		}
	}

	.checked {
		position: absolute;
		right: $padding;
		top: 50%;
		line-height: 1;
		margin-top: -12px;
		font-size: 24px;
		color: $colorGreen
	}
	
	.btns {
		margin-top: 40px;
		padding: $padding;
	}
</style>

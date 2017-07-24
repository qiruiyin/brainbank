<!-- 
	订单
 -->

<template>
	<div class="order">
		<div class="order-body">
			<template v-if="addressData.address">
				<div class="address" @click.native="addressChoose">
					<div class="block">
						<div class="block-address">{{ addressData.address }}</div>
						<div class="block-msg">{{ addressData.name }} {{ addressData.phone }}</div>
					</div>
				</div>
			</template>

			<template v-else>
				<div class="btns" >
					<x-button type="primary" @click.native="addressChoose">地址选择</x-button>
				</div>
			</template>

			<imgTextCart :ref="'imgText'+index" :img-text-data="item" v-for="(item, index) in cartDatas" :key="index"></imgTextCart>
		</div>

		<div class="btns" >
			<x-button type="primary" @click.native="submit">提交</x-button>
		</div>
		    
		<div v-transfer-dom>
			<popup v-model="pay.show">
	      <div class="pay">
					<form-preview header-label="付款金额" :header-value="allPrice" :body-items="pay.list"></form-preview>	
	      	
	      	<div class="pay-btn">
						<x-button type="primary" @click.native="payOrder">支付</x-button>
	      	</div>
	    	</div>
	    </popup>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Group, Selector, XInput, XButton, FormPreview, Popup, Toast, TransferDomDirective as TransferDom  } from 'vux'
	import imgTextCart from 'components/img-text/img-text-cart'

	export default {
		name: "order",
		directives: {
	    TransferDom
	  },
		components: {
			Group, Selector, XInput, XButton, FormPreview, Popup, Toast, imgTextCart
		},
		data () {
			return {
				show: true,
				addressData: {
					address: "",
					name: "",
					phone: "",
					code: ""
				},
				cartDatas: [],
				pay: {
					show: false,
					allPrice: 0,
					list: [
						{
			        label: '订单号',
			        value: ''
			      }, {
			        label: '联系人',
			        value: ''
			      }, {
			        label: '电话',
			        value: ''
			      }, {
			        label: '地址',
			        value: ''
			      }, {
			        label: '时间',
			        value: ''
			      }
			    ]
				}
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
	  	// this.signUrl(location.href);
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;

				_this.$http.post('/wechat/shop/queryDefaultCustomerAddress',
					{
						userCode: _this.$store.state.user.userCode,
					}).then(function(e){
						let responseData = e.data.data;
						_this.addressData = responseData.result;
					});

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
									code: item.code
								}
							})
						}
				});
			},
			addressChoose() {
				this.$router.push({ name: "address" });
			},
			submit () {
				let _this = this,
	    	 		productCode = "",
	    	 		amount = "",
	    	 		money = "";
	    	_this.cartDatas.map(function(item, index){
	    		productCode += index == 0 ? item.code : "," + item.code;
	    		amount += index == 0 ? item.num : "," + item.num;
	    		money += index == 0 ? (item.price * item.num).toFixed(2): "," + (item.price * item.num).toFixed(2)
	    	});
				this.$http.post('/wechat/order/create',
						{
							"userCode": _this.$store.state.user.userCode,
							"productCode": productCode,
							"amount": amount,
							"money": money,
							"allMoney": _this.allPrice,
							"orderType":  3,
							"lessonCode": "",
							"address": _this.addressData.code
						}
					).then(function(e) {
						let responseData = e.data;

						if(responseData.errcode != 1) {
							_this.$vux.toast.show({
			          text: responseData.errmsg
			        })
						} else {
							_this.pay.show = true;
							_this.pay.allPrice = _this.allPrice;
							_this.pay.list[0].value = responseData.data.order.code;
							_this.pay.list[1].value = _this.addressData.name;
							_this.pay.list[2].value = _this.addressData.phone;
							_this.pay.list[3].value = _this.addressData.address;
							_this.pay.list[4].value = responseData.data.order.createTime;
						}
					});
			},
			payOrder () {
	    	let _this = this;
				this.$http.post('/wechat/order/pay/prepare',
						{
							"openId": _this.$store.state.user.openId,
							"orderCode": _this.pay.list[0].value,
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
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.address {
		.block {
			@include halfpxline($borderRadius, $borderColor, 1px, 1px, 1px, 1px);
			padding: $padding;
			margin: $padding;
			border-radius: $borderRadius;

			&.active {
				background: $fontColorBlue;
				color: #fff;
			}
		}
	}

	.btns, .pay-btn {
		padding: $padding;
	}

	.demo {
		position: absolute;
		z-index: 1000;
		top: 0;
		left: 0;
		right:　0;
		bottom: 0;
	}
</style>
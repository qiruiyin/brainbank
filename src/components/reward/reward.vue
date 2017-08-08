<!-- 
	打赏
 -->

<template>
	<div class="reward">
		<div @click="btnClick" class="reward-btn">打赏</div>
		<div v-transfer-dom>
	    <popup v-model="reward.status" position="bottom" :hide-on-blur=false>
	      <checker class="check"
		    	v-model="reward.value"
		    	default-item-class="check-item"
		    	selected-item-class="check-item-selected"
		    >
		      <checker-item v-for="(item, index) in reward.list" :key="index" :value="item">￥{{ item }}</checker-item>
		    </checker>
	      <!-- <group>
	      	<selector title="打赏金额" :options="reward.list" v-model="reward.value"></selector>
	      </group> -->
	      <div class="btns">
	        <x-button @click.native="btnSubmit" type="primary">确定</x-button>
	        <x-button @click.native="btnCancel('reward')" type="default">取消</x-button>
	      </div>
	    </popup>
	 	</div>
	</div> 
	
</template>

<script type="text/babel">
	import hold from 'src/commons/hold'
  import { mapState } from 'vuex'
	import { TransferDom, Popup, Group, XInput, XButton, FormPreview, Selector, Checker, CheckerItem } from 'vux'

	export default {
		name: "reward",
		directives: {
	    TransferDom
	  },
		components: {
			Popup, Group, XInput, XButton, FormPreview, Selector, Checker, CheckerItem
		},
		props: ['rewardData'],
		data () {
			return {
				title: "打赏",
				reward: {
					status: false,
					value: 5,
					list: [ 5, 10, 20, 30, 50, 100 ],
				},
				pay: {
					status: false,
					allPrice: 0,
					list: [
						{
			        label: '订单号',
			        value: ''
			      }, {
			        label: '名称',
			        value: ''
			      }
			    ]
				}
			}
		},
		computed: {
			...mapState({
        user: state => state.user
      })
		},
		methods: {
			btnClick () {
				this.reward.status = true;
			},
			btnSubmit () {
				let _this = this;

				if(!_this.reward.value) {
					this.$vux.alert.show({
						content: "请选择金额"
					})
					return false;
				}

				this.$http.post('/wechat/orderSpare/create',
						{
							"openId": _this.$store.state.user.openId,
							"productCode": _this.rewardData.code,
							"money": _this.reward.value
						}
					).then(function(e) {
						let responseData = e.data;

						if(responseData.errcode != 1) {
							_this.$vux.toast.show({
			          text: responseData.errmsg
			        })
						} else {
							_this.pay.status = true;
							_this.payReward(responseData.data.orderCode)
						}
					})
			},
			btnCancel (obj) {
				this[obj].status = false
			},
 			payReward (orderCode) {
				let _this = this;

				this.$http.post('/wechat/orderSpare/pay/prepare',
						{
							
							"openId": _this.$store.state.user.openId,
							"orderCode": orderCode
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
			       		if(res.err_msg == "get_brand_wcpay_request:ok" ) {
									_this.reward.status = false;
									_this.$vux.alert.show({
										content: "感谢大神支持！"
									})
			          } else if(res.err_msg == "get_brand_wcpay_request:cancel" ) {
									this.reward.status = false;
			          } else if(res.err_msg == "get_brand_wcpay_request:fail" ) {
			          	// Vue.
			          	Vue.$vux.alert.show({
			          		content: "调取微信接口失败"
			          	})
			          } 
			           // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
			       })
					})
			}

		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.check {
		padding: $padding 0;
		text-align: center;
	}

	// check
	.check-item {
	  width: 25%;
	  height: 40px;
	  margin: $padding;
	  line-height: 40px;
	  text-align: center;
	  border-radius: 3px;
	  border: 1px solid #ccc;
	  background-color: #fff;
	  // margin: $padding;
	}
	.check-item-selected {
	  background: #ffffff url(~assets/img/icon/active.png) no-repeat right bottom;
	  border-color: #ff4a00;
	}

	.reward-btn {
		width: 5em;
		margin: 0  auto;
		margin-top: $padding;
		line-height: $inputH;
		background: $colorOrange;
		color: #fff;
		font-size: 20px;
		letter-spacing: .5em;
		text-indent: .5em;
		border-radius: $borderRadius;
	}

	.btns {
		padding: $padding;

		.disabled {
			background: $disabledPay;
		}
	}
</style>
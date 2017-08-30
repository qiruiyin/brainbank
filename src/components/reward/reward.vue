<!-- 
	打赏
 -->

<template>
	<div class="reward" v-cloak>
		<div @click="btnClick" class="reward-btn">打赏</div>

		<div v-transfer-dom>
	    <popup class="reward-popup" v-model="reward.status" position="bottom">
	      <checker class="check"
		    	v-model="reward.value"
		    	default-item-class="check-item"
		    	selected-item-class="check-item-selected"
		    >
		    	<div>
		      	<checker-item v-for="(item, index) in reward.list[0]" :key="index" :value="item">￥{{ item }}</checker-item>
		      </div>
		      <div>
		      	<checker-item v-for="(item, index) in reward.list[1]" :key="index" :value="item">￥{{ item }}</checker-item>
		      </div>
		    </checker>
		    <div class="reward-set" @click="rewardSet">自定义金额</div>
	      <!-- <group>
	      	<selector title="打赏金额" :options="reward.list" v-model="reward.value"></selector>
	      </group> -->
	      <div class="btns reward-pay-btn">
	        <x-button v-if="btnSubmitStatus" @click.native="btnSubmit" type="primary">确认</x-button>
	        <x-button v-else @click.native="btnSubmit" type="primary" show-loading>确认</x-button>
	      </div>
	    </popup>
	 	</div>

	 	<div v-transfer-dom>
	    <popup class="reward-popup" v-model="rewardInput.status" position="bottom">
	    	<div class="reward-title">
	    		<div @click="rewardSet" class="reward-back"></div>
	    		自定义金额
	    	</div>
				<div class="reward-input">
					<x-input type="tel" v-model="rewardInput.value"></x-input>
				</div>	    	
	      <div class="btns">
	        <x-button v-if="btnSubmitStatus" @click.native="btnSubmit" type="primary">确认</x-button>
	        <x-button v-else @click.native="btnSubmit" type="primary" show-loading>确认</x-button>
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
					list: [
						[5, 10, 20],
						[30, 50, 100]
					],
				},
				rewardInput: {
					status: false,
					value: ""
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
				},
				btnSubmitStatus: true
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
			rewardSet () {
				this.rewardInput.status = !this.rewardInput.status;
				this.rewardInput.value = "";
			},
			btnSubmit () {
				let _this = this,
						money;

				if(this.rewardInput.status) {
					money = _this.rewardInput.value
				} else {
					money = _this.reward.value;
				}

				if (!money) {
					this.$vux.alert.show({
						content: "请选择金额"
					})
					return false;
				}

				_this.btnSubmitStatus = false;

				this.$http.post('/wechat/orderSpare/create',
						{
							"openId": _this.$store.state.user.openId,
							"productCode": _this.rewardData.code,
							"money": money
						}
					).then(function(e) {
						let responseData = e.data;
						_this.btnSubmitStatus = true;

						if(responseData.errcode != 1) {
							_this.$vux.toast.show({
			          text: responseData.errmsg
			        })
						} else {
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

<style lang="scss">
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.btns {
		padding: $padding;

		&.reward-pay-btn {
			padding-left: 0;
			padding-right: 0;
			padding-bottom: 0;

			.weui-btn {
				line-height: 50px;
				border-radius: 0;
			}
		}

		.disabled {
			background: $disabledPay;
		}
	}
</style>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.reward {
		// margin-bottom: $paddingTop;
	}

	.reward-popup {
		background: #fff;
	}

	.check {
		padding: $padding 0;
		text-align: center;

		& > div {
			width: 100%;
			padding: 0 40px;
			text-align: center;
			display: flex;
		}
	}

	// check
	.check-item {
	  width: 67px;
	  height: 30px;
	  margin: $padding/2 auto;
	  line-height: 30px;
	  text-align: center;
	  border-radius: 3px;
	  // border: 1px solid #ccc;
	  color: $fontColorBlack;
	  background-color: #efefef;
	  // margin: $padding;
	}
	.check-item-selected {
		position: relative;
		color: #fff;
	  background: $colorOrange;

	  &:before {
	  	content: "";
	  	position: absolute;
	  	right: 3px;
	  	bottom: 3px;
	  	width: 12px;
	  	height: 12px;
	  	background: url(~assets/img/icon/active.png) no-repeat;
	  	background-size: 100%;
	  }
	  // border-color: #ff4a00;
	}

	.reward-set, .reward-title {
		font-size: 18px;
		color: #59748f;
	}

	.reward-title, .reward-set {
		position: relative;
		line-height: $inputH;
		margin-bottom: 50px;
		text-align: center;

		.reward-back {
			position: absolute;
			top: 0;
			left: $padding;
			width: $inputH;
			height: $inputH;
			// background: red;

			&:before {
				content: "";
				position: absolute;
				top: 50%;
				left: 0;
				width: 12px;
				height: 12px;
				margin-top: -8px;
				// margin-left: -4px;
				border: 1px solid #59748f;
				border-right: 0;
				border-top: 0;
				transform: rotate(45deg);
			}
		}
	}

	.reward-set {
		margin-bottom: 0;
	}

	.reward-input {
		position: relative;
		margin: 0 $padding;
		margin-bottom: $padding;
		padding-left: 20px;
		color: $fontColorBlack;
		@include halfpxline(0, #ccc, 0 , 0, 1px, 0);

		&:before {
			content: "￥";
			position: absolute;
			left: 0;
			right: 0;
			width: 40px;
			text-align: center;
			line-height: 42px;
			font-size: 18px;
		}
	}

	.reward-btn {
		width: 4em;
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

	
</style>
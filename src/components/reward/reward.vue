<!-- 
	打赏
 -->

<template>
	<div class="reward">
		<div @click="btnClick" class="reward-btn">奖赏</div>
		<div v-transfer-dom>
	    <popup v-model="reward.status" position="bottom" :hide-on-blur=false>
	      <group>
	      	<selector title="金额" :options="reward.list" v-model="reward.value"></selector>
	        <!-- <x-input type="number" title="金额" v-model="reward.value"></x-input> -->
	      </group>
	      <div class="btns">
	        <x-button @click.native="btnSubmit" type="primary">确定</x-button>
	        <x-button @click.native="btnCancel('reward')" type="default">取消</x-button>
	      </div>
	    </popup>
	 	</div>

		<div v-transfer-dom>
			<popup v-model="pay.status" position="bottom" :hide-on-blur=false>
				<div class="pay">
					<form-preview header-label="赞赏金额" :header-value="pay.allPrice" :body-items="pay.list"></form-preview>	
	      	
	      	<div class="btns">
						<x-button type="primary" @click.native="payReward">支付</x-button>
	        	<x-button @click.native="btnCancel('pay')" type="default">取消</x-button>
	      	</div>
	    	</div>
			</popup>
	  </div>
	</div>
	
</template>

<script type="text/babel">
	import hold from 'src/commons/hold'
	import { TransferDom, Popup, Group, XInput, XButton, FormPreview, Selector} from 'vux'

	export default {
		name: "reward",
		directives: {
	    TransferDom
	  },
		components: {
			Popup, Group, XInput, XButton, FormPreview, Selector
		},
		props: ['rewardData'],
		data () {
			return {
				title: "打赏",
				reward: {
					status: false,
					value: "",
					list: [
						{
							key: 5,
							value: '5'
						},
						{
							key: 10,
							value: '10'
						},
						{
							key: 20,
							value: '20'
						},
						{
							key: 50,
							value: '50'
						},
						{
							key: 100,
							value: '100'
						},
					]
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
		methods: {
			btnClick () {
				this.reward.status = true;
			},
			btnSubmit () {
				let _this = this;

				this.$http.post('/wechat/orderSpare/create',
						{
							"userCode": _this.$store.state.user.userCode,
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
							_this.reward.status = false;
							_this.pay.status = true;
							_this.pay.allPrice = responseData.data.money;
							_this.pay.list[0].value = responseData.data.orderCode;
							_this.pay.list[1].value = _this.rewardData.name;
						}
					})
			},
			btnCancel (obj) {
				this[obj].status = false
			},
 			payReward () {
				let _this = this;

				this.$http.post('/wechat/orderSpare/pay/prepare',
						{
							
							"openId": _this.$store.state.user.openId,
							"orderCode": _this.pay.list[0].value
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

	.reward-btn {
		width: 5em;
		margin: 0  auto;
		margin-top: $padding;
		line-height: $inputH;
		background: $colorRed;
		color: #fff;
		font-size: 20px;
		letter-spacing: .5em;
		text-indent: .5em;
	}
	.btns {
		padding: $padding;
	}
</style>
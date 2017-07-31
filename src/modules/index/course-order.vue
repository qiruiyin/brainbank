<!-- 
	课程支付页面，报名参加课程，包含复训和升级
 -->

<template>
	<div class="enlist">
		<group>
      <x-input :title='course.title' v-model="course.value" readonly></x-input>
      <selector v-model="period.value" :title="period.title" :name="period.name" :options="period.list" @on-change="onPeriodChange"></selector>
      
      <template v-if="userStatus == 0">
      	<x-input type="number" :title="tel.title" v-model="tel.value" :placeholder="tel.placeholder" class="weui-vcode">
	        <el-verification-code :tel="tel.value" slot="right"></el-verification-code>
	      </x-input>
	      <x-input :title="code.title" v-model="code.value" :placeholder="code.placeholder"></x-input>
      </template>
      
      <x-input :title='count.title' v-model="count.value" readonly></x-input>
      <x-input :title='price.title' v-model="price.value" readonly></x-input>
      <x-input :title='date.title' v-model="date.value" readonly></x-input>
      <x-input :title='address.title' v-model="address.value" readonly></x-input>
			
			<template v-if="userStatus == 0">
				<div class="add-man" v-for="(item, index) in addMan.list" :key="index">
					<p class="add-name">{{ item.name }} <span>{{ item.tel }}</span></p>
					<p>{{ item.idCard }}</p>
				</div>
    	</template>
    </group>
		
		<div class="btns" >
			<x-button v-if="userStatus == 0" type="primary" @click.native="add">添加报名人员</x-button>
			<x-button type="primary" @click.native="submit">提交</x-button>
		</div>
		
		<div v-transfer-dom>
			<popup v-model="addMan.show" position="bottom" :hide-on-blur=false>
	      <div class="pay">
					<group>
    				<x-input title='姓名' v-model="addMan.name" placeholder="请输入报名人员姓名"></x-input>
    				<x-input title='身份证' v-model="addMan.idCard" placeholder="请输入身份证号码"></x-input>
    				<x-input title='手机号' v-model="addMan.tel" placeholder="请输入手机号码"></x-input>
					</group>
	      	<div class="pay-btn">
						<x-button type="primary" @click.native="addManFun">确定</x-button>
						<x-button @click.native="cancelManFun">取消</x-button>
	      	</div>
	    	</div>
	    </popup>
    </div>

		<div v-transfer-dom>
			<popup v-model="pay.show" position="bottom" :hide-on-blur=false>
	      <div class="pay">
					<form-preview header-label="付款金额" :header-value="pay.allPrice" :body-items="pay.list"></form-preview>	
	      	
	      	<div class="pay-btn">
						<x-button type="primary" @click.native="payOrder">支付</x-button>
						<x-button @click.native="cancelPayOrder">取消</x-button>
	      	</div>
	    	</div>
	    </popup>
    </div>
	</div>
</template>

<script type="text/babel">
	import { Group, Selector, XInput, XButton, FormPreview, Popup, Toast, TransferDomDirective as TransferDom } from 'vux'
	import elVerificationCode from 'components/verification-code/verification-code'

	export default {
		name: 'pay',
		directives: {
	    TransferDom
	  },
		components: { Group, Selector, XInput, XButton, FormPreview, Popup, Toast, elVerificationCode },
		data () {
			return {
				title: '报名参加课程，包含复训和升级',
				tel: {
					value: "",
					title: "手机号",
					placeholder: "请输入手机号码"
				},
				code: {
					value: "",
					title: "验证码",
					placeholder: "请输入验证码"
				},
				addMan: {
					show: false,
					name: '',
					idCard: '',
					tel: '',
					list: []
				},
				allData: '',
				course: {
					value: '',
					title: '课程',
					name: 'course',
					code: '',
					list: [
						{
							key: 'shangsi',
							value: '商业思维'
						},{
							key: 'xitong',
							value: '系统思维'
						}
					]
				},
				period: {
					value: '',
					title: '期数',
					name: 'period',
					placeholder: '请选择期数',
					list: [
						// {
						// 	key: 'shangsi',
						// 	value: '商业思维'
						// },{
						// 	key: 'xitong',
						// 	value: '系统思维'
						// }
					]
				},
				periodSelected: 0,
				num: {
					value: '',
					title: '数量',
					name: 'num',
					placeholder: '请输入数量'
				},
				price: {
					value: '',
					title: '金额',
					name: 'price',
					placeholder: '金额'
				},
				count: {
					value: '',
					title: '剩余名额',
					name: 'count',
					placeholder: '剩余名额'
				},
				date: {
					value: '',
					title: '时间',
					name: 'date',
					placeholder: '时间'
				},
				address: {
					value: '',
					title: '地址',
					name: 'address',
					placeholder: '地址'
				},
				orderType: {
					retrain: 1,
					upgrade: 2,
					enlist: 2
				},
				pay: {
					show: false,
					allPrice: 0,
					list: [
						{
			        label: '订单号',
			        value: ''
			      }, {
			        label: '课程名称',
			        value: ''
			      }, {
			        label: '数量',
			        value: ''
			      }, {
			        label: '地址',
			        value: ''
			      }, {
			        label: '时间',
			        value: ''
			      }
			    ],
		      buttons2: [{
		        style: 'primary',
		        text: '点击事件',
		        onButtonClick: (name) => {
		        }
		      }]
				}
			}
		},
		computed: {
			userStatus () {
				// 0报名 1升级 2复训
				let payType = this.$route.params.payType;
				if(payType == "enlist") {
					return 0
				} else if (payType == "upgrade") {
					return 1;
				} else {
					return 2
				}
			} 
		},
		watch: {
			periodSelected (newValue, oldValue) {
				let _this = this;
				_this.count.value = _this.allData.lessonList[newValue].balance_count || 0;
				_this.date.value = _this.allData.lessonList[newValue].start_date;
				_this.address.value = _this.allData.lessonList[newValue].address;
			}
		},
		mounted () {
	  	// this.signUrl(location.href);
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this,
						payType = _this.$route.params.payType;
				
				if(payType == "enlist" ||payType == "upgrade") {
					this.$http.post('/wechat/discover/upgrade/lesson',
					{
							"userCode": _this.$store.state.user.userCode
						}).then(function(e) {
						_this.allData = e.data.data;
						_this.assignData(e.data.data)
					})
				} else if (payType == "retrain") {
					this.$http.post('/wechat/discover/retrain/lesson',
						{
							"userCode": _this.$store.state.user.userCode
						}).then(function(e) {
							_this.allData = e.data.data;
							_this.assignData(e.data.data)
						})
				}
			},
			assignData (responseData) {
				let _this = this;
				_this.course.code = responseData.lessonList[_this.periodSelected].product_code;
				_this.course.value = responseData.lessonName;
				_this.period.list = responseData.lessonList.map(function(item, index){
					return {
						key: item.code,
						value: item.name
					}
				});
				_this.period.value = _this.period.list[_this.periodSelected].key;
				_this.count.value = responseData.lessonList[_this.periodSelected].balance_count || 0;
				_this.price.value = responseData.lessonList[_this.periodSelected].money;
				_this.date.value = responseData.lessonList[_this.periodSelected].start_date;
				_this.address.value = responseData.lessonList[_this.periodSelected].address;
			},
			add () {
				this.addMan.show = true
			},
			addManFun () {
				let _this = this;
				if(_this.addMan.name == "") {
					_this.$vux.toast.show({
						text: "姓名不能为空"
					})
				} else if(_this.addMan.idCard == "") {
					_this.$vux.toast.show({
						text: "身份证号码不能为空"
					})
				} else if(_this.addMan.tel == "") {
					_this.$vux.toast.show({
						text: "手机号不能为空不能为空"
					})
				} else {
					_this.addMan.list.push({
						name: _this.addMan.name,
						idCard: _this.addMan.idCard,
						tel: _this.addMan.tel
					});
					_this.addMan.name = "";
					_this.addMan.idCard = "";
					_this.addMan.tel = "";
					_this.addMan.show = false;
				}
			},
			cancelManFun () {
				this.addMan.show = false
			},
	    onPeriodChange (val) {
	    	let ind;
	    	this.period.list.filter(function(item, index){
	    		if(item.key == val) {
	    			ind = index;
	    		}
	    	});
	    	this.periodSelected = ind;
	    },
	    submit () {
	    	let _this = this,
	    		money = _this.price.value.toFixed(2),
	    		orderType = _this.orderType[_this.$route.params.payType];

	    	if(_this.userStatus == 0) {
	    		if(_this.addMan.list.length == 0) {
	    			this.$vux.alert.show({
	    				content: "请添加人员"
	    			})
	    			return
	    		}

	    		if(this.tel.value == "") {
	    			this.$vux.alert.show({
	    				content: "电话号码不能为空"
	    			})
	    			return
	    		}

	    		if(this.code.value == "") {
	    			this.$vux.alert.show({
	    				content: "验证码不能为空"
	    			})
	    			return
	    		}
	    		let allMoney = (_this.price.value * _this.addMan.list.length).toFixed(2);
	    		let enrollInfo = "";
	    		_this.addMan.list.map(function(item, index){
	    			if(index != 0) {
	    				enrollInfo += "#"
	    			}
	    			enrollInfo += item.name + "," + item.idCard + "," + item.tel;
	    		});

	    		this.$http.post('/wechat/order/enroll/create',
						{
							"userCode": _this.$store.state.user.userCode,
							"productCode":  _this.course.code,
							"amount": _this.addMan.list.length,
							"money": money,
							"orderType": orderType,
							"lessonCode": _this.period.value,
							"enrollInfo": enrollInfo,
							"mobileNum": _this.tel.value,
							"smsCode": _this.code.value
						}).then(function(e) {
							let responseData = e.data;

							if(responseData.errcode != 1) {
								_this.$vux.toast.show({
				          text: responseData.errmsg
				        })
							} else {
								_this.pay.show = true;
								_this.pay.allPrice = allMoney;
								_this.pay.list[0].value = responseData.data.orderList[0].groupCode;
								_this.pay.list[1].value = _this.course.value;
								_this.pay.list[2].value = _this.addMan.list.length;
								_this.pay.list[3].value = _this.address.value;
								_this.pay.list[4].value = _this.date.value;
							}
						});
	    	} else {
					this.$http.post('/wechat/order/create',
							{
								"userCode": _this.$store.state.user.userCode,
								"productCode": _this.course.code,
								"amount": 1,
								"money": money,
								"orderType":  orderType,
								"lessonCode": _this.period.value
							}
						).then(function(e) {
							let responseData = e.data;

							if(responseData.errcode != 1) {
								_this.$vux.toast.show({
				          text: responseData.errmsg
				        })
							} else {
								_this.pay.show = true;
								_this.pay.allPrice = money;
								_this.pay.list[0].value = responseData.data.order.code;
								_this.pay.list[1].value = _this.course.value;
								_this.pay.list[2].value = 1;
								_this.pay.list[3].value = _this.address.value;
								_this.pay.list[4].value = _this.date.value;
							}
						})
				}
	    },
	    payOrder () {
	    	let _this = this;

	    	if(_this.userStatus == 0) {
	    		this.$http.post('/wechat/order/pay/enroll/prepare',
							{
								"openId": _this.$store.state.user.openId,
								"groupCode": _this.pay.list[0].value,
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
	    	} else {
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
				          }
				           // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
				       })
					});
				}
	    },
	    cancelPayOrder () {
				this.pay.show = false
	    }
	    // payBackend () {
	    // 	this.$http.post('/wechat/order/pay/prepare',
					// 	{
					// 		"openId": _this.$store.state.user.openId,
					// 		"orderCode": "201707182253247664367215373362",
					// 	}
					// ).then(function(e) {

					// });
	    // }
	  }
	}
</script>

<style>
	/*.vux-popup-dialog {
		z-index: 1000 !important;
	}
	.vux-popup-mask {
		z-index: 501 !important;
	}*/
</style>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	@import '~assets/css/form';

	.pay {
		.pay-btn {
			padding: 0 $padding;
			margin: $padding 0;
		}
	}

	.add-man {
		@include halfpxline(0, $borderColor, 1px, 0, 0, 0);
		margin: 0 $padding ;
		padding: 6px;

		.add-name {
			// font-size: 18px;
			
			span {
				float: right;
				// font-size: 14px;
			}
		}
	}
</style>
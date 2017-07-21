<!-- 
	课程支付页面，报名参加课程，包含复训和升级
 -->

<template>
	<div class="enlist">
		<group>
      <x-input :title='course.title' v-model="course.value" readonly></x-input>
      <!-- <selector v-model="course.value" :title="course.title" :name="course.name" :options="course.list" @on-change="onCourseChange"></selector> -->
      <!-- <selector v-model="course.value" :title="course.title" :name="course.name" :options="course.list" @on-change="onCourseChange" readonly></selector> -->
      <selector v-model="period.value" :title="period.title" :name="period.name" :options="period.list" @on-change="onPeriodChange"></selector>
      <x-input type="number" :title='num.title' v-model="num.value"></x-input>
      <x-input :title='count.title' v-model="count.value" readonly></x-input>
      <x-input :title='price.title' v-model="price.value" readonly></x-input>
      <x-input :title='date.title' v-model="date.value" readonly></x-input>
      <x-input :title='address.title' v-model="address.value" readonly></x-input>
    </group>
		
		<div class="btns" >
			<x-button type="primary" @click.native="submit">提交</x-button>
		</div>
		
		<div v-transfer-dom>
			<popup v-model="pay.show" position="bottom">
	      <div class="pay">
					<form-preview header-label="付款金额" :header-value="pay.allPrice" :body-items="pay.list"></form-preview>	
	      	
	      	<div class="pay-btn">
						<x-button type="primary" @click.native="payOrder">支付</x-button>
	      	</div>
	    	</div>
	    </popup>
    </div>
	</div>
</template>

<script type="text/babel">
	import { Group, Selector, XInput, XButton, FormPreview, Popup, Toast, TransferDomDirective as TransferDom } from 'vux'

	export default {
		name: 'pay',
		directives: {
	    TransferDom
	  },
		components: { Group, Selector, XInput, XButton, FormPreview, Popup, Toast },
		data () {
			return {
				title: '报名参加课程，包含复训和升级',
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
		watch: {
			periodSelected (newValue, oldValue) {
				let _this = this;
				_this.count.value = _this.allData.lessonList[newValue].balance_count || 0;
				_this.date.value = _this.allData.lessonList[newValue].start_date;
				_this.address.value = _this.allData.lessonList[newValue].address;
			}
		},
		mounted () {
	  	this.signUrl(location.href);
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this,
						payType = _this.$route.params.payType;
				if(payType == "enlist" || payType == "upgrade") {
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
	    		money = parseFloat(_this.price.value * _this.num.value),
	    		orderType = _this.orderType[_this.$route.params.payType];
				this.$http.post('/wechat/order/create',
						{
							"userCode": _this.$store.state.user.userCode,
							"productCode": _this.course.code,
							"amount": _this.num.value,
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
							_this.pay.allPrice = responseData.data.order.paymentAmount;
							_this.pay.list[0].value = responseData.data.order.code;
							_this.pay.list[1].value = _this.course.value;
							_this.pay.list[2].value = responseData.data.order.commodityCount;
							_this.pay.list[3].value = _this.address.value;
							_this.pay.list[4].value = _this.date.value;
						}
				})	
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
			          }
			           // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
			       })
				});
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
</style>
<!-- 
	课程支付页面，报名参加课程，包含复训和升级
 -->

<template>
	<div class="dn-form enlist">
		<h5 class="enlist-title">{{ courseInfo.course }}
			<span class="price" v-if="courseInfo.type == 3">￥{{ count.value == 0 ? courseInfo.price : courseInfo.price * count.value | numToCash }}</span>
			<span class="price" v-else>￥{{ courseInfo.price * (1+addManInfo.length) | numToCash }}</span>
		</h5>

		<group class="group-noTop">
			<div class="dn-tips icon icon-horn">
				您正在报名<span>{{ courseInfo.date }}</span>日在<span>{{ courseInfo.address }}</span>开课的<span>{{ courseInfo.name }}</span>还剩<span>{{ courseInfo.count }}</span>人！
			</div>
			<x-input type="tel" v-model="tel.value" :placeholder="tel.placeholder" required>
      	<label slot="label" class="label icon icon-tel">{{ tel.title }}</label>
        <el-verification-code :tel="tel.value" slot="right"></el-verification-code>
      </x-input>
      <x-input type="number" :title="code.title" v-model="code.value" :placeholder="code.placeholder" required>
      	<label slot="label" class="label icon icon-qrcode">{{ code.title }}</label>
      </x-input>
    </group>

    <group class="add-man" v-if="courseInfo.type == 2">
    	<template v-if="payType == 1">
	    	<x-input v-model="userInfo.name.value" :placeholder="userInfo.name.placeholder" readonly required>
	      	<label slot="label" class="label icon icon-user">{{ userInfo.name.title }}</label>
	      </x-input>
	    	<x-input v-model="userInfo.idCard.value" :placeholder="userInfo.idCard.placeholder" readonly required>
	      	<label slot="label" class="label icon icon-idCard">{{ userInfo.idCard.title }}</label>
	      </x-input>
	    	<x-input v-model="userInfo.tel.value" :placeholder="userInfo.tel.placeholder" readonly required>
	      	<label slot="label" class="label icon icon-tel">{{ userInfo.tel.title }}</label>
	      </x-input>
    	</template>
    	<template v-else>
	    	<x-input v-model="userInfo.name.value" :placeholder="userInfo.name.placeholder" required>
	      	<label slot="label" class="label icon icon-user">{{ userInfo.name.title }}</label>
	      </x-input>
	    	<x-input v-model="userInfo.idCard.value" :placeholder="userInfo.idCard.placeholder" required>
	      	<label slot="label" class="label icon icon-idCard">{{ userInfo.idCard.title }}</label>
	      </x-input>
	    	<x-input v-model="userInfo.tel.value" :placeholder="userInfo.tel.placeholder" required>
	      	<label slot="label" class="label icon icon-tel">{{ userInfo.tel.title }}</label>
	      </x-input>
    	</template>
    </group>

    <group class="add-man" v-else>
    	<x-input v-model="userInfo.name.value" :placeholder="userInfo.name.placeholder" readonly required>
      	<label slot="label" class="label icon icon-user">{{ userInfo.name.title }}</label>
      </x-input>
    	<x-input v-model="userInfo.idCard.value" :placeholder="userInfo.idCard.placeholder" readonly required>
      	<label slot="label" class="label icon icon-idCard">{{ userInfo.idCard.title }}</label>
      </x-input>
    	<x-input v-model="userInfo.tel.value" :placeholder="userInfo.tel.placeholder" readonly required>
      	<label slot="label" class="label icon icon-tel">{{ userInfo.tel.title }}</label>
      </x-input>
    	<x-input v-if="courseInfo.type == 3" :max='3' type="tel" :title="count.title" v-model="count.value" :placeholder="count.placeholder" required>
      	<label slot="label" class="label icon icon-tel">{{ count.title }}</label>
      </x-input>
    </group>

		<group v-if="courseInfo.type == 2 && payType != 1">
			<div @click="add" class="add-btn icon icon-add">添加报名人员
				<div class="add-btn-click fa fa-plus"></div>
			</div>
		</group>

	  <group class="add-man" v-for="(item, index) in addManInfo" :key="index">
    	<x-input v-model="item.name.value" :placeholder="item.name.placeholder" required>
      	<label slot="label" class="label icon icon-user">{{ item.name.title }}</label>
				<div slot="right" @click="remove(index)" class="add-btn-click fa fa-minus delete"></div>
      </x-input>
    	<x-input v-model="item.idCard.value" :placeholder="item.idCard.placeholder" required>
      	<label slot="label" class="label icon icon-idCard">{{ item.idCard.title }}</label>
      </x-input>
    	<x-input v-model="item.tel.value" :placeholder="item.tel.placeholder" required>
      	<label slot="label" class="label icon icon-tel">{{ item.tel.title }}</label>
      </x-input>
    </group>

		<div class="btns" >
			<x-button v-if="!submitBtn" type="primary" @click.native="submit" show-loading>提交</x-button>
			<x-button v-else type="primary" @click.native="submit">提交</x-button>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Group, Selector, XInput, XButton, FormPreview, Popup, Toast, TransferDomDirective as TransferDom } from 'vux'
  import { mapState } from 'vuex'
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
				orderType: {
					retrain: 1,
					upgrade: 2,
					enlist: 2
				},
				courseInfo: {
					productCode: "",
					course: "总裁商业思维",
					code: this.$route.query.code,
					type: this.$route.query.type || "", // lessonType 1 思维商学院 2总裁商业思维 3 企业自动化运转 0其他课程
					date: "",
					address: "",
					name: "",
					price: "",
					count: ""
				},
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
				count: {
					value: "",
					title: "数量",
					placeholder: "请输入数量"
				},
				userInfo: {
					name: {
						value: "",
						title: "姓名",
						placeholder: "请输入报名人员姓名"
					},
					idCard: {
						value: "",
						title: "身份证",
						placeholder: "请输入身份证号码"
					},
					tel: {
						value: "",
						title: "手机号",
						placeholder: "请输入手机号码"
					}
				},
				addManInfo: [],
				submitBtn: true
			}
		},
		computed: {
			...mapState({
        user: state => state.user,
        isLoading: state => state.isLoading,
      }),
      payType () {
      	//是否复训
      	return this.$route.params.payType == 'retrain' ? '1' : '0'; 
			}
		},
		mounted () {
	  	let _this = this;
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;

				this.$http.post('/wechat/discover/entered/lesson',
					{
						userCode: _this.$store.state.user.userCode,
						lessonCode: _this.courseInfo.code,
						retrain: _this.payType
					}).then(function(e) {
						let resData = e.data.data;

						if(e.data.errcode == 1) {
							_this.courseInfo.productCode = resData.lessonInfo.product_code;
							_this.courseInfo.date = resData.lessonInfo.end_date;
							_this.courseInfo.course = resData.lessonInfo.productName;
							_this.courseInfo.address = resData.lessonInfo.address;
							_this.courseInfo.name = resData.lessonInfo.name;
							_this.courseInfo.count = resData.lessonInfo.balance_count;
							_this.courseInfo.price = resData.lessonInfo.price;

							_this.userInfo.name.value = resData.user.NAME;
							_this.userInfo.idCard.value = resData.user.idcard;
							_this.userInfo.tel.value = resData.user.mobile;
						} else {
							_this.$vux.alert.show({
								content: e.data.errmsg
							})
						}
				})
			},
			add () {
				this.addManInfo.push({
					name: {
						value: "",
						title: "姓名",
						placeholder: "请输入报名人员姓名"
					},
					idCard: {
						value: "",
						title: "身份证",
						placeholder: "请输入身份证号码"
					},
					tel: {
						value: "",
						title: "手机号",
						placeholder: "请输入手机号码"
					}
				});
			},
			remove (ind) {
				this.addManInfo.splice(ind, 1);
			},
			valEmpty (obj, child) {
				let _this = this;
				if(child) {
					if(_this[obj][child].value == "") {
	    			this.$vux.alert.show({
	    				content: _this[obj][child].title + "不能为空"
	    			})
	    			return false
	    		}
	    	} else {
	    		if(_this[obj].value == "") {
	    			this.$vux.alert.show({
	    				content: _this[obj].title + "不能为空"
	    			})
	    			return false
	    		}
	    	}
	    	return true;
			},
			valManListInfo () {
	    	let status = false;

	    	_this.addManInfo.map(function(item, index){
	    		if(!item.name.value && !item.idCard.value && !item.tel.value) {
	    			status = true;
	    		}
	    	});

	    	if(status) {
	    		_this.$vux.alert.show({
	    			content: "请检查报名人员的信息是否完善"
	    		})
	    	}

	    	return status
			},
			submit () {
				if(!this.submitBtn) return;
				this.submitBtn = false;

				let _this = this,
					count = _this.addManInfo.length + 1,
	    		price = _this.courseInfo.price.toFixed(2),
	    		orderType = _this.orderType[_this.$route.params.payType];

	    	if(!_this.valEmpty('tel')) return false;
	    	if(!_this.valEmpty('code')) return false;
	    	if(!_this.valEmpty('userInfo', 'name')) return false;
	    	if(!_this.valEmpty('userInfo', 'idCard')) return false;
	    	if(!_this.valEmpty('userInfo', 'tel')) return false;

    		if(count > 1 && !_this.valManListInfo) return false;

    		if(this.courseInfo.type == 3) {
    			count = this.count.value;
    		}

	    	if(_this.courseInfo.type == 2) {
	    		// 商业思维
	    		let allMoney = (price * count).toFixed(2);
	    		let enrollInfo = _this.userInfo.name.value + "," + _this.userInfo.idCard.value + "," + _this.userInfo.tel.value;

	    		if(count > 1) {
		    		_this.addManInfo.map(function(item, index){
		    			enrollInfo += "#" + item.name.value + "," + item.idCard.value + "," + item.tel.value;
		    		});
		    	}

	    		this.$http.post('/wechat/order/enroll/create',
						{
							"userCode": _this.$store.state.user.userCode,
							"productCode":  _this.courseInfo.productCode,
							"amount": count,
							"money": allMoney,
							"orderType": orderType,
							"lessonCode": _this.courseInfo.code,
							"enrollInfo": enrollInfo,
							"mobileNum": _this.tel.value,
							"smsCode": _this.code.value
						}).then(function(e) {
							let responseData = e.data;
							_this.submitBtn = true;

							if(responseData.errcode != 1) {
								_this.$vux.alert.show({
				          content: responseData.errmsg
				        })
							} else {
								_this.payOrder(responseData.data.orderList[0].groupCode, responseData.data.orderList[0].code)
							}
						}).catch(function (error) {
							_this.submitBtn = true;
							if(error.response.status == 500) {
								_this.$vux.alert.show({
									content: "服务器超时"
								})								
							}
					  });
	    	} else {
					this.$http.post('/wechat/order/create',
							{
								"userCode": _this.$store.state.user.userCode,
								"productCode": _this.courseInfo.productCode,
								"amount": count,
								"money": price,
								"orderType":  orderType,
								"lessonCode": _this.courseInfo.code
							}
						).then(function(e) {
							_this.submitBtn = true;
							let responseData = e.data;

							if(responseData.errcode != 1) {
								_this.$vux.alert.show({
				          content: responseData.errmsg
				        })
							} else {
								_this.payOrder(responseData.data.order.code, responseData.data.order.code)
							}
						}).catch(function (error) {
							_this.submitBtn = true;
							if(error.response.status == 500) {
								_this.$vux.alert.show({
									content: "服务器超时"
								})		
							}
					  });
				}
			},
	    payOrder (orderCode, code) {
	    	// orderCode 订单code或者组code
	    	let _this = this;

	    	if(!_this.$store.state.user.pay) return false;

	    	if(_this.courseInfo.type == 2) {
					this.payWeixinOrder(orderCode, {name: 'questionnaire', query: { groupCode: _this.courseInfo.productCode, orderCode: code }}, 1, 1)
	    	} else {
					this.payWeixinOrder(orderCode, {name: 'questionnaire', query: { groupCode: _this.courseInfo.productCode, orderCode: code }}, 1)
				}
	    }
	  }
	}
</script>

<style lang="scss">
	@import '~assets/css/form';
</style>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	$addBtnW: 30px;
	$addBorderColor: #f3f3f3;
	
	.enlist-title {
		padding: 0 $padding;
		line-height: 50px;
		font-size: 20px;
		color: #fff;
		background: $colorGreen;
		overflow: hidden;

		.price {
			float: right;
		}
	}
	
	.add-btn {
		position: relative;
		width: 100%;
		line-height: $inputH + 7px;
		padding: 0 $padding;
		padding-left: $padding + $iconL;
		background: #fff;
		border-top: $paddingTop solid $addBorderColor;

		&:before {
			left: $padding;
		}

		.add-btn-click {
			// margin-top: ($inputH - $addBtnW)/2;
		}
	}

	.add-btn-click {
		position: absolute;
		top: 50%;
		right: $padding;
		// float: right;
		width: $addBtnW;
		height: $addBtnW;
		margin-top: - $addBtnW/2;
		line-height: $addBtnW + 2px;
		text-align: center;
		border-radius: $addBtnW;
		background: $colorOrange;
		color: #fff;
		font-size: $addBtnW - 8px;

		&.delete {
			background: $colorRed;
		}
	}

	.pay {
		.pay-btn {
			padding: 0 $padding;
			margin: $padding 0;

			.disabled {
				background: $disabledPay;
			}
		}
	}

	.add-man {
		@include halfpxline(0, $borderColor, 1px, 0, 0, 0);
		// margin: 0 $padding ;
		// padding: 6px;
		border-top: $paddingTop solid $addBorderColor;

		.add-name {
			// font-size: 18px;
			
			span {
				float: right;
				// font-size: 14px;
			}
		}
	}
</style>
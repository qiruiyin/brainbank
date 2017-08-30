<!-- 
	编辑个人资料
 -->

<template>
	<div class="dn-form personal-edit" v-cloak>
		<group>
			<template v-for="item in formDatas">
    		<template v-if="item.key == 'phone' || item.key == 'qrcode'">
    			<x-input v-if="item.key == 'phone'" :title="item.title" :placeholder="item.placeholder" v-model="item.value">
      			<label slot="label" class="label icon icon-tel">{{ item.title }}</label>
    				<el-verification-code :tel="item.value" code-type="xiugai" slot="right"></el-verification-code>
    			</x-input>
	    		<x-input v-else type="tel" :title="item.title" :placeholder="item.placeholder" v-model="item.value">
      			<label slot="label" class="label icon icon-tel">{{ item.title }}</label>
	    		</x-input>
    		</template>
    		<template v-else>
	    		<x-input v-if="item.isReadonly" :title="item.title" :placeholder="item.placeholder" v-model="item.value" readonly>
      			<label slot="label" class="label icon icon-tel">{{ item.title }}</label>
	    		</x-input>

	    		<template v-else>
		    		<x-input v-if="item.key == 'name'" @on-change="nameTestNum" :title="item.title" :placeholder="item.placeholder" v-model="item.value">
	      			<label slot="label" class="label icon icon-tel">{{ item.title }}</label>
		    		</x-input>

	    			<x-input v-else :title="item.title" :placeholder="item.placeholder" v-model="item.value">
	      			<label slot="label" class="label icon icon-tel">{{ item.title }}</label>
		    		</x-input>	
	    		</template>	    		
    		</template>
			</template>
		</group>

		<div class="btn">
      <x-button @click.native="submit" type="primary">确定</x-button>
    </div>
	</div>
</template>

<script type="text/babel">
	import { XInput, Group, XButton, Toast } from 'vux'
	import elVerificationCode from 'components/verification-code/verification-code'

	export default {
		components: {
			XInput, Group, XButton, Toast, elVerificationCode
		},
		data () {
			return {
				title: "修改个人资料",
				btnStatus: false,
				formDatas: [
					{
						value: '',
						key: 'name',
						title: '姓名',
						placeholder: '请输入您真实姓名',
						isReadonly: false
					},{
						value: '',
						key: 'idcard',
						title: '证件号码',
						placeholder: '请输入您的身份证号码', 
						isReadonly: true
					},{
						value: '',
						key: 'phone',
						title: '手机号',
						placeholder: '请输入您的手机号',
						isReadonly: false
					},{
						value: '',
						key: 'qrcode',
						title: '验证码',
						placeholder: '请输入手机验证码', 
						isReadonly: false
					},{
						value: '',
						key: 'weixin',
						title: '微信',
						placeholder: '请输入微信号码（选填）',
						isReadonly: false
					}
				]
			}
		},
		computed: {

		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData() {
				let _this = this;
				this.$http.post('/wechat/usercenter/getCustomerInfo',
						{
							"customerCode": _this.$store.state.user.userCode,
						}
					).then(function(e) {
						let responseData = e.data.data,
								arr = [],
								data;
						if(e.data.errcode == 1) {
							data = responseData.customerInfoList[0];

							_this.formDatas.map(function(item, index) {
								if(item.key == "name") {
									item.value = data.NAME;
								} else if (item.key == "phone") {
									item.value = data.mobile;
								} else if (item.key == "idcard") {
									item.value = data.idcard;
								} else if (item.key == "qq") {
									item.value = data.qq;
								} else if (item.key == "weixin") {
									item.value = data.weixinAccount;
								} else if (item.key == "address") {
									item.value = data.address;
								}
							})
						} else {
							_this.$vux.alert.show({
								content: e.data.errmsg
							})
						}
					}
				);
			},
			submit () {
				let _this = this;
				if(_this.formDatas[0].value == "") {
					this.$vux.toast.show({
	          text: '姓名不能为空',
	        })
				} else if (_this.formDatas[2].value == "") {
					this.$vux.toast.show({
	          text: '手机号码不能为空',
	        })
				} else if (_this.formDatas[3].value == "") {
					this.$vux.toast.show({
	          text: '验证码不能为空',
	        })
				} else if (_this.btnStatus) {
					return false;
				} else if (_this.nameTestNum(_this.formDatas[0].value)) {

				} else {
					_this.btnStatus = true;
					this.$http.post('/wechat/usercenter/updateCustomerInfo',
							{
								"code": _this.$store.state.user.userCode,
								"name": _this.formDatas[0].value,
								"mobile": _this.formDatas[2].value,
								"idcard": _this.formDatas[1].value,
								"smsCode": _this.formDatas[3].value,
								"weixinAccount": _this.formDatas[4].value
							}
						).then(function(e) {
							if(e.data.errcode == 1) {
								_this.$vux.alert.show({
									content: e.data.errmsg
								})
							} else {
								_this.$vux.alert.show({
									content: e.data.errmsg
								})
							}
							_this.btnStatus = false;
					})
				}
			},
	    // nameTestNum (data) {
	    // 	if(/[0-9]/.test(data) || /^.*[~!@#\$%\^&\*\(\)_+\-=\[\]\{\}\\\|\'\";:,\<\.\>\/\?\s+].*$/.test(data)) {
	    // 		this.$vux.toast.text(this.nameTip);
	    // 		return true;
	    // 	}
	    // 	return false;
	    // }
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	@import '~assets/css/icon';

	.btn {
		padding: 30px $padding;
	}
</style>
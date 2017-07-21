<!-- 
	编辑个人资料
 -->

<template>
	<div class="personal-edit">
		<group>
			<template v-for="item in formDatas">
	    	<x-input v-if="item.key != 'qrcode'" :title="item.title" :placeholder="item.placeholder" v-model="item.value"></x-input>
				<x-input type="number" v-else title="发送验证码" v-model="item.value" class="weui-vcode">
        	<el-verification-code :tel="item.value" slot="right"></el-verification-code>
	      </x-input>
			</template>
		</group>

		<div class="btn">
      <x-button @click.native="iconType = 'success'" type="primary">确定</x-button>
    </div>
	</div>
</template>

<script type="text/babel">
	import { XInput, Group, XButton } from 'vux'
	import elVerificationCode from 'components/verification-code/verification-code'

	export default {
		components: {
			XInput, Group, XButton, elVerificationCode
		},
		data () {
			return {
				title: "修改个人资料",
				formDatas: [
					{
						value: '',
						key: 'name',
						title: '姓名',
						placeholder: '请输入您真实姓名',
						isReadonly: false
					},{
						value: '',
						key: 'phone',
						title: '手机号',
						placeholder: '请输入您的手机号',
						isReadonly: false
					},{
						value: '',
						key: 'idcard',
						title: '身份证',
						placeholder: '请输入您的身份证号码', 
						isReadonly: true
					},{
						value: '',
						key: 'weixin',
						title: '微信',
						placeholder: '请输入微信号码（选填）',
						isReadonly: false
					},{
						value: '',
						key: 'qrcode',
						title: '验证码',
						placeholder: '请输入手机验证码', 
						isReadonly: false
					}
				]
			}
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
						if(responseData) {
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
						}
					}
				);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.btn {
		padding: 30px $padding;
	}
</style>
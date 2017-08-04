<template>
	<div class="bangding">
		<group label-width="4em" label-margin-right="2em" label-align="right">
      <!-- <x-input :title="name.title" v-model="name.value" :placeholder="name.placeholder"></x-input> -->
      <x-input :title="bangding.idCard.title" v-model="bangding.idCard.value" :placeholder="bangding.idCard.placeholder"></x-input>
      <x-input type="tel" :title="bangding.tel.title" v-model="bangding.tel.value" :placeholder="bangding.tel.placeholder" class="weui-vcode">
        <el-verification-code :tel="bangding.tel.value" slot="right"></el-verification-code>
      </x-input>
      <x-input type="tel" :title="bangding.code.title" v-model="bangding.code.value" :placeholder="bangding.code.placeholder"></x-input>
    </group>
		
		<div class="btns">
			<x-button type="primary" @click.native="submitBangDing" >确定</x-button>
		</div>
	</div>
</template>

<script type="text/babel">
	import hold from 'src/commons/hold'
	import { Group, Selector, XInput, XButton, Toast } from 'vux'
	import elVerificationCode from 'components/verification-code/verification-code'

	export default {
		naem: 'bangding',
		components: { Group, Selector, XInput, XButton, Toast, elVerificationCode },
		data () {
			return {
				title: "绑定页面",
				bangding: {
					name: {
						value: "",
						title: "姓名",
						placeholder: "请输入姓名"
					},
					idCard: {
						value: "",
						title: "身份证号",
						placeholder: "请输入身份证号"
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
				}
			}
		},
		methods: {
			submitBangDing () {
				let _this = this;
				if(_this.bangding.idCard.value == "") {
					_this.$vux.toast.show({
	          text: "身份证号不能为空",
	          width: "80%",
	          type: "text",
	        })
				} else if(_this.bangding.tel.value.length != 11) {
					_this.$vux.toast.show({
	          text: "请输入正确的手机号码",
	          width: "80%",
	          type: "text",
	        })
				} else if (_this.bangding.code.value == "") {
					_this.$vux.toast.show({
	          text: "验证码不能为空",
	          width: "80%",
	          type: "text",
	        })
				} else {
					_this.$http.post("/wechat/discover/usercode/bingding", {
							"IdCard": _this.bangding.idCard.value,
							"openId": hold.storage.get("openId"),
							"smsCode": _this.bangding.code.value,
							"mobile": _this.bangding.tel.value,
							"parentOpenId": ""
						}).then(function(e) {
							let responseData = e.data;
							if(responseData.errcode != 1) {
								_this.$vux.alert.show({
				          content: responseData.errmsg
				        })
							} else if (responseData.data.status == 1) {
			  				_this.$store.commit('updateUserOpenId', {openId: hold.storage.get("openId")});
								hold.storage.set("userCode", responseData.data.userCode);
			  				_this.$store.commit('updateUserUserCode', {userCode: responseData.data.userCode});

			  				_this.$vux.alert.show({
				          content: "绑定成功",
				        	onHide () {
			  						_this.$router.push({ name: "index" });
				        	}
				        })
							} else {
								_this.$vux.alert.show({
				          content: responseData.data.errorData
				        })
							}
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	@import '~assets/css/form';
</style>
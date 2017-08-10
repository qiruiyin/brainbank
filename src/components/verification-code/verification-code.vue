<!-- 
	验证码倒计时
 -->

<template>
	<x-button class="verification-code" slot="right" type="primary" @click.native="getCode" :disabled="status" mini>
		<template v-if="status">
			<countdown v-model="num" @on-finish="finish"></countdown>s后可再次发送
		</template>
		<template v-else>{{ msg }}</template>
	</x-button>
</template>

<script type="text/babel">
	import { XButton, Toast, Countdown } from 'vux'

	export default {
		name: "verificationCode",
		components: {
			XButton, Toast, Countdown
		},
		props: ['tel'],
		data () {
			return {
				msg: "发送验证码",
				num: 60,
				status: false
			}
		},
		methods: {
			getCode () {
				let _this = this;
				if(_this.tel.length == 11) {
					_this.status = true;
					_this.$http.post("/wechat/aliyunMsg/reginfo", {
							"mobile": _this.tel
						}).then(function(e) {
							if(e.data.data.tag == 0) {
								_this.$vux.toast.show({
				          text: e.data.data.msg,
				          type: "warn",
				        })
							}
					});
				} else {
					_this.$vux.toast.show({
	          text: "请输入正确的手机号码",
	          width: "10rem",
	          type: "text"
	        })
				}
			},
			finish () {
				this.status = false;
				this.num = 60;
			}
		}
	}
</script>

<style lang="scss">
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.weui-btn_disabled.weui-btn_primary.verification-code {
		background-color: $colorOrange;
	}
</style>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.verification-code {
		padding: 0 .5em;
		line-height: 2.6em;
		background-color: $colorOrange;
	}

</style>
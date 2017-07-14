<!-- 
	问题反馈
 -->

<template>
	<div class="feedback">
		<group>
      <x-textarea v-model="textarea.value" :max="200" name="description" :placeholder="textarea.placeholder"></x-textarea>
      <x-input v-model="input.value" :placeholder="input.placeholder"></x-input>
    </group>
		
		<div class="btn" @click="submit">
    	<x-button type="primary" text="提交"></x-button>
		</div>
		<!-- <x-textarea :max="20" :placeholder="textarea.placeholder" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea> -->
	</div>
</template>

<script type="text/babel">
	import { XTextarea, Group, XInput, XButton } from 'vux'

	export default {
		name: 'feedback',
		components: { XTextarea, Group, XInput, XButton },
		data () {
			return {
				title: '问题反馈',
				textarea: {
					value: '',
					placeholder: '写下您的意见，我们将用心聆听，做的更好！',
				},
				input: {
					value: '',
					placeholder: '联系方式（电话/邮箱/QQ选填）'
				}
			}
		},
		mounted () {

		},
		methods: {
			submit () {
				let _this = this;
				_this.$http.post('/wechat/usercenter/addFeedback',
						{
							"userCode": _this.$store.state.user.userCode,
							"contactInformation": _this.input.value,
							"content": _this.textarea.value
						}
					).then(function(e) {

					}
				)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.btn {
		padding: $padding;
		margin-top: 40px;
	}
</style>
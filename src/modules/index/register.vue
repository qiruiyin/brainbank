<!-- 
	注册
 -->

<template>
	<div class="register">
		<group label-width="4em" label-margin-right="2em" label-align="right">
      <x-input :title="name.title" v-model="name.value" :placeholder="name.placeholder"></x-input>
      <x-input :title="nickname.title" v-model="nickname.value" :placeholder="nickname.placeholder"></x-input>
      <x-input :title="company.title" v-model="company.value" :placeholder="company.placeholder"></x-input>
      <x-input :title="title.title" v-model="title.value" :placeholder="title.placeholder"></x-input>
      <x-input :title="tel.title" v-model="tel.value" :placeholder="tel.placeholder" class="weui-vcode">
        <x-button slot="right" type="primary" mini>发送验证码</x-button>
      </x-input>
      <x-input :title="code.title" v-model="code.value" :placeholder="code.placeholder"></x-input>
    </group>
		
		<div class="btns">
			<x-button type="primary">确定</x-button>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Group, Selector, XInput, XButton } from 'vux'
	export default {
		naem: 'register',
		components: { Group, Selector, XInput, XButton },
		data () {
			return {
				title: '注册页面',
				name: {
					title: '姓名',
					value: '',
					placeholder: '请填写您的真实姓名'
				},
				nickname: {
					title: '昵称',
					value: '',
					placeholder: '请填写您的昵称'
				},
				company: {
					title: '公司',
					value: '',
					placeholder: '请填写您的公司名称'
				},
				title: {
					title: '职称',
					value: '',
					placeholder: '请填写您的职称'
				},
				tel: {
					title: '手机',
					value: '',
					placeholder: '请填写您的手机号码'
				},
				code: {
					title: '验证码',
					value: '',
					placeholder: '请填写验证码'
				},
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	

	@import '~assets/css/form';
</style>
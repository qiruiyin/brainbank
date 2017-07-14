<!-- 
	信息补全（订单提交后）
 -->

<template>
	<div class="info-add">
		<group title="个人信息" label-width="4em" label-margin-right="2em" label-align="right">
      <x-input :title="name.title" v-model="name.value" :placeholder="name.placeholder"></x-input>
      <x-input :title="tel.title" v-model="tel.value" :placeholder="tel.placeholder"></x-input>
      
      <x-input :title="company.title" v-model="company.value" :placeholder="company.placeholder"></x-input>
      <x-input :title="number.title" v-model="number.value" :placeholder="number.placeholder"></x-input>
      <x-input :title="turnover.title" v-model="turnover.value" :placeholder="turnover.placeholder"></x-input>
    </group>

		<group title="目前遇到的三大难题" label-width="4em" label-margin-right="2em" label-align="right">
      <x-input :title="problemFirst.title" v-model="problemFirst.value" :placeholder="problemFirst.placeholder"></x-input>
      <x-input :title="problemSecond.title" v-model="problemSecond.value" :placeholder="problemSecond.placeholder"></x-input>
      <x-input :title="problemThird.title" v-model="problemThird.value" :placeholder="problemThird.placeholder"></x-input>
		</group>

		<p class="tips">为了您能够获得更好的学习效果。请您务必认真填写以上问题</p>

		<div class="btns">
			<x-button type="primary">支付</x-button>
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
				title: '信息补全',
				name: {
					title: '姓名',
					value: '',
					placeholder: '请输入您的真实姓名'
				},
				tel: {
					title: '手机',
					value: '',
					placeholder: '请输入您的手机号码'
				},
				company: {
					title: '公司名称',
					value: '',
					placeholder: '请输入您的公司名称'
				},
				number: {
					title: '人数',
					value: '',
					placeholder: '请输入您的公司名称'
				},
				turnover: {
					title: '年营业额',
					value: '',
					placeholder: '请输入您的公司的年营业额'
				},
				problemFirst: {
					title: '第一难题',
					value: '',
					placeholder: '请输入您最想解决的核心问题'
				},
				problemSecond: {
					title: '第二难题',
					value: '',
					placeholder: '请输入您最想解决的核心问题'
				},
				problemThird: {
					title: '第三难题',
					value: '',
					placeholder: '请输入您最想解决的核心问题'
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
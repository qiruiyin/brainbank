<!-- 
	课程支付页面，报名参加课程，包含复训和升级
 -->

<template>
	<div class="pay">
		<form-preview header-label="付款金额" header-value="¥2400.00" :body-items="list" :footer-buttons="buttons2" name="demo"></form-preview>
	</div>
</template>

<script type="text/babel">
	import { Group, Selector, XInput, XButton, FormPreview } from 'vux'

	export default {
		name: 'pay',
		components: { Group, Selector, XInput, XButton, FormPreview },
		data () {
			return {
				title: '报名参加课程，包含复训和升级',
				list: [
					{
		        label: '课程名称',
		        value: '电动打蛋机'
		      }, {
		        label: '金额',
		        value: '名字名字名字'
		      }, {
		        label: '数量',
		        value: '名字名字名字'
		      }, {
		        label: '地址',
		        value: '名字名字名字'
		      }, {
		        label: '时间',
		        value: '2017-02-01'
		      }
		    ],
	      buttons2: [{
	        style: 'primary',
	        text: '点击事件',
	        onButtonClick: (name) => {
	          alert(`clicking ${name}`)
	        }
	      }]
			}
		},
		mounted () {
		},
		methods: {
			fetchData () {
				
			}
	  }
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
</style>
<!-- 
	表单示例
 -->

<template>
	<div class="dn-form">
	adkhlj
		<div class="dn-form-group">
			{{ title }}
		</div>
	</div>
</template>

<script type="text/babel">
	import elInput from 'components/form/input'
	import elVerificationCode from 'components/verification-code/verification-code'

	export default {
		naem: 'bangding',
		components: { elInput, elVerificationCode },
		data () {
			return {
				title: "标题"
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	
</style>
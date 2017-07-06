<!-- 
	音频详情页
 -->
<template>
	<div class="audio-detail">
		{{ title }}
	</div>
</template>

<script type="text/babel">
	export default {
		data () {
			return {
				title: '音频详情'
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
  
</style>
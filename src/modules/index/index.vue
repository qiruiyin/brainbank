<template>
	<div class="index">
		<el-header></el-header>
	</div>
</template>

<script type="text/babel">
	import { Group, Cell } from 'vux'
	import elHeader from 'components/header/header'
	export default {
		name: 'index',
		components: { Group, Cell, elHeader },
	  data () {
	    return {
	      msg: 'Welcome to Your Vue.js App',
	      title: '测试',
	      value: '1'
	    }
	  }
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	

</style>
<template>
	<div>
		 <group>
      <cell title="title" value="value"></cell>
    </group>
		{{ msg }}
	</div>
</template>

<script type="text/babel">
	import { Group, Cell } from 'vux'

	export default {
		name: 'index',
		components: { Group, Cell },
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
	
</style>
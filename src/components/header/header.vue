<template>
	<div class="header">
		<div class="user">
			<img :src="img" alt="头像">
			<a>
				{{ name }}
				<span>{{ course }}</span>
			</a>
		</div>
		<router-link tag="li" to="/about">
		  <a class="action">{{ action }}</a>
		</router-link>
	</div>
</template>

<script type="text/babel">
	import imgHeader from 'assets/img/header.png'

	export default {
		data () {
			return {
				img: imgHeader,
				name: "梁熙颖",
				course: "商业思维",
				action: "我要报名"
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	

</style>
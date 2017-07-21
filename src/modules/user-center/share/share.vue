<!-- 
	分享有奖
 -->

<template>
	<div class="share">
		<img :src="img" alt="">
	</div>
</template>

<script type="text/babel">
	export default {
		name: 'share',
		components: '',
		data () {
			return {
				title: '分享有奖',
				img: this.resolveImg("/resources/qrcode_share/qrcode_template.png")
			}
		},
		mounted () {
			// this.fetchData();
	  	this.signUrl(location.href);
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

	.share {
		img {
			width: 100%;
		}
	}
</style>
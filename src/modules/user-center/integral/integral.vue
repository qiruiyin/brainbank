<!-- 
	我的推广积分页面
 -->

<template>
	<div class="integral">
		<el-header-index></el-header-index>

		<div class="container">
			<div class="integral-header">
				<img src="~assets/img/user-center/integral.png" alt="">
				<p>{{ integral.now }}分</p>
				<div class="btn">兑换</div>
				<p>累计积分 {{ integral.all }}</p>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import elHeaderIndex from 'components/header/header-index'

	export default {
		name: 'integral',
		components: { elHeaderIndex },
		data () {
			return {
				title: '我的积分',
				integral: {
					now: 20,
					all: 20
				},
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.integral {

	}

	.integral-header {
		padding: 40px $padding $padding;
		text-align: center;
		line-height: 1.75;

		img {
			margin: 0 auto;
			margin-bottom: $padding;
		}

		.btn {
			width: 4em;
			margin: 0 auto;
			margin-top: $padding;
			margin-bottom: $padding;
			border-radius: $borderRadius;
			background: $colorRed;
			color: #fff;
		}
	}
	
</style>
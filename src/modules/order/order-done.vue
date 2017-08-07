<!-- 
	支付成功
 -->

<template>
	<div class="order-done">
		<div class="btns">
			<x-button type="primary" @click.native="goPage('index')">完成</x-button>
			<x-button v-if="isCourse" type="primary" @click.native="goPage('questionnaire')">问卷调查</x-button>
		</div>
	</div>
</template>

<script type="text/babel">
	import { XButton } from 'vux'

	export default {
		name: "orderDone",
		components: {
			XButton
		},
		data () {
			return {
				title: "订单完成页面",
				isCourse: this.$route.query.type == 1
			}
		},
		mounted () {
			if(this.isCourse) {
				this.getUserInfo(this.$store.state.user.openId, this.$store.state.user.userCode);
			}
		},
		methods: {
			goPage (url) {
				this.$router.push({name: url});
			}
		}
	}
</script>	

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

</style>
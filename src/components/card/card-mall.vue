<!-- 
	订单内商城产品展现卡
 -->

<template>
	<div class="product mall-product" v-cloak>
		<div v-if="cardMallData.img" class="img">
			<img :src="cardMallData.img" alt="">
		</div>
		<div class="product-content">
			<div class="product-info">
				<p>{{ cardMallData.productName }}</p>
				<p>单价：{{ cardMallData.productPrice }}</p>
				<span class="num">数量：{{ cardMallData.productCount }}</span>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	export default {
		name: "cardMall",
		props: ['cardMallData'],
		data () {
			return {
				title: "产片卡片",
				info: {
					img: "",
					productName: "",
					productPrice: "",
					productCount: ""
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
  @import '~assets/css/card-order';
	
</style>
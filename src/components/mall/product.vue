<!-- 
	生成产品列表
 -->

<template>
	<div class="mall-product">
		<img :src="mallProductData.img" alt="">
		<h5>{{ mallProductData.name }}</h5>
		<p>{{ mallProductData.desc }}</p>
		<div class="price">￥{{ mallProductData.price }}</div>
	</div>
</template>

<script type="text/babel">
	export default {
		name: "mallProduct",
		props: ["mallProductData"],
		data () {
			return {
				mallData: {
					img: '',
					name: '',
					desc: '',
					price: ''
				}
			}
		}
	}

</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.mall-product {
		float: left;
		width: 50%;
		margin-bottom: $padding;
		line-height: 1.5;
		text-align: center;
		background: #fff;

		&:nth-child(odd) {
			border-right: $padding/2 solid $bgGray;
    }
		&:nth-child(even) {
			border-left: $padding/2 solid $bgGray;
    }

		img {
			width: 80%;
			margin: 0 auto;
	    padding: $padding 0;
		}
		
		h5, p {
			overflow:hidden;
			white-space:nowrap;
			text-overflow:ellipsis;
		}

		h5 {
			font-size: 18px;
		}
	}
</style>
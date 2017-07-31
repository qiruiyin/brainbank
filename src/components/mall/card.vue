<!-- 
	商城类型版块
 -->

<template>
	<div class="mall-card">
		<div class="mall-card-header" v-if="mallCardData.title">
			<h3>{{ mallCardData.title }}</h3>
			<p>{{ mallCardData.desc }}</p>
		</div>
		<div class="mall-card-body">
			<el-mall-product :mall-product-data="item" v-for="(item, index) in mallCardData.list" @click.native="goPage(item.link, item.code)" :key="index"></el-mall-product>

			<cell v-if="mallCardData.type" title="查看更多" :link="{name: 'mallList', params: { type: mallCardData.type }}" is-link></cell>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Cell } from 'vux'
	import elMallProduct from 'components/mall/product'
	
	export default {
		name: "mallProduct",
		components: {
			Cell, elMallProduct
		},
		props: ["mallCardData"],
		data () {
			return {
				mallData: {
					title: '',
					desc: '',
					list: '',
					type: ''
				}
			}
		},
		methods: {
	    goPage (link, code) {
	    	this.$router.push({name: link, params: { goodsCode: code }})
	    }
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.mall-card {

	}

	.mall-card-header {
		position: relative;
		text-align: center;
		padding: $padding 0;
		// @include halfpxline(0, #fff, 0 , 0, 1px, 0);

		h3 {
			font-size: 20px;
		}

		p {
			position: relative;
			width: auto;
			display: inline;

			&:before, &:after {
				content: "";
				position: absolute;
				top: 6px;
				left: -26px;
				width:0;
		    height:0;
		    border-width: 8px 8px 0;
		    border-style: solid;
		    border-color: $fontColorGray transparent transparent;
			}

			&:after {
				left: auto;
				right: -26px;
			}
		}
	}

	.tuijian-card-body {
		@extend %clearfix;
		padding: $padding;
	}
</style>
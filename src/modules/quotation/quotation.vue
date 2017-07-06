<!-- 
	经典语录
 -->

<template>
	<div class="quotation">
		<el-headerIndex></el-headerIndex>
		
		<div class="container">
			<div class="list">
				<el-img-text-quotation v-for="(item, index) in quotationData" :img-text-data="item" :key="index"></el-img-text-quotation>	
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import elHeaderIndex from 'components/header/header-index'
	import elImgTextQuotation from 'components/img-text/img-text-quotation'

	export default {
		components: { elImgTextQuotation, elHeaderIndex },
		data () {
			return {
				title: "经典语录",
				quotationData: [
					{
						title: '总裁商业思维1',
						price: '1233',
						priceUnit: '年',
						priceCurrency: '￥',
						desc: '以帮助学员实现梦想，突破发展瓶颈为己任，直指核心？',
						label: '主讲', 
						speaker: '苏引华',
						subscribe: '234343',
						zan: 11
					},{
						title: '总裁商业思维2',
						price: '1233',
						priceUnit: '年',
						priceCurrency: '￥',
						desc: '以帮助学员实现梦想，突破发展瓶颈为己任，直指核心？',
						label: '主讲', 
						speaker: '苏引华',
						subscribe: '234343',
						zan: 1
					},{
						title: '总裁商业思维3',
						price: '1233',
						priceUnit: '年',
						priceCurrency: '￥',
						desc: '以帮助学员实现梦想，突破发展瓶颈为己任，直指核心？',
						label: '主讲', 
						speaker: '苏引华',
						subscribe: '234343',
						zan: 2
					}
				],
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	

</style>
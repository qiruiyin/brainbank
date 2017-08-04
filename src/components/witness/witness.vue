<!-- 
	客户见证
 -->

<template>
	<div class="witness">
		<div v-html="item.content" v-for="(item, index) in witnessList" :key="index"></div>
	</div>
</template>

<script>
	export default {
		name: "elWitness",
		props: ['witnessData'],
		data () {
			return {
				title: "客户见证",
				witnessList: [
					{
						content: ""
					}
				]
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;
				this.$http.post('/wechat/customerWitnessMobile/queryCustomerWitnessList',
						{
							code: _this.witnessData.productCode,
							pageSize: _this.witnessData.pagesize,
							pageCount: _this.witnessData.pagecount
						}
					).then(function(e) {
						if(e.data.errcode == 1) {
							_this.witnessList = e.data.data.list.map(function(item, index){
								return {
									content: _this.resolveRichTextImg(item.content)
								}
							})
						}
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
  
</style>
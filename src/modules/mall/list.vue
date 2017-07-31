<!-- 
	商城产品列表
 -->

<template>
	<div class="mall-list">
		<!-- <el-mall-product :mall-product-data="item" v-for="(item, index) in list" :key="index"></el-mall-product> -->
		<el-mall-card :mall-card-data="item" v-for="(item, index) in listData" :key="index"></el-mall-card>
	</div>
</template>

<script type="text/babel">
	import elMallProduct from 'components/mall/product'
	import elMallCard from 'components/mall/card'

	export default {
		name: "mallList",
		components: {
			elMallProduct, elMallCard
		},
		data () {
			return {
				title: "商城产品列表",
				type: this.$route.params.type,
				count: this.wordBook.pageCount,
				listData: [
					{
						title: '',
						desc: '',
						list: '',
						type: ''
					}
				]
			}
		},
		mounted () {
			this.fetchData(1);
		},
		methods: {
			fetchData(pageSize) {
				let _this = this;
				_this.$http.post('/wechat/shop//productList',{
						type: _this.type,
						pageSize: pageSize,
						pageCount: _this.count
					}).then(function(e) {

						if(e.data.data && e.data.data.list && e.data.data.list.length > 0) {
							_this.listData[0].list = e.data.data.list.map(function(item, index){
								return {
									img: _this.resolveImg(item.thumbnail),
									link: 'mallDetail',
									url: "",
									name: item.name,
									desc: item.description,
									price: item.price,
									code: item.code
								}
							});
						}

						console.log(_this.listData)
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.mall-list {
		@extend %clearfix;
		background-color: $bgGray;
	}
</style>
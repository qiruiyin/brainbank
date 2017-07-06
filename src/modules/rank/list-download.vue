<!-- 
	下载排行榜
 -->

<template>
	<div class="rank-list">
		<el-headerIndex></el-headerIndex>
		
		<div class="container">
			<div class="tab">
	      <tab v-model="tabSelected">
	        <tab-item :selected="tabSelected == index" v-for="(item, index) in tabDatas" @click="tabSelected = index" :key="index">{{ item.title }}</tab-item>
	      </tab>
	      <swiper class="list" height="100%" v-model="tabSelected" :show-dots="false">
	        <swiper-item v-for="(tabContentDatasList, index) in tabContentDatas" :key="index">
	          <el-img-text-rank v-for="(item, ind) in tabContentDatasList.list" :img-text-data="item" :key="ind"></el-img-text-rank>
	        </swiper-item>
	      </swiper>
	    </div>
    </div>
	</div>
</template>

<script type="text/babel">
	import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
	import elHeaderIndex from 'components/header/header-index'
	import elImgTextRank from 'components/img-text/img-text-rank'

	export default {
		name: 'rankList',
		components: { Tab, TabItem, Swiper, SwiperItem, elHeaderIndex, elImgTextRank },
		data () {
			return {
				index: 0,
				tabDatas: [
					{
						value: 'new',
						title: '最新上传',
					},{
						value: 'most',
						title: '下载最多',
					}
				],
				tabSelected: 0,
				tabContentDatas: [
					{
						value: 'pay',
						list: [
							{
								id: '',
								title: '纪念谷2',
								type: '文字说明',
								pay: '1340.0',
								like: {
									num: 2234,
									percent: 3
								},
								url: 'audioDetail',
								params: {
									id: 1
								}
							},{
								id: '',
								title: '纪念谷2',
								type: '游戏',
								pay: '1340.0',
								like: {
									num: 11,
									percent: 3.4
								},
								url: 'audioDetail',
								params: {
									id: 1
								}
							},{
								id: '',
								title: '纪念谷2',
								type: '游戏',
								pay: '1340.0',
								like: {
									num: 2234,
									percent: 4
								},
								url: 'audioDetail',
								params: {
									id: 1
								}
							}
						]
					},{
						value: 'free',
						list: [
							{
								id: '',
								title: '纪念谷2',
								type: '游戏',
								pay: '0',
								like: {
									num: 2234,
									percent: 3.4
								},
								url: 'audioDetail',
								params: {
									id: 1
								}
							}
						]
					}
				]
			}
		}
	}
</script>

<style lang="scss">
	.rank-list .vux-slider > .vux-swiper {
    overflow-y: auto;
  }
</style>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.rank-list {
		height: 100%;
	}
	
	.container {
		height: 100%;
	}

	.tab {
		height: 100%;
	}

	.list {
		height: 100%;
		padding-bottom: 60px;
	}
</style>
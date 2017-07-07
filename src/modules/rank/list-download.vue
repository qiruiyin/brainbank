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
	        <swiper-item v-for="(tabDatasList, index) in tabDatas" :key="index">
	        	<template v-if="tabDatasList.value == 'guanli'">
	        		<div class="type">
	        			<router-link :to="{name: item.url}" class="type-entrance" v-for="item in guanli" :key="item.value">
	        				{{ item.name }}
	        			</router-link>
	        		</div>
	        	</template>
	        	<template v-if="tabDatasList.value == 'hangye'">
	        		<div class="type">
	        			<router-link :to="{name: item.url}" class="type-entrance" v-for="item in hangye" :key="item.value">
	        				{{ item.name }}
	        			</router-link>
	        		</div>
	        	</template>
	        	<template v-if="tabDatasList.value == 'download'">
	        		<el-img-text-rank v-for="(item, ind) in download" :img-text-data="item" :key="ind"></el-img-text-rank>
	        	</template>
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
		name: 'listDownload',
		components: { Tab, TabItem, Swiper, SwiperItem, elHeaderIndex, elImgTextRank },
		data () {
			return {
				index: 0,
				tabDatas: [
					{
						value: 'guanli',
						title: '管理资料',
					},{
						value: 'hangye',
						title: '行业资料',
					},{
						value: 'download',
						title: '下载最多',
					}
				],
				tabSelected: 0,
				download: [
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
				],
				guanli: [
					{
						value: 'caiwu',
						name: '财务管理',
						icon: 'caiwu',
						url: 'courseList'
					},{
						value: 'caiwu',
						name: '采购管理',
						icon: 'caiwu',
						url: 'courseList'
					},{
						value: 'caiwu',
						name: '仓储',
						icon: 'caiwu',
						url: 'courseList'
					},{
						value: 'caiwu',
						name: '仓储物流',
						icon: 'caiwu',
						url: 'courseList'
					},{
						value: 'caiwu',
						name: '成本管理',
						icon: 'caiwu',
						url: 'courseList'
					},{
						value: 'caiwu',
						name: '岗位分析',
						icon: 'caiwu',
						url: 'courseList'
					},{
						value: 'caiwu',
						name: '管理宝典',
						icon: 'caiwu',
						url: 'courseList'
					},{
						value: 'caiwu',
						name: '行政管理',
						icon: 'caiwu',
						url: 'courseList'
					},{
						value: 'caiwu',
						name: '绩效管理',
						icon: 'caiwu',
						url: 'courseList'
					},{
						value: 'caiwu',
						name: '客户管理',
						icon: 'caiwu',
						url: 'courseList'
					}
				],
				hangye: [
					{
						value: 'caiwu',
						name: '成本管理',
						icon: 'caiwu',
						url: 'courseList'
					},{
						value: 'caiwu',
						name: '岗位分析',
						icon: 'caiwu',
						url: 'courseList'
					},{
						value: 'caiwu',
						name: '管理宝典',
						icon: 'caiwu',
						url: 'courseList'
					},{
						value: 'caiwu',
						name: '行政管理',
						icon: 'caiwu',
						url: 'courseList'
					},{
						value: 'caiwu',
						name: '绩效管理',
						icon: 'caiwu',
						url: 'courseList'
					},{
						value: 'caiwu',
						name: '客户管理',
						icon: 'caiwu',
						url: 'courseList'
					}
				],
				tabContentDatas: [
					{
						value: 'guanli',
						// list:
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
	
	@import '~assets/css/rank';

	$typeIconW: 60px;

	.type {
		@extend %clearfix;
	}

	.type-entrance {
		float: left;
		width: 33.33%;
		padding: $typeIconW + $padding 0 $padding;
		text-align: center;
		@include halfpxline(0, $borderColor, 0, 1px, 1px, 0);
		line-height: 2;

		&:before {
			content: "";
			position: absolute;
			top: $padding;
			width: $typeIconW;
			height: $typeIconW;
			background: url("~assets/img/icon/header.png") no-repeat;
			background-size: 100%;
		}

		&:nth-child(3n) {
			@include halfpxline(0, $borderColor, 0, 0, 1px, 0);
		}
	}
</style>
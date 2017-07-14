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
	        	<template v-if="tabDatasList.list">
	        		<div class="type">
	        			<router-link :to="{name: item.url, params: { typeCode: item.value }}" class="type-entrance" v-for="item in tabDatasList.list" :key="item.value">
	        				{{ item.name }}
	        			</router-link>
	        		</div>
	        	</template>
	        	<template v-else>
	        		<el-img-text-rank v-for="(item, ind) in download" :img-text-data="item" img-text-btn="1" :key="ind"></el-img-text-rank>
	        	</template>
	        </swiper-item>
	      </swiper>
	    </div>
    </div>
	</div>
</template>

<script type="text/babel">
	import { Tab, TabItem, Swiper, SwiperItem, Sticky } from 'vux'
	import elHeaderIndex from 'components/header/header-index'
	import elImgTextRank from 'components/img-text/img-text-rank'

	export default {
		name: 'listDownload',
		components: { Tab, TabItem, Swiper, SwiperItem, Sticky, elHeaderIndex, elImgTextRank },
		data () {
			return {
				index: 0,
				tabDatas: [],
				tabSelected: 0,
				download: []
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this,
						tabDatas = [];
				// 资料分类
	  		_this.$http.post('/wechat/coursewaremobile/queryType',{}).then(function(e) {
	  			let responseData = e.data.data;
	  			responseData.list.map(function(item, index) {
	  				let queryTypeData = [];
	  				item.list.map(function(it, ind) {
	  					queryTypeData[ind] = {
	  						value: it.code,
	  						name: it.name,
	  						url: 'courseList',
	  						parentCode: it.parentCode,
	  						icon: _this.resolveImg(it.thumbnail)
	  					};
	  				})
	  				tabDatas[index] = {
	  					title: item.name,
	  					value: item.code,
	  					id: item.id,
	  					list: queryTypeData
	  				};
	  			})

  				tabDatas.push({
  					value: '',
  					title: '下载最多',
  				})

  				_this.tabDatas = tabDatas;
	  		});
	  		// 下载做多
	  		_this.$http.post('/wechat/coursewaremobile/queryRank',
	  			{
	  				"customerCode": "",
	  				"pageSize": 1,
	  				"pageCount": 10
	  			}).then(function(e) {
	  				let responseData = e.data.data,
	  						downloadData = [];
	  				responseData.list.map(function(item, index){
	  					downloadData[index] = {
	  						id: item.id,
	  						code: item.code,
								title: item.name,
								type: '文字说明',
								pay: item.isBuy,
								download: item.downloads,
								downloadUrl: _this.resolveImg(item.file_url),
								price: item.requiredpoints,
								url: 'audioDetail',
								img: _this.resolveImg(item.thumbnail),
								params: {
									id: item.code
								}
	  					}
	  				});

	  				_this.download = downloadData;
	  		});
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

	// 头部固定
	.tab {
		
	}
 	// 头部固定end

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
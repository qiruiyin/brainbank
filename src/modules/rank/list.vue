<!-- 
	音视频排行榜
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
	        <swiper-item v-for="(tabContentDatasList, index) in tabDatas" :key="index">
	          <el-img-text-rank v-for="(item, ind) in tabContentDatas[tabContentDatasList.value]" :img-text-data="item" img-text-btn="0" :key="ind"></el-img-text-rank>

						<x-button @click.native="loadMore(tabContentDatasList.value)">加载更多</x-button>
	        </swiper-item>
	      </swiper>
	    </div>
    </div>
	</div>
</template>

<script type="text/babel">
	import { Tab, TabItem, Swiper, SwiperItem, XButton } from 'vux'
	import elHeaderIndex from 'components/header/header-index'
	import elImgTextRank from 'components/img-text/img-text-rank'

	export default {
		name: 'rankList',
		components: { Tab, TabItem, Swiper, SwiperItem, XButton, elHeaderIndex, elImgTextRank },
		data () {
			return {
				index: 0,
				tabDatas: [
					{
						value: 'pay',
						title: '付费',
					},{
						value: 'free',
						title: '免费',
					},{
						value: 'hot',
						title: '排行榜',
					}
				],
				tabSelected: 0,
				tabContentDatas: {
					pay: [],
					free: [],
					hot: []
				}
			}
		},
		mounted () {
			let _this = this,
					count = 1;

			this.$http.all([
					_this.fetchData(1, 1, 1, count),
					_this.fetchData(1, 2, 1, count),
					_this.fetchData(1, 3, 1, count)
				])
			  .then(_this.$http.spread(function (acct, perms) {
			  })
			);
		},
		methods: {
			fetchData (type = 1, rankType = 1, pagesize = 1, pagecount = 10) {
				let _this = this;
				this.$http.post('/wechat/discover/rank/list',
						{
							"type": type,
							"rankType": rankType,
							"userCode": "201705300052529835144771844797952",
							"pagesize": pagesize,
							"pagecount": pagecount,
						}
					).then(function(e) {
						let data = [];
						e.data.data.list.map(function(item, index) {
							data[index] = {
								img: _this.resolveImg(item.thumbnail),
								id: item.id,
								title: item.name,
								type: item.DESCRIPTION,
								pay: item.price,
								like: {
									num: item.commentAmount,
									percent: item.rank | 3.2
								},
								url: 'detail',
								params: {
									id: item.code,
									type: _this.$route.params.type
								}
							}
						})
						console.log(data);
						if(rankType == 1) {
							_this.tabContentDatas.pay.push.apply(_this.tabContentDatas.pay, data);
						} else if(rankType == 2) {
							_this.tabContentDatas.free.push.apply(_this.tabContentDatas.free, data);
						} else if(rankType == 3) {
							_this.tabContentDatas.hot.push.apply(_this.tabContentDatas.hot, data);
						}
				})
			},
			loadMore (arg) {
				let _this = this,
						count = 2;
				if(arg == "pay") {
					_this.fetchData(1, 1, 2, count)
				} else if(arg == "free") {
					_this.fetchData(1, 2, 2, count, 0)
				} else if(arg == "hot") {
					_this.fetchData(1, 3, 2, count, 0)
				}
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
	
</style>
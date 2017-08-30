<!-- 
	课程下载
 -->

<template>
	<div class="rank-list" v-cloak>
		<el-headerIndex></el-headerIndex>
		
		<div class="container">
			<div class="tab">
	      <tab v-model="tabSelected">
	        <tab-item :selected="tabSelected == index" v-for="(item, index) in tabData" @click="tabSelected = index" :key="index">{{ item.title }}</tab-item>
	      </tab>
	      <swiper class="list" height="100%" v-model="tabSelected" :show-dots="false" :threshold="tabChangeW">
	        <swiper-item v-for="(tabContentDatasList, index) in tabData" :key="index">
  					<scroller lock-x :height="-scrollerInfo.offsetBottom + 'px'" @on-scroll-bottom="loadMore" ref="scrollerBottom" :scroll-bottom-offst="200">
  						<div>
          			<el-img-text-rank @on-data-change="btnClick" v-for="(item, ind) in tabContentDatasList.list" :img-text-data="item" :is-download=true img-text-btn="1" :img-text-ind="index" :key="ind"></el-img-text-rank>
								<el-load-more :load-all="tabContentDatasList.loadAll"></el-load-more>
          		</div>
          	</scroller>
	        </swiper-item>
	      </swiper>
	    </div>
    </div>
	</div>
</template>

<script type="text/babel">
	import { Scroller, Tab, TabItem, Swiper, SwiperItem, Alert } from 'vux'
	import elHeaderIndex from 'components/header/header-index'
	import elImgTextRank from 'components/img-text/img-text-rank'
	import elLoadMore from 'components/load-more/load-more'

	export default {
		name: 'listCourse',
		components: { Scroller, Tab, TabItem, Swiper, SwiperItem, Alert, elHeaderIndex, elImgTextRank, elLoadMore },
		data () {
			return {
				index: 0,
				count: this.wordBook.pageCount,
				tabChangeW: this.wordBook.tabChangeW,
				scrollerInfo: {
					offsetBottom: 170
				},
				tabData: [
					{
						value: 'new',
						title: '最新上传',
						pageSize: 1,
						onfetching: false,
						loadAll: false,
						list: []
					},{
						value: 'most',
						title: '下载最多',
						pageSize: 1,
						onfetching: false,
						loadAll: false,
						list: []
					}
				],
				tabSelected: 0,
				newData: [],
				mostData: []
			}
		},
		watch: {
			tabSelected (newValue, oldValue) {
				this.onTabClick(newValue)
			}
		},
		mounted () {
			this.fetchData(this.tabData[this.tabSelected], this.tabSelected);
		},
		methods: {
			fetchData(obj, ind) {
				let _this = this,
						url = '';
				// 最新上传
				if(ind == 0) {
					url = '/wechat/coursewaremobile/queryTypeByCode';
				} else {
					url = '/wechat/coursewaremobile/queryTypeRankByCode';
				}

	  		_this.$http.post(url,{
	  			"customerCode": _this.$store.state.user.userCode, // userCode
	  			"pageSize": obj.pageSize, 
	  			"pageCount": _this.count,
	  			"typeCode": _this.$route.query.typeCode
	  		}).then(function(e) {
					let responseData = e.data.data,
							list = [];
					if(e.data.errcode == 1) {
						if(responseData.list && responseData.list.length > 0) {
							list = responseData.list.map(function(item, index){
								return {
									id: item.id,
									code: item.code,
									title: item.name,
									type: item.memo,
									pay: item.requiredpoints,
									isBuy: item.isbuy,
									download: item.downloads,
									downloadUrl: _this.resolveImg(item.file_url),
									price: item.requiredpoints,
									url: "",
									query: {
										code: item.code
									}
								}
							});
						}

						if(list.length < _this.count) {
							_this.tabData[ind].loadAll = true;
						}

						if(obj.pageSize == 1) {
							_this.tabData[ind].list = list;
						} else {
							_this.tabData[ind].list = _this.tabData[ind].list.concat(list);
						}
						_this.tabData[ind].pageSize++;
	  			} else {
	  				_this.$vux.alert.show({
	  					content: e.data.errmsg
	  				})
	  			}
					_this.tabData[ind].onFetching = false;
					_this.resetView(ind);
	  		});
			},
			resetView (ind) {
				let _this = this;
				this.$nextTick(() => {
          this.$refs.scrollerBottom[ind].reset()
        })
			},
			onTabClick (val) {
				if(this.tabData[val].list.length == 0){
					this.fetchData(this.tabData[val], val)
				}
			},
			btnClick (val, status, ind) {
				let _this = this;
				// console.log(val, ind);
				// if(status == "download") {
					_this.tabData[ind].list.map(function(item, index) {
						if(item.code == val.query.code) {
							item.download++;
							item.isBuy = 1;
						}
					});
				// }
			},
			loadMore () {
				if(this.tabData[this.tabSelected].onFetching || this.tabData[this.tabSelected].loadAll) {

				} else {
					this.tabData[this.tabSelected].onFetching = true;					
					this.fetchData(this.tabData[this.tabSelected], this.tabSelected);
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
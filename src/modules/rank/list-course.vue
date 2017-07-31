<!-- 
	课程下载
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
	          <template v-if="tabContentDatasList.value == 'new'">
	          	<el-img-text-rank  @on-card-click="cardClick" @on-btn-click="btnClick"  v-for="(item, ind) in newData" :img-text-data="item" :is-download=true img-text-btn="1" :key="ind"></el-img-text-rank>
	          </template>
	          <template v-if="tabContentDatasList.value == 'most'">
	          	<el-img-text-rank @on-card-click="cardClick" @on-btn-click="btnClick"  v-for="(item, ind) in mostData" :img-text-data="item" :is-download=true img-text-btn="1" :key="ind"></el-img-text-rank>
	          </template>
	        </swiper-item>
	      </swiper>
	    </div>
    </div>
	</div>
</template>

<script type="text/babel">
	import { Tab, TabItem, Swiper, SwiperItem, Alert } from 'vux'
	import elHeaderIndex from 'components/header/header-index'
	import elImgTextRank from 'components/img-text/img-text-rank'

	export default {
		name: 'listCourse',
		components: { Tab, TabItem, Swiper, SwiperItem, Alert, elHeaderIndex, elImgTextRank },
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
				newData: [],
				mostData: []
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData() {
				let _this = this;
				// 最新上传
	  		_this.$http.post('/wechat/coursewaremobile/queryTypeRankByCode',{
	  			"customerCode": _this.$store.state.user.userCode, // userCode
	  			"pageSize": 1, 
	  			"pageCount": 10,
	  			"typeCode": _this.$route.params.typeCode
	  		}).then(function(e) {
					let responseData = e.data.data;
					_this.transData(responseData, 'newData');
	  		});

	  		// 下载最多
	  		_this.$http.post('/wechat/coursewaremobile/queryTypeByCode',{
	  			"customerCode": _this.$store.state.user.userCode, // userCode
	  			"pageSize": 1, 
	  			"pageCount": 10,
	  			"typeCode": _this.$route.params.typeCode
	  		}).then(function(e) {
					let responseData = e.data.data;
					_this.transData(responseData, 'mostData');
	  		});
			},
			transData (data, obj) {
	  		let _this = this,
	  				arr = [];
				data.list.map(function(item, index){
					arr[index] = {
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
						params: {
							code: item.code
						}
					}
				});

				_this[obj] = arr;
			},
			cardClick (val) {
				if(!this.isLogin) return false;

				if(val.status) {
					this.$router.push({name: val.url, params: val.params });
				} else {
					this.$vux.toast.show({
					  text: '请先购买！'
					})
				}
			},
			btnClick (val) {
				if(!this.isLogin) return false;

				let _this = this;
				_this.payCode = val.params.code;
				
				_this.$vux.confirm.show({
					content: "需要积分：" + val.pay,
			    onConfirm () {
			      _this.$http.post('/wechat/coursewaremobile/buy',
							{
								"customerCode": _this.$store.state.user.userCode,
								"productCode": val.params.code
							}).then(function(e) {
								let responseData = e.data.data;
								if(responseData.result.tag == 1) {
									_this.newData.map(function(item, index) {
										if(val.params.code == item.code) {
											item.isBuy = 1;
										}
									});
									_this.mostData.map(function(item, index) {
										if(val.params.code == item.code) {
											item.isBuy = 1;
										}
									})
								} else {
									_this.$vux.alert.show({
										content: responseData.result.msg
									});
								}
							})	
			    }
				})
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
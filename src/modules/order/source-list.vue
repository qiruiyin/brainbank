<!-- 
	我的资源订单列表页面
 -->

<template>
	<div class="order-list">
		<tab :line-width=2 v-model="tabSelected">
      <tab-item class="vux-center" v-for="(item, index) in tabData" :key="index">{{ item.name }}</tab-item>
    </tab>
    <swiper v-model="tabSelected" height="100%" :show-dots="false">
      <swiper-item v-for="(tabDataItem, tabDataIndex) in tabData" :key="tabDataIndex">
    		<!-- <el-card-order @on-load-more="loadMore" :card-data="item.list" :card-count="count" :card-index="index"></el-card-order> -->
    		<template v-if="tabDataItem.value != 'file'">
  				<el-img-text-rank @on-btn-click="btnClick" v-for="(item, ind) in tabDataItem.list" :img-text-data="item" img-text-btn="0" :key="ind"></el-img-text-rank>
    		</template>

    		<template v-else>
  				<el-img-text-rank @on-btn-click="btnFileClick" v-for="(item, ind) in tabDataItem.list" :is-download=true :img-text-data="item" img-text-btn="1" :key="ind"></el-img-text-rank>
    		</template>
      </swiper-item>
    </swiper>
	</div>
</template>

<script type="type/babel">
	import { Tab, TabItem, Swiper, SwiperItem } from 'vux'

	import elImgTextRank from 'components/img-text/img-text-rank'

	export default {
		name: 'orderList',
		components: { Tab, TabItem, Swiper, SwiperItem, elImgTextRank },
		data () {
			return {
				title: '订单列表页面',
				count: this.wordBook.pageCount,
				tabData: [
					{
						value: 'video',
						name: '视频',
						productStatus: "0",
						pageSize: 1,
						list: []
					},{
						value: 'audio',
						name: '音频',
						productStatus: "1",
						pageSize: 1,
						list: []
					},{
						value: 'file',
						name: '课件',
						productStatus: "2",
					  pageSize: 1,
						list: []
					}
				],
				tabSelected: 0
			}
		},
		watch: {
			tabSelected (newValue, oldValue) {
				this.onTabClick(newValue)
			}
		},
		mounted () {
			// 取全部数据
			this.fetchData(this.tabData[0], 0);
		},
		methods: {
			fetchData (obj, ind = 0) {
				let _this = this;
				this.$http.post('/wechat/usercenter/customerData',
						{
							"customerCode": _this.$store.state.user.userCode,
							"pageSize": obj.pageSize,
							"pageCount": _this.count,
							"productStatus": obj.productStatus
						}
					).then(function(e) {
						let responseData = e.data.data,
								customerShopOrderList = [];

						if(ind < 2) {
							if(e.data.data && e.data.data.customerDataList && e.data.data.customerDataList.length > 0) {
								customerShopOrderList = e.data.data.customerDataList.map(function(item, index) {
									return {
										img: _this.resolveImg(item.thumbnail),
										id: item.id,
										title: item.name,
										type: item.DESCRIPTION,
										pay: 0,
										isBuy: 1,
										like: {
											num: item.commentAmount,
											percent: item.rank | 3.2
										},
										url: 'courseTypeDetail',
										params: {
											code: item.code,
											type: obj.value
										}
									}
								})
							}
						} else {
							if(e.data.data && e.data.data.customerDataList && e.data.data.customerDataList.length > 0) {
								customerShopOrderList = e.data.data.customerDataList.map(function(item, index){
									return {
										id: item.id,
										code: item.code,
										title: item.name,
										type: item.memo,
										pay: item.requiredpoints,
										isBuy: 1,
										download: item.downloads,
										downloadUrl: _this.resolveImg(item.file_url),
										price: item.requiredpoints,
										url: "",
										params: {
											code: item.code
										}
									}
								});
							}
						}

						if(obj.pageSize == 1) {
							_this.tabData[ind].list = customerShopOrderList;
						} else {
							_this.tabData[ind].list.push.apply(_this.tabData[ind].list, customerShopOrderList);
						}
				})
			},
			onTabClick (val) {
				if(this.tabData[val].list.length == 0){
					this.fetchData(this.tabData[val], val)
				}
			},
			loadMore (val) {
				this.fetchData(this.tabData[val], val)
			},
			btnClick (val) {
				if(!this.isLogin()) return false;
				
				let _this = this;
				_this.payCode = val.params.code;
					
				this.$http.post('/wechat/order/create',
					{
						"userCode": _this.$store.state.user.userCode,
						"productCode": val.params.code,
						"amount": 1,
						"money": val.pay,
						"allMoney": val.pay,
						"orderType":  4,
						"lessonCode": '',
						"address": ""
					}).then(function(e) {
						let responseData = e.data;

						if(responseData.errcode != 1) {
							_this.$vux.toast.show({
			          text: responseData.errmsg
			        })
						} else {
							_this.pay.show = true;
							_this.pay.allPrice = val.pay;
							_this.pay.list[0].value = responseData.data.order.code;
							_this.pay.list[1].value = val.title;
							_this.pay.list[2].value = 1;
						}
					})	
			},
			btnFileClick (val) {
				if(!this.isLogin()) return false;
				
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
									_this.download.map(function(item, index) {
										if(item.code == val.params.code) {
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
			},
		}
	}
</script>

<style lang="scss">
	.order-list .vux-slider {
		height: 100%;
	}
</style>>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.order-list {
		height: 100%;
	}
</style>
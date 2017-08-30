<!-- 
	订单列表页面
 -->

<template>
	<div class="order-list" v-cloak>
		<tab :line-width=2 v-model="tabSelected">
      <tab-item class="vux-center" v-for="(item, index) in tabData" :key="index">{{ item.name }}</tab-item>
    </tab>
    <swiper v-model="tabSelected" height="100%" :show-dots="false" :threshold="tabChangeW">
      <swiper-item v-for="(item, index) in tabData" :key="index">
  			<el-card-order @update-tabSelected="updateTabSelected" @on-load-more="loadMore" @on-data-change="dataChange" :card-data="item.list" :card-count="count" :card-index="index" :on-fetching="item.onFetching" :on-fetch-all="item.loadAll"></el-card-order>
      </swiper-item>
    </swiper>
	</div>
</template>

<script type="type/babel">
	import { Tab, TabItem, Swiper, SwiperItem } from 'vux'

	import elCardOrder from 'components/card/card-order'

	export default {
		name: 'orderList',
		components: { Tab, TabItem, Swiper, SwiperItem, elCardOrder },
		data () {
			return {
				title: '订单列表页面',
				count: this.wordBook.pageCount,
				tabChangeW: this.wordBook.tabChangeW,
				tabData: [
					{
						value: 'unpaid',
						name: '未支付',
						status: 'unpaid',
						paymentStatus: "0",
						expressStatus: "",
						pageSize: 1,
						onFetching: false,
						loadAll: false,
						list: []
					// },{
					// 	value: 'pending',
					// 	name: '待发货',
					// 	status: 'pending',
					// 	paymentStatus: 1,
					// 	expressStatus: 0,
					// 	pageSize: 1,
					// 	list: []
					// },{
					// 	value: 'delivered',
					// 	name: '已发货',
					// 	status: 'delivered',
					// 	paymentStatus: "1",
					// 	expressStatus: "1",
					// 	pageSize: 1,
					// 	list: []
					},{
						value: 'unreceive',
						name: '待收货',
						status: 'unreceive',
						paymentStatus: "1",
						expressStatus: "0",
						pageSize: 1,
						onFetching: false,
						loadAll: false,
						list: []
					},{
						value: 'receive',
						name: '已完成',
						status: 'receive',
						paymentStatus: "1",
						expressStatus: "2",
						pageSize: 1,
						onFetching: false,
						loadAll: false,
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
			this.fetchData(this.tabData[this.tabSelected], this.tabSelected);
		},
		methods: {
			fetchData (obj, ind = 0) {
				let _this = this;
				this.$http.post('/wechat/usercenter/getCustomerShopOrder',
						{
							"customerCode": _this.$store.state.user.userCode,
							"pageSize": obj.pageSize,
							"pageCount": _this.count,
							"paymentStatus": obj.paymentStatus, // 0 未支付， 1 已支付 "" 全部
							"expressStatus": obj.expressStatus //  0 待收货 1已发货 2已收货 "" 全部显示
																						// 返回参数expressType 0 待收货 1 已发货 2 已签收 3 已退货  
						}
					).then(function(e) {
	          _this.tabData[ind].onFetching  = false;
						let responseData = e.data.data,
								customerShopOrderList;

						if(responseData.customerShopOrderList) {
							customerShopOrderList = responseData.customerShopOrderList.map(function(item, index) {
								let orderProductList = [],
										count = 0;
								if(item.orderProductList.length > 0) {
									orderProductList = item.orderProductList.map(function(orderItem, orderIndex){
										count += orderItem.productCount;
										return {
											description: orderItem.description,
											productCode: orderItem.productCode,
											productCount: orderItem.productCount,
											productName: orderItem.productName,
											productPrice: orderItem.productPrice,
											img: _this.resolveImg(orderItem.thumbnail)
										}
									});
								}

								return {
									icon: '',
									count: count,
									code: item.orderCode,
									actualAmount: item.expectAmount,
									paymentType: item.paymentType,
									img: '',
									time: item.createTime,
									expressCompany: item.expressCompany,
									expressCode: item.expressCode,
									expressNumber: item.expressNumber,
									orderProductList: orderProductList,
									expressType: item.expressType
								}
							});
							if(customerShopOrderList.length < _this.count) {
								_this.tabData[ind].loadAll = true;
							}
							if(obj.pageSize == 1) {
								_this.tabData[ind].list = customerShopOrderList;
							} else {
								_this.tabData[ind].list = _this.tabData[ind].list.concat(customerShopOrderList);
							}
							_this.tabData[ind].pageSize++;
						}
				})
			},
			onTabClick (val) {
				if(this.tabData[val].list.length == 0){
					this.fetchData(this.tabData[val], val)
				}
			},
			loadMore (val) {
				if(this.tabData[val].onFetching || this.tabData[val].loadAll) {

				} else {
	        this.onFetching = true;
					this.fetchData(this.tabData[val], val)
				}
			},
			dataChange (ind) {
				this.tabData[ind].pageSize = 1;
				this.fetchData(this.tabData[ind], ind)
			},
			updateTabSelected (data) {
				this.tabSelected = data.newInd;
				this.tabData[data.newInd].pageSize = 1;
				this.tabData[data.newInd].onFetching = false;
				this.tabData[data.newInd].loadAll = false;
				this.tabData[data.oldInd].pageSize = 1;
				this.tabData[data.oldInd].onFetching = false;
				this.tabData[data.oldInd].loadAll = false;
			}
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
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
  			<el-card-order @on-load-more="loadMore" @on-data-change="dataChange" :card-data="item.list" :card-count="count" :card-index="index" :on-fetching="item.onFetching" :on-fetch-all="item.loadAll"></el-card-order>
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
						value: 'all',
						name: '全部',
						status: 'all',
					  paymentStatus: "",
					  ticketStatus: "",
						pageSize: 1,
						onFetching: false,
						loadAll: false,
						list: []
					},{
						value: 'unpay',
						name: '待付款',
						status: 'unpay',
					  paymentStatus: "0",
					  ticketStatus: "",
						pageSize: 1,
						onFetching: false,
						loadAll: false,
						list: []
					},{
						value: 'untake',
						name: '未上课',
						status: 'untake',
					  paymentStatus: "1",
					  ticketStatus: "0",
					  pageSize: 1,
						onFetching: false,
						loadAll: false,
						list: []
					},{
						value: 'take',
						name: '已上课',
						status: 'take',
					  paymentStatus: "1",
					  ticketStatus: "1",
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
			this.fetchData(this.tabData[0], 0);
		},
		methods: {
			fetchData (obj, ind = 0) {
				let _this = this;
				this.$http.post('/wechat/usercenter/getCustomerLessonList',
						{
							"customerCode": _this.$store.state.user.userCode,
							"pageSize": obj.pageSize,
							"pageCount": _this.count,
							"paymentStatus": obj.paymentStatus,
							"ticketStatus": obj.ticketStatus
						}
					).then(function(e) {
						_this.tabData[ind].onFetching = false;
						let responseData = e.data.data,
								customerStudyedLessonList;

						if(responseData.customerStudyedLessonList) {
							customerStudyedLessonList = responseData.customerStudyedLessonList.map(function(item, index) {
								return {
									icon: '',
									code: item.orderCode,
									lessonCode: item.lessonCode,
									commodityCode: item.commodityCode,
									title: item.NAME,
									parentTitle: item.productName,
									customerName: item.customerName,
									expectAmount: item.expectAmount, // 已付金额
									amount: item.amount, // 总金额
									paymentType: item.paymentType,
									img: _this.resolveImg(item.thumbnail),
									status: (item.paymentType == 1 && item.ticketStatus) ? item.ticketStatus : item.paymentStatus,
									time: item.createTime,
									paymentType: item.paymentType,
									ticketType: item.ticketType,
									ticketCode: item.ticketCode,
									num: item.COUNT,
									// lessonCommodityList: item.lessonCommodityList
								}
							});

							if(customerStudyedLessonList.length < _this.count) {
								_this.tabData[ind].loadAll = true;
							}
							if(obj.pageSize == 1) {
								_this.tabData[ind].list = customerStudyedLessonList;
							} else {
								_this.tabData[ind].list = _this.tabData[ind].list.concat(customerStudyedLessonList);
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
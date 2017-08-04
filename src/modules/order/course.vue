<!-- 
	订单列表页面
 -->

<template>
	<div class="order-list">
		<tab :line-width=2 v-model="tabSelected">
      <tab-item class="vux-center" v-for="(item, index) in tabData" :key="index">{{ item.name }}</tab-item>
    </tab>
    <swiper v-model="tabSelected" height="100%" :show-dots="false">
      <swiper-item v-for="(item, index) in tabData" :key="index">
    		<el-card-order @on-load-more="loadMore" :card-data="item.list" :card-count="count" :card-index="index"></el-card-order>
      </swiper-item>
    </swiper>
	</div>
</template>

<script type="type/babel">
	import { Tab, TabItem, Swiper, SwiperItem, TransferDom } from 'vux'

	import elCardOrder from 'components/card/card-order'

	export default {
		name: 'orderList',
		components: { Tab, TabItem, Swiper, SwiperItem, elCardOrder },
		directives: {
	    TransferDom
	  },
		data () {
			return {
				title: '订单列表页面',
				count: this.wordBook.pageCount,
				tabData: [
					{
						value: 'all',
						name: '全部',
						status: 'all',
					  paymentStatus: "",
					  ticketStatus: "",
						pageSize: 1,
						list: []
					},{
						value: 'unpay',
						name: '待付款',
						status: 'unpay',
					  paymentStatus: "0",
					  ticketStatus: "",
						pageSize: 1,
						list: []
					},{
						value: 'untake',
						name: '未上课',
						status: 'untake',
					  paymentStatus: "1",
					  ticketStatus: "0",
					  pageSize: 1,
						list: []
					},{
						value: 'take',
						name: '已上课',
						status: 'take',
					  paymentStatus: "1",
					  ticketStatus: "1",
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
				this.$http.post('/wechat/usercenter/getCustomerLessonList',
						{
							"customerCode": _this.$store.state.user.userCode,
							"pageSize": obj.pageSize,
							"pageCount": _this.count,
							"paymentStatus": obj.paymentStatus,
							"ticketStatus": obj.ticketStatus
						}
					).then(function(e) {
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
									actualAmount: item.expectAmount,
									amount: item.amount,
									paymentType: item.paymentType,
									img: '',
									status: (item.paymentType == 1 && item.ticketStatus) ? item.ticketStatus : item.paymentStatus,
									time: item.createTime,
									paymentType: item.paymentType,
									ticketType: item.ticketType,
									num: item.count,
									// lessonCommodityList: item.lessonCommodityList
								}
							});

							if(obj.pageSize == 1) {
								_this.tabData[ind].list = customerStudyedLessonList;
							} else {
								_this.tabData[ind].list.push.apply(_this.tabData[ind].list, customerStudyedLessonList);
							}
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
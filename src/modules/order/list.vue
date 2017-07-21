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
	import { Tab, TabItem, Swiper, SwiperItem } from 'vux'

	import elCardOrder from 'components/card/card-order'

	export default {
		name: 'orderList',
		components: { Tab, TabItem, Swiper, SwiperItem, elCardOrder },
		data () {
			return {
				title: '订单列表页面',
				count: 10,
				tabData: [
					{
						value: 'all',
						name: '全部',
						status: 'all',
						pagesize: 1,
						list: []
					},{
						value: 'unpay',
						name: '待付款',
						status: 'unpay',
						pagesize: 1,
						list: []
					},{
						value: 'undelievery',
						name: '已付款',
						status: 'undelievery',
						pagesize: 1,
						list: []
					},{
						value: 'untake',
						name: '未上课',
						status: 'untake',
						pagesize: 1,
						list: []
					},{
						value: 'take',
						name: '已上课',
						status: 'take',
						pagesize: 1,
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
			this.fetchData(1, 0);
		},
		methods: {
			fetchData (pageSize = 1, ind = 0, paymentStatus = "", ticketStatus = "") {
				let _this = this;
				this.$http.post('/wechat/usercenter/getCustomerLessonList',
						{
							"customerCode": _this.$store.state.user.userCode,
							"pageSize": pageSize,
							"pageCount": _this.count,
							"paymentStatus": paymentStatus,
							"ticketStatus": ticketStatus
						}
					).then(function(e) {
						let responseData = e.data.data,
								customerStudyedLessonList;

						if(responseData.customerStudyedLessonList) {
							customerStudyedLessonList = responseData.customerStudyedLessonList.map(function(item, index) {
								return {
									icon: '',
									code: item.orderCode,
									title: item.NAME,
									actualAmount: item.actualAmount,
									amount: item.amount,
									status: item.paymentStatus,
									paymentType: item.paymentType,
									img: '',
									num: item.count
								}
							});

							if(pageSize == 1) {
								_this.tabData[ind].list = customerStudyedLessonList;
							} else {
								_this.tabData[ind].list.push.apply(_this.tabData[ind].list, customerStudyedLessonList);
							}
						}
				})
			},
			onTabClick (val) {
				if(this.tabData[val].list.length == 0){
					if(val == 1) {
						this.fetchData(1, val, "0")
					} else if (val == 2) {
						this.fetchData(1, val, "1")
					} else if (val == 3) {
						this.fetchData(1, val, "", "0")
					} else if (val == 4) {
						this.fetchData(1, val, "", "1")
					} 
				}
			},
			loadMore (val) {
				if(val == 0){
					this.fetchData(++this.tabData[val].pagesize, val)
				} else if (val == 1) {
					this.fetchData(++this.tabData[val].pagesize, val, "0")
				} else if (val == 2) {
					this.fetchData(++this.tabData[val].pagesize, val, "1")
				} else if (val == 3) {
					this.fetchData(++this.tabData[val].pagesize, val, "", "0")
				} else if (val == 4) {
					this.fetchData(++this.tabData[val].pagesize, val, "", "1")
				} 
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
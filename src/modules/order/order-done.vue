<!-- 
	课程支付完成
 -->

<template>
	<div class="order-done order-course" v-cloak>
		<div class="order-done-content">
			<div class="order-done-succcess">
				<img src="~assets/img/tips/success.png">
				<p>恭喜您成功报名</p>
			</div>

			<div class="order-done-block order-done-msg">
				<p>您已成功报名{{ orderInfo.date }}日在{{ orderInfo.address }}开课的{{ orderInfo.name }}</p>
				<div class="order-done-label">上课人: 
					<p v-for="(item, index) in orderInfo.list" :key="index">{{ item }}</p>
				</div>
			</div>

			<div class="order-done-block order-done-kefu">
				<div class="img">
					<img :src="kefuInfo.img" alt="">
	        <rater v-model="kefuInfo.rater" slot="value" disabled></rater>
				</div>
				<div class="order-done-kefu-info">
					<p>学习顾问：{{ kefuInfo.name }}</p>
					<p>联系电话：{{ kefuInfo.tel }}</p>
					<div class="order-done-kefu-label">
						<p>从业{{ kefuInfo.workTime }}年</p>
						<p>客户{{ kefuInfo.customerCount }}位</p>
					</div>
				</div>
			</div>
		</div>

		<div class="btns">
			<x-button type="primary" @click.native="goPage('index')">完成</x-button>
		</div>
	</div>
</template>

<script type="text/babel">
	import { XButton, Group, Cell, Rater } from 'vux'

	export default {
		name: "orderDone",
		components: {
			XButton, Group, Cell, Rater
		},
		data () {
			return {
				title: "订单完成页面",
				orderInfo: {
					groupCode: this.$route.query.groupCode,
					orderCode: this.$route.query.orderCode,
					name: "商业思维",
					date: "2017-09-08",
					address: "苏州",
					list: []
				},
				kefuInfo: {}
			}
		},
		mounted () {
			this.fetchData();;
		},
		methods: {
			fetchData () {
				let _this = this;

				_this.getKefu();

				// 获取订单信息
				_this.$http.post('/wechat/shop/queryLessonOrderInfoByCode',
					{
						orderCode: _this.orderInfo.orderCode,
						groupCode: _this.orderInfo.groupCode
					}).then(function(e) {
						let responseData = e.data.data;
						if(e.data.errcode == 1) {
							_this.orderInfo.name = responseData.lessInfoName;
							_this.orderInfo.date = responseData.startDate;
							_this.orderInfo.address = responseData.address;
							_this.orderInfo.list = responseData.names;
						}	else {
							_this.$vux.alert.show({
								content: e.data.errmsg
							})
						}	
				});
			},
			getKefu () {
				let _this = this;

				_this.$http.post('/wechat/course/contactServiceUser',
					{
						customerCode: _this.$store.state.user.userCode
					}).then(function(e) {
						let responseData = e.data.data,
								service = responseData.userList;

						if(e.data.errcode == 1) {
							_this.kefuInfo = {
								img: _this.resolveImg(service.headPhoto),
								name: service.NAME,
								num: service.empId,
								tel: service.mobile,
								code: service.CODE,
								rater: 5,
								workTime: service.workTime,
								customerCount: service.customerCount
							};
						}	else {
							_this.$vux.alert.show({
								content: e.data.errmsg
							})
						}	
				});
			},
			goPage (url) {
				this.$router.push({name: url});
			}
		}
	}
</script>	

<style lang="scss">
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.order-done-kefu {
		.vux-rater {
			a {
				// margin: 0 auto !important;
				width: auto !important;
				height: auto !important;
				font-size: 12px !important;
			}
		}
	}
</style>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	$orderMargin: 10px; // 上课人和客服标签的间距

	$orderDoneBlockPadding: 30px;
	$orderDoneBlockPaddingTop: 20px;
	$orderDoneBlockPaddingBottom: 30px;

	$orderDoneMargin: 30px; // 块间距

	$kefuW: 70px;
	$kefuPadding: 20px;

	.order-done {
		position: relative;
		width: 100%;
		height: 100%;
		padding: 0 $padding;
		background-color: $bgGray;
	}

	.order-done-succcess {
		line-height: 2;
		padding-top: 30px;
		text-align: center;
		color: $colorGreen;
	
		img {
			width: 60px;
			margin: 0 auto;
			border-radius: 60px;
		}
	}

	.order-done-block {
		padding: $orderDoneBlockPaddingTop $orderDoneBlockPadding $orderDoneBlockPaddingBottom;
		margin-top: $orderDoneMargin;
		background-color: #fff;
		border-radius: $borderRadius;
		line-height: 1.75;
	}

	.order-done-kefu {
		text-align: left;
 		display: flex;

 		.img {
			width: $kefuW + $kefuPadding;

			img {
				width: $kefuW;
				height: $kefuW;
			}
 		}
	}

	.order-done-label, .order-done-kefu-label {
		p {
			margin-right: $orderMargin;
			display: inline-block;
		}
	}

	.btns {
		margin-top: $orderDoneMargin;
		text-align: center;
	}
</style>
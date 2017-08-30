<!-- 
	课程订单 (废弃)
 -->

<template>
	<div class="order-course" v-cloak>
		<!-- <form-preview header-label="付款金额" :header-value="money" :body-items="list"></form-preview> -->
		<div class="order-course-header">
			<div class="info">
				<p>学习人：{{ orderCourseData.manName }}</p>
				<span>{{ orderCourseData.manTel }}</span>
			</div>
			<p>学习内容：{{ orderCourseData.courseName }}</p>
		</div>

		<div class="order-course-content">
			<el-card-course :card-course-data="orderCourseData"></el-card-course>
		</div>
	</div>
</template>

<script type="text/babel">
	import { FormPreview } from 'vux'
	import elCardCourse from 'components/card/card-course'
	
	export default {
		name: "orderCourse",
		components: { FormPreview, elCardCourse },
		props: ['orderCourseData'],
		data () {
			return {
				value: "",
				money: "",
				list: [
					{
		        label: '',
		        value: ''
		      },{
		        label: '',
		        value: ''
		      },{
		        label: '',
		        value: ''
		      }
		    ]
			}
		},
		mounted () {
			// let _this = this;

			// // _this.money = _this.orderCourseData.amount;
			// // _this.list[0].value = _this.orderCourseData.code;
			// // _this.list[1].value = _this.orderCourseData.name;
			// // _this.list[2].value = _this.orderCourseData.time;
		}
	}
</script>


<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.order-course-header {
		padding: $paddingTop $padding;
		background-color: #fff;
		line-height: 1.75;
		color: $fontColorBlack;
		border-bottom: $uiMarginH solid $uiMarginBg;

		.info {
			font-size: 16px;
			display: flex;

			p {
				flex: 1;
				@include ellipsisOne();
			}

			span {
				width: 7em;
				text-align: right;
			}
		}
	}

	.order-course-content {
		padding: $paddingTop $padding;
		background-color: #fff;
	}
</style>
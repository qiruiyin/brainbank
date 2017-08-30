<!-- 
	课程活动详情
 -->

<template>
	<div class="detail-course" v-cloak>
		<el-header-index></el-header-index>

		<div class="container">
			<header>
				<div class="title">{{ course.name }}</div>
				<div class="desc">
					<span>{{ course.startDate }}</span>
					<span>{{ course.author }}</span>
				</div>	
			</header>
			
			<div class="detail-course-body" v-html="course.content"></div>
		</div>
	</div>
</template>

<script type="text/babel">
	import elHeaderIndex from 'components/header/header-index'

	export default {
		name: "courseDetail",
		components: { elHeaderIndex },
		data () {
			return {
				title: "课程活动详情",
				course: {
					address: "",
					continueTime: "",
					content: "",
					description: "",
					author: "",
					name: "",
					price: "",
					endDate: "",
					startDate: ""
				},
				courseCode: this.$route.params.courseCode,
				courseStatus: this.$route.params.courseStatus // 0 课程, 1期数
			}
		},
		mounted () {
			console.log(this.$route.params.courseCode)
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;
				_this.$http.post('/wechat/course/details',
					{
						"code": _this.courseCode,
						"status": _this.courseStatus
					}).then(function(e) {
						let responseData = e.data.data;

						if(responseData.info) {
							_this.course = responseData.info
						}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	header {
		padding: $padding;
		line-height: 1;
		@include halfpxline(0, $borderColor, 0 , 0, 1px, 0);

		.title {
			font-size: 26px;
			color: $fontColorBlack;
		}

		.desc {
			padding: $padding $padding 0 0;

			span {
				margin-right: 1em;
			}
		}
	}

	.detail-course-body {
		padding: $padding;
	}
</style>
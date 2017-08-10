<!-- 
	近期课程
 -->

<template>
	<timeline>
		<timeline-item v-for="(item, index) in courseListData" :key="index">
			<div class="course-recent">									
				<h5>{{ item.name }}</h5>
				<div class="course-recent-right">
					<div @click="goPage(item)" :class="['course-recent-right-btn', item.btn.value, { 'disabled': item.balance_count <= 0 }]">{{ item.btn.name }}<span></span></div>
					<p v-if="item.balance_count > 0">剩余{{ item.balance_count }}人</p>
					<p v-else>截止报名</p>
				</div>
			</div>
		</timeline-item>
	</timeline>
</template>


<script type="text/babel">
	import { Timeline, TimelineItem } from 'vux'

	export default {
		name: "courseRecent",
		components: {
			Timeline, TimelineItem
		},
		props: ['courseListData'],
		data () {
			return {
				courseList: []
			}
		},
		methods: {
			goPage (obj) {
				// lessonType 1 思维商学院 2总裁商业思维 3 企业自动化运转 0其他课程
				if(!this.isLogin()) return false;
				if(obj.balance_count <= 0) return false;
				let _this = this,
						course = this.$store.state.user.course;

				if(obj.btn.type == 3) {
					_this.$vux.confirm.show({
						content: obj.btn.link,
						onConfirm () {
							_this.$router.push({ name: 'orderCourseList' });
						}
					})
				} else if(obj.lessonType == 1) {
					// 思维商学院
					if(course != "思维商学院") {
						_this.$vux.confirm.show({
	  					content: "您还不是商学院用户，请联系服务经理升级",
	  					onConfirm () {
	  						_this.$router.push({name: 'kefu'})
	  					}
	  				})
					} else {
						this.$router.push({name: obj.btn.link, params: { payType: obj.btn.type }, query: { code: obj.code, type: obj.lessonType }})
					}
				} else if (obj.lessonType == 2) {
					// 总裁商业思维（可以多个报名）
					this.$router.push({name: obj.btn.link, params: { payType: obj.btn.type }, query: { code: obj.code, type: obj.lessonType }})
				} else if (obj.btn.link) {
					this.$router.push({name: obj.btn.link, params: { payType: obj.btn.type }, query: { code: obj.code, type: obj.lessonType }})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
  
	.course-recent {
		padding-left: 0em;
		padding-bottom: 1em;
		border-bottom: 1px dashed $borderColor; 
		display: flex;

		h5 {
			flex: 1;
			font-size: $fontSize;
		}
	}

	.course-recent-right {
		width: 6em;
		text-align: center;

		p {
			text-align: right;
		}
	}

	.course-recent-right-btn {
		width: 5em;
		height: 30px;
		padding: 0 .6em;
		line-height: 30px;
		margin: 0 auto;
		margin-right: 0;
		background: $colorGreen;
		color: #fff;
		text-align: justify;
		text-align-last: justify;
		letter-spacing: .2em;
		text-indent: .2em;
		border-radius: $borderRadius;

		&.retrain {
			background-color: $colorOrange;
		}

		&.disabled {
			background-color: $colorGrayDisabled;
		}

		span {
			display: inline-block;
			width: 100%;
		}
	}
</style>
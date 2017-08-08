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
					<p>剩余{{ item.balance_count }}人</p>
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
				if(!this.isLogin()) return false;
				// debugger
				if(obj.balance_count <= 0) return false;
				console.log(obj.btn.link)
				let _this = this,
						course = this.$store.state.user.course;

				if(obj.lessonType == 1) {
					// 思维商学院
					if(course != "思维商学院") {
						_this.$http.post('/wechat/course/contactServiceUser',{
				  			"customerCode": _this.$store.state.user.userCode	
				  		}).then(function(e) {

				  		})
					} else {
						this.$router.push({name: obj.btn.link, params: { payType: obj.btn.type }, query: { code: obj.code }})
					}
				} else if (obj.lessonType == 2) {
					// 总裁商业思维（可以多个报名）
					this.$router.push({name: obj.btn.link, params: { payType: obj.btn.type }, query: { code: obj.code, type: 1 }})
				} else if (obj.btn.link) {
					this.$router.push({name: obj.btn.link, params: { payType: obj.btn.type }, query: { code: obj.code }})
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

		&.retain {
			background-color: $colorOrange;
		}

		&.disabled {
			background-color: $colorGray;
		}

		span {
			display: inline-block;
			width: 100%;
		}
	}
</style>
<!-- 
	客服
 -->

<template>
	<div class="kefu">
		<el-header-index></el-header-index>

		<div class="container">
			<card :header="{title:'我的服务人员'}">
				<div slot="content" class="service">
					<div class="service-card">
						<img :src="service.img" alt="">
						<div class="service-card-text">
							<div class="title">{{ service.name }}</div>
							<p>工号：{{ service.num }}</p>
							<p>电话：{{ service.tel }}</p>

							<div class="btn" @click="goPage('kefuDetail', service.code)">查看TA的名片</div>
						</div>
					</div>
				</div>
			</card>

			<card :header="{title:'近期开课行程安排'}">
				<div slot="content" class="table">
					<timeline>
						<timeline-item v-for="(item, index) in courseList" :key="index">
							<p @click="goCourse(item.code, '0')">{{ item.name }}</p>
						</timeline-item>
					</timeline>
				</div>
			</card>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Timeline, TimelineItem, XTable, Card } from 'vux'
	import elHeaderIndex from 'components/header/header-index'
	
	import imgUser from 'assets/img/user-center/user.png'
	
	export default {
		name: 'kefu',
		components: { Timeline, TimelineItem, XTable, Card, elHeaderIndex },
		data () {
			return {
				title: '客服',
				service: {
					img: imgUser,
					name: '谢学军',
					num: '12312313213',
					tel: '12312313213',
					code: '',
					link: ''
				},
				courseTitle: [ '日期', '课程', '讲师', '时间', '地点' ],
				courseList: [],
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData() {
				let _this = this;
				this.$http.post('/wechat/usercenter/customerService',
						{
							"customerCode": _this.$store.state.user.userCode,
						}
					).then(function(e) {
						let responseData = e.data.data,
								service = responseData.userList;
						_this.service = {
							img: _this.resolveImg(service.headPhoto),
							name: service.NAME,
							num: service.empId,
							tel: service.mobile,
							code: service.CODE,
							link: ''
						};

						_this.transData(responseData.lessonList, 'courseList');
					}
				);
			},
			transData (data, name) {
				let arr = [];
				data.map(function(item, index) {
					arr[index] = {
						startDate: item.startDate,
						name: item.name,
						lecturer: item.author,
						time: item.continueTime,
						address: item.address,
						code: item.code
					}
				})

				this[name] = arr;
			},
			goPage (url, serviceCode) {
	  		this.$router.push({ name: url, params: { serviceCode: serviceCode }});
			},
	  	goCourse(code, status) {
	  		console.log(code, status)
	  		this.$router.push({name: "courseDetail", params: { courseCode: code, courseStatus: status }})
	  	}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	$serviceCardW: 66px;

	.service-card {
		position: relative;
		padding: $padding;
		display: flex;

		img {
			width: $serviceCardW;
			height: $serviceCardW;
			border-radius: $serviceCardW;
		}

		.service-card-text {
			flex: 1;
			padding-left: $padding;
		}

		.title {
			font-size: 18px;
			color: $fontColorBlack;
		}courseList

		.btn {
			@include halfpxline($borderRadius, $borderColor, 1px, 1px, 1px, 1px);
			position: absolute;
			top: 10px;
			right: $padding;
			padding: 0 10px;
			line-height: 36px;
		}
	}
</style>
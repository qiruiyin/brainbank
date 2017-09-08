<!-- 
	客服
 -->

<template>
	<div class="kefu" v-cloak>
		<el-header-index></el-header-index>

		<div class="container">
			<card :header="{title:'我的服务人员'}" class="uiBorderTop">
				<div slot="content" class="service">
					<div class="service-card">
						<img v-show="service.img" :src="service.img" alt="">
						<div class="service-card-text">
							<div class="title">{{ service.name }}</div>
							<p>电话：{{ service.tel }}</p>

							<div class="service-btn-group">
								<div v-for="(item, index) in serviceBtn" @click="goPage(item)" :key="index" :class="['service-btn', 'service-btn-' + item.icon]">{{ item.name }}</div>
							</div>
						</div>
					</div>
				</div>
			</card>

			<card :header="{title:'近期开课行程安排'}" class="uiBorderTop">
				<div slot="content" class="table">
					<el-course-recent></el-course-recent>
				</div>
			</card>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Timeline, TimelineItem, XTable, Card } from 'vux'
	import elHeaderIndex from 'components/header/header-index'
	import elCourseRecent from 'components/course/recent'
	
	export default {
		name: 'kefu',
		components: { Timeline, TimelineItem, XTable, Card, elHeaderIndex, elCourseRecent },
		data () {
			return {
				title: '客服',
				service: {
					img: '',
					name: '',
					num: '',
					tel: '',
					code: '',
					link: ''
				},
				courseTitle: [ '日期', '课程', '讲师', '时间', '地点' ],
				serviceBtn: [
					{
						name: "名片",
						link: 'kefuDetail',
						icon: 'mingpian',
						query: {
							serviceCode: ""
						}
					},{
						name: "消息",
						link: 'msgDetail',
						icon: 'msg',
						query: {
							// openId: "",
							sendUser: "",
							msgType: 3
						}
					}
				]
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
							"openId": _this.$store.state.user.openId,
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
						_this.serviceBtn[0].query.serviceCode = service.CODE;
						_this.serviceBtn[1].query.sendUser = service.openId;
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
			goPage (item) {
				if(item.link == 'kefuDetail') {
		  		this.$router.push({ name: item.link, query: item.query });
				} else {
					console.log(item.sendUser)
					this.$router.push({name: item.link, query: { sendUser: item.query.sendUser, msgType: item.query.msgType }})
				}
			},
	  	goCourse(code, status) {
	  		console.log(code, status)
	  		this.$router.push({name: "courseDetail", query: { courseCode: code }})
	  	}
		}
	}
</script>


<style lang="scss">
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.kefu {
		.weui-panel__hd {
			font-size: $fontSize;
			color: $fontColorBlack;
		}
	}
</style>

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
			line-height: 1.75;
			color: $fontColorBlack;
		}

		.title {
	    line-height: 40px;
		}
	}

	.service-btn-group {
		position: absolute;
		top: 50%;
		right: $padding;
		color: $fontColorBlack;
		margin-top: -29px;
	}

	.service-btn {
		@include halfpxline($borderRadius, $colorYellow, 1px, 1px, 1px, 1px);
		padding: 0 10px;
		padding-left: 30px;
		line-height: 1.75;
		margin-bottom: 10px;

		&:before {
			content: "";
			position: absolute;
			left: 0;
			top: 50%;
			width: 30px;
			height: 30px;
			margin-top: -15px;
			background: url("~assets/img/user-center/service-mingpian.png") no-repeat;
			background-size: 80%;
			background-position: center;
		}

		&:last-child {
			margin-bottom: 0;
		}

		&.service-btn-msg {
			@include halfpxline($borderRadius, $colorGreen, 1px, 1px, 1px, 1px);
			
			&:before {
				background-image: url("~assets/img/user-center/service-msg.png");
			}
		}
	}
</style>
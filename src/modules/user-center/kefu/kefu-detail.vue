<!-- 
	客服详情
 -->

<template>
	<div class="kefu-detail" v-cloak>
		<el-header-index></el-header-index>

		<div class="container">
			<div class="kefu-header">
				<img :src="header.img" alt="">
				<div class="title">
					{{ header.name }}
					<span>{{ header.position }}</span>
				</div>
				<div class="feature">
					<p>从业<span>{{ header.time }}</span></p>
					<p>客户<span>{{ header.customerNum }}位</span></p>
				<!-- 	<p>好评率<span>{{ header.likeRate }}</span></p>
					<p>客户见证<span>{{ header.customerWitness }}件</span></p>
					<p>服务水平<span>{{ header.serviceLevel }}分</span></p> -->
				</div>
			</div>
			
			<card v-if="header.tel || header.weixin" :header="{title: '联系方式'}">
				<div slot="content" class="kefu-link">
					<div class="link-block">
						<a v-if="header.tel" class="link-icon-tel" :href="'tel:' + header.tel">
							{{ header.tel }}
							<span>（点击拨打）</span>
						</a>
						<p @click="goMsg">发送站内信</p>
					</div>
					<a v-if="header.weixin" class="link-icon-weixin">{{ header.weixin }}<span>（复制微信号添加服务老师）</span></a>
				</div>
			</card>
			
			<card :header="{title:'我参加过的课程'}">
				<div slot="content" class="kefu-course-read">
					<div class="kefu-course-read-block" v-for="item in courseAll" :key="item.code">
						<div @click="goPage('courseDetail', item.code)" :class="['kefu-icon', { 'disabled': !item.owner }]">{{ item.name }}</div>
					</div>
				</div>
			</card>

			

		</div>
	</div>
</template>

<script type="text/babel">
	import { XTable, Card, Cell } from 'vux'
	import elHeaderIndex from 'components/header/header-index'
	
	import imgUser from 'assets/img/user-center/user.png'
	
	export default {
		name: 'kefu',
		components: { XTable, Card, Cell, elHeaderIndex },
		data () {
			return {
				title: '客服详情',
				header: {
					img: '',
					name: '',
					position: '',
					time: '',
					customerNum: '',
					tel: '',
					weixin: '',
					likeRate: '',
					customerWitness: '',
					serviceLevel: '',
					openId: ""
				},
				courseAll: [],
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData() {
				let _this = this;
				this.$http.post('/wechat/usercenter/customerService/info',
						{
							"customerCode": _this.$store.state.user.userCode,
							"userCode": _this.$route.query.serviceCode
						}
					).then(function(e) {
						if(e.data.errcode == 1) {
							let responseData = e.data.data,
									header = responseData.customerServiceInfoList;

							_this.header = {
								img: _this.resolveImg(header.headPhoto),
								name: header.NAME,
								position: header.roleName,
								time: header.workTime + '年',
								customerNum: header.customerCount,
								tel: header.mobile,
								weixin: '',
								likeRate: '99%',
								customerWitness: '25',
								serviceLevel: '75',
								openId: header.openId
							};

							let courseAll = [];
							responseData.medalBeanList.map(function(item, index) {
								courseAll[index] = {
									name: item.name.substr(0, 1),
									nameAll: item.name,
									code: item.code,
									owner: item.owner
								}
							});
							_this.courseAll = courseAll;
						} else {
							_this.$vux.alert.show({
								content: e.data.errmsg
							})
						}
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
						address: item.address
					}
				})

				this[name] = arr;
			},
			goPage (url, code) {
	  		this.$router.push({ name: url, query: { courseCode: code }})
			},
			goMsg () {
				this.$router.push({ name: 'msgDetail', query: { sendUser: this.header.openId , msgType: 3 }})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	$imgHeaderW: 66px;
	$kefuIconW: 60px;
	$colors: green red gray blue lightblue yellow;
	$linkIconW: 40px;
	$linkIcons: tel weixin;

	.kefu-header {
		width: 100%;
		height: 240px;
		padding: 30px $padding $padding;
		background: url("~assets/img/user-center/kefu.jpg") no-repeat;
		background-size: cover;
		text-align: center;
		line-height: 2;
		color: #fff;

		img {
			width: $imgHeaderW;
			height: $imgHeaderW;
			margin: 0 auto;
			border-radius: $imgHeaderW;
		}

		.title {
			font-size: 20px;
			padding: 6px;
		}

		.feature {
			font-size: 0;

			p {
				width: 33%;
				font-size: 14px;
				display: inline-block;
			}

			span {
				margin-left: .2em;
				font-size: 18px;
				color: #ffec81;
			}
		}
	}
	
	.kefu-course-read {
		@extend %clearfix;
		text-align: center;
		font-size: 0;
	}

	.kefu-course-read-block {
		float: left;
		width: 33.3%;
		margin: 10px 0;
		text-align: center;
		display: inline-block;
	}

	.kefu-icon {
		width: $kefuIconW;
		height: $kefuIconW;
		line-height: $kefuIconW;
		margin: 0 auto;
		border-radius: $borderRadius;
		color: #fff;
		font-size: 20px;
		background: #1ABC9C;

		&.disabled {
			background: #BDC3C7;
		}
	}

	// @each $color in $colors { 
	// 	.kefu-icon-#{$color} { 
	// 		background: $color;
	// 	} 
	// }
	
	.kefu-link {
		padding: $padding;

		a {
			position: relative;
			padding-left: $linkIconW;
			line-height: $linkIconW;
			display: block;

			&:before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: $linkIconW;
				height: $linkIconW;
				background-repeat: no-repeat;
				background-size: 60%;
				background-position: center;
			}
		}

		span {
			float: right;
		}
	}

	.link-block {
		display: flex;

		a {
			flex: 1;
		}

		p {
			width: 8em;
			height: 30px;
			margin-top: 5px;
			line-height: 30px;
			text-indent: 30px;
			@include halfpxline($borderRadius, $colorGreen, 1px, 1px, 1px, 1px);
			
			&:before {
				content: "";
				position: absolute;
				left: 0;
				top: 50%;
				width: 30px;
				height: 30px;
				margin-top: -15px;
				background: url("~assets/img/user-center/service-msg.png") no-repeat;
				background-size: 80%;
				background-position: center;
			}
		}
	}

	@each $linkIcon in $linkIcons {
		.link-icon-#{$linkIcon} {
			&:before {
				background-image: url("~assets/img/user-center/#{$linkIcon}.png");
			}
		}
	}
</style>
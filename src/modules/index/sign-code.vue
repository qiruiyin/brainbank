<!-- 
	签到二维码
 -->

<template>
	<div class="sign-code" v-cloak>
		<header>
			<img :src="user.img" alt="">
			<div class="header-info">
				<p>{{ user.name }}</p>
				<p>{{ user.course }}</p>
			</div>
		</header>

		<div :class="['sign-code-content', {'active': !status}]">
			<h5>您的签到二维码</h5>
			<p>{{ courseInfo.name }}</p>
			<p>{{ courseInfo.user }}</p>
			<img :src="courseInfo.img" alt="">
			<span>（该二维码直线本人本次签到有效，过期作废）</span>
		</div>

		<div :class="['sign-code-footer', {'active': !status}]">
			<p>上课日期：{{ courseInfo.time }}</p>
			<p>上课地点：{{ courseInfo.address }}</p>
		</div>
	</div>
</template>

<script type="text/babel">
	import { mapState } from 'vuex'
	import imgShixiao from 'assets/img/shixiao.jpg'

	export default {
		name: "signCode",
		data () {
			return {
				status: true,
				courseInfo: {
					name: "",
					user: "",
					img: "",
					time: "",
					address: ""
				}
			}
		},
		computed: {
	    ...mapState({
	      user: state => state.user,
	    })
	  },
	  mounted () {
	  	this.fetchData();
	  },
	  methods: {
	  	fetchData () {
	  		let _this = this;

				this.$http.post('/wechat/discover/queryTicket',
						{
							"code": _this.$route.query.code,
						}
					).then(function(e) {
						let responseData = e.data.data;
						if(e.data.errcode == 1) {
							_this.courseInfo.name = responseData.productName;
							_this.courseInfo.user = responseData.author;
							_this.courseInfo.img = _this.resolveImg(responseData.img);
							_this.courseInfo.time = responseData.time;
							_this.courseInfo.address = responseData.address;
						} else {
							_this.courseInfo.img = imgShixiao;
							_this.status = false;
						}
				})
	  	}
	  }
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	$userCenterheaderImgW: 50px;

	.sign-code {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	header {
		padding: $paddingTop 0;
		background-color: $colorOrange;
		text-align: center;
		color: #fff;

		img {
			width: $userCenterheaderImgW;
			height: $userCenterheaderImgW;
			margin: 0 auto;
			border-radius: $userCenterheaderImgW;
		}
		
		.header-info {
			width: 100%;
			line-height: 2;
			@extend %clearfix;

			p {
				float: left;
				width: 50%;
				padding: 0 .5em;
				text-align: right;

				&:last-child {
					text-align: left;
				}
			}
		}
	}
	
	.sign-code-content {
		padding-top: 50px;
		line-height: 2;
		text-align: center;
		font-size: 16px;

		&.active {
			p, span {
				display: none;
			}
		}

		h5 {
			font-size: 16px;
			color: $colorOrange;
		}

		p {
			color: $fontColorBlack;
		}

		img {
			width: 60%;
			max-width: 300px;
			margin: 0 auto;
		}

		span {
			font-size: 12px;
			color: $fontColorGray;
		}
	}

	.sign-code-footer {
		@include halfpxline(0, $fontColorBlack, 1px, 0, 0, 0);
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		color: $fontColorBlack;
		text-align: center;
		padding: 0 $padding;

		&.active {
			display: none;
		}

		p {
			padding-left: 1em;
			line-height: 40px;
			display: inline-block;
			@include ellipsisOne();
		}
	}
</style>
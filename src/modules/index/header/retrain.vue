<!-- 
	须知
 -->

<template>
	<div class="retrain" v-cloak>
		<!-- <el-header-index></el-header-index> -->
		<div class="container">
			<img src="~assets/img/header/retrain.jpg" alt="">
			<div class="retrain-body">
				<section>
					<h3>{{ lessonInfo.title }}</h3>
					<p>为了防止老学员说好来{{ lessonInfo.typeDesc }}，实际没来{{ lessonInfo.typeDesc }}而造成的学习资格浪费，导致想报名学习的人无法参加学习。</p>
				
					<template v-if="lessonInfo.type == 1">
						<p>从2017年7月1日起，大脑银行学员若要参加<span>《 {{ lessonInfo.name }} 》</span>课程，需要在报名时间交纳<span>{{ lessonInfo.price }}</span>元/人的{{ lessonInfo.typeDesc }}座位保证金，在到达课程现场签到成功后退回<span>{{ lessonInfo.price }}</span>元。</p>
						<p>如果报名了而未实际到场，<span>{{ lessonInfo.price }}</span>元保证金不退。</p>
					</template>
					<p v-else>从2017年7月1日起，大脑银行学员若要参加<span>《 {{ lessonInfo.name }} 》</span>课程，需要在报名时间交纳<span>{{ lessonInfo.price }}</span>元/人的食宿费。</p>

					<div class="end">
						<p>2017年7月1日
							<span>苏州大脑方程式信息咨询有限公司</span>
						</p>
						<img class="logo" src="~assets/img/logo.png" alt="logo">
					</div>
					<div class="tips">本人已认真阅读以上文字，自愿参加{{ lessonInfo.typeDesc }}并愿意遵守大脑银行公司规则！</div>
				</section>

				<div class="btn">
					<x-button type="primary" @click.native="goPage">立即{{ lessonInfo.typeDesc }}</x-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import { XButton } from 'vux'
	import elHeaderIndex from 'components/header/header-index'
	
	export default {
		components: {
			XButton, elHeaderIndex
		},
		data () {
			return {
				title: "须知",
				type: this.$route.query.type,
				lessonInfo: {
					title: '',
					type: '1', // 1是正常，2是领袖 思维
					typeDesc: '',
					lessonCode: this.$route.query.lessonCode,
					lessonType: this.$route.query.lessonType,
					price: "",
					name: ""
				},
				btn: {
					value: ""
				}
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;
				_this.getServiceUser();
				if(_this.type == 'siweidaotu') {
					// 思维导图
					_this.lessonInfo.type = 1;
					_this.lessonInfo.title = '思维导图学员须知';
					_this.lessonInfo.price = 500;
					_this.lessonInfo.name = '思维导图';
					_this.lessonInfo.typeDesc = '学习';
				} else {
					// 复训
					_this.$http.post('/wechat/discover/entered/info',{
							lessonCode: _this.lessonInfo.lessonCode,
						}).then(function(e) {
							if(e.data.errcode == 1) {
								_this.lessonInfo.type = e.data.data.type;
								_this.lessonInfo.title = '复训学员须知';
								_this.lessonInfo.price = e.data.data.price;
								_this.lessonInfo.name = e.data.data.name;
								_this.lessonInfo.typeDesc = '复训';
							} else {
								_this.$vux.alert.show({
									content: e.data.errmsg
								})
							}
					})
				}
			},
			getServiceUser () {
				let _this = this;
				if(_this.$store.state.user.userCode) {
					_this.$http.post('/wechat/course/contactServiceUser',
						{
							customerCode: _this.$store.state.user.userCode
						}).then(function(e) {
							if(e.data.errcode == 1) {
								let responseData = e.data.data,
										service = responseData.userList;

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
				}
			},
			courseChange (lessonCode, commodityCode) {
				// 改签课程
				let _this = this;
				_this.$http.post('/wechat/usercenter/getCustomerLessonList/changeLessonOrder',
	  			{
						"commodityCode": commodityCode,
						"lessonCode": lessonCode
	  			}).then(function(e) {
	  				if(e.data.errcode == 1) {
	  					// 改签成功
	  					_this.$vux.confirm.show({
	  						content: e.data.errmsg,
	  						onConfirm() {
									_this.$router.push({ name: 'course', query: { type: 1 }});
	  						}
	  					});
	  				} else {
	  					// 改签失败
	  					_this.$vux.alert.show({
	  						content: e.data.errmsg
	  					});
	  				}
  			})
			},
			usePackage (lessonCode, orderCode, status = 0) {
				// 使用礼包 status: 1全款礼包， 0：非全款礼包
				let _this = this;
				_this.$http.post('/wechat/course/updateCommodity',
	  			{
						"orderCode:": orderCode,
						"lessonCode": lessonCode
	  			}).then(function(e) {
	  				if(e.data.errcode == 1) {
	  					if(status == 1) {
		  					_this.$vux.alert.show({
		  						content: e.data.errmsg
		  					});
	  					} else {
								_this.payWeixinOrder(orderCode, { name: 'course', query: { type: 1 }}, 1)
	  					}
	  				} else {
	  					_this.$vux.alert.show({
	  						content: e.data.errmsg
	  					});
	  				}
  			})
			},
			goCourseTest (lessonCode, url) {
				// 0: 继续下一步
				// 1：有未消费的订单 提示改签，确定调改签接口，接口完成，咨询万总
				// 2：有未消费的全款礼包 提示是否使用该礼包 ，确定调/wechat/course/updateCommodity，接口完成咨询万总
				// 3: 有未消费的未全款礼包 提示是否使用未全款礼包，确定调/wechat/course/updateCommodity，成功后调支付， 在成功咨询万总
				// 
				let _this = this;

				_this.$http.post('/wechat/course/querySingLessonStates',
					{
						userCode: _this.$store.state.user.userCode,
						lessonCode: lessonCode
					}).then(function(e) {
						if(e.data.errcode == 1){
							if(e.data.data.state == 0) {
								_this.$router.push(url);
							} else if (e.data.data.state == 1) {
								// _this.$vux.confirm.show({
									// content: "您已有未消费的该课程订单，是否改签",
									// onConfirm () {
										// 改签
										_this.courseChange(lessonCode, e.data.data.commodityCode);
									// }
								// })
							} else if (e.data.data.state == 2) {
								// _this.$vux.confirm.show({
									// content: "您有未消费的全款礼包，是否使用礼包",
									// onConfirm () {
										_this.usePackage(lessonCode, e.data.data.orderCode, 1)
									// }
								// })
							} else if (e.data.data.state == 3) {
								// _this.$vux.confirm.show({
									// content: "您有未消费的礼包，是否使用礼包",
									// onConfirm () {
										_this.usePackage(lessonCode, e.data.data.orderCode, 0)
									// }
								// })
							}
						} else {
							_this.$vux.alert.show({
								content: e.data.errmsg
							})
						}
					})
			},
			goPage () {
				let _this = this;
				if(_this.type == 'siweidaotu') {
					_this.goCourseTest(_this.$route.query.lessonCode, {name: 'kefuDetail', query: { serviceCode: _this.kefuInfo.code }});
				} else {
					this.$router.push({name: "courseOrder", params: { payType: 'retrain' }, query: { code: this.lessonInfo.lessonCode, type: this.lessonInfo.lessonType  }});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.retrain {
		padding-bottom: 40px;

		.container > img {
			width: 100%;
		}
	}

	section {
		padding: $padding;
		line-height: 2;

		h3 {
			text-indent: 1em;
			font-size: 20px;
			color: $fontColorBlack;
		}

		& > p {
			span {
				color: $colorOrange;
			}
		}

		p {
			text-indent: 2em;
		}
		
		.tips {
			text-indent: 2em;
			font-size: 12px;
			margin: 1em 0;
		}

		.end {
			@extend %clearfix;
			text-align: right;

			p {
				float: right;
				display: inline-block;
			}

			span {
				display: block;
			}
		}
	}

	.logo {
		float: right;
		height: 4em;
	}

	.btn {
		margin-top: 2em;
		padding: $padding;
	}
</style>
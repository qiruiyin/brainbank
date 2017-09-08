<!-- 
	近期课程
 -->

<template>
	<timeline v-cloak>
		<timeline-item v-for="(item, index) in courseList" :key="index">
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
		data () {
			return {
				kefuInfo: {},
				courseList: []
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;
				_this.$http.post('/wechat/course/recent',
					{
						customerCode: _this.$store.state.user.userCode
					}).then(function(e) {
						let responseData = e.data.data,
								lessonList = [];
						_this.getServiceUser();

						if(e.data.errcode == 1) {
							if(responseData.lessonList && responseData.lessonList.length > 0) {
								lessonList = responseData.lessonList.map(function(item, index){
				  				// customerLessonType 用户可操作性的状态 0 可报名 1 已报名 2 复训 3 已生成订单未支付
				  				// lessonType 1 思维商学院 2总裁商业思维 3 企业自动化运转 4 思维导图 0其他课程
				  				let btn = {
				  					name: "报名",
			  						link: "courseOrder",
				  					type: "enlist",
				  					value: "enlist"
				  				};

				  				if(item.customerLessonType == 1) {
				  					btn = {
				  						name: "已报名",
				  						link: "",
				  						type: "",
				  						value: "disabled"
				  					}
				  				} else if (item.customerLessonType == 2) {
				  					btn = {
				  						name: "复训",
			  							link: "courseOrder",
					  					type: "retrain",
				  						value: "retrain"
				  					}
				  				} else if (item.customerLessonType == 3) {
				  					btn = {
				  						name: "报名",
			  							link: "已生成订单未支付",
					  					type: "3",
				  						value: "disabled"
				  					}
				  				}

				  				return {
				  					lessonType: item.lessonType,
				  					code: item.code,
				  					name: item.name,
				  					balance_count: item.balance_count,
				  					btn: btn
				  				}
				  			});
				  		}

			  			_this.courseList = lessonList;
						}	else {
							_this.$vux.alert.show({
								content: e.data.errmsg
							})
						}	
				});
			},
			getServiceUser () {
				let _this = this;
				if(_this.$store.state.user.userCode) {
					_this.$http.post('/wechat/usercenter/customerService',
						{
							"openId": _this.$store.state.user.openId,
							"customerCode": _this.$store.state.user.userCode
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
									_this.fetchData();
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
								_this.payWeixinOrder(orderCode, "", 1)
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
								_this.$vux.confirm.show({
									content: "您已有未消费的该课程订单，是否改签",
									onConfirm () {
										// 改签
										_this.courseChange(lessonCode, e.data.data.commodityCode);
									}
								})
							} else if (e.data.data.state == 2) {
								_this.$vux.confirm.show({
									content: "您有未消费的全款礼包，是否使用礼包",
									onConfirm () {
										// 
										_this.usePackage(lessonCode, e.data.data.orderCode, 1)
									}
								})
							} else if (e.data.data.state == 3) {
								_this.$vux.confirm.show({
									content: "您有未消费的礼包，是否使用礼包",
									onConfirm () {
										_this.usePackage(lessonCode, e.data.data.orderCode, 0)
									}
								})
							}
						} else {
							_this.$vux.alert.show({
								content: e.data.errmsg
							})
						}
					})
			},
			goPage (obj) {
				// lessonType 1 思维商学院 2总裁商业思维 3 企业自动化运转 0其他课程
				if(!this.isLogin()) return false;
				if(obj.balance_count <= 0) return false;
				let _this = this,
						course = this.$store.state.user.course;

				if(obj.btn.type == 'retrain') {
					// 复训
					this.$router.push({name: 'retrain', query: { lessonCode: obj.code, lessonType: obj.lessonType, type: 'retrain' }})
				} else if(obj.btn.type == 3) {
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
	  						_this.goCourseTest(obj.code, {name: 'kefuDetail', query: { serviceCode: _this.kefuInfo.code }});
	  						// _this.$router.push({name: 'kefuDetail', query: { serviceCode: _this.kefuInfo.code }})
	  					}
	  				})
					} else {
	  				_this.goCourseTest(obj.code, {name: obj.btn.link, params: { payType: obj.btn.type }, query: { code: obj.code, type: obj.lessonType }});
						// this.$router.push({name: obj.btn.link, params: { payType: obj.btn.type }, query: { code: obj.code, type: obj.lessonType }})
					}
				} else if(obj.lessonType == 4) {
					// 思维导图
					_this.getCourseRights(obj);
				} else if (obj.lessonType == 2) {
					// 总裁商业思维（可以多个报名）
	  				_this.goCourseTest(obj.code, {name: obj.btn.link, params: { payType: obj.btn.type }, query: { code: obj.code, type: obj.lessonType }});
					// this.$router.push({name: obj.btn.link, params: { payType: obj.btn.type }, query: { code: obj.code, type: obj.lessonType }})
				} else if (obj.btn.link) {
	  				_this.goCourseTest(obj.code, {name: obj.btn.link, params: { payType: obj.btn.type }, query: { code: obj.code, type: obj.lessonType }});
					// this.$router.push({name: obj.btn.link, params: { payType: obj.btn.type }, query: { code: obj.code, type: obj.lessonType }})
				}
			},
			getCourseRights (obj) {
				let _this = this;
				_this.$http.post('/wechat/course/querySingLessonStates',
					{
						userCode: _this.$store.state.user.userCode,
						lessonCode: obj.code
					}).then(function(e) {
						if(e.data.errcode == 1){
							if(e.data.data.state > 0) {
								_this.$router.push({name: 'retrain', query: { lessonCode: obj.code, lessonType: obj.lessonType, type: 'siweidaotu' }})
								return
							}
						} 
						_this.$vux.confirm.show({
							content: "您没有该权限，请联系服务经理升级",
							onConfirm () {
								_this.$router.push({name: 'kefuDetail', query: { serviceCode: _this.kefuInfo.code }});
							}
						})
					})
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
		height: 26px;
		padding: 0 .6em;
		line-height: 26px;
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
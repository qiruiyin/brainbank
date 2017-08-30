<!-- 
	问卷调查
 -->

<template>
	<div class="questionnaire" v-cloak>
		<div class="dn-tips dn-tips-no-margin icon icon-service">为了您有更大的收获，让我们提供更加专业的服务，请填写以下调查问卷，谢谢！</div>

    <div v-if="customerList.length > 0" v-for="(item, index) in customerList" class="el-selector icon icon-tel">
      <selector :title="item.showName" :options="item.data" v-model="item.value" :key="index"></selector>	    	
    </div>

		<div class="question" v-for="(item, index) in list" :key="index">
			<div class="question-num">{{ index+1 }}</div>
			<div class="question-title">{{ item.title }}</div>
			<group>
				<x-textarea :max="100" :rows="2" placeholder="请输入答案" v-model="item.value"></x-textarea>
			</group>
		</div>

		<div class="btns">
			<x-button class="btn" type="primary" @click.native="btnSubmit">提交</x-button>
			<x-button class="btn" @click.native="btnCancel">跳过</x-button>
		</div>
	</div>
</template>

<script type="text/babel">
  import { mapState } from 'vuex'
	import { XTextarea, Selector, Group, XInput, XButton } from 'vux'

	export default {
		components: {
			XTextarea, Group, XInput, XButton, Selector
		},
		data () {
			return {
				title: "问卷调查",
				btnSubmitStatus: true,
				userInfo: this.$store.state.user,
				list: [
					// {
					// 	title: "",
					// 	value: "",
					// 	code: ""
					// }
				],
				customerList: [
					// {
					// 	showName: item.showName,
					// 	name: item.name,
					//  value: "",
					// 	data: item.data
					// }
				]
			}
		},
    computed: {
      ...mapState({
        loadbar: state => state.loadbar,
      })
    },
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this,
						code = _this.$route.query.productCode;
				
	  		_this.$http.post('/wechat/lessonQuestionMobile/queryQuestionByType',{
	  			"productCode": code,
	  			"userCode": _this.$store.state.user.userCode
	  			}).then(function(e) {
						let responseData = e.data;
						if(responseData.errcode == 1){
							if(responseData.data.list && responseData.data.list.length > 0) {
								_this.list = responseData.data.list.map(function(item, index){
									return {
										title: item.title,
										value: "",
										code: item.code
									}
								});
							}

							if(responseData.data.customerList && responseData.data.customerList.length > 0) {
								_this.customerList = responseData.data.customerList.map(function(item, index){
									return {
										showName: item.showName,
										name: item.name,
										value: item.data[0].key,
										data: item.data
									}
								});
							}

							if(responseData.data.list.length == 0 && responseData.data.customerList.length == 0) {
								_this.$router.push({name: 'orderDone', query: { groupCode: _this.$route.query.groupCode, orderCode: _this.$route.query.orderCode }})
							}
						} else {
							_this.$vux.alert.show({
								content: e.data.errmsg
							})
						}
	  		});
			},
			btnSubmit () {
				if(!this.btnSubmitStatus) return false;

				this.btnSubmitStatus = false;

				let _this = this,
						questionCode = "",
						questionAnswer = "",
						cuName = "",
						cuAnswer = "";

				if(_this.list.length > 0) {
					_this.list.map(function(item, index){
						if(index != 0) {
							questionCode += ",";
							if(!item.value) questionAnswer += " ";
							questionAnswer += "CC309AB4-89E6-44D2-9A7C-A8F33F40F3BB";
						}
						questionCode += item.code;
						questionAnswer += item.value;
					});
				}

				if (_this.customerList.length > 0) {
					_this.customerList.map(function(item, index){
						if(index != 0) {
							cuName += ",";
							if(!item.value) cuAnswer += " ";
							cuAnswer += ",";
						}
						cuName += item.name;
						cuAnswer += item.value;
					});
				}

				_this.$store.commit('updateLoadingStatus', {isLoading: true});
	  		_this.$http.post('/wechat/lessonQuestionMobile/saveQuestion',{
	  				code: _this.$store.state.user.userCode,
	  				questionCode: questionCode,
	  				questionAnswer: questionAnswer,
	  				cuName: cuName,
	  				cuAnswer: cuAnswer
	  			}).then(function(e) {
						let responseData = e.data;
						if(e.data.errcode == 1) {
							_this.$router.push({name: "orderDone", query: { groupCode: _this.$route.query.groupCode, orderCode: _this.$route.query.orderCode }})
						} else {
							_this.$vux.alert.show({
								content: e.data.errmsg
							})
						}
						_this.$store.commit('updateLoadingStatus', {isLoading: false});
	  		});
			},
			btnCancel () {
				let _this = this;

				_this.$router.push({name: "orderDone", query: { groupCode: _this.$route.query.groupCode, orderCode: _this.$route.query.orderCode }})
			}
		}
	}
</script>

<style lang="scss">
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	@import '~assets/css/icon';
  
	.question {
		.weui-cells {
			margin-top: 0;
			background-color: $colorBgGray;
			border-radius: $borderRadius;

			&:after {
  			border-bottom: 0;
			}
		}

		.weui-cell {
			background-color: #cfd9e2;
		}

		.weui-textarea {
			background-color: #cfd9e2;
		}
	}
</style>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
  
  $questionLeft: $tipsLeft;
	$questionnaireBtnH: 60px;
	$questionNumW: 20px;
	$questionTitleH: 36px;

  .questionnaire {
  	position: absolute;
  	top: 0;
  	left: 0;
  	width: 100%;
  	height: 100%;
  	padding: 0 $padding;
  	padding-bottom: $questionnaireBtnH + 20px;
  	background: #fff;
  	overflow: scroll;
  }

  .question {
  	position: relative;
  	padding-left: $questionLeft;

  	.question-num {
  		position: absolute;
  		top: ($questionTitleH - $questionNumW)/2;
  		left: $tipsPadding;
			width: $questionNumW;
			height: $questionNumW;
			line-height: $questionNumW - 1px;
			text-align: center;
			border: 1px solid $fontColorBlack;
			border-radius: $questionNumW;
  	}

  	.question-title {
  		font-size: 18px;
  		line-height: $questionTitleH;
  	}
  }

  .btns {
  	margin-top: 20px;
		text-align: center;

  	.btn {
  		width: 40%;
  		margin: 0 auto;
  		margin-left: 10px;
  		display: inline-block;

  		&:first-child {
  			margin-left: 0;
  			margin-right: 10px;
  		}
  	}
  }
  // .btns {
  //   position: fixed;
  //   bottom: 0;
  //   left: 0;
  //   height: $questionnaireBtnH;
  //   width: 100%;
  //   background: rgba(0, 0, 0, .1);
  //   display: flex;

  //   .btn {
  //   	flex: 1;
		// 	margin: 0 $padding/2;

  //   	&:first-child {
  //   		margin-left: 0;
  //   	}

  //   	&:last-child {
  //   		margin-right: 0;
  //   	}
  //   }
  // }
</style>
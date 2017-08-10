<!-- 
	问卷调查
 -->

<template>
	<div class="questionnaire">
		<div class="dn-tips dn-tips-no-margin icon icon-service">为了您有更大的收获，让我们提供更加专业的服务，请填写以下调查问卷，谢谢！</div>

		<div class="question" v-for="(item, index) in list" :key="index">
			<div class="question-num">{{ index }}</div>
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
	import { XTextarea, Group, XInput, XButton } from 'vux'

	export default {
		components: {
			XTextarea, Group, XInput, XButton
		},
		data () {
			return {
				title: "问卷调查",
				btnSubmitStatus: true,
				userInfo: this.$store.state.user,
				list: [
					{
						title: "",
						value: "",
						code: ""
					}
				]
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this,
						code = _this.$route.query.code;
				
	  		_this.$http.post('/wechat/lessonQuestionMobile/queryQuestionByType',{
	  			"productCode": code
	  			}).then(function(e) {
						let responseData = e.data;
						if(responseData.errcode == 1){
							if(responseData.data.list.length > 0) {
								_this.list = responseData.data.list.map(function(item, index){
									return {
										title: item.title,
										value: "",
										code: item.code
									}
								});
							} else {
								_this.$router.push({name: 'orderDone', query: { groupCode: _this.$route.query.code, orderCode: _this.$route.query.orderCode }})
							}
						}
	  		});
			},
			btnSubmit () {
				if(!this.btnSubmitStatus) return false;

				this.btnSubmitStatus = false;

				let _this = this,
						questionCode = "",
						questionAnswer = "";
				_this.list.map(function(item, index){
					if(index != 0) {
						questionCode += ",";
						if(!item.value) questionAnswer += " ";
						questionAnswer += "CC309AB4-89E6-44D2-9A7C-A8F33F40F3BB";
					}
					questionCode += item.code;
					questionAnswer += item.value;
				});

	  		_this.$http.post('/wechat/lessonQuestionMobile/saveQuestion',{
	  				code: _this.$store.state.user.userCode,
	  				questionCode: questionCode,
	  				questionAnswer: questionAnswer
	  			}).then(function(e) {
						let responseData = e.data;
						_this.btnSubmitStatus = true;
						if(responseData.errcode == 1) {
							_this.$vux.alert.show({
								content: "提交成功",
								onHide () {
									_this.$router.push({name: "orderDone", query: { groupCode: _this.$route.query.groupCode, orderCode: _this.$route.query.orderCode }})
								}
							})
						} else {
							_this.$vux.alert.show({
								content: responseData.errmsg
							})
						}
	  		});
			},
			btnCancel () {
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
    position: fixed;
    bottom: 0;
    left: 0;
    height: $questionnaireBtnH;
    width: 100%;
    background: rgba(0, 0, 0, .1);
    display: flex;

    .btn {
    	flex: 1;
			margin: 0 $padding/2;

    	&:first-child {
    		margin-left: 0;
    	}

    	&:last-child {
    		margin-right: 0;
    	}
    }
  }
</style>
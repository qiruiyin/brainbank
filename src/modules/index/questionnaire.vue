<!-- 
	问卷调查
 -->

<template>
	<div class="questionnaire">
		{{ userInfo }}
		<group :title="item.title" v-for="(item, index) in list" :key="index">
			<x-textarea :max="200" placeholder="请输入答案" v-model="item.value"></x-textarea>
		</group>

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
						level = _this.$store.state.user.level.toString();
				
	  		_this.$http.post('/wechat/lessonQuestionMobile/queryQuestionByType',{
	  			"type": level
	  			}).then(function(e) {
						let responseData = e.data;
						if(e.data.errcode == 1){
							_this.list = responseData.data.list.map(function(item, index){
								return {
									title: ++index + "、" + item.title,
									value: "",
									code: item.code
								}
							});	
						}
	  		});
			},
			btnSubmit () {
				let _this = this,
						questionCode = "",
						questionAnswer = "";
				_this.list.map(function(item, index){
					if(index != 0) {
						questionCode += ",";
						questionAnswer += ",";
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
						if(responseData.errcode == 1) {
							_this.$vux.alert.show({
								content: "提交成功",
								onHide () {
									_this.$router.push({name: "index"})
								}
							})
						}
	  		});
			},
			btnCancel () {
				this.$router.push({ name: "index" });
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
  
	$questionnaireBtnH: 60px;

  .questionnaire {
  	position: absolute;
  	top: 0;
  	left: 0;
  	width: 100%;
  	height: 100%;
  	padding-bottom: $questionnaireBtnH + 20px;
  	background: $bgGray;
  	overflow: scroll;
  }

  .btns {
    position: fixed;
    bottom: 0;
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
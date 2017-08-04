<!-- 
	支付成功
 -->

<template>
	<div class="order-done">
		<div class="btns">
			<x-button type="primary" @click.native="goPage('index')">完成</x-button>
			<x-button v-if="isCourse" type="primary" @click.native="goPage('questionnaire')">问卷调查</x-button>
		</div>
	</div>
</template>

<script type="text/babel">
	import { XButton } from 'vux'

	export default {
		name: "orderDone",
		components: {
			XButton
		},
		data () {
			return {
				title: "订单完成页面",
				isCourse: this.$route.query.type == 1
			}
		},
		mounted () {
			if(this.isCourse) {
				this.fetchData();
			}
		},
		methods: {
			fetchData () {
				let _this = this;
				_this.$http.post('/wechat/discover/userinfo/get',
            {
              "userCode": _this.$store.state.user.userCode,
              "openId": _this.$store.state.user.openId
            }
          ).then(function(e) {
            let responseData = e.data.data,
                headerUrl;

            headerUrl = _this.resolveImg(responseData.headerUrl) ;

            _this.$store.commit('updateUserImg', {img: headerUrl});
            _this.$store.commit('updateUserName', {name: responseData.name ? responseData.name : '普通学员'})

            if(responseData.userLevelMap) {
              _this.$store.commit('updateUserLevel', {level: responseData.userLevelMap.categoryLevel });
              _this.$store.commit('updateUserBtns', {btns: _this.wordBook.headerBtns['level' + responseData.userLevelMap.categoryLevel].btns})
              _this.$store.commit('updateUserCourse', {course: responseData.userLevelMap.categoryName})
            } else {
              _this.$store.commit('updateUserBtns', {btns: _this.wordBook.headerBtns.level1.btns})
              _this.$store.commit('updateUserCourse', {course: _this.wordBook.headerBtns.level1.course})
              _this.$store.commit('updateUserLevel', {level: 1 });
            }
          });
			},
			goPage (url) {
				this.$router.push({name: url});
			}
		}
	}
</script>	

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

</style>
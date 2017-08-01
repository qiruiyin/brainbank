<!-- 
	头部
 -->
<template>
	<sticky>
		<header id="header">
			<div class="user">
				<img :src="user.img" alt="头像">
				<p>
					{{ user.name }}
					<span>{{ user.course }}</span>
				</p>
			</div>
			<div class="link">
				<div class="btn" @click="goPage(item.link)" v-for="item in user.btns" :key="item.value">{{ item.name }}</div>
			</div>
		</header>
	</sticky>
</template>

<script type="text/babel">
	import { Sticky } from 'vux'
	import { mapState } from 'vuex'
	import imgHeader from 'assets/img/header.png'
	import hold from 'src/commons/hold'

	export default {
		components: {
			Sticky
		},
		data () {
			return {
				img: '',
				name: "",
				course: "",
				btns: [
					// {
					// 	value: 'retrain',
					// 	name: "复训",
					// 	link: 'retrain'
					// },{
					// 	value: 'upgrade',
					// 	name: "升级",
					// 	link: 'upgrade'
					// }
				]
			}
		},
	  computed: {
	    ...mapState({
	      user: state => state.user
	    })
	  },
		mounted () {
			let userCode = this.$store.state.user.userCode || hold.storage.get("userCode");

			if(userCode) {
				this.fetchData(hold.storage.get("openId"), userCode);
			} else {
				this.getUserCode();
			}
		},
		methods: {
			getUserCode () {
				let _this = this,
						storageOpenId = hold.storage.get("openId"),
						storeOpenId = _this.$store.state.user.openId,
				 		openId = storageOpenId || storeOpenId;

				_this.$http.post('/wechat/discover/usercode/get',
		  			{
		  				"openId": openId
		  			}
		  		).then(function(e) {
		  			_this.fetchData(openId, e.data.data.userCode);
		  	});
			},
			fetchData (openId, code) {
				let _this = this;

  			hold.storage.set("openId", openId);
				hold.storage.set("userCode", code);
				_this.$store.commit("updateUserUserCode", { userCode: code });
				_this.$store.commit("updateUserOpenId", { openId: openId });

				if(code) {
  				_this.$store.commit('updateUserBangdingStatus', {bangdingStatus: true});
				}

				_this.$http.post('/wechat/discover/userinfo/get',
		  			{
		  				"userCode": code,
		  				"openId": openId
		  			}
		  		).then(function(e) {
		  			let responseData = e.data.data,
		  					headerUrl;

	  				headerUrl = _this.resolveImg(responseData.headerUrl) ;

		  			_this.$store.commit('updateUserImg', {img: headerUrl});
		  			_this.$store.commit('updateUserName', {name: responseData.name ? responseData.name : '游客'})

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
			goPage (link) {
				let _this = this;

				if(!_this.$store.state.user.userCode) {
					_this.$router.push({name: 'bangding'})
				} else if (link == "enlist") {
					_this.$router.push({ name: 'courseOrder', params: { payType: 'enlist' }})
				} else if (link == "retrain") {
					_this.$router.push({ name: 'intro', params: { introType: "retrain" }})
				} else if (link == "upgrade") {
					_this.$router.push({ name: 'intro', params: { introType: "upgrade" }})
				} else {
					_this.$router.push({ name: 'courseOrder', params: { payType: 'retrain' } })
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	$paddingTop: $padding;
	$headerContentH: $headerH - $paddingTop*2;
	$headerLinkH: 30px;
	$paddingLeft: $padding/2;
	
	.vux-sticky-box {
		& + div {
			padding-top: $headerH;
		}
	}

	#header {
		@include halfpxline(0, $borderColor, 0 , 0, 1px, 0);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: $headerH;
		padding: $paddingTop $padding;
		background-color: #fff;
		z-index: 10;

		.user {
			float: left;
			@extend %clearfix;
			line-height: $headerContentH;
			
			p {
				float: left;
				height: 16px;
				margin-left: $padding/2;
			}

			span {
				margin-left: $paddingLeft;
				padding-left: $paddingLeft;
				@include halfpxline(0, $borderColor, 0 , 0, 0, 1px);
			}

			img {
				float: left;
				width: $headerContentH;
				border-radius: $headerContentH;
			}
		}

		.link {
			float: right;
			margin-top: ($headerContentH - $headerLinkH)/2;
			line-height: $headerLinkH;

			.btn {
				float: left;
				padding: 0 .5em;
				margin-left: $paddingLeft;
				font-size: 12px;
				@include halfpxline($borderRadius, $borderColor, 1px, 1px, 1px, 1px);
				display: block;

				&:first-child {
					margin-left: 0;
				}
			}
		}
	}
</style>
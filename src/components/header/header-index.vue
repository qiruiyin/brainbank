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
				<router-link v-for="item in user.btns" :to="{ name: item.link }" :key="item.value">{{ item.name }}</router-link>	
			</div>
		</header>
	</sticky>
</template>

<script type="text/babel">
	import { Sticky } from 'vux'
	import { mapState } from 'vuex'
	import imgHeader from 'assets/img/header.png'

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
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;
	  		_this.$http.post('/wechat/discover/userinfo/get',
		  			{
		  				"userCode": "201705300052529835144771844797952",
		  				"openId": "201705300052529835144771844797952"
		  			}
		  		).then(function(e) {
		  			let responseData = e.data.data;
		  			_this.$store.commit('updateUserImg', {img: responseData.headerUrl ? _this.resolveImg(responseData.headerUrl) : imgHeader})
		  			_this.$store.commit('updateUserName', {name: responseData.name ? responseData.name : '游客'})

		  			if(responseData.userLevelMap) {
		  				if( responseData.userLevelMap.categoryLevel == 1 ) {
		  					_this.$store.commit('updateUserBtns', {btns: _this.wordBook.headerBtns[1].btns})
			  			} else if ( responseData.userLevelMap.categoryLevel == 2 ) {
		  					_this.$store.commit('updateUserBtns', {btns: _this.wordBook.headerBtns[2].btns})
			  			} else if ( responseData.userLevelMap.categoryLevel > 2 ) {
		  					_this.$store.commit('updateUserBtns', {btns: _this.wordBook.headerBtns[3].btns})
			  			}
		  				_this.$store.commit('updateUserCourse', {course: responseData.userLevelMap.categoryName})
		  			} else {
	  					_this.$store.commit('updateUserBtns', {btns: _this.wordBook.headerBtns[0].btns})
		  				_this.$store.commit('updateUserCourse', {course: _this.wordBook.headerBtns[0].course})
		  			}
	  		});
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

			& > a {
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
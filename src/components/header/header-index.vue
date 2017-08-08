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
				<div class="btn" @click="goPage(btns.link)">{{ btns.name }}</div>
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
				btns: {
					value: 'enlist',
					name: "我要报名",
					link: 'course'
				}
			}
		},
	  computed: {
	    ...mapState({
	      user: state => state.user
	    })
	  },
		methods: {
			goPage (link) {
				let _this = this;
				if(!this.isLogin()) return false;

				this.$router.push({ name: link, query: { type: 1 }});
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
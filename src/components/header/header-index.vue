<!-- 
	头部
 -->
<template>
	<sticky >
		<header id="header" v-cloak>
			<div class="user">
				<img :src="user.img" alt="头像">
				<p>
					{{ user.name }}
					<span>{{ user.course }}</span>
				</p>
			</div>
			<div class="link">
				<div class="link-btn" @click="goPage(btns.link)">{{ btns.name }}</div>
			</div>
		</header>
	</sticky>
</template>

<script type="text/babel">
	import { Sticky } from 'vux'
	import { mapState } from 'vuex'
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
    mounted () {
      let userCode = this.$store.state.user.userCode || hold.storage.get("userCode"),
          storageOpenId = hold.storage.get("openId"),
          storeOpenId = this.$store.state.user.openId,
          openId = storageOpenId || storeOpenId;

      if(userCode && userCode != 'undefined' && userCode != '') {
        this.getUserInfo(openId, userCode);
      } else if(openId && openId != 'undefined' && openId != '') {
        this.getUserCode(openId);
      }
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
	
	.vux-sticky-box {
		& + div {
			padding-top: $headerH;
		}
	}

	#header {
		@include halfpxline(0, $borderColor, 0 , 0, 1px, 0);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: $headerH;
		padding: $headerPaddingTop $padding;
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
				margin-left: $headerPaddingLeft;
				padding-left: $headerPaddingLeft;
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

			.link-btn {
				float: left;
				padding: 0 1em;
				margin-left: $headerPaddingLeft;
				font-size: 12px;
				background-color: $colorOrange;
				color: #fff;
				border-radius: 2em;
				display: block;

				&:first-child {
					margin-left: 0;
				}
			}
		}
	}
</style>
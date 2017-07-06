<!-- 
	头部
 -->
<template>
	<header id="header">
		<div class="user">
			<img :src="img" alt="头像">
			<p>
				{{ name }}
				<span>{{ course }}</span>
			</p>
		</div>
		<div class="link">
			<router-link v-for="item in actions" :to="{ name: item.link }" :key="item.value">{{ item.name }}</router-link>	
		</div>
	</header>
</template>

<script type="text/babel">
	import imgHeader from 'assets/img/header.png'

	export default {
		data () {
			return {
				img: imgHeader,
				name: "梁熙颖",
				course: "商业思维",
				actions: [
					{
						value: 'retrain',
						name: "复训",
						link: 'retrain'
					},{
						value: 'upgrade',
						name: "升级",
						link: 'upgrade'
					}
				]
			}
		}
	}
</script>

<style lang="scss">
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	$paddingTop: $padding;
	$headerH: 60px;
	$headerContentH: $headerH - $paddingTop*2;
	$headerLinkH: 30px;

	#header {
		@include halfpxline(0, $borderColor, 0 , 0, 1px, 0);
		position: absolute;
		left: 0;
		right: 0;
		height: $headerH;
		padding: $paddingTop $padding;
		background-color: #fff;
		z-index: 10;

		& + div {
			padding-top: $headerH;
		}

		.user {
			float: left;
			@extend %clearfix;
			line-height: $headerContentH;
			
			p {
				float: left;
				height: 16px;
				margin-left: $padding;
			}

			span {
				margin-left: .5em;
				padding-left: .5em;
				@include halfpxline(0, $borderColor, 0 , 0, 0, 1px);
			}

			img {
				float: left;
				width: $headerContentH;
				border-radius: $headerContentH/2;
			}
		}

		.link {
			float: right;
			margin-top: ($headerContentH - $headerLinkH)/2;
			line-height: $headerLinkH;

			& > a {
				float: left;
				padding: 0 1em;
				margin-left: 10px;
				@include halfpxline($borderRadius, $borderColor, 1px, 1px, 1px, 1px);
				display: block;

				&:first-child {
					margin-left: 0;
				}
			}
		}
	}
</style>
<!-- 
	首页推荐
 -->

<template>
	<div class="tuijian">
		<div class="tuijian-left">

			<div v-for="item in tuijianData">
				<div v-if="item.file_url"  @click="goPage('courseTypeDetail', { type: 'audio', id: item.code})" >{{ item.name }}</div>
				<div v-else @click="goPage('quotation')" >{{ item.name }}</div>
			</div>
		</div>

		<div class="tuijian-right">
			<slot></slot>
		</div>
	</div>
</template>

<script type="text/babel">
	// import imgHeader from 'assets/img/index/header.png'

	export default {
		props: ['tuijianData', 'tuijianLink'],
		data () {
			return {
				// img: imgHeader,
				// list: [
				// 	{
				// 		value: '',
				// 		name: '狼群（全新修订全本珍藏版 上）',
				// 		url: ''
				// 	},{
				// 		value: '',
				// 		name: '狼群（全新修订全本珍藏版 上）',
				// 		url: ''
				// 	},{
				// 		value: '',
				// 		name: '狼群（全新修订全本珍藏版 上）',
				// 		url: ''
				// 	}
				// ]
			}
		},
		methods: {
			goPage (url, params) {
				if(params) {
		  		this.$router.push({ name: url, params: params})
				} else {
		  		this.$router.push({ name: url })
				}
			}
		}	
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.tuijian {
		padding: $padding;
		@include halfpxline(0, $borderColor, 0 , 0, 1px, 0);
		display: flex;
	}
	
	.tuijian-left {
		flex: 1;
		line-height: 2;

		& > div {
			position: relative;
			padding-left: 20px;

			&:before {
				content: "";
				position: absolute;
				top: 50%;
				left: 0;
				width: 0;
    		height: 0;
    		margin-top: -5px;
    		border-bottom: 10px solid $borderColor;
    		border-left: 10px solid transparent;
    		transform: rotate(-45deg);
			}
		}
	}

	.tuijian-right {
		width: $tuijianImgW;
		text-align: center;
		line-height: 30px;

		img {
			width: $tuijianImgW;
			height: $tuijianImgW;
		}
	}

</style>
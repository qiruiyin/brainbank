<!-- 
	首页
 -->

<template>
	<div class="index">
		<el-header-index></el-header-index>
		
		<div class="container">
			<div class="banner">
	    	<swiper auto :list="bannerDatas" :aspect-ratio="768/1366"></swiper>
			</div>
			
			<div class="entry">
				<div v-for="item in entryDatas" :key="item.value" :class="['entry-' + item.value]" @click="entry(item.url, item.type)">
					<p>{{ item.name }}</p>
				</div>
			</div>

			<div class="entry entry-videos">
				<div v-for="item in entryVideosDatas" :class="['entry', 'entry-' + item.value]" @click="videoAudioDetail(item.url, item.id)">
					<p>{{ item.name }}</p>
				</div>
			</div>

			<div class="tuijian">
				<el-tuijian :tuijian-data="tuijianAudioDatas.list">
					<div class="play">
						<div :class="['play-img', {'active': playStatus}]" @click="play"></div>
						<p>{{ tuijianAudioDatas.num }}</p>
					</div>
				</el-tuijian>
			</div>

			<div class="tuijian">
				<el-tuijian :tuijian-data="tuijianQuotationDatas.list">
					<div>
						<img :src="tuijianQuotationDatas.img" alt="">
						<p>苏引华</p>	
					</div>
				</el-tuijian>
			</div>

			<div class="video-course">
				<card :header="{title:'视频教程'}">
					<div slot="content">
						<el-img-text v-for="(item, index) in tuijianVideoDatas" :img-text-data="item" :key="index"></el-img-text>
					</div>
				</card>
			</div>

			<div class="banner">
	    	<swiper auto :list="adDatas" :aspect-ratio="109/495"></swiper>
			</div>

			<div class="course-others">
				<router-link v-for="item in courseOthers" :to="{ name: item.url }" :key="item.value">
					<img :src="item.img" alt="">
				</router-link>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Group, Cell, Swiper, Card, Panel } from 'vux'
	
	import elHeaderIndex from 'components/header/header-index'
	import elTuijian from 'components/tuijian/tuijian'
	import elImgText from 'components/img-text/img-text'
	
	import { getterIndex } from 'services/index';

	export default {
		name: 'index',
		components: { Group, Cell, Swiper, Card, Panel, elHeaderIndex, elTuijian, elImgText },
	  data () {
	    return {
	      bannerDatas: [],
	      adDatas: getterIndex.adDatas,
	      entryDatas: getterIndex.entryDatas,
	      entryVideosDatas: getterIndex.entryVideosDatas,
	      tuijianAudioDatas: getterIndex.tuijianAudioDatas,
	      tuijianVideoDatas: getterIndex.tuijianVideoDatas,
	      tuijianQuotationDatas: getterIndex.tuijianQuotationDatas,
	      courseOthers: getterIndex.courseOthers,
	      playStatus: false
	    }
	  },
	  mounted: function () {
	  // 	let _this = this;
	  // 	this.$http.post('/discover/index',{"userCode":"201705300052529835144771844797952"}).then(function(e) {
	  // 		let banner = [],
	  // 				bannerTop = e.data.bannerTop,
	  // 				url = 'http://192.168.1.150:81/';
	  // 		for(let i = 0; i < bannerTop.length; i++) {
	  // 			banner[i] = {
	  // 				img: url + bannerTop[i].adCode.replace(/\\/g, '/'),
	  // 				url: 'banner/1'
	  // 			}
	  // 		}

	  // 		bannerTop.map()
			// 	_this.bannerDatas = banner;
			// })	
	  },
	  methods: {
	  	entry (url, type) {
	  		this.$router.push({ name: url, params: { type: type }})
	  	},
	  	videoAudioDetail (url, id) {
	  		this.$router.push({ name: url, params: { id: id }})
	  	},
	  	play () {
	  		this.playStatus = !this.playStatus;
	  	}
	  }
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	@import '~assets/css/entry';
	
	.play {
		width: $tuijianImgW;
    overflow: hidden;
		
		.play-img {
			width: $tuijianImgW;
			height: $tuijianImgW;
			background: url("~assets/img/index/play.png") no-repeat;
			background-size: 100% auto;

			&.active {
				background-image: url("~assets/img/index/pause.png");
				animation: rotate 1s linear infinite;
			}
		}

		p {
			position: relative;
			width: 100%;

			&:before {
				content: "";
				position: absolute;
				top: $tuijianImgW;
				left: 0;
				width: 100%;
			}
		}
	}

	@keyframes rotate {
		0 {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.ad {
		margin: 0 auto;
	}

	.course-others {
		@extend %clearfix;
		padding: $padding;
		// display: flex;

		a {
			float: left;
			width: 50%;
			display: block;

			&:nth-child(odd) {
				padding-right: 5px;
			}

			&:nth-child(even) {
				padding-left: 5px;
			}
		}

		img {
			width: 100%;
		}
	}
</style>
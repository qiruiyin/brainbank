<!-- 
	首页
 -->

<template>
	<div class="index">
		<el-header-index></el-header-index>
		
		<div class="container">
			<div class="banner">
	    	<swiper auto dots-position="center" :list="bannerTopDatas" :aspect-ratio="600/1500"></swiper>
			</div>
			
			<div class="entry">
				<div v-for="item in entryDatas" :key="item.value" :class="['entry-' + item.value]" @click="entry(item.url, item.type)">
					<p>{{ item.name }}</p>
				</div>
			</div>

			<div class="entry-videos">
				<!-- <div v-for="item in entryVideosDatas" @click="videoAudioDetail(item.url, item.id)"> -->
				<div v-for="item in entryVideosDatas">
					<img :src="item.img" alt="">
					<p>{{ item.name }}</p>
				</div>
			</div>

			<div class="tuijian">
				<el-tuijian tuijian-link="audio" :tuijian-data="tuijianAudioDatas.list">
					<div class="play">
						<div class="play-prev" @click="play('prev')"></div>
						<div :class="['play-img', {'active': playStatus}]" @click="play('start')"></div>
						<div class="play-next" @click="play('next')"></div>
						<p>{{ tuijianAudioDatas.num }}</p>
					</div>
				</el-tuijian>
			</div>

			<div class="tuijian">
				<el-tuijian tuijian-link="quotation" :tuijian-data="tuijianQuotationDatas.list">
					<div>
						<img :src="tuijianQuotationDatas.img" alt="">
						<p>{{ tuijianQuotationDatas.name }}</p>	
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
	    	<swiper auto dots-position="center" :list="bannerBottom1Datas" :aspect-ratio="250/500"></swiper>
			</div>

			<div class="course-others">
				<router-link v-for="(item, index) in bannerBottom2Datas" :to="{ name: item.link }" :key="index">
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
	import imgTuijianHeader from 'assets/img/index/header.png'

	export default {
		name: 'index',
		components: { Group, Cell, Swiper, Card, Panel, elHeaderIndex, elTuijian, elImgText },
	  data () {
	    return {
	      bannerTopDatas: [],
	      bannerBottom1Datas: [],
	      bannerBottom2Datas: [],
	      entryDatas: getterIndex.entryDatas,
	      entryVideosDatas: [],
	      tuijianAudioDatas: {
	      	num: 0,
	      	list: []
	      },
	      tuijianVideoDatas: [],
	      tuijianQuotationDatas: {
	      	name: '苏引华',
	      	img: imgTuijianHeader,
	      	list: []
	      },
	      // courseOthers: getterIndex.courseOthers,
	      playStatus: false
	    }
	  },
	  mounted: function () {
	  
	  	this.fetchData();
	  },
	  methods: {
	  	fetchData	() {
	  		// 获取所有数据
	  		let _this = this;
	  		_this.$http.post('/wechat/discover/index',{}).then(function(e) {
		  		let responseData = e.data.data,
		  				tuijianQuotationDatas = [],
		  				tuijianVideoDatas = [];
		  		// 顶部长banner
		  		_this.resolveField(_this, 'bannerTopDatas', responseData.bannerTop, 'ad_code');
		  		// 底部banner
		  		_this.resolveField(_this, 'bannerBottom1Datas', responseData.bannerBottom1, 'ad_code');
		  		// 底部banner
		  		_this.resolveField(_this, 'bannerBottom2Datas', responseData.bannerBottom2, 'ad_code');
		  		// 视频推荐
		  		_this.resolveField(_this, 'entryVideosDatas', responseData.movies, 'thumbnail');
					// 音频推荐
					_this.tuijianAudioDatas.num = responseData.voicesPlayCount | 13421;
					_this.tuijianAudioDatas.list = responseData.voices;
					// 语录推荐
					responseData.quList.map(function(item, index) {
						tuijianQuotationDatas[index] = {
							name: item.title,
							code: item.code,
							id: ''
						}
					});
					_this.tuijianQuotationDatas.list = tuijianQuotationDatas;
					// 视频教程
					responseData.lessInfo.map((item, index) => {
						tuijianVideoDatas[index] = {
							title: item.name,
							price: item.price,
							// priceUnit: '年',
							// priceCurrency: '￥',
							desc: item.desccription || '介绍',
							label: '主讲', 
							speaker: item.author | '苏引华',
							subscribe: '234343',
							url: '',
							id: '',
							img: _this.$store.state.common.imgUrl + item['thumbnail'].replace(/\\/g, '/')
						}
					});

					_this.tuijianVideoDatas = tuijianVideoDatas;
				})
	  	},
	  	
	  	entry (url, type) {
	  		this.$router.push({ name: url, params: { type: type }})
	  	},
	  	videoAudioDetail (url, id) {
	  		this.$router.push({ name: url, params: { id: id }})
	  	},
	  	play (status) {
	  		if(status == 'start') {
					this.playStatus = !this.playStatus;
	  		} else if (status == 'prev') {
	  			
	  		} else if (status == 'next') {

	  		}
	  		
	  	},
	  	demoFun (argument) {
	  		argument
	  	}
	  }
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	@import '~assets/css/entry';
	
	$playImgW: 60px;
	$playBtnW: 30px;
	.play {
		position: relative;
		width: $tuijianImgW;
    // overflow: hidden;

		.play-prev, .play-next {
			position: absolute;
			top: ($playImgW - $playBtnW);
			left: 50%;
			width: $playBtnW;
			height: $playBtnW;
			margin-left: - ($playBtnW + 10px);
			background: url("~assets/img/index/play-prev.png") no-repeat;
			background-size: 100%;
			z-index: 2;
		}

		.play-next {
			margin-left: 10px;
			background-image: url("~assets/img/index/play-next.png");
		}
		
		.play-img {
			position: relative;
			width: $playImgW;
			height: $playImgW;
			margin: 0 auto;
			background: url("~assets/img/index/play-start.png") no-repeat;
			background-size: 100% auto;
			z-index: 1;

			&.active {
				background-image: url("~assets/img/index/play.png");
				// animation: rotate 1s linear infinite;
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
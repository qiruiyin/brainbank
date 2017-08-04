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
				<div @click="goPage('courseTypeDetail', { type: 'video', code: item.code})" v-for="(item, index) in entryVideosDatas" :key="index">
					<img :src="item.img" alt="">
					<p>{{ item.name }}</p>
				</div>
			</div>

			<div class="tuijian">
				<el-tuijian :tuijian-status="playAudioInfo.index" tuijian-link="audio" :tuijian-data="tuijianAudioDatas.list">
					<div class="play">
						<div class="play-audio">
							<audio :src="item.src" @ended="audioEnded" controls="controls" preload hidden :class="'play-audio-' + index" class="play-audio-btn" v-for="(item, index) in tuijianAudioDatas.list" :key="index">
							</audio>	
						</div>
						<div :class="['play-img', {'active': playStatus}]" @click="play('start')"></div>
						<p>{{ tuijianAudioDatas.num }}</p>
					</div>
				</el-tuijian>
			</div>

			<div class="tuijian">
				<el-tuijian tuijian-status="-1" tuijian-link="quotation" :tuijian-data="tuijianQuotationDatas.list">
					<div class="tuijian-data">
						<img :src="tuijianQuotationDatas.img" alt="">
						<p>{{ tuijianQuotationDatas.name }}</p>	
					</div>
				</el-tuijian>
			</div>

			<div class="video-course">
				<card :header="{title:'在线学习区'}">
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
	import hold from 'src/commons/hold'
	import { Group, Cell, Swiper, Card, Panel, Popup, XInput, XButton, Toast, TransferDomDirective as TransferDom } from 'vux'
	
	import elHeaderIndex from 'components/header/header-index'
	import elTuijian from 'components/tuijian/tuijian'
	import elImgText from 'components/img-text/img-text'
	

	import { getterIndex } from 'services/index';
	import imgTuijianHeader from 'assets/img/index/header.png'

	export default {
		name: 'index',
		directives: {
	    TransferDom
	  },
		components: { Group, Cell, Swiper, Card, Panel, Popup, XInput, XButton, Toast, elHeaderIndex, elTuijian, elImgText },
	  data () {
	    return {
	    	playAudioInfo: {
	    		index: -1,
	    		current: ''
	    	},
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
	      playStatus: false,
	      bangdingShow: !(hold.storage.get("userCode") || this.$store.state.user.userCode) || this.bangdingShowStatus,
	      bangding: {
	      	name: {
						value: "",
						title: "姓名",
						placeholder: "请输入姓名"
					},
					idCard: {
						value: "",
						title: "身份证号",
						placeholder: "请输入身份证号"
					},
					tel: {
						value: "",
						title: "手机号",
						placeholder: "请输入手机号码"
					},
					code: {
						value: "",
						title: "验证码",
						placeholder: "请输入验证码"
					},
	      }
	    }
	  },
	  mounted () {
	  	this.fetchData();
	  },
	  methods: {
	  	fetchData	() {
	  		// 获取所有数据
	  		let _this = this;
	  		_this.$http.post('/wechat/discover/index',{
	  				"userCode": _this.$store.state.user.userCode
	  			}).then(function(e) {
		  		let responseData = e.data.data,
		  				tuijianQuotationDatas = [],
		  				tuijianVideoDatas = [];
		  		// 顶部长banner
		  		_this.resolveField(_this, 'bannerTopDatas', responseData.bannerTop, 'ad_code', "", 'ad_link');
		  		// 底部banner
		  		_this.resolveField(_this, 'bannerBottom1Datas', responseData.bannerBottom1, 'ad_code', "", 'ad_link');
		  		// 底部banner
		  		_this.resolveField(_this, 'bannerBottom2Datas', responseData.bannerBottom2, 'ad_code', "", 'ad_link');
		  		// 视频推荐
		  		_this.resolveField(_this, 'entryVideosDatas', responseData.movies, 'thumbnail');

					// 音频推荐
					_this.tuijianAudioDatas.num = responseData.voicesPlayCount | 13421;
					_this.tuijianAudioDatas.list = responseData.voices.map(function(item, index){
						return {
							code: item.code,
							src: _this.resolveImg(item.file_url),
							name: item.name
						}
					});
					// 语录推荐
					responseData.quList.map(function(item, index) {
						if(index == 0 && item.img && item.img.length > 0) {
							_this.tuijianQuotationDatas.img = _this.resolveImg(item.img[0]);
						}

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
							desc: item.description || '介绍',
							label: '主讲', 
							speaker: item.author || '苏引华',
							subscribe: item.subCount,
							code: item.code,
							url: '',
							id: '',
							isClick: item.jurisdiction,
							img: _this.resolveImg(item['thumbnail'])
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
	  		if(this.playAudioInfo.index == -1) this.playAudioInfo.index = 0;
	  		if(!this.playStatus) {
	  			this.playAudio();
					// document.querySelector(".play-audio-btn").play();
	  		} else {
	  			this.pauseAudio();
	  			document.querySelector(".play-audio-btn").pause();
	  		}
				this.playStatus = !this.playStatus;
	  	},
	  	playAudio () {
	  		this.playAudioInfo.current = document.querySelector('.play-audio-' + this.playAudioInfo.index).play();
	  	},
	  	pauseAudio () {
	  		this.playAudioInfo.current = document.querySelector('.play-audio-' + this.playAudioInfo.index).pause();
	  	},
	  	audioEnded () {
  			if(this.playAudioInfo.index == 2) {
  				this.playAudioInfo.index = 0;
  			} else {
  				++this.playAudioInfo.index;
  			}
	  		this.playAudio();
	  	},
			goPage (url, params) {
				this.$router.push({ name: url, params: params })
			}
	  }
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	@import '~assets/css/entry';
	@import '~assets/css/form';
	
	$playImgW: 60px;
	$playBtnW: 30px;

	.play {
		position: relative;
		width: $tuijianImgW;
    // overflow: hidden;

    .play-audio {
    	position: absolute;
    	opacity: 0;
    }

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

	.tuijian-data {
		img {
			border-radius: $tuijianImgW
		}
	}
</style>
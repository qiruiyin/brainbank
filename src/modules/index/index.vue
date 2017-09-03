<!-- 
	首页
 -->

<template>
	<div class="index" v-cloak>
		<el-header-index></el-header-index>
		
		<div class="container">
			
			<div class="banner">
	    	<swiper auto dots-position="center" :list="bannerTopDatas" :aspect-ratio="bannerWidthHeight" loop></swiper>
			</div>
			
			<div class="entry">
				<div v-for="item in entryDatas" :key="item.value" :class="['entry-' + item.value]" @click="entry(item.url, item.type)">
					<p>{{ item.name }}</p>
				</div>
			</div>

			<div class="entry-videos uiBorderTop">
				<div v-for="(item, index) in entryVideosDatas" :key="index" @click="goPage('courseTypeDetail', {type: 'video', code: item.code})">
					<img :src="item.img" alt="">
					<p>{{ item.name }}</p>
				</div>
			</div>

			<div class="tuijian uiBorderTop">
				<el-tuijian @play-change="playChange" :tuijian-status="playAudioInfo.index" tuijian-link="audio" :tuijian-data="tuijianAudioDatas.list">
					<div class="play">
						<div class="play-audio">
							<!-- <audio :src="item.src" @ended="audioEnded" controls="controls" preload hidden :class="'play-audio-' + index" class="play-audio-btn" v-for="(item, index) in tuijianAudioDatas.list" :key="index">
							</audio> -->
							<audio @ended="audioEnded" controls="controls" preload="auto" hidden :class="'play-audio-' + index" class="play-audio-btn" v-for="(item, index) in tuijianAudioDatas.list" :key="index">
							  <source :src="item.src" type="audio/mpeg" />
							  <source :src="item.src" type="audio/mp3" />
							  <embed :src="item.src" type="audio/mp3" />
							</audio>
						</div>
						<div :class="['play-img', {'active': playStatus}]" @click="play('start')"></div>
						<p>苏引华</p>
						<!-- <p>{{ tuijianAudioDatas.num }}</p> -->
					</div>
				</el-tuijian>
			</div>

			<div class="card-block uiBorderTop">
				<div class="card-block-header">
					<h5>经典语录</h5>
					<div class="link" @click="goPage('quotation')">查看全部<span class="fa fa-angle-right"></span></div>
				</div>
				<div class="card-block-content">
					<div class="quotation-index">
						<div class="quotation-index-img" :style="{backgroundImage: 'url(' + tuijianQuotationDatas.img + ')'}"></div>
						<p v-html="quotationTransContent(tuijianQuotationDatas.list[0].content)"></p>
					</div>
				</div>
			</div>

			<div class="card-block uiBorderTop">
				<div class="card-block-header">
					<h5>在线学习区</h5>
				</div>
				<div slot="card-block-content">
					<el-img-text v-for="(item, index) in tuijianVideoDatas" :img-text-data="item" :key="index"></el-img-text>
				</div>
			</div>

			<div class="banner">
	    	<swiper auto dots-position="center" :list="bannerBottom1Datas" :aspect-ratio="bannerWidthHeight" loop></swiper>
			</div>
		
			<div class="course-others">
				<a v-for="(item, index) in bannerBottom2Datas" :href="item.url" :key="index">
					<img :src="item.img" alt="">
				</a>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import hold from 'src/commons/hold'
	import { Group, Cell, Swiper, Card, Panel, Popup, XInput, XButton, TransferDom } from 'vux'
	
	import elHeaderIndex from 'components/header/header-index'
	import elTuijian from 'components/tuijian/tuijian'
	import elImgText from 'components/img-text/img-text'
	import elVideo from 'components/video/video'
	

	import { getterIndex } from 'services/index';
	import imgTuijianHeader from 'assets/img/index/header.png'

	export default {
		name: 'index',
		directives: {
	    TransferDom
	  },
		components: { Group, Cell, Swiper, Card, Panel, Popup, XInput, XButton, elHeaderIndex, elTuijian, elImgText, elVideo },
	  data () {
	    return {
	    	playAudioInfo: {
	    		index: -1, // 
	    		current: ''
	    	},
	    	bannerWidthHeight: this.wordBook.bannerWidthHeight,
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
	      	img: '',
	      	list: [{
	      		conetnt: ""
	      	}]
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

	  				if(e.data.errcode == 1) {
	  					let responseData = e.data.data,
				  				tuijianQuotationDatas = [],
				  				tuijianVideoDatas = [],
				  				tuijianAudioDatas = [];
				  		// 顶部长banner
				  		_this.resolveField(_this, 'bannerTopDatas', responseData.bannerTop, 'ad_code', "", 'ad_link');
				  		// 底部banner
				  		_this.resolveField(_this, 'bannerBottom1Datas', responseData.bannerBottom1, 'ad_code', "", 'ad_link');
				  		// 底部banner
				  		_this.resolveField(_this, 'bannerBottom2Datas', responseData.bannerBottom2, 'ad_code', "", 'ad_link');
				  		// 视频推荐
				  		_this.resolveField(_this, 'entryVideosDatas', responseData.movies, 'thumbnail');

							// 音频推荐
							_this.tuijianAudioDatas.num = responseData.voicesPlayCount;
							if(responseData.voices && responseData.voices.length > 0) {
								tuijianAudioDatas = responseData.voices.map(function(item, index){
									return {
										code: item.code,
										src: _this.resolveImg(item.file_url),
										name: item.name
									}
								});	
							}
							_this.tuijianAudioDatas.list = tuijianAudioDatas;

							// 语录推荐
							if(responseData.quList && responseData.quList.length > 0) {
								tuijianQuotationDatas = responseData.quList.map(function(item, index) {
									if(index == 0 && item.img && item.img.length > 0) {
										_this.tuijianQuotationDatas.img = _this.resolveImg(item.img[0]);
									}

									return {
										name: item.title,
										code: item.code,
										id: '',
										content: item.content
									}
								});	
							}
							
							_this.tuijianQuotationDatas.list = tuijianQuotationDatas;
							// 视频教程
							if(responseData.lessInfo.length > 0) {
								tuijianVideoDatas = responseData.lessInfo.map((item, index) => {
									return {
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
										classDay: item.class_day,
										img: _this.resolveImg(item['thumbnail'])
									}
								});
							}
							
							_this.tuijianVideoDatas = tuijianVideoDatas;
	  				} else {
	  					_this.$vux.alert.show({
	  						content: e.data.errmsg
	  					})
	  				}
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
	  	reloadAudio () {
	  		if(this.playAudioInfo.index != -1) {
	  			this.playAudioInfo.current = document.querySelector('.play-audio-' + this.playAudioInfo.index).load();
	  		}
	  	},
	  	playChange (ind) {
  			this.reloadAudio();
	  		this.playStatus = true;
	  		this.playAudioInfo.index = ind;
  			this.playAudio();
	  	},
	  	audioEnded () {
  			if(this.playAudioInfo.index == 2) {
  				this.playAudioInfo.index = 0;
  			} else {
  				++this.playAudioInfo.index;
  			}
	  		this.playAudio();
	  	},
			goPage (url, query) {
				if(query) {
					this.$router.push({ name: url, query: query })
				} else {
					this.$router.push({ name: url})
				}
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
		// width: $tuijianImgW;

    .play-audio {
    	position: absolute;
    	opacity: 0;
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
				// animation: rotate 2s linear infinite;
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

	.card-block {
		.card-block-header {
			position: relative;
			padding: 0 $padding;
			@include halfpxline(0, $borderColor, 0 , 0, 1px, 0);
			line-height: 50px;

			h5 {
				font-size: 16px;
				color: $fontColorBlack;
			}

			.link {
				position: absolute;
				top: 0;
				right: $padding;

				span {
					margin-left: .5em;
				}
			}
		}

		.card-block-content {
			padding: 0 $padding;
		}
	}

	.quotation-index {
		padding: $padding 0;
		display: flex;

		.quotation-index-img {
			width: 102px;
			height: 80px;
			background-size: cover;
		}

		p {
			flex: 1;
			padding-left: 1em;
			line-height: 2;
			@include ellipsisMore(3);
		}
	}
</style>
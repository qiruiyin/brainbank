<!-- 
	音频详情页
 -->
<template>
	<div class="detail" v-cloak>
		<el-header-index></el-header-index>

		<div class="detail-container">
			<el-img-text-rank @on-pay-show="hiddenVideo" class="detail-header" :img-text-data="list" :img-text-btn="list.btn"></el-img-text-rank>
			
			<div class="tab">
	      <tab v-model="tabSelected">
	        <tab-item :selected="tabSelected == index" v-for="(item, index) in tabDatas" @click="tabSelected = index" :key="index">{{ item.title }}</tab-item>
	      </tab>
	      <div class="list">
	      	<div v-show="tabSelected == 0">
	        	<template v-if="courseInfo.type == 'video' || courseInfo.type == 'course'">        		
							<!-- <el-video :video-src="course.fileUrl"></el-video> -->
							<div :class="['video', { 'hidden': !videoHidden }]">							
			          <video @click="playVideo" id="video" :src="course.fileUrl" controls="controls" preload="auto" :poster="course.fileThumb"></video>
							</div>
	        	</template>
	        	<template v-if="courseInfo.type == 'audio'">        		
		          <div class="audio-msg">
		          	<img src="~assets/img/audio.png" alt="">
		          	<audio :src="course.fileUrl" controls="controls" preload hidden class="play-audio"></audio>	
		          	<div @click="playBtnClick" :class="['play-btn', {'active': playBtn.status }]"></div>
		          </div>
	        	</template>
	          <div class="detail-header-msg">
	          	<el-product-ad :product-code="courseInfo.code"></el-product-ad>
							<div class="detail-header-msg-desc">
								<div :class="['audio-detail-desc', {'active': audioDetailDescShow}]">
									<div class="audio-detail-desc-header" @click="toggleContent">更多简介<span class="fa fa-angle-down"></span></div>
									<div class="audio-detail-desc-content">
										<p v-html="courseInfo.desc"></p>
										<div class="audio-detail-desc-footer" @click="toggleContent(false)">收起<span class="fa fa-angle-up"></span></div>
									</div>
								</div>
								<p>讲师备课不易，给Ta点鼓励吧</p>
								<el-reward :reward-data="courseInfo"></el-reward>
							</div>
						</div>
						<el-reward-list :reward-code="courseInfo.code"></el-reward-list>
	      	</div>
	        
	        <div v-show="tabSelected == 1">	        	
						<el-comment :is-comment="hasBuy" :comment-code="courseInfo.code"></el-comment>
	        </div>

	        <div v-show="tabSelected == 2">
	        	<el-img-text-rank v-for="(item, ind) in relateData" :img-text-data="item" :img-text-btn="relateDataBtn" :key="ind"></el-img-text-rank>
	        </div>
	      </div>
	    </div>
		</div>
	</div>
</template>

<script type="text/babel">
	import { XButton, Flexbox, FlexboxItem, Tab, TabItem, Swiper, SwiperItem, Sticky } from 'vux'
	import elHeaderIndex from 'components/header/header-index'
	import elImgTextRank from 'components/img-text/img-text-rank'
	import elComment from 'components/comment/comment'
	import elReward from 'components/reward/reward'
	import elRewardList from 'components/reward/reward-list'
	import elProductAd from 'components/product-ad/product-ad'
	import elVideo from 'components/video/video'

	import imgPoster from 'assets/img/audio.png'

	export default {
		name: 'detail',
		components: { 
			XButton, Flexbox, FlexboxItem, Tab, TabItem, Swiper, SwiperItem, Sticky, 
			elHeaderIndex, elImgTextRank, elComment, elReward, elRewardList, elProductAd, elVideo
		},
		data () {
			return {
				title: '课程详情',
				imgPoster: '',
				hasBuy: false, // 是否购买
				audioDetailDescShow: false, // 是否显示视频简介
				playVisitStatus: false, // 是否点击过
				courseInfo: {
					type: this.$route.query.type,
					code: this.$route.query.code,
					name: "",
					desc: ""
				},
				list: {
					btn: '-1',
					title: '',
					type: '',
					pay: '',
					isBuy: '0',
					img: '',
					like: {
						num: 0,
						percent: 0
					},
					url: '',
					query: {
						code: this.$route.query.code
					}
				},
				tabDatas: [
					{
						value: 'detail',
						title: '详情',
					},{
						value: 'comment',
						title: '评论',
					},{
						value: 'relate',
						title: '相关',
					}
				],
				tabSelected: 0,
				course: {
					src: '',
					course: '',
					courseNum: 0,
					lecturer: '',
					subscribe: 0,
					desc: '',
					fileUrl: '',
					fileThumb: ''
				},
				relateDataBtn: "-1",
				relateData: [
					{
						title: '',
						type: '',
						pay: '',
						isBuy: '0',
						img: '',
						like: {
							num: 0,
							percent: 0
						},
						url: '',
						query: {}
					}
				],
				playBtn: {
					status: false,
					obj: ''
				},
				videoHidden: true // 微信android机器video过高隐藏
			}
		},
		watch: {
	    // 如果路由有变化，会再次执行该方法
	    '$route' () {
	    	this.$router.go(0)
	    }
	  },
		mounted () {
			this.fetchData();
		},
		methods: {
			listenVideo () {
				let _this = this;
				let video = document.querySelector('.video');

				video.addEventListener('timeupdate', function() {
					if(video.currentTime > 30) {
						video.pause();
						alert("请先购买");
						_this.$vux.alert.show({
							content: "请先购买"
						})
					} else {
						video.play();
					}
				});
			},
			fetchData () {
				let _this = this,
						relateData = [],
						url,
						params = {};
				this.visitCount(this.courseInfo.code);

				if(this.courseInfo.type == "course") {
					url = '/wechat/discover/product/lessonDetails';
					params = {
								"userCode": _this.$store.state.user.userCode,
								"productCode": _this.courseInfo.code,
								"type": "video"
							};
				} else {
					url = '/wechat/discover/product/details';
					params = {
								"userCode": _this.$store.state.user.userCode,
								"productCode": _this.courseInfo.code,
							};
				}
				
				this.$http.post(url,
						params
					).then(function(e) {
						let responseData = e.data.data.product;

						if(e.data.errcode == 1) {
							_this.hasBuy = responseData.PRICE == 0 || responseData.isBuy > 0 ? '1' : '0';
							
							if(_this.courseInfo.type == "course") {
								_this.list.btn = '-1';
								_this.relateDataBtn = '-1';
								_this.hasBuy = '1';
							} else {
								_this.list.btn = responseData.PRICE == 0 || responseData.isBuy > 0 ? '-1' : '0';
								_this.relateDataBtn = '0';
							}
							_this.list.title = responseData.name;
							_this.list.pay = responseData.PRICE;
							_this.list.isBuy = responseData.isBuy;
							_this.list.type = responseData.DESCRIPTION;
							_this.list.img = _this.resolveImg(responseData.thumbnail);
							_this.list.like = {
								num: responseData.commentAmount,
								percent: responseData.rank ? responseData.rank : 0,
							};

							_this.course.fileUrl = _this.resolveImg(responseData.file_url);
							_this.course.fileThumb = _this.resolveImg(responseData.file_thumb);
							_this.courseInfo.desc = _this.resolveRichTextImg(responseData.CONTENT);
							_this.courseInfo.name = responseData.name;

							relateData = e.data.data.recommend.map(function(item, index) {
								return {
									img: _this.resolveImg(item.thumbnail),
									id: item.id,
									title: item.name,
									type: item.DESCRIPTION,
									pay: item.PRICE,
									isBuy: _this.courseInfo.type == 'course' ? 1 : item.isBuy,
									like: {
										num: item.commentAmount,
										percent: item.rank
									},
									url: 'courseTypeDetail',
									query: {
										code: item.code,
										type: _this.$route.query.type
									}
								}
							});
							_this.relateData = relateData;
						} else {
							_this.$vux.alert.show({
								content: e.data.errmsg
							})
						}
					}
				);
			},

			playBtnClick () {
				if(!this.playVisitStatus) {
					this.playVisitStatus = true;
					this.playCount(this.$route.query.code);
				}

				if(this.playBtn.status) {
					this.playBtn.obj = document.querySelector(".play-audio").pause();
				} else {
					this.playBtn.obj = document.querySelector(".play-audio").play();
				}
				this.playBtn.status = !this.playBtn.status;
			},
			toggleContent (status) {
				if(!status) {
					this.audioDetailDescShow = false
				} else {
					this.audioDetailDescShow = !this.audioDetailDescShow;
				}
			},
			playVideo () {
				if(!this.playVisitStatus) {
					this.playVisitStatus = true;
					this.playCount(this.$route.query.code);
				}
			},
			hiddenVideo (data) {
				this.videoHidden = !data
			}
		}
	}
</script>

<style lang="scss">
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	.detail {
		.detail-container {
			.text {
				.type {
					@include ellipsisMore(30);
				}
			}
		}
	}
</style>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	.container {
		
	}

	.list {
	}

	.list {
		padding-top: $padding;

		.video, .audio-msg {
			width: 100%;
			height: 200px;
			background: #333;

			video {
				width: 100%;
				height: 100%;
			}

			&.hidden {
				video {
					visibility: hidden;
					display: none;
				}
			}
		}

		.audio-msg {
			position: relative;
			height: auto;

			img {
				width: 100%;
			}
		} 

		.detail-header-msg {
			padding: $padding;
			line-height: 2; 	
		}

		.detail-header-msg-desc {
			padding: $paddingTop 0;
			text-align: center;
		}
	}

	.swiper-desc {
		padding: $padding;
	}

	// 音乐播放
	$playBtnW: 60px;

	.play-btn {
		position: absolute;
		bottom: $padding;
		left: 0;
		right: 0;
		width: $playBtnW;
		height: $playBtnW;
		margin: 0 auto;
		border-radius: $playBtnW;
		background: url("~assets/img/index/play-start.png") no-repeat;
		background-size: 100%;

		&.active {
			// animation: mymove 2s  linear infinite;
			background-image: url("~assets/img/index/play.png");
		}
	}

	@keyframes mymove {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.audio-detail-desc {
		margin-bottom: $paddingTop;
		padding: 0 6px;
	
		&.active {
			.audio-detail-desc-content {
				max-height: 11111400px;
			}
		}

		.fa {
			font-size: 20px;
			text-indent: .5em;
		}

		.audio-detail-desc-header {
			font-size: 18px;
			color: #0163bd;
		}

		.audio-detail-desc-content {
			max-height: 0;
			overflow: hidden;
			transition: 1s;

			p {
				text-align: justify;
				text-indent: 2em;
			}
		}
	}
</style>
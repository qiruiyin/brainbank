<!-- 
	课程详情页
 -->
<template>
	<div class="detail" v-cloak>
		<el-header-index></el-header-index>

		<div class="container">
			<video class="top-video" :src="course.fileUrl" controls="controls" preload="auto" :poster="course.fileThumb"></video>
			
			<div class="tab">
	      <tab v-model="tabSelected">
	        <tab-item :selected="tabSelected == index" v-for="(item, index) in tabDatas" @click="tabSelected = index" :key="index">{{ item.title }}</tab-item>
	      </tab>
	      <div class="list">
	      	<template v-if="tabSelected == 0">
	      		<div class="rich-html" v-html="courseInfo.content"></div>
						
						<div class="btns">
							<x-button type="primary" @click.native="goPage('course', {type: 1})">在线报名</x-button>
	      		</div>
	      	</template>
	        
	        <template v-if="tabSelected == 1">
	        	<el-witness :product-code="witnessData"></el-witness>     	
						<!-- <el-comment :comment-code="commentCode"></el-comment> -->
	        </template>

	        <template v-if="tabSelected == 2">
	        	<el-img-text-rank v-for="(item, ind) in relateData" :img-text-data="item" img-text-btn="-1" :key="ind"></el-img-text-rank>
	        </template>
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
	import elWitness from 'components/witness/witness'

	export default {
		name: 'detail',
		components: { 
			XButton, Flexbox, FlexboxItem, Tab, TabItem, Swiper, SwiperItem, Sticky, 
			elHeaderIndex, elImgTextRank, elComment, elReward, elWitness
		},
		data () {
			return {
				title: '课程详情',
				courseInfo: {
					code: this.$route.query.courseCode,
					content: "",
					name: ""
				},
				list: {
					title: '总裁商业思维',
					type: '游戏',
					img: '',
					like: {
						num: 2234,
						percent: 3.4
					},
					url: '',
					params: {}
				},
				tabDatas: [
					{
						value: 'detail',
						title: '课程详情',
					},{
						value: 'comment',
						title: '客户见证',
					},{
						value: 'relate',
						title: '课程视频',
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
				relateData: [
					{
						title: '',
						type: '',
						pay: '',
						img: '',
						like: '',
						url: '',
						query: {}
					}
				],
				witnessData: this.$route.query.courseCode,
				playBtn: {
					status: false,
					obj: ''
				}
			}
		},
		watch: {
	    // 如果路由有变化，会再次执行该方法
	    '$route': 'fetchData'
	  },
		mounted () {
			this.fetchData();
			this.visitCount(this.$route.query.courseCode);
		},
		methods: {
			fetchData () {
				let _this = this,
						relateData = [];
				this.$http.post('/wechat/discover/product/lessonDetails',
						{
							"userCode": _this.$store.state.user.userCode,
							"productCode": _this.courseInfo.code
						}
					).then(function(e) {
						let responseData = e.data.data.product;
						_this.list.title = responseData.name;
						_this.list.type = responseData.DESCRIPTION;
						_this.list.img = _this.resolveImg(responseData.thumbnail);
						_this.list.like = {
							num: responseData.commentAmount,
							percent: responseData.rank ? responseData.rank : 0,
						};

						_this.course.fileUrl = _this.resolveImg(responseData.file_url);
						_this.course.fileThumb = _this.resolveImg(responseData.file_thumb);
						_this.course.desc = responseData.DESCRIPTION;
						_this.courseInfo.name = responseData.name;
						_this.courseInfo.content = _this.resolveRichTextImg(responseData.CONTENT);

						e.data.data.recommend.map(function(item, index) {
							relateData[index] = {
								img: _this.resolveImg(item.thumbnail),
								id: item.id,
								title: item.name,
								type: item.DESCRIPTION,
								pay: 0,
								isBuy: responseData.isBuy || 0,
								like: '',
								url: 'courseTypeDetail',
								query: {
									type: "course",
									code: item.code
								}
							}
						})
						_this.relateData = relateData;
					}
				);
			},
			playBtnClick () {
				if(this.playBtn.status) {
					this.playBtn.obj = document.querySelector(".play-audio").pause();
				} else {
					this.playBtn.obj = document.querySelector(".play-audio").play();
				}
				this.playBtn.status = !this.playBtn.status;
			},
			goPage(url, query) {
				this.$router.push({name: url, query: query});
			}
		}
	}
</script>

<style lang="scss">
	// .detail .tab .list
</style>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	.container {
		
	}
	
	.top-video {
		width: 100%;
		background: #000;
	}

	.list {
	}

	.list {
		padding-top: $padding;

		video, .audio-msg {
			width: 100%;
			height: 200px;
			background: #333;
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
			padding: 40px;
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
  
</style>
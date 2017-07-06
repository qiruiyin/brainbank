<!-- 
	视频详情页
 -->
<template>
	<div class="video-detail">
		<el-header-index></el-header-index>

		<div class="container">
			<div class="detail-header">
				<video src="movie.ogg" controls="controls">
				您的浏览器不支持 video 标签。
				</video>
				
				<div class="detail-header-msg">
          <x-button type="warn">『{{ data.course }}』第{{ data.courseNum }}期</x-button>
					
					<div class="detail-header-msg-desc">					
						<p>讲师备课不易，给Ta点鼓励吧</p>
					</div>
					
					<div class="detail">
						<p>主讲：{{ data.lecturer }}<span>{{ data.subscribe }}人订阅</span></p>
						<p>创富正能量，我的中国梦只要还剩一口气，没有什么不可能墨镜</p>
					</div>
				</div>
			</div>

			<div class="detail-more">
				<el-img-text v-for="(item, index) in moreDatas" :img-text-data="item" :key="index"></el-img-text>
			</div>
			
			<div class="btns">
				<flexbox>
	        <flexbox-item>
	          <x-button type="primary">分享</x-button>
	        </flexbox-item>
	        <flexbox-item>
	          <x-button type="warn">发表留言</x-button>
	        </flexbox-item>
	      </flexbox>
			</div>
			<!-- <div class="comment"></div> -->
		</div>
		
	</div>
</template>

<script type="text/babel">
	import { XButton, Flexbox, FlexboxItem } from 'vux'
	import elHeaderIndex from 'components/header/header-index'
	import elImgText from 'components/img-text/img-text'

	export default {
		name: 'videoDetail',
		components: { XButton, Flexbox, FlexboxItem, elHeaderIndex, elImgText },
		data () {
			return {
				title: '视频详情',
				data: {
					src: '',
					course: '总裁商业思维',
					courseNum: 26,
					lecturer: '苏引华',
					subscribe: 360426,
				},
				moreDatas:  [
					{
						title: '总裁商业思维1',
						price: '1233',
						priceUnit: '年',
						priceCurrency: '￥',
						desc: '以帮助学员实现梦想，突破发展瓶颈为己任，直指核心？',
						label: '主讲', 
						speaker: '苏引华',
						subscribe: '234343',
						url: '',
						id: '',
						status: '新',
						date: '2017-04-12',
						timeLength: '30分58秒'
					},{
						title: '总裁商业思维2',
						price: '1233',
						priceUnit: '年',
						priceCurrency: '￥',
						desc: '以帮助学员实现梦想，突破发展瓶颈为己任，直指核心？',
						label: '主讲', 
						speaker: '苏引华',
						subscribe: '234343',
						url: '',
						id: '',
						status: '新',
						date: '2017-04-12',
						timeLength: '30分58秒'
					}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

  .video-detail {

  }

  .detail-header {
  	video {
  		width: 100%;
  		height: 200px;
  		background: #000;
  	}
  }

  .detail-header-msg {
		padding: $padding;
		line-height: 2;

		.detail-header-msg-desc {
			padding: 40px;
			text-align: center;
		} 	
  }

  // .btn {
  // 	line-height: $inputH;
  // 	color: #fff;
  // 	text-align: center;
  // 	letter-spacing: .2em;
  // 	border-radius: $borderRadius;
  // 	background-color: $colorRed;
  // }

  .detail {

  	span {
  		float: right;
  	}
  }

	.btns {
		padding: $padding;
	}
</style>
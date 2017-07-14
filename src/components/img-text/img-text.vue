<!-- 
	视频和音频的图文混排
 -->
<template>
	<div class="img-text">
		<div class="img-text-img">
			<img class="img" src="~assets/img/index/video-course.png" alt="">
			<div v-if="imgTextData.status" class="status">{{ imgTextData.status }}</div>
			<div v-if="imgTextData.date" class="date">{{ imgTextData.date }}</div>
		</div>
		<div class="text">
			<h5 class="title">{{ imgTextData.title }}
				<span>￥{{ imgTextData.price }}</span>	
				<!-- <span>{{ imgTextData.priceCurrency }}{{ imgTextData.price }}/{{ imgTextData.priceUnit }}</span>	 -->
			</h5>
			<p class="desc">{{ imgTextData.desc }}</p>
			<p>{{ imgTextData.label }}：{{ imgTextData.speaker }}<span>{{ imgTextData.subscribe }}人订阅</span></p>
		</div>
	</div>
</template>

<script type="text/babel">
	export default {
		props: ['imgTextData'],
		data () {
			return {
				list: {
					title: '总裁商业思维',
					price: '1233',
					priceUnit: '年',
					priceCurrency: '￥',
					desc: '以帮助学员实现梦想，突破发展瓶颈为己任，直指核心？',
					label: '主讲', 
					speaker: '苏引华',
					subscribe: '234343',
					status: '新',
					date: '2017-04-12',
					timeLength: '30分58秒'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	@import '~assets/css/img-text'
	
</style>
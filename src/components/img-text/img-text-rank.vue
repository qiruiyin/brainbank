<!-- 
	视频和音频 排行榜图文混排
 -->

<template>
	<div class="img-text img-text-rank" @click="goPage(imgTextData.url, imgTextData.params)">
		<div class="img-text-img">
			<img class="img" src="~assets/img/book01.png" alt="">
		</div>
		
		<div class="text">
			<h5 class="title">{{ imgTextData.title }}</h5>
			<p class="type">{{ imgTextData.type }}</p>
			<p>
				<rater v-model="imgTextData.like.percent" :margin="0" slot="value" :max="5" :font-size="15" active-color="#04BE02"></rater>
				（{{ imgTextData.like.num | numToCash }}）
			</p>

			<div v-if="imgTextData.pay != 0" class="btn">￥{{ imgTextData.pay | numToCash }}</div>
			<div v-else class="btn">下载</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Rater } from 'vux'

	export default {
		components: { Rater },
		props: ['imgTextData'],
		data () {
			return {
				list: {
					title: '总裁商业思维',
					type: '游戏',
					pay: '1340.0',
					like: {
						num: 2234,
						percent: 3.4
					},
					url: '',
					params: {},
				}
			}
		},
		mounted () {
		},
		methods: {
			goPage (url, params) {
				if(url) {
					this.$router.push({name: url, params: params});
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
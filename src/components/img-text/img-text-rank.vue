<!-- 
	视频和音频 排行榜图文混排
 -->

<template>
	<div class="img-text img-text-rank" @click="goPage(imgTextData.url, imgTextData.params)">
		<div class="img-text-img">
			<img class="img" :src="imgTextData.img" alt="">
		</div>
		
		<div class="text">
			<h5 class="title">{{ imgTextData.title }}</h5>
			<p class="type">{{ imgTextData.type }}</p>
			<p v-if="imgTextData.like">
				<rater v-model="imgTextData.like.percent" :margin="0" slot="value" :max="5" :font-size="15" active-color="#04BE02"></rater>
				（{{ imgTextData.like.num | numToCash }}）
			</p>
			<p v-if="imgTextData.download">下载次数：{{ imgTextData.download }}</p>

			<template v-if="imgTextData.pay">
				<div v-if="imgTextData.pay != 0" class="btn" @click.stop="download(imgTextData.code, imgTextData.downloadUrl)">￥{{ imgTextData.pay | numToCash }}</div>
				<div v-else class="btn" @click.stop="download(imgTextData.code, imgTextData.downloadUrl)">{{ btns[imgTextBtn].name }}</div>
			</template>

			<template v-else>
				<div v-if="imgTextData.price == 0" class="btn" @click.stop="download(imgTextData.code, imgTextData.downloadUrl)">￥{{ imgTextData.pay | numToCash }}</div>
				<div v-else class="btn" @click.stop="download(imgTextData.code, imgTextData.downloadUrl)">{{ btns[imgTextBtn].name }}</div>
			</template>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Rater } from 'vux'

	export default {
		components: { Rater },
		props: ['imgTextData', 'imgTextBtn'],
		data () {
			return {
				list: {
					title: '总裁商业思维',
					type: '游戏',
					pay: '1340.0',
					img: '',
					like: {
						num: 2234,
						percent: 3.4
					},
					url: '',
					params: {}
				},
				btns: [
					{
						link: '',
						name: '播放'
					},{
						link: '',
						name: '下载'
					}
				]
			}
		},
		mounted () {
		},
		methods: {
			goPage (url, params) {
				if(url) {
					this.$router.push({name: url, params: params});
				}
			},
			download (code, url) {
				this.$emit('onBtnClick', { code: code, url: url })
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	@import '~assets/css/img-text'
</style>
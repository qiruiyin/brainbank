<!-- 
	视频和音频 排行榜图文混排
 -->

<template>
	<div class="img-text img-text-rank" @click="goPage(imgTextData.url, imgTextData.params)">
		<div v-if="imgTextData.img" class="img-text-img">
			<img class="img" :src="imgTextData.img" alt="">
		</div>
		
		<div class="text">
			<h5 class="title">{{ imgTextData.title }}</h5>
			<p class="type">{{ imgTextData.type }}</p>
			<p v-if="imgTextData.like">
				<rater v-model="imgTextData.like.percent" :margin="0" slot="value" :max="5" :font-size="15" active-color="#04BE02" disabled></rater>
				（{{ imgTextData.like.num | numToCash }}）
			</p>
			<p v-if="imgTextData.download || imgTextData.download == 0">下载次数：{{ imgTextData.download }}</p>
			
			<template v-if="imgTextBtn != -1">
				<template v-if="isClick">
					<a @click.stop="downloadFile" v-if="isDownload" :href="imgTextData.downloadUrl" class="btn">{{ btns[imgTextBtn].name }}</a>
					<div v-else class="btn">{{ btns[imgTextBtn].name }}</div>
				</template>

				<template v-else>
					<div class="btn" @click.stop="download(imgTextData)">￥{{ imgTextData.pay | numToCash }}</div>
				</template>
			</template>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Rater } from 'vux'

	export default {
		components: { Rater },
		props: ['imgTextData', 'imgTextBtn', 'isDownload'],
		data () {
			return {
				list: {
					title: '总裁商业思维',
					type: '游戏',
					pay: '1340.0',
					isBuy: 0,
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
		computed: {
			isClick () {
				if(this.imgTextData.pay == 0) {
					return true
				} else if (this.imgTextData.isBuy == 1) {
					return true
				} else {
					return false
				}
			}
		},
		mounted () {
		},
		methods: {
			goPage (url, params) {
				if(this.imgTextData.pay != 0 && !this.isLogin())
					return false;
				
				if(url) {
					if(this.isClick) {
						this.$router.push({name: url, params: params });
					} else {
						this.$vux.alert.show({
						  content: '请先购买！'
						})
					}
				}
			},
			download (val) {
				if(this.imgTextData.pay != 0 && !this.isLogin())
					return false;
				this.$emit('on-btn-click', val)
			},
			downloadFile () {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	@import '~assets/css/img-text'
</style>
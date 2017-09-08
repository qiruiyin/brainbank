<!-- 
	视频播放
 -->

<template>
	<div class="video" v-cloak>
		<div  class="prism-player" id="J_prismPlayer"></div>
    <p v-show="false">{{ videoData }}</p>
	</div>
</template>

<script type="text/babel">

	export default {
		name: "elVideo",
		components: {
			// VideoPlayer
		},
		props: ['videoData'],
		data () {
			return {
			}
		},
    updated() {
      this.$nextTick(function(){
        this.init()
      })
    },
    methods: {
      init () {
        console.log(1,this.videoData.fileThumb)
        let _this = this;
        let player = new prismplayer({
          id: 'J_prismPlayer',
          width: document.body.clientWidth,
          // height: document.body.clientWidth,
          autoplay: false,
          preload: true,
          //支持播放地址播放,此播放优先级最高
          source : _this.videoData.fileUrl,
          // source : '播放url',
          //播放方式二：推荐
          // vid : "3165805f6ba34ba8a451b9ba592aba39" || _this.videoData.fileUrl,
          // playauth : '',
          cover: _this.videoData.fileThumb
        });
      }
    }
	}
</script>

<style lang="scss" scoped>
  @import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
  
  .video {
    width: 100%;
  }
	
</style>
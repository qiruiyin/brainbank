
<!-- 
	音频播放
 -->

<template>
	<div class="audio" v-cloak>
		<div  class="prism-player" id="J_prismPlayer"></div>
    <p v-show="false">{{ audioData }}</p>
	</div>
</template>

<script type="text/babel">
	import imgPoster from 'assets/img/audio.png'

	export default {
		name: "elAudio",
		components: {
			// VideoPlayer
		},
		props: ['audioData'],
		data () {
			return {
				audioStatus: false,
			}
		},
    updated() {
      this.$nextTick(function(){
        this.init()
      })
    },
    methods: {
      init () {
        console.log(1,this.audioData.fileThumb)
        let _this = this;
        let player = new prismplayer({
          id: 'J_prismPlayer',
          width: document.body.clientWidth,
          // height: document.body.clientWidth,
          autoplay: false,
          preload: true,
          //支持播放地址播放,此播放优先级最高
          source : _this.audioData.fileUrl,
          playsinline: true
          // source : '播放url',
          //播放方式二：推荐
          // vid : "3165805f6ba34ba8a451b9ba592aba39" || _this.videoData.fileUrl,
          // playauth : '',
        });
      }
    }
	}
</script>

<style lang="scss">
  @import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
  
	.audio {
    width: 100%;

    .prism-player {
			background: url("~assets/img/audio.png") no-repeat;
			background-size: 100%;

      video {
        opacity: 0;
      }

      .prism-fullscreen-btn {
        display: none;
      }
    }

    .prism-player .prism-cover {
    	background: none;
    }
  }
</style>
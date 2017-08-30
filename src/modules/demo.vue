<!-- 
	表单示例
 -->

<template>
	<div class="dn-form">
	  <scroller lock-x height="-70px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
      <div class="box2">
        <p v-for="i in bottomCount">placeholder {{i}}</p>
        <load-more tip="loading"></load-more>
      </div>
    </scroller>
	</div>
</template>

<script type="text/babel">
	import { Scroller, Tab, TabItem, Swiper, SwiperItem, LoadMore } from 'vux'
	import elVerificationCode from 'components/verification-code/verification-code'

	export default {
		naem: 'bangding',
		components: { Scroller, LoadMore, elInput, elVerificationCode },
		data () {
			return {
	      showList1: true,
	      scrollTop: 0,
	      onFetching: false,
	      bottomCount: 20
	    }
		},
	  mounted () {
	    // this.$nextTick(() => {
	    //   this.$refs.scrollerEvent.reset({top: 0})
	    // })
	    // this.$nextTick(() => {
	    //   this.$refs.scrollerBottom.reset({top: 0})
	    // })
	  },
	  methods: {
	    onScrollBottom () {
	      if (this.onFetching) {
	        // do nothing
	      } else {
	        this.onFetching = true
	        setTimeout(() => {
	          this.bottomCount += 10
	          this.$nextTick(() => {
	            this.$refs.scrollerBottom.reset()
	          })
	          this.onFetching = false
	        }, 2000)
	      }
	    },
	    onScroll (pos) {
	      this.scrollTop = pos.top
	    },
	    onCellClick () {
	      window.alert('cell click')
	    },
	    onClickButton () {
	      window.alert('click')
	    },
	    changeList () {
	      this.showList1 = false
	      this.$nextTick(() => {
	        this.$refs.scroller.reset({
	          top: 0
	        })
	      })
	    }
	  }
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	.box2-wrap {
	  height: 300px;
	  overflow: hidden;
	}

	p {
		line-height: 300px;
	}
</style>
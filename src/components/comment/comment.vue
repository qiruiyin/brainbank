<!-- 
	评论
 -->

<template>
	<div class="comment-list">
		<div class="comment-list-title">评论</div>
		<group>
      <x-textarea  placeholder="请输入评论" @on-focus="onEvent('focus')"></x-textarea>
    </group>
    <div class="btn">
    	<x-button type="primary">确定</x-button>
    </div>
    <div class="comment" v-for="(item, index) in comment" :key="index">
			<div class="comment-header">
				<img :src="item.img">
				<div class="title">{{ item.title }}</div>
				<div class="time">{{ item.time }}</div>
			</div>

			<div class="comment-body">
				{{ item.content }}
			</div>
		</div>

		<load-more class="loading" :show-loading="loading.status" :tip="loading.value"></load-more>
	</div>	
</template>

<script type="text/babel">
	import { Scroller, Divider, Spinner, XButton, XTextarea, Group, Cell, LoadMore } from 'vux'

	export default {
		name: 'comment',
		components: {
			Scroller, Divider, Spinner, XButton, XTextarea, Group, Cell, LoadMore
		},
		props: [ 'commentData' ],
		data () {
			return {
				title: '评论',
				comment: [
					{
						img: '',
						title: '名字',
						content: '内容',
						time: '07-12 12:00'
					},{
						img: '',
						title: '名字',
						content: '内容',
						time: '07-12 12:00'
					},{
						img: '',
						title: '名字',
						content: '内容',
						time: '07-12 12:00'
					}
				],
				loading: {
					status: false,
					value: 'loading'
				}
			}
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
	    onEvent (event) {
	      console.log('on', event)
	    }
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	.comment-list {

	}

	.comment-list-title {
		padding: $padding;
		font-size: 20px;
		background: $bgGray;
	}

	.comment {
		padding: $padding;
		@include halfpxline(0, $borderColor, 1px, 0, 0, 0);

		&:last-child {
			@include halfpxline(0, $borderColor, 1px, 0, 1px, 0);			
		}
	}

	.comment-header	{
		height: 48px;
		line-height: 40px;
		@include halfpxline(0, $borderColor, 0, 0, 1px, 0);

		img {
			float: left;
			width: 40px;
			height: 40px;
			border-radius: 40px;
			border: 0;
		}

		.title {
			float: left;
			padding-left: 1em;
			font-size: 20px;
		}

		.time {
			float: right;
		}
	}

	.comment-body {
		padding: $padding;
	}

	.btn {
		padding: $padding;
	}
</style>
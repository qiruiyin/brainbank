<!-- 
	消息页面
 -->

<template>
	<div class="msg">
		<swipeout class="vux-1px-tb">
      <swipeout-item transition-mode="follow" v-for="(item, index) in msgDatas" :key="item.date">
      	<div slot="left-menu">
          <swipeout-button type="primary">标记为已读</swipeout-button>
          <swipeout-button type="warn">删除</swipeout-button>
        </div>
        <div slot="right-menu">
          <swipeout-button type="primary">标记为已读</swipeout-button>
          <swipeout-button type="warn">删除</swipeout-button>
        </div>
        <div slot="content" class="msg-simple vux-1px-t">
      		<header>{{ item.date }}</header>
					<main>
						<div class="title">{{ item.title }}</div>
						<div class="desc">{{ item.content }}</div>
						<div class="time">时间：{{ item.time }}</div>
					</main>
					<footer>
						<router-link :to="{ name: item.url }">
							{{ item.urlMsg }}
						</router-link>
					</footer>  	
        </div>
      </swipeout-item>
    </swipeout>
<!-- 
		<div class="msg-simple" v-for="item in msgDatas" :key="item.date">
			<header>{{ item.date }}</header>
			<main>
				<div class="title">{{ item.title }}</div>
				<div class="desc">{{ item.content }}</div>
				<div class="time">时间：{{ item.time }}</div>
			</main>
			<footer>
				<router-link :to="{ name: item.url }">
					{{ item.urlMsg }}
				</router-link>
			</footer>
		</div> -->
	</div>
</template>

<script type="text/babel">
	import { GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux'

	export default {
		name: 'msg',
		components: {
			GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton, XButton
		},
		data () {
			return {
				title: '消息',
				msgDatas: [
					{
						date: '2017-01-20 15:20',
						title: '上课通知',
						content: '嗨，你报的总裁商业思维要开课啦',
						time: '6.12-6.15',
						url: '',
						urlMsg: '点击我去上课'
					},{
						date: '2017-01-20 15:20',
						title: '上课通知',
						content: '嗨，你报的总裁商业思维要开课啦',
						time: '6.12-6.15',
						url: '',
						urlMsg: '点击我去上课'
					},{
						date: '2017-01-20 15:20',
						title: '上课通知',
						content: '嗨，你报的总裁商业思维要开课啦',
						time: '6.12-6.15',
						url: '',
						urlMsg: '点击我去上课'
					},{
						date: '2017-01-20 15:20',
						title: '上课通知',
						content: '嗨，你报的总裁商业思维要开课啦',
						time: '6.12-6.15',
						url: '',
						urlMsg: '点击我去上课'
					},{
						date: '2017-01-20 15:20',
						title: '上课通知',
						content: '嗨，你报的总裁商业思维要开课啦',
						time: '6.12-6.15',
						url: '',
						urlMsg: '点击我去上课'
					},{
						date: '2017-01-20 15:20',
						title: '上课通知',
						content: '嗨，你报的总裁商业思维要开课啦',
						time: '6.12-6.15',
						url: '',
						urlMsg: '点击我去上课'
					},{
						date: '2017-01-20 15:20',
						title: '上课通知',
						content: '嗨，你报的总裁商业思维要开课啦',
						time: '6.12-6.15',
						url: '',
						urlMsg: '点击我去上课'
					},{
						date: '2017-01-20 15:20',
						title: '上课通知',
						content: '嗨，你报的总裁商业思维要开课啦',
						time: '6.12-6.15',
						url: '',
						urlMsg: '点击我去上课'
					},
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	$msgMargin: $padding;

	.msg {
		padding: $msgMargin 0;
		background: $bgGray;
	}

	.msg-simple {
		margin-bottom: $msgMargin;
		background-color: #fff;
	}

	header	{
		line-height: 40px;
		@include halfpxline(0, $borderColor, 0 , 0, 1px, 0);
		text-align: center;
	}

	main {
		padding: $padding;
		line-height: 1.75;
		text-align: left;
	}

	.title {
		color: $fontColorBlack;
		font-size: 20px;
	}

	footer {
		padding: 0 $padding $padding;
	}
</style>
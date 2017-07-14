<!-- 
	主题详情卡片
 -->
<template>
	<div class="card-order-list">
		<div class="card" v-for="(item, index) in cardList" :key="index">
			<div class="card-header">
				<img :src="item.header.img">
				<p>{{ item.header.title }}</p>
				<span>{{ item.header.status }}</span>
			</div>
			<div class="card-content">
				<img :src="item.content.img" alt="">
				<div class="card-content-right">
					<div class="title">{{ item.content.title }}
						<p class="price">￥{{ item.content.price }}</p>
					</div>
					 <x-number v-model="item.content.num" :min="1"></x-number>
				</div>
			</div>
			<div class="card-footer">
				<p>共{{ item.content.num }}件商品</p>
				<x-button class="btn" v-if="item.footer.status" type="primary">立即支付</x-button>
				<div class="btn" v-else>总价：￥{{ item.content.price * item.content.num }}</div>
			</div>
		</div>
		<load-more :show-loading="true" tip="加载"></load-more>
	</div>
</template>

<script type="text/babel">
	import { Panel, Group, Radio, XNumber, XButton, LoadMore } from 'vux'
	
	import imgHeader from 'assets/img/icon/icon.png'

	export default {
		name: 'card',
		components: { Panel, XNumber, XButton, LoadMore },
		props: ['cardData'],
		data () {
			return {
				title: '卡片',
				cardList: [
					{
						header: {
							img: '',
							title: '大脑银行',
							status: '已完成'
						},
						content: {
							img: '',
							title: '商品名字',
							num: 1,
							price: 100,
						},
						footer: {
							status: true
						}
					},{
						header: {
							img: '',
							title: '大脑银行',
							status: '已完成'
						},
						content: {
							img: '',
							title: '商品名字',
							num: 1,
							price: 100,
						},
						footer: {
							status: false
						}
					},{
						header: {
							img: '',
							title: '大脑银行',
							status: '已完成'
						},
						content: {
							img: '',
							title: '商品名字',
							num: 1,
							price: 100,
						},
						footer: {
							status: false
						}
					},{
						header: {
							img: '',
							title: '大脑银行',
							status: '已完成'
						},
						content: {
							img: '',
							title: '商品名字',
							num: 1,
							price: 100,
						},
						footer: {
							status: false
						}
					},{
						header: {
							img: '',
							title: '大脑银行',
							status: '已完成'
						},
						content: {
							img: '',
							title: '商品名字',
							num: 1,
							price: 100,
						},
						footer: {
							status: false
						}
					},{
						header: {
							img: '',
							title: '大脑银行',
							status: '已完成'
						},
						content: {
							img: '',
							title: '商品名字',
							num: 1,
							price: 100,
						},
						footer: {
							status: false
						}
					},{
						header: {
							img: '',
							title: '大脑银行',
							status: '已完成'
						},
						content: {
							img: '',
							title: '商品名字',
							num: 1,
							price: 100,
						},
						footer: {
							status: false
						}
					},{
						header: {
							img: '',
							title: '大脑银行',
							status: '已完成'
						},
						content: {
							img: '',
							title: '商品名字',
							num: 1,
							price: 100,
						},
						footer: {
							status: false
						}
					},{
						header: {
							img: '',
							title: '大脑银行',
							status: '已完成'
						},
						content: {
							img: '',
							title: '商品名字',
							num: 1,
							price: 100,
						},
						footer: {
							status: false
						}
					}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
  
  .card-order-list {
  	padding: $padding 0;
  }

  .card {
  	@include halfpxline(0, $borderColor, 1px, 0, 1px, 0);
  	padding: 0 $padding;
  	margin-bottom: $padding;
  }

  .card-header {
		height: $inputH + 8px;
		line-height: $inputH;
		padding: 4px 0;
  	@include halfpxline(0, $borderColor, 0, 0, 1px, 0);

  	img {
  		float: left;
  		width: $inputH;
  		height: $inputH;
  		border-radius: $inputH;
  	}

  	p {
  		float: left;
			text-indent: 1em;  		
  	}

  	span {
  		float: right;
  	}
  }

  .card-content {
  	padding: $padding 0;
		display: flex;
  	@include halfpxline(0, $borderColor, 0, 0, 1px, 0);

		img {
			width: 100px;
		}
  }

  .card-content-right {
  	flex: 1;

  	.title {
			@extend %clearfix;

			p {
				float: right;
			}
  	}

  	.weui-cell {
			padding-right: 0;
			padding-left: 0;

  		&:before {
  			display: none;
  		}
  	}
  }

	.card-footer {
		padding: 4px 0;
		@extend %clearfix;
		line-height: $inputH;

		p {
			float: left;
		}

		.btn {
			float: right;
			width: auto;
		}
	}
</style>
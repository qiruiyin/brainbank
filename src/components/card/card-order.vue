<!-- 
	主题详情卡片
 -->
<template>
	<div class="card-order-list">
		<div class="card" v-for="(item, index) in cardData" :key="index">
			<div class="card-header">
				<img v-if="item.icon" :src="item.icon">
				<p>{{ item.title }}</p>
				<span>{{ item.status }}</span>
			</div>
			<div class="card-content">
				<img v-if="item.img" :src="item.img" alt="">
				<div class="card-content-right">
					<cell title="订单号" :value="item.code"></cell>
					<cell title="应付金额" :value="item.amount"></cell>
					<cell v-if="item.actualAmount" title="实付金额" :value="item.actualAmount"></cell>
					<cell v-if="item.num" title="数量" :value="item.num"></cell>
				</div>
			</div>
			<div class="card-footer">
				<p v-if="item.num">共{{ item.num }}件商品</p>
				<x-button class="btn" v-if="item.paymentType != 1" type="primary" @click.native="payment(item.code)" mini>立即支付</x-button>
				<div class="btn" v-else >总价：￥{{ item.amount }}</div>
			</div>
		</div>
		<template v-if="cardCount == cardData.length">
			<x-button @click.native="loadMore(cardIndex)">加载更多</x-button>
			<!-- <load-more :show-loading="true" tip="加载"></load-more> -->
		</template>
		<template v-else>
			<divider>没有更多数据</divider>
		</template>
	</div>
</template>

<script type="text/babel">
	import { Panel, Group, Cell, Radio, XNumber, XButton, LoadMore, Divider } from 'vux'
	
	import imgHeader from 'assets/img/icon/icon.png'

	export default {
		name: 'card',
		components: { Panel, XNumber, Group, Cell, XButton, LoadMore, Divider },
		props: ['cardData', 'cardCount', 'cardIndex'],
		data () {
			return {
				title: '卡片',
				cardList: [
					{
						icon: '',
						code: '',
						title: "大脑银行",
						actualAmount: '',
						amount: '',
						status: '',
						img: '',
						num: '',
						paymentType: '', // 是否显示按钮
						status: '' // 支付状态
					}
				]
			}
		},
		methods: {
			payment (code) {
				// 应传code
				this.$router.push({name: "confirmOrder"});
			},
			loadMore (val) {

				this.$emit("on-load-more", val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
  
  .card-order-list {
  	padding: $padding 0;
  	margin-bottom: $containerBottom;
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
			margin-right: $padding;
  	}

  	p {
  		float: left;
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
	    margin: 6px 0;
	    line-height: $inputH - 12px;
		}
	}
</style>
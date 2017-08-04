<!-- 
	主题详情卡片
	lessonCommodityList: 课程列表
	orderProductList: 商城订单
 -->
<template>
	<div class="card-order-list">
		<div class="card" v-for="(item, index) in cardData" :key="index">
			<div class="card-header">
				<img v-if="item.icon" :src="item.icon">
				<p v-if="item.lessonCommodityList">{{ item.title }}</p>
				<p v-else>{{ item.code }}</p>
				<span>{{ item.status }}</span>
			</div>
			<div class="card-content">
				<img v-if="item.img" :src="item.img" alt="">
				<div class="card-content-right">
					<template v-if="item.orderProductList">
						<div class="product-list" >
							<div v-for="(productItem, productIndex) in item.orderProductList">
								<p>{{ productItem.productName }}
									<span><i>{{ productItem.productCount }}</i> * {{ productItem.productPrice }}</span>
								</p>
							</div>
						</div>

						<cell v-if="item.actualAmount" title="金额" :value="item.actualAmount"></cell>
					</template>

					<template v-if="item.lessonCommodityList">
						<div class="lesson-list" >
							<div v-for="(lessonItem, lessonIndex) in item.lessonCommodityList">
								<p>{{ lessonItem.customerName }}<span>{{ lessonItem.mobile }}</span></p>
								<p>{{ lessonItem.idCard }}</p>
							</div>
						</div>

						<cell v-if="item.actualAmount" title="金额" :value="item.actualAmount"></cell>
					</template>
					
					<template v-if="!item.orderProductList && !item.lessonCommodityList" >
						<cell title="产品名称" :value="item.title"></cell>
						<cell v-if="item.num" title="数量" :value="item.num"></cell>
						<cell v-if="item.amount" title="应付金额" :value="item.amount"></cell>
						<cell v-if="item.actualAmount" title="实付金额" :value="item.actualAmount"></cell>
					</template>
					
					<cell v-if="item.time" title="时间" :value="item.time"></cell>
					<cell v-if="item.expressCompany" title="快递公司" :value="item.expressCompany"></cell>
					<cell v-if="item.expressNumber" title="快递单号" :value="item.expressNumber"></cell>
					
				</div>
			</div>
			<div class="card-footer">
				<!-- 支付状态 -->
				<template v-if="item.paymentType == 1">
					<!-- 快递状态 -->
					<template v-if="item.expressType == 1">
						<x-button class="btn" type="primary" @click.native="payment(item.code)" mini>确认收货</x-button>
					</template>

					<template v-if="item.expressType == 2">
						<x-button class="btn" type="primary" @click.native="payment(item.code)" mini>评价</x-button>
					</template>

					<!-- 改签状态 -->
					<template v-if="item.ticketType == '' || item.ticketType == 0">
						<x-button class="btn" type="primary" @click.native="ticketChange(item.commodityCode, item.lessonCode)" mini>改签</x-button>
					</template>

					<template v-if="item.ticketType == 1">
						<x-button class="btn" type="primary" @click.native="ticketReview(item.code)" mini>见证</x-button>
					</template>
				</template>

				<template v-else>
					<x-button class="btn" type="primary" @click.native="payment(item.code)" mini>立即支付</x-button>
					<x-button class="btn" type="warn" @click.native="deleteOrder(item.code, index)" mini>删除</x-button>
				</template>
				
			</div>
		</div>
		<template v-if="cardCount == cardData.length">
			<x-button @click.native="loadMore(cardIndex)">加载更多</x-button>
			<!-- <load-more :show-loading="true" tip="加载"></load-more> -->
		</template>
		<template v-else>
			<divider>没有更多数据</divider>
		</template>

		<div v-transfer-dom>
			<popup v-model="ticketChangeData.show" position="bottom" :hide-on-blur=false>
	      <div class="ticket-change">
					<group :title="ticketChangeData.title">
				 		<selector v-model="ticketChangeData.lessonCode" title="期数" :options="ticketChangeData.list"></selector>
					</group>
	      	<div class="pay-btn">
						<x-button type="primary" @click.native="ticketChangeSubmit">改签</x-button>
						<x-button @click.native="ticketChangeCancel">取消</x-button>
	      	</div>
	    	</div>
	    </popup>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Panel, Group, Cell, Radio, XNumber, XButton, LoadMore, Divider, Popup, Selector, TransferDom } from 'vux'
	
	import imgHeader from 'assets/img/icon/icon.png'

	export default {
		name: 'card',
		directives: {
	    TransferDom
	  },
		components: { Panel, XNumber, Group, Cell, XButton, LoadMore, Divider, Popup, Selector },
		props: ['cardData', 'cardCount', 'cardIndex'],
		data () {
			return {
				title: '卡片',
				cardList: [
					{ // 数据结构已经改的有点乱，此处只有参考价值
						// icon: '',
						// code: '',
						// title: "大脑银行",
						// actualAmount: '',
						// amount: '',
						// status: '',
						// img: '',
						// num: '',
						// paymentType: '', // 是否
						// status: '', // 支付状态
						// orderProductList: [],
						// time: '',
						// expressCompany: '',
						// expressNumber: '',
					}
				],
				ticketChangeData: {
					show: false,
					title: "",
					lessonCode: "",
					commodityCode: "",
					list: []
				}
			}
		},
		methods: {
			payment (code) {
				// 应传code
				this.$router.push({name: "confirmOrder", query: { "orderCode" : code}});
			},
			deleteOrder (code, ind) {
				let _this = this;
				_this.$http.post('/wechat/usercenter/deleteOrder',
		  			{
	  					"orderCode": code
		  			}).then(function(e) {
		  				if(e.data.errcode == 1) {
								_this.cardData.splice(ind, 1);
								_this.$vux.toast.show({
									text: "删除成功"
								})
		  				}
		  		});
			},
			ticketChange (commodityCode, lessonCode) {
				// 改签
				let _this = this;
				_this.$http.post('/wechat/usercenter/getCustomerLessonList/lesson',
		  			{
	  					"commodityCode": commodityCode,
	  					"lessonCode": lessonCode
		  			}).then(function(e) {
		  				_this.ticketChangeData.show = true;
		  				_this.ticketChangeData.commodityCode = commodityCode;

		  				_this.ticketChangeData.list = e.data.data.lessonList.map(function(item, index){
		  					return {
		  						key: item.CODE,
		  						value: item.NAME,
		  					}
		  				})
		  		});
			},
			ticketChangeSubmit () {
				let _this = this;
				_this.$http.post('/wechat/usercenter/getCustomerLessonList/changeLessonOrder',
		  			{
	  					"commodityCode": _this.ticketChangeData.commodityCode,
	  					"lessonCode": _this.ticketChangeData.lessonCode
		  			}).then(function(e) {
		  				if(e.data.data.trueData) {
								_this.ticketChangeData.show = false;
		  					// 改签成功
		  					_this.$vux.toast.show({
		  						text: e.data.data.trueData,
		  						onHide() {
										_this.$router.go(0);
		  						}
		  					});
		  				} else {
		  					// 改签失败
		  					_this.$vux.toast.show({
		  						text: e.data.data.falseData
		  					});
		  				}
		  			})
			},
			ticketChangeCancel () {
				this.ticketChangeData.show = false
			},
			ticketReview (code) {
				// 跳转到见证页面
				console.log('见证')
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
  	display: flex;

  	img {
  		float: left;
  		width: $inputH;
  		height: $inputH;
  		border-radius: $inputH;
			margin-right: $padding;
  	}

  	p {
  		flex: 1;
	    overflow: hidden;
    	text-overflow: ellipsis;
    	white-space: nowrap;
  	}

  	span {
  		width: 6em;
  		text-align: right;
  		display: block;
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
	    margin-left: 10px;
	    line-height: $inputH - 12px;
		}
	}

	.product-list, .lesson-list  {
		p {
			width: 100%;
			padding: 6px 0;
			overflow: hidden;

			span {
				float: right;
				color: $fontColorGray;
			}

			i {
				font-style: normal;
			}
		}
	}

	.lesson-list {
		padding: 4px 0;		
	}
</style>
<!-- 
	音视频排行榜
 -->

<template>
	<div class="rank-list">
		<el-headerIndex></el-headerIndex>

		<div class="container">
			<div class="tab">
	      <tab v-model="tabSelected">
	        <tab-item :selected="tabSelected == index" v-for="(item, index) in tabDatas" @click="tabSelected = index" :key="index">{{ item.title }}</tab-item>
	      </tab>
	      <swiper class="list" height="100%" v-model="tabSelected" :show-dots="false">
	        <swiper-item v-for="(tabContentDatasList, index) in tabDatas" :key="index">
	          <el-img-text-rank @on-btn-click="btnClick" v-for="(item, ind) in tabContentDatas[tabContentDatasList.value]" :img-text-data="item" img-text-btn="0" :key="ind"></el-img-text-rank>
						
						<template v-if="tabContentDatas[tabContentDatasList.value].length == count">						
							<x-button @click.native="loadMore(tabContentDatasList.value)">加载更多</x-button>
						</template>
						
						<template v-else>
							<divider>没有更多数据</divider>
						</template>
	        </swiper-item>
	      </swiper>
	    </div>
    </div>

    <div v-transfer-dom>
			<popup v-model="pay.show" position="bottom">
	      <div class="pay">
					<form-preview header-label="付款金额" :header-value="pay.allPrice" :body-items="pay.list"></form-preview>	
	      	
	      	<div class="pay-btn">
						<x-button type="primary" :class="{'disabled': !user.pay}" @click.native="payOrder">支付</x-button>
	      	</div>
	    	</div>
	    </popup>
    </div>
	</div>
</template>

<script type="text/babel">
	import { Tab, TabItem, Swiper, SwiperItem, XButton, Divider, Toast, FormPreview, Popup, TransferDomDirective as TransferDom } from 'vux'
  import { mapState } from 'vuex'
	import elHeaderIndex from 'components/header/header-index'
	import elImgTextRank from 'components/img-text/img-text-rank'

	export default {
		name: 'rankList',
		directives: {
	    TransferDom
	  },
		components: { Tab, TabItem, Swiper, SwiperItem, XButton, Toast, FormPreview, Popup, Divider, elHeaderIndex, elImgTextRank },
		data () {
			return {
				index: 0,
				count: this.wordBook.pageCount,
				tabDatas: [
					{
						value: 'pay',
						title: '付费',
					},{
						value: 'free',
						title: '免费',
					},{
						value: 'hot',
						title: '排行榜',
					}
				],
				tabSelected: 0,
				tabContentDatas: {
					pay: [],
					free: [],
					hot: []
				},
				type: {
					video: 1,
					audio: 2
				},
				typeCurrent: '',
				pay: {
					show: false,
					allPrice: 0,
					list: [
						{
			        label: '订单号',
			        value: ''
			      }, {
			        label: '名称',
			        value: ''
			      }, {
			        label: '数量',
			        value: ''
			      }
			    ]
				},
				payCode: ''
			}
		},
		computed: {
			...mapState({
        user: state => state.user
      })
		},
		mounted () {
			let _this = this,
					count = _this.count,
					type = _this.$route.params.type;

			_this.typeCurrent = _this.type[type];

			this.$http.all([
					_this.fetchData(_this.type[type], 1, 1, count),
					_this.fetchData(_this.type[type], 2, 1, count),
					_this.fetchData(_this.type[type], 3, 1, count)
				])
			  .then(_this.$http.spread(function (acct, perms) {
			  })
			);
		},
		methods: {
			fetchData (type = 1, rankType = 1, pagesize = 1, pagecount = 10) {
				let _this = this;
				this.$http.post('/wechat/discover/rank/list',
						{
							"type": type,
							"rankType": rankType,
							"userCode": _this.$store.state.user.userCode,
							"pagesize": pagesize,
							"pagecount": pagecount,
						}
					).then(function(e) {
						let data = [];
						if(e.data.data && e.data.data.list && e.data.data.list.length > 0) {
							e.data.data.list.map(function(item, index) {
								data[index] = {
									img: _this.resolveImg(item.thumbnail),
									id: item.id,
									title: item.name,
									type: item.DESCRIPTION,
									pay: item.price,
									isBuy: item.isBuy,
									like: {
										num: item.commentAmount,
										percent: item.rank || 3.2
									},
									url: 'courseTypeDetail',
									params: {
										code: item.code,
										type: _this.$route.params.type
									}
								}
							})
						}

						if(rankType == 1) {
							_this.tabContentDatas.pay.push.apply(_this.tabContentDatas.pay, data);
						} else if(rankType == 2) {
							_this.tabContentDatas.free.push.apply(_this.tabContentDatas.free, data);
						} else if(rankType == 3) {
							_this.tabContentDatas.hot.push.apply(_this.tabContentDatas.hot, data);
						}
				})
			},
			loadMore (arg) {
				let _this = this,
						count = 2;
				if(arg == "pay") {
					_this.fetchData(_this.typeCurrent, 1, 2, _this.count)
				} else if(arg == "free") {
					_this.fetchData(_this.typeCurrent, 2, 2, _this.count, 0)
				} else if(arg == "hot") {
					_this.fetchData(_this.typeCurrent, 3, 2, _this.count, 0)
				}
			},
			btnClick (val) {
				let _this = this;
				_this.payCode = val.params.code;
					
				this.$http.post('/wechat/order/create',
					{
						"userCode": _this.$store.state.user.userCode,
						"productCode": val.params.code,
						"amount": 1,
						"money": val.pay,
						"allMoney": val.pay,
						"orderType":  4,
						"lessonCode": '',
						"address": ""
					}).then(function(e) {
						let responseData = e.data;

						if(responseData.errcode != 1) {
							_this.$vux.toast.show({
			          text: responseData.errmsg
			        })
						} else {
							_this.pay.show = true;
							_this.pay.allPrice = val.pay;
							_this.pay.list[0].value = responseData.data.order.code;
							_this.pay.list[1].value = val.title;
							_this.pay.list[2].value = 1;
						}
					})	
			},
			payOrder () {
	    	let _this = this;

				if(!this.user.pay) return false;
				this.payWeixinOrder(_this.pay.list[0].value);

				// this.$http.post('/wechat/order/pay/prepare',
				// 		{
				// 			"openId": _this.$store.state.user.openId,
				// 			"orderCode": _this.pay.list[0].value,
				// 		}
				// 	).then(function(e) {
				// 		let responseData = e.data.data,
				// 				weixinConfig = {
				// 					"appId": responseData.payment.appId,     //公众号名称，由商户传入     
			 //           	"timeStamp": responseData.payment.timeStamp,         //时间戳，自1970年以来的秒数     
			 //            "nonceStr": responseData.payment.nonceStr, //随机串     
			 //            "package": responseData.payment.packageValue,     
			 //            "signType": "MD5",         //微信签名方式：     
			 //            "paySign": responseData.payment.paySign //微信签名 
				// 				};
				// 		WeixinJSBridge.invoke(
			 //       'getBrandWCPayRequest', weixinConfig,
			 //       function(res){
			 //       		alert(res.err_msg)
			 //          if(res.err_msg == "get_brand_wcpay_request:ok" ) {
			 //          	// alert("")
			 //          	_this.tabContentDatas.pay.map(function(item, index) {
			 //          		if(item.params.code == _this.payCode) {
			 //          			item.isBuy = true
			 //          		}
			 //          	})
			 //          }
			 //           // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
			 //       })
				// });
			}
		}
	}
</script>

<style lang="scss">
	.rank-list .vux-slider > .vux-swiper {
    overflow-y: auto;
  }
</style>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	@import '~assets/css/rank';

	.pay-btn {
		padding: $padding;

		.disabled {
			background: $disabledPay;
		}
	}
	
</style>
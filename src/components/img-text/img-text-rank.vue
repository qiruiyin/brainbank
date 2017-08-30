<!-- 
	视频和音频 排行榜图文混排
 -->

<template>
	<div class="img-text img-text-rank" @click="goPage(imgTextData.url, imgTextData.query)" v-cloak>
		<div v-if="imgTextData.img" class="img-text-img">
			<img class="img" :src="imgTextData.img" alt="">
		</div>
		
		<div class="text">
			<h5 class="title">{{ imgTextData.title }}</h5>
			<p class="type">{{ imgTextData.type }}</p>
			<p v-if="imgTextData.like">
				<rater v-model="raterNum" :margin="0" slot="value" :max="5" :font-size="15" active-color="#04BE02" disabled></rater>
				（{{ imgTextData.like.num }}）
			</p>
			<p v-if="imgTextData.download || imgTextData.download == 0">下载次数：{{ imgTextData.download }}</p>
			
			<template v-if="imgTextBtn != -1">
				<template v-if="isDownload">
					<a @click.stop="downloadFile" v-if="isClick" :href="imgTextData.downloadUrl" class="btn">{{ btns[imgTextBtn].name }}</a>
					<div class="btn btn-integral" v-else @click.stop="download(imgTextData)">{{ imgTextData.pay | numToCash }}</div>
					<a ref="downloadFile" v-show="false" :href="imgTextData.downloadUrl" class="btn">{{ btns[imgTextBtn].name }}</a>
				</template>

				<template v-else>
					<div v-if="isClick" class="btn">{{ btns[imgTextBtn].name }}</div>
					<div class="btn" v-else @click.stop="download(imgTextData)">￥{{ imgTextData.pay | numToCash }}</div>
				</template>
			</template>
		</div>

		<div v-transfer-dom>
			<popup v-model="payShow" position="bottom">
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
	import { Rater, TransferDom, XButton, FormPreview, Popup } from 'vux'
  import { mapState } from 'vuex'

	export default {
		name: "imgTextRank",
		components: { Rater, XButton, FormPreview, Popup, },
		directives: {
	    TransferDom
	  },
		props: ['imgTextData', 'imgTextBtn', 'isDownload', 'imgTextInd'],
		data () {
			return {
				list: {
					title: '',
					type: '',
					pay: '',
					isBuy: 0,
					img: '',
					like: {
						num: 0,
						percent: 0
					},
					url: '',
					query: {}
				},
				btnStatus: {
					order: false,
					pay: false
				},
				btns: [
					{
						link: '',
						name: '播放'
					},{
						link: '',
						name: '下载'
					}
				],
				payShow: false,
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
        user: state => state.user,
        loadbar: state => state.loadbar
      }),
			raterNum () {
				if(this.imgTextData.like) {
					if(this.imgTextData.like.percent) {
						return this.imgTextData.like.percent;
					}
				}
				
				return 1
			},
			isClick () {
				if(this.imgTextData.pay == 0) {
					return true
				} else if (this.imgTextData.isBuy > 0) {
					return true
				} else {
					return false
				}
			}
		},
		watch: {
			payShow (newValue, oldValue) {
				this.$emit("on-pay-show", newValue);
			}
		},
		mounted () {
		},
		methods: {
			goPage (url, query) {
				// 1、没有url 不跳转
				// 2、没有btn （课程）判断是否购买过，判断是否绑定，判断是否
				// 3、没有购买
				let _this = this;
				if(!url) {
					return false
				}

				if(this.imgTextBtn == -1) {
					// 处理课程未购买的视频
					if(this.imgTextData.isBuy == 0) {
						this.$vux.confirm.show({
							content: "请先报名课程",
							onConfirm () {
								_this.$router.push({name: "course", query: { type: 1 }})
							}
						})
						return false;
					}
				} else {
					if(this.imgTextData.pay > 0) {
						if(this.imgTextData.isBuy == 0) {
							this.$vux.confirm.show({
								content: "你还未付费，只能观看免费音频、视频，付费后可观看完整音频、视频",
								onConfirm () {
									_this.$router.push({name: url, query: query });
								}
							})
							return false;
						}
					}
				}

				_this.$router.push({name: url, query: query });
			},
			download (val) {
				if(this.imgTextData.pay != 0 && !this.isLogin())
					return false;
				let _this = this;
				_this.payCode = val.query.code;
				if(_this.isDownload) {
		    	if(!this.loadbar.isLoading) {
						_this.$vux.confirm.show({
							content: "需要积分：" + val.pay,
					    onConfirm () {
								_this.$store.commit('updateLoadingStatus', {isLoading: true});
					      _this.$http.post('/wechat/coursewaremobile/buy',
									{
										"customerCode": _this.$store.state.user.userCode,
										"productCode": val.query.code
									}).then(function(e) {
										_this.$store.commit('updateLoadingStatus', {isLoading: false});
										let responseData = e.data.data;
										if(e.data.errcode == 1) {
											if(e.data.data.result.buy == 1) {
												_this.$emit('on-data-change', _this.imgTextData, 'download', _this.imgTextInd);
				 								_this.$refs.downloadFile.click()
											} if(e.data.data.result.tag == 1) {
												_this.$vux.alert.show({
													content: e.data.data.result.msg,
													onHide () {
														_this.$emit('on-data-change', _this.imgTextData, 'download', _this.imgTextInd);
				 										_this.$refs.downloadFile.click()
													}
												})
											} else {
												_this.$vux.alert.show({
													content: responseData.result.msg
												});	
											}
										} else {
											_this.$vux.alert.show({
												content: e.data.errmsg
											});
										}
									})
							}
				    })
					}
				} else {
					if(!this.loadbar.isLoading) {
						_this.$store.commit('updateLoadingStatus', {isLoading: true});
						this.$http.post('/wechat/order/create',
							{
								"userCode": _this.$store.state.user.userCode,
								"productCode": val.query.code,
								"amount": 1,
								"money": val.pay,
								"allMoney": val.pay,
								"orderType":  4,
								"lessonCode": '',
								"address": ""
							}).then(function(e) {
								let responseData = e.data;
								
								_this.$store.commit('updateLoadingStatus', {isLoading: false});

								if(responseData.errcode != 1) {
									_this.$vux.toast.show({
					          text: responseData.errmsg
					        })
								} else {
									_this.payShow = true;
									_this.pay.allPrice = val.pay;
									_this.pay.list[0].value = responseData.data.order.code;
									_this.pay.list[1].value = val.title;
									_this.pay.list[2].value = 1;
								}
							})
					}
				}
			},
			downloadFile (status) {
				let _this = this;
				_this.$http.post('/wechat/coursewaremobile/buy',
					{
						"customerCode": _this.$store.state.user.userCode,
						"productCode": _this.imgTextData.query.code
					}).then(function(e) {
						_this.$emit('on-data-change', _this.imgTextData, 'download', _this.imgTextInd);
						// window.location = _this.imgTextData.downloadUrl;
					})
			},
			payOrder () {
	    	let _this = this;

				if(!this.user.pay) return false;
				if(!this.loadbar.isLoading) {
					_this.$store.commit('updateLoadingStatus', {isLoading: true});
					_this.payShow = false;
					this.payWeixinOrder(_this.pay.list[0].value);
				}
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	@import '~assets/css/img-text';

	.pay-btn {
		padding: $padding;

		.disabled {
			background: $disabledPay;
		}
	}
	
	
</style>
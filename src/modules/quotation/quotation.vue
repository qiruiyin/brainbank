<!-- 
	经典语录
 -->

<template>
	<div class="quotation" v-cloak>
		<el-headerIndex></el-headerIndex>
	  
		<div class="container">
		  <scroller lock-x :height="-scrollerInfo.offsetBottom + 'px'" @on-scroll-bottom="loadMore" ref="scrollerBottom" :scroll-bottom-offst="200">
		  	<div>
					<el-quotation @on-comment-click="commetClick" :quotation-data="item" v-for="(item, index) in quotationData" :key="index"></el-quotation>

					<el-load-more :load-all="scrollerInfo.loadAll"></el-load-more>
				</div>
			</scroller>
		</div>

		<div v-transfer-dom>
			<popup class="quotation-send" v-model="commentShow" position="bottom">
	      <group label-width="4em" label-margin-right="2em" label-align="right">
		      <x-input placeholder="评论" v-model="commentValue">
		      	<x-button v-if="sendBtn.status" @click.native="submitComment" type="primary" class="send" slot="right" mini>{{ sendBtn.sendStatus ? '发送中' : '发送' }}</x-button>
		      	<x-button v-else type="primary" class="send" slot="right" mini disabled>{{ sendBtn.sendStatus ? '发送中' : '发送' }}</x-button>
		      </x-input>
		    </group>
	    </popup>
	   </div>
	</div>
</template>

<script type="text/babel">
	import { Scroller, LoadMore, Divider, TransferDom, Popup, XInput, XTextarea, Group, XButton } from 'vux'
	import elHeaderIndex from 'components/header/header-index'
	import elQuotation from 'components/quotation/quotation'
	import elLoadMore from 'components/load-more/load-more'

	export default {
		directives: {
	    TransferDom
	  },
		components: { Scroller, Popup, XInput, XTextarea, Group, XButton, elQuotation, elHeaderIndex, elLoadMore },
		data () {
			return {
				title: "经典语录",
				quotationInfo: {
					pageSize: 1,
					pageCount: this.wordBook.pageCount
				},
				scrollerInfo: {
					offsetBottom: 120,
					onfetching: false,
					loadAll: false, // 是否加载完
				},
				quotationData: [
					// {
					// 	title: '',
					// 	content: '',
					// 	img: [],
					// 	time: '',
					// 	qulikes: 0,
					// 	comments: [
					// 		{
					// 			receiveCode: "",
					// 			receiveName: "",
					// 			sendCode: "",
					// 			sendName: "",
					// 			content: ""
					// 		}
					// 	],
					// 	zans: []
					// }
				],
				commentShow: false,
				commentValue: "",
				commentCurrentClick: "",
				sendBtn: {
					status: false,
					value: "default",
					sendStatus: false // 是否在调用接口
				}
			}
		},
		watch: {
			commentValue (newValue, oldValue) {
				if(newValue == "") {
					this.sendBtn.status = false;
					this.sendBtn.value = 'default';
				} else {
					this.sendBtn.status = true;
					this.sendBtn.value = 'primary';
				}
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;

				_this.$http.post('/wechat/quotationsmobile/list ',
					{
						pageSize: _this.quotationInfo.pageSize,
						pageCount: _this.quotationInfo.pageCount,
						userCode: _this.$store.state.user.userCode
					}).then(function(e) {
						let responseData = e.data.data,
								list = [];
						if(e.data.errcode == 1) {
							if(responseData && responseData.list) {
								if(responseData.list.length > 0) {
									list = responseData.list.map(function(item, index){
										let img = [];
										if(item.img.length > 0)
											img = item.img.map(function(it, ind){
												return {
													src: _this.resolveImg(it),
													style: {
														backgroundImage: "url(" + _this.resolveImg(it) + ")"
													},
												}
											});

										return {
											code: item.code,
											comments: item.comments,
											content: item.content,
											id: item.id,
											img: img,
											qulikes: item.qulikes,
											time: item.time,
											title: item.title,
											zans: item.zans
										}
									});
								}

								if(_this.quotationInfo.pageSize == 1){
									_this.quotationData = list;
								} else {
									_this.quotationData = _this.quotationData.concat(list);
								}
							}

							if(list.length < _this.quotationInfo.pageCount) {
								_this.scrollerInfo.loadAll = true;
							}

							_this.quotationInfo.pageSize++;

						} else {
							_this.$vux.alert.show({
								content: e.data.errmsg
							})
						}
						
						_this.resetView();
						_this.scrollerInfo.onFetching = false;					
					})
			},
			resetView () {
				let _this = this;
				_this.$nextTick(() => {
          _this.$refs.scrollerBottom.reset()
        })
			},
			commetClick (val) {
				this.commentShow = true;
				this.commentCurrentClick = val
			},
			submitComment () {
				let _this = this;
				if(!_this.sendBtn.status) return false;
				if(_this.sendBtn.sendStatus) return false;
				_this.sendBtn.sendStatus = true;
				
				_this.$http.post('/wechat/quotationsmobile/addComment',
					{
						userCode: _this.$store.state.user.userCode, //用户code
						code: _this.commentCurrentClick.code, // 语录code
						parentCode: _this.commentCurrentClick.commentInfo.code, // 评论code
						content: _this.commentValue
					}).then(function(e) {
						_this.commentValue = "";
						let responseData = e.data.data;
						
						_this.sendBtn.sendStatus = false;
						_this.commentShow = false;

						if(responseData.tag == 1) {
							_this.$vux.toast.show({
								text: "评论成功",
								onHide () {
									// _this.$router.go(0)
								}
							});
						} else {
							_this.$vux.toast.show({
								text: e.data.errmsg
							});
						}
					})
			},
			cancelComment () {
				this.commentShow = false
			},
			loadMore () {
				if(this.scrollerInfo.onFetching || this.scrollerInfo.loadAll) {

				} else {
					this.scrollerInfo.onFetching = true;					
					this.fetchData();
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.quotation-send {
		.weui-cell {
			padding: 24px 15px;
		}

		.weui-cells {
			margin-top: 0;
			background-color: $quotationSendBtnBackground;

			&:before {
				border-top-color: $quotationSendBtnBorderTop;
			}
		}

		.weui-cell__bd {
			@include halfpxline(0, $quotationSendBtnBorderBottom, 0 , 0, 1px, 0);
			margin-right: $padding;
		}

		.weui-input {
			line-height: 36px;
	    height: 36px;
		}
	}	
</style>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.quotation {
		// width: 100%;
		// height: 100%;
	}

	.container {
		// width: 100%;
		// height: 100%;
	}
	
	.comment-card {
		padding: 3px 0;
	}

	.btns {
		padding: $padding;
	}

</style>
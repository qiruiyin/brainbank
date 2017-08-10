<!-- 
	经典语录
 -->

<template>
	<div class="quotation">
		<el-headerIndex></el-headerIndex>
		
		<div class="container">
			<el-quotation @on-comment-click="commetClick" :quotation-data="item" v-for="(item, index) in quotationData" :key="index"></el-quotation>
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
	import { TransferDom, Popup, XInput, Group, XButton, Toast } from 'vux'
	import elHeaderIndex from 'components/header/header-index'
	import elQuotation from 'components/quotation/quotation'

	export default {
		directives: {
	    TransferDom
	  },
		components: { Popup, XInput, Group, XButton, Toast, elQuotation, elHeaderIndex },
		data () {
			return {
				title: "经典语录",
				count: this.wordBook.pageCount,
				quotationData: [
					{
						title: '',
						content: '',
						img: [],
						time: '',
						qulikes: 0,
						comments: [
							{
								receiveCode: "",
								receiveName: "",
								sendCode: "",
								sendName: "",
								content: ""
							}
						],
						zans: []
					}
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
				let _this = this,
						goodsCode = _this.$route.params.goodsCode;

				_this.$http.post('/wechat/quotationsmobile/list ',
					{
						pageSize: 1,
						pageCount: _this.count,
						userCode: _this.$store.state.user.userCode
					}).then(function(e) {
						let responseData = e.data.data;
						if(responseData && responseData.list) {
							_this.quotationData = responseData.list.map(function(item, index){
								let img = [];
								if(item.img.length > 0)
									img = item.img.map(function(it, ind){
										return {
											src: _this.resolveImg(it)
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
					})
			},
			commetClick (val) {
				this.commentShow = true;
				// if(val) {
					this.commentCurrentClick = val
				// }
			},
			submitComment () {
				let _this = this;
				if(!_this.sendBtn.status) return false;
				if(_this.sendBtn.sendStatus) return false;
				_this.sendBtn.sendStatus = true;

				console.log(_this.commentCurrentClick);
				
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
			}
		}
	}
</script>

<style lang="scss">
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.quotation-send {
		.weui-cells {
			margin-top: 0;
		}

		.weui-cell__bd {
			@include halfpxline(0, $colorGreen, 0 , 0, 1px, 0);
			margin-right: $padding;
		}
	}	
</style>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	$userImgW: $headerContentH;

	.quotation-list {
		padding: $padding;
		display: flex;
	}

	.user-img {
		width: $userImgW;
		height: $userImgW;
		border-radius: $userImgW;
	}

	.block {
		flex: 1;
		padding-left: $padding;
	}

	.block-header {
		padding-bottom: $padding;
	}

	.block-title {
		font-size: 18px;
		color: $fontColorBlack;
	}

	.block-header-content {
		padding: $padding 0;
	}

	.block-header-footer {
		position: relative;
		@extend %clearfix;	
	}

	.block-time {
		float: left;
	}

	.block-btns {
		position: relative;
		float: right;
		height: 30px;
		overflow: hidden;

		&.active {
			width: 180px;
			transition: 1s;
		}

		.block-btns-content {
			position: absolute;
			top: 50%;
			right: 30px;
			width: 140px;
			height: 100%;
			line-height: 30px;
			margin-top: -15px;
			background: #999;
			color: #fff;
			border-radius: $borderRadius;
			text-align: center;

			.fa {
				float: left;
				line-height: 30px;
				width: 50%;
				letter-spacing: .4em;
			}
		}
	}
	
	.block-content {
		padding: $padding;
		border-radius: $borderRadius;
		background-color: #999;
		color: #fff;
	}

	.zan-list {
		position: relative;
		padding-bottom: $padding;

		span {
			line-height: 1.35;
			padding-left: 5px;
		}
	}

	.comment-card {
		padding: 3px 0;
	}

	.btns {
		padding: $padding;
	}

</style>
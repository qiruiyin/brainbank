<!-- 
	经典语录
 -->

<template>
	<div class="quotation">
		<el-headerIndex></el-headerIndex>
		
		<div class="container">
			<!-- <section class="quotation-list" > -->
			<el-quotation @on-comment-click="commetClick" :quotation-data="item" v-for="(item, index) in quotationData" :key="index"></el-quotation>
			<!-- </section> -->
		</div>

		<div v-transfer-dom>
			<popup v-model="commentShow" position="bottom">
	      <group label-width="4em" label-margin-right="2em" label-align="right">
		      <x-input placeholder="评论" v-model="commentValue"></x-input>
		    </group>
				
				<div class="btns">
					<x-button type="primary" @click.native="submitComment">确定</x-button>
					<x-button @click.native="cancelComment">取消</x-button>
				</div>
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
						title: '苏引华',
						content: '以帮助学员实现梦想，突破发展瓶颈为己任，直指核心？',
						img: [],
						time: '4小时前',
						qulikes: 0,
						comments: [
							{
								receiveCode: "qeqw",
								receiveName: "赵龙",
								sendCode: "111",
								sendName: "张飞",
								content: "汉武帝偶尔玩哈佛我佛好好玩覅偶和服务我购房户我哦和我"
							},{
								receiveCode: "qeqw",
								receiveName: "赵龙",
								sendCode: "111",
								sendName: "张飞",
								content: "汉武帝偶尔玩哈佛我佛好好玩覅偶和服务我购房户我哦和我"
							},{
								receiveCode: "qeqw",
								receiveName: "赵龙",
								sendCode: "111",
								sendName: "张飞",
								content: "汉武帝偶尔玩哈佛我佛好好玩覅偶和服务我购房户我哦和我"
							}
						],
						zans: ["球球", "找零", "神奇的人", "找零", "神奇的人", "找零", "神奇的人", "找零", "神奇的人"]
					}
				],
				commentShow: false,
				commentValue: "",
				commentCurrentClick: ""
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
				
				_this.$http.post('/wechat/quotationsmobile/addComment',
					{
						userCode: _this.$store.state.user.userCode, //用户code
						code: _this.commentCurrentClick.code, // 语录code
						parentCode: _this.commentCurrentClick.commentInfo.code && _this.commentCurrentClick.commentInfo.code, // 评论code
						content: _this.commentValue
					}).then(function(e) {
						_this.commentValue = "";
						let responseData = e.data.data;
						
						_this.commentShow = false;

						if(responseData.tag == 1) {
							_this.$vux.toast.show({
								text: "评论成功"
							});
						} else {
							_this.$vux.toast.show({
								text: "评论失败"
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

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.quotation-list {
		padding: $padding;
		display: flex;
	}

	.user-img {
		width: 60px;
		height: 60px;
		border-radius: 60px;
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
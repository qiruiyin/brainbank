<!-- 
	消息组件
 -->

<template>
	<div :class="['el-msg-info-block', {'right': infoData.status == 2 }]" v-cloak>
		<div class="el-msg-info-block-img">
			<img v-if="infoData.msgType == 3" :src="infoData.img" alt="">		
			<img v-if="infoData.msgType == 2" :src="imgOrder" alt="">		
			<img v-if="infoData.msgType == 1" :src="imgSys" alt="">		
		</div>
		
		<div class="el-msg-info-block-content">
			<div class="quotation-info">
				<p :class="['quotation-info-content', { 'active': msgBtn, 'is-read': infoData.msgStatus == '1' }]" v-html="quotationTransContent(infoData.content)"></p>
				<div v-if="msgBtn" class="msg-btn">删除</div>
			</div>
			<div>
				<span>{{ infoData.time }}</span>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">

	import imgOrder from "assets/img/icon/msg-order.png"
	import imgSys from "assets/img/icon/msg-sys.png"

	export default {
		name: "elMsg",
		props: ['infoData'],
		data () {
			return {
				imgSys: imgSys,
				imgOrder: imgOrder,
				data: {
					img: "",
					content: "",
					status: "",
					msgType: "",
					time: ""
				},
				timeLong: 1000,
				timeEvent: 0,
				msgBtn: false
			}
		},
		mounted () {
			// let _this = this;
			// document.querySelector("body").addEventListener("touchstart", function (argument) {
			// 	if(_this.msgBtn) {
			// 		setTimeout(function(argument) {
			// 			_this.msgBtn = false;
			// 		}, 500)
			// 	}
			// })
			
			// this.$nextTick(function () {
			// 	let obj = document.querySelector(".quotation-info-content");
			// 	obj.addEventListener("touchstart",function(e){
			// 		_this.timeEvent = setTimeout(_this.longPress, _this.timeLong);
			// 	});
			// 	obj.addEventListener("touchend",function(e){
			// 		clearTimeout(_this.timeEvent);//清除定时器   
			// 		_this.timeEvent = 0;
			// 	});
			// 	obj.addEventListener("touchmove",function(e){
			// 		clearTimeout(_this.timeEvent);//清除定时器   
			// 		_this.timeEvent = 0;
			// 	});
			// })
		},
		methods: {
			longPress () {
				this.msgBtn = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	$elMsgInfoBlockImgW: 50px;
	$elMsgInfoBlockAngleW: 10px;
	$elMsgInfoBlockColor: #a2e759;

	$elMsgPaddingTop: 15px;

	.el-msg-info-block {
		position: relative;
		padding: $elMsgPaddingTop $padding * 2 + $elMsgInfoBlockImgW 0;

		&:last-child {
			padding-bottom: $elMsgPaddingTop;
		}

		&.right {
			.el-msg-info-block-img {
				left: auto;
				right: $padding;
			}

			.el-msg-info-block-content {

				.msg-btn {
					left: auto;
					right: 30px;
				}

				p {
					float: right;
					background: $elMsgInfoBlockColor;
    			word-break: break-word;
    			user-select: initial;
					
					&:before {
						left: 100%;
						margin-left: -$elMsgInfoBlockAngleW/2;
						transform: rotate(45deg);
						border-top-color: $elMsgInfoBlockColor;
					}

					&:after {
						content: "未读";
						position: absolute;
						right: 100%;
						bottom: 0;
						width: 3em;
						line-height: 1.75;
						margin-right: 10px;
						font-size: 12px;
						color: #fff;
						text-align: center;
						border-radius: $borderRadius;
						background: $colorGrayDisabled;
					}

					&.is-read {
						&:after {
							content: "已读";
						}
					}
				}

				div {
					float: right;
				}
			}
		}
	}

	.el-msg-info-block-img {
		position: absolute;
		left: $padding;
		width: $elMsgInfoBlockImgW;
		height: $elMsgInfoBlockImgW;

		img {
			width: 100%;
			height: 100%;
			border-radius: $elMsgInfoBlockImgW/2;
		}
	}

	.el-msg-info-block-content {
		position: relative;
		@extend %clearfix;

		.quotation-info {
			position: relative;
		}
		
		.msg-btn {
			position: absolute;
			top: -12px;
			left: 30px;
			padding: 0 1em;
			line-height: 26px;
			background-color: #000;
			color: #fff;
			border-radius: $borderRadius;

			&:before {
				content: "";
				position: absolute;
				top: 20px;
				left: 10px;
				width: 0;
		    height: 0;
		    border-top: $elMsgInfoBlockAngleW solid #000;
	    	border-left: $elMsgInfoBlockAngleW solid transparent;
	    	transform: rotate(135deg);
			}
		}

		.quotation-info-content {
			position: relative;
			float: left;
			padding: $padding;
			margin-top: 4px;
			background: #fff;
			border-radius: $borderRadius;
			color: $fontColorBlack;
			text-align: justify;
			display: inline-block;

			&:before {
				content: "";
				position: absolute;
				top: $elMsgInfoBlockAngleW;
				left: - $elMsgInfoBlockAngleW/2;
				width: 0;
		    height: 0;
		    border-top: $elMsgInfoBlockAngleW solid #fff;
	    	border-left: $elMsgInfoBlockAngleW solid transparent;
	    	transform: rotate(225deg);
			}



			&.active {
			}
		}
		
		& > div {
			float: left;
			width: 100%;
			text-align: center;
		}

		span {
			line-height: 20px;
			padding: 0 .5em;
			margin: 0 auto;
			margin-top: $elMsgPaddingTop;
			font-size: 12px;
			color: #fff;
			background: $colorGrayDisabled;
			border-radius: $borderRadius;
			display: inline-block;
		}
	}
</style>
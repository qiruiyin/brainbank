<!-- 
	经典语录
 -->

<template>
	<div class="quotation-list">
		<img class="user-img" src="~assets/img/user.png" alt="">
		<div class="block">
			<div class="block-header">
				<div class="block-title">{{ quotationData.title }}</div>
				<div class="block-header-content">{{ quotationData.content }}</div>
				<div :class="['block-img', {'block-img-2': quotationData.img.length == 2 || quotationData.img.length == 4, 'block-img-3': quotationData.img.length == 3 || quotationData.img.length > 4}]">
					<img v-for="(imgItem, imgIndex) in quotationData.img" :src="imgItem.src" alt="" :key="imgItem"  @click="show(imgIndex)">
					<div v-transfer-dom>
			      <previewer :list="quotationData.img" ref="previewer"></previewer>
			    </div>
				</div>
				<div class="block-header-footer">
					<div class="block-time">{{ quotationData.time }}</div>
					<div :class="['block-btns', {'active': btnStatus}]" @click="showBtns">
						<div class="show-btn fa fa-commenting-o"></div>
						<div class="block-btns-content">
							<div @click="btnZan" v-if="quotationData.qulikes == 1" class="fa fa-heart-o">赞</div>
							<div @click="btnZan" v-else class="fa fa-heart">取消赞</div>
							<div @click="btnComment(quotationData.code)" class="fa fa-commenting-o">评论</div>
						</div>
					</div>
				</div>
			</div>
			<div class="block-content" v-if="quotationData.zans.length > 0 || quotationData.comments.length > 0">
				<div class="zan-list fa fa-heart-o" v-if="quotationData.zans.length > 0">
					<span v-for="(zanItem, zanIndex) in quotationData.zans" :key="zanIndex">
						<template v-if="zanIndex == 0">{{ zanItem.name }}</template>
						<template v-else>，{{ zanItem.name }}</template>
					</span>	
				</div>

				<div class="comment-list" v-if="quotationData.comments.length > 0">
					<div @click="btnComment(quotationData.code, commentItem)" class="comment-card" v-for="(commentItem, commentIndex) in quotationData.comments" :key="commentIndex">
						<div class="comment-card-header">
							{{ commentItem.sendName }}
							<template v-if="commentItem.receiveCode">
								<span>回复</span>
								{{ commentItem.receiveName }}
							</template>：{{ commentItem.content }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import { TransferDom, Popup, Previewer  } from 'vux'

	export default {
		props: ["quotationData"],
		directives: {
	    TransferDom
	  },
		components: { 
			Popup, Previewer
		},
		data () {
			return {
				title: "经典语录",
				btnStatus: false,
				quotationList: {
					code: "",
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
				},
			}
		},
		methods: {
			show (index) {
	      this.$refs.previewer.show(index)
	    },
			showBtns () {
				if(!this.isLogin()) return false;
				this.btnStatus = !this.btnStatus;
			},
			btnZan () {
				let _this = this;
				if(this.quotationData.qulikes == 0 ){
					this.quotationData.qulikes = 1;	
					this.quotationData.zans.push({
						name: this.$store.state.user.name,
						code: this.$store.state.user.userCode
					});

					_this.$http.post('/wechat/quotationsmobile/like',
						{
							code: _this.quotationData.code,
							userCode: _this.$store.state.user.userCode
						}).then(function(e) {

						})
				} else {
					this.quotationData.qulikes = 0;
					let ind = -1;
					this.quotationData.zans.map(function(item, index){
						if(item.code == _this.$store.state.user.userCode){
							ind = index;
						}
					})
					// let index = this.quotationData.zans.indexOf(this.$store.state.user.name);
					if (ind > -1) {
						this.quotationData.zans.splice(ind, 1);
					}
					_this.$http.post('/wechat/quotationsmobile/unlike',
						{
							code: _this.quotationData.code,
							userCode: _this.$store.state.user.userCode
						}).then(function(e) {

						})
				}
			},
			btnComment (code, commentInfo = "") {
				if(!this.isLogin()) return false;
				this.$emit("on-comment-click", {code: code, commentInfo: commentInfo});
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
	
	.block-img {
		@extend %clearfix;
		padding-bottom: $padding;

		img {
			float: left;
			width: 100%;
		}
	}

	.block-img-2 {
		img {
			width: 50%;
		}
	}

	.block-img-3 {
		img {
			width: 33.3%;
		}	
	}

	.block-header-footer {
		position: relative;
		@extend %clearfix;
		height: 30px;
	}

	.block-time {
		float: left;
	}

	.block-btns {
		position: absolute;
		top: 0;
		right: 0;
		width: 20px;
		height: 30px;
		line-height: 30px;
		overflow: hidden;
		transition: 1s;

		&.active {
			width: 180px;
		}

		.show-btn {
			position: absolute;
			top: 0;
			right: 0;
			width: 30px;
			height: 100%;
	    line-height: 25px;
			text-align: right;
		}

		.block-btns-content {
			position: absolute;
			top: 50%;
			right: 26px;
			width: 142px;
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
				padding: 0 .4em;
				text-align: center;
				letter-spacing: .2em;
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
		// padding-bottom: $padding;

		span {
			line-height: 1.35;
			padding-left: 5px;
		}
	}

	.comment-card {
		padding: 3px 0;
	}
</style>
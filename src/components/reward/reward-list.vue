<!-- 
	打赏记录
 -->

<template>
	<div class="reward-list" v-cloak>
		<div class="reward-list-header">
			<img src="~assets/img/icon/reward.png" alt="">打赏记录
		</div>

		<div class="reward-list-content">
			<template v-if="rewardData.list.length > 0">
				<div class="reward-block" v-for="(item, index) in rewardData.list" :key="index">
					<img :src="item.img" alt="">
					<div><label>{{ item.name }}</label>打赏了<span>{{ item.money }}元</span></div>
					<p>{{ item.time }}</p>
				</div>
				<div @click="showMore" v-if="!rewardData.loadAll" class="show-more fa fa-angle-down">查看更多评论</div>
				<divider v-else>没有更多数据</divider>
			</template>
			
			<div v-else class="reward-block-none">快来打赏吧</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import { LoadMore, Divider} from 'vux'
	export default {
		name: "rewardList",
		components: {
			Divider
		},
		props: ["rewardCode"],
		data () {
			return {
				rewardData: {
					onFetching: false,
					loadAll: false,
					pageSize: 1,
					pageCount: this.wordBook.pageCount,
					list: []
				},
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;
				

				this.$http.post('/wechat/orderSpare/history',
						{
							"code": _this.rewardCode,
							"pageSize": _this.rewardData.pageSize,
							"pageCount": _this.rewardData.pageCount,
						}
					).then(function(e) {
						let list = [];
						if(e.data.errcode == 1) {
							if(e.data.data.list.length > 0) {
								list = e.data.data.list.map(function(item, index){
									return {
										img: item.header,
										name: item.name,
										money: item.pay_money,
										time: item.time
									}
								})

								if(_this.rewardData.pageSize == 1) {
									_this.rewardData.list = list;
								} else {
									_this.rewardData.list = _this.rewardData.list.concat(list);
								}
							}

							_this.rewardData.pageSize++;
							if(list.length < _this.rewardData.pageCount) {
								_this.rewardData.loadAll = true;
							}
						} else {
							_this.$vux.alert.show({
								content: e.data.errmsg
							})
						}

						console.log(_this.rewardData.list);
						_this.rewardData.onFetching = false;
					})
			},
			showMore () {
				let _this = this;
				if(_this.rewardData.onFetching || _this.rewardData.loadAll) {

				} else {
					_this.rewardData.onFetching = true;
					_this.fetchData();
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	$rewardListH: 40px;
	$rewardListImgW: 28px;
	$rewardListImgH: 15px;
	$rewardListIconW: 30px;

	.reward-list {
		border-top: $uiMarginH solid $uiMarginBg;
	}

	.reward-list-header {
		@include halfpxline(0, $borderColor, 0 , 0, 1px, 0);
		padding: ($rewardListH - $rewardListImgH)/2 $padding;
		line-height: $rewardListImgH;
		font-size: 16px;
		color: $fontColorBlack;
		text-align: left;
		text-indent: .5em;

		img {
    	float: left;
			width: $rewardListImgW;
			height: $rewardListImgH;
			display: block;
		}
	}

	.reward-list-content {

	}

	.reward-block {
		@include halfpxline(0, $borderColor, 0 , 0, 1px, 0);
		padding: $paddingTop $padding 0;
		display: flex;
		line-height: $rewardListIconW;
		font-size: 12px;
		color: #999;

		&:last-child {
			padding-bottom: $paddingTop;
		}

		img {
			width: $rewardListIconW;
			height: $rewardListIconW;
			border-radius: $rewardListIconW/2;
		}

		div {
			flex: 1;
		}

		label, span {
			margin: 0 .2em;
		}
		
		label {
			float: left;
			@include ellipsisOne();
			max-width: 7em;
			color: #59748f;
			display: block;
		}

		span {
			color: $colorOrange;
		}

		p {
			width: 10em;
			text-align: right;
		}
	}

	.reward-block-none {
		padding: $paddingTop $padding $paddingTop+ 40px;
		text-align: center;
	}

	.show-more {
		width: 100%;
		text-align: center;
		padding: $paddingTop $padding $paddingTop+ 40px;
	}
</style>
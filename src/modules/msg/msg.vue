<!-- 
	消息页面
 -->

<template>
	<div class="msg" v-cloak>
		<div class="msg-group">
			<el-msg :data-msg="orderInfo"></el-msg>
			<el-msg :data-msg="sysInfo"></el-msg>
		</div>

		<div class="msg-group group-pengyou" ref="group" v-if="pengyou.list.length > 0">
			<scroller class="scroller" lock-x :height="-offsetBottom + 'px'" @done-pulldown="donePulldown" @on-pulldown-loading="onPulldownLoading" @on-pullup-loading="onPullupLoading" ref="scrollerBottom" :scroll-bottom-offst="200" :use-pulldown="true" :use-pullup="true" :pulldown-config="pulldownConfig" :pullup-config="pullupConfig">
				<div>
					<el-msg :data-msg="item" v-for="(item, index) in pengyou.list" :key="index"></el-msg>
					
					<!-- <el-load-more :load-all="pengyou.loadAll"></el-load-more> -->
				</div>
			</scroller>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Scroller, LoadMore } from 'vux'
	import elLoadMore from 'components/load-more/load-more'
	import elMsg from "components/msg/msg"

	import imgOrder from "assets/img/icon/msg-order.png"
	import imgSys from "assets/img/icon/msg-sys.png"

	export default {
		name: "msg",
		components: {
			Scroller, LoadMore, elMsg, elLoadMore
		},
		data () {
			return {
				orderInfo: {
					img: imgOrder,
					title: "订单通知",
					time: "",
					status: "1",
					content: "",
					sendUser: "",
					msgType: "2"
				},
				sysInfo: {
					img: imgSys,
					title: "系统通知",
					time: "",
					status: "1",
					sendUser: "",
					content: "",
					msgType: "1"
				},
				pengyou: {
					scrollH: 0, // 初始scroll高度
					onFetching: false, // 是否在加载数据
					loadAll: false, // 是否加载完
					pageSize: 1,
					pageCount: this.wordBook.pageCount,
					oldTime: "",
					list: []
				},
				scrollH: 0, // 初始scroll高度
				offsetBottom: this.$route.query.msgType == 3 ? 70 : 0, // 距底部高度
				pulldownConfig: {
					content: '',
					downContent: '',
					upContent: '',
					loadingContent: '正在加载'
				},
				pullupConfig: {
					content: '',
					downContent: '',
					upContent: '',
					loadingContent: '正在加载'
				},
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;
				this.getSys();
				this.getPengyou(true);
			},
			getSys () {
				let _this = this;

				this.$http.post('/wechat/message/index',
					{
						openId: _this.$store.state.user.openId
					}
				).then(function(e) {
					let responseData = e.data.data;

					if(e.data.errcode == 1) {
						if(responseData.orderList) {
							_this.orderInfo.time = responseData.orderList.time;
							_this.orderInfo.content = responseData.orderList.content;
							_this.orderInfo.status = responseData.orderList.msg_status;
							_this.orderInfo.msgType = responseData.orderList.msg_type;
						}

						if(responseData.sysList) {
							_this.sysInfo.time = responseData.sysList.time;
							_this.sysInfo.content = responseData.sysList.content;
							_this.sysInfo.status = responseData.sysList.msg_status;
							_this.sysInfo.msgType = responseData.sysList.msg_type;
						}
					} else {
						_this.$vux.alert.show({
							content: e.data.errmsg
						})
					}
				});
			},
			getPengyou (status) {
				// status: true 加载最新， false 加载分页记录
				let _this = this,
						pageSize = _this.pengyou.pageSize,
						createTime = _this.pengyou.oldTime;

				_this.pengyou.onFetching = true;

				if(status) {
					pageSize = 1;
					createTime = "";
				}

				this.$http.post('/wechat/message/userIndex',
						{
							openId: _this.$store.state.user.openId,
							pageSize: pageSize,
							pageCount: _this.pengyou.pageCount,
							createTime: createTime
						}
					).then(function(e) {
						let responseData = e.data.data,
								list = [];
						if(e.data.errcode == 1) {
							if(responseData.userList && responseData.userList.length > 0) {
								list = responseData.userList.map(function(item, index){
									return {
										img: _this.resolveImg(item.header),
										title: item.name,
										time: item.time,
										createTime: item.createTime,
										status: item.msg_status,
										content: item.content,
										msgType: item.msg_type,
										sendUser: item.send_user
									}
								})
							}

							if(pageSize == 1) {
								_this.pengyou.oldTime = list[0].createTime;
								_this.pengyou.list = list;
								_this.pengyou.pageSize = 2;
								_this.pengyou.loadAll = false;
							} else {
								_this.pengyou.pageSize++;
								_this.pengyou.list = _this.pengyou.list.concat(list);
							}

							if(list.length < _this.pengyou.pageCount) {
								_this.pengyou.loadAll = true;
							}
						} else {
							_this.$vux.alert.show({
								content: e.data.errmsg
							})
						}

						_this.pengyou.onFetching = false;
						if(!status) {
							_this.$refs.scrollerBottom.donePullup();
						} else {
							_this.$refs.scrollerBottom && _this.$refs.scrollerBottom.donePulldown();
						}
						_this.resetView();
					})
			},
			resetView (status) {
				// status: true 到底部，false：保持当前
				let _this = this;
				_this.$nextTick(() => {
				  _this.$refs.scrollerBottom.reset()
				})
			},
			onPulldownLoading () {
	      if (this.pengyou.onFetching) {
	        // do nothing
	      } else {
	        this.pengyou.onFetching = true
					this.getPengyou(true);
	      }
	    },
	    onPullupLoading (){
	    	if (this.pengyou.onFetching || this.pengyou.loadAll) {
	        // do nothing
					this.$refs.scrollerBottom.donePullup();
	      } else {
		    	this.pengyou.onFetching = true;
					this.getPengyou(false);
				}
	    },
	    donePulldown () {
	    	console.log(111);
	    },
	    donePullup () {
	    	console.log(111);
	    },
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	.msg {

	}

	.msg-group {
		border-bottom: $uiMarginH solid $uiMarginBg;

		&:first-child {
			border-top: $uiMarginH solid $uiMarginBg;
		}
	}

	.group-pengyou {
		position: absolute;
		top: 162px;
		bottom: $containerBottom - $padding;
		left: 0;
		right: 0;
	}
</style>
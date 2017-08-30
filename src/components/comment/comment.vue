<!-- 
	评论
 -->

<template>
	<div class="comment" v-cloak>
		<div class="comment-title">评论
			<div @click="commentClick" class="comment-btn fa fa-commenting-o"></div>
		</div>

		<div class="comment-list">
			<template v-if="commentData.list.length > 0">
				<div class="comment-detail" v-for="(item, index) in commentData.list" :key="index">
					<div class="comment-header">
						<img :src="item.header">
						<div class="title">{{ item.name }}</div>
						<div class="time">{{ item.date }}</div>
					</div>

					<div class="comment-body">
						<p>{{ item.content }}</p>
		        <div class="rater">
		        	<rater v-model="item.rater" slot="value" active-color="#04BE02" disabled></rater>
						</div>
					</div>
				</div>

				<div @click="showMore" v-if="!commentData.loadAll" class="show-more fa fa-angle-down">查看更多评论</div>
				<divider v-else>没有更多数据</divider>
			</template>

			<load-more v-else class="loading" :show-loading="loading.status" :tip="loading.value"></load-more>
		</div>

		<div v-transfer-dom>
      <popup class="comment-popup" v-model="commentStatus" :hide-on-blur=false is-transparent>
        <div class="comment-popup-body">
        	<group>
          	<x-textarea v-model="textareaData"  placeholder="请输入评论"></x-textarea>
			      <cell title="五星好评哦">
			        <rater v-model="rater" slot="value" active-color="#04BE02"></rater>
			      </cell>
         	</group>
         	<div class="btns">
         		<x-button type="primary" @click.native="btnClick">确定</x-button>
          	<x-button type="default" @click.native="btnCancel">取消</x-button>	
         	</div>
          
        </div>
      </popup>
    </div>
	</div>	
</template>

<script type="text/babel">
	import { TransferDom, Popup, Divider, Spinner, XButton, XTextarea, Group, Cell, LoadMore, Toast, Rater } from 'vux'

	export default {
		name: 'comment',
		directives: {
	    TransferDom
	  },
		components: {
			Popup, Group, Divider, Spinner, XButton, XTextarea, Group, Cell, LoadMore, Toast, Rater
		},
		props: [ 'commentCode', 'isComment' ],
		// commentCode 产品code,  isComment是否可评论
		data () {
			return {
				title: '评论',
				textareaData: '',
				rater: 0,
				commentData: {
					onFetching: false,
					loadAll: false,
					pageSize: 1,
					pageCount: this.wordBook.pageCount,
					list: []
				},
				loading: {
					status: false,
					value: 'loading'
				},
				commentStatus: false
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;
				this.$http.post('/wechat/discover/productComment/list',
						{
							productCode: _this.commentCode,
							pagesize: _this.commentData.pageSize,
							pagecount: _this.commentData.pageCount
						}
					).then(function(e) {
						let responseData = e.data.data,
								list = [];

						if(e.data.errcode ==1) {
							if(responseData.list && responseData.list.length > 0) {
								list = responseData.list.map(function(item, index){
									return {
										code: item.code,
										date: item.create_time,
										header: item.header,
										name: item.name,
										rater: item.rank,
										content: item.content
									}
								});
							}

							if(list.length < _this.commentData.pageCount) {
								_this.commentData.loadAll = true;
							}

							if(_this.commentData.pageSize == 1) {
								_this.commentData.list = list;
							} else {
								_this.commentData.list = _this.commentData.list.concat(list);
							}
							_this.commentData.pageSize++;
						} else {
							_this.$vux.alert.show({
								content: e.data.errmsg
							})
						}
						_this.commentData.onFetching = false;
					});
			},
			showMore () {
				let _this = this;
				if(_this.commentData.onFetching || _this.commentData.loadAll) {

				} else {
					_this.commentData.onFetching = true;
					_this.fetchData();
				}
			},
	    commentClick () {
				if(!this.isLogin()) return false;
				if(this.isComment != 1) {
					this.$vux.alert.show({
						content: "购买后才可评论"
					})
				} else {
	    		this.commentStatus = true;
	    	}
	    },
	    btnClick () {
    		let _this = this;
	    	if(this.textareaData != "") {
					this.$http.post('/wechat/discover/productComment/save',
							{
								"customerCode": _this.$store.state.user.userCode,
								"productCode": _this.commentCode,
								"content": _this.textareaData,
								"rank": _this.rater
							}
						).then(function(e) {
							_this.$vux.toast.show({
								text: "评论已发布，审核通过后可查看",
								onHide () {
	    						_this.commentStatus = false;
								}
							})
						});
	    		// this.$emit("on-btn-click", {data: this.textareaData, rater: 3});
	    	} else {
	    		_this.$vux.alert.show({
	    			content: "请输入评论信息"
	    		});
	    	}
	    	this.textareaData = "";
	    	this.rater = 0;
	    },
	    btnCancel () {
	    	this.commentStatus = false;
	    }
		}
	}
</script>

<style lang="scss">
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.comment-popup-body {
		.weui-cells {
			border-radius: $borderRadius $borderRadius 0 0;
		}
	}
</style>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

  $commentImgW: 22px;
  $commentHeaderBg: #f3f3f3;
	
	.comment-btn {
		float: right;
	}

	.comment-list {

	}

	.comment-title {
		padding: $padding;
		font-size: 18px;
		background: $commentHeaderBg;
	}

	.comment-detail {
		padding: $padding;
		@include halfpxline(0, $borderColor, 1px, 0, 0, 0);

		&:last-child {
			@include halfpxline(0, $borderColor, 1px, 0, 1px, 0);			
		}
	}

	.comment-header	{
		height: $commentImgW + 8px;
		line-height: $commentImgW;
		@include halfpxline(0, $borderColor, 0, 0, 1px, 0);

		img {
			float: left;
			width: $commentImgW;
			height: $commentImgW;
			border-radius: $commentImgW;
			border: 0;
		}

		.title {
			float: left;
			padding-left: .5em;
			font-size: 16px;
			@include ellipsisOne();
		}

		.time {
			float: right;
			color: #999;
		}
	}

	.comment-body {
		padding: $padding;

		p {
			padding-bottom: $padding;
		}

		.rater {
			// padding
		} 
	}

	.btn, .btns {
		padding: $padding;
	}

	.comment-popup {
		padding-top: $padding;
		margin-bottom: $padding;
	}

	.comment-popup-body {
		width: 95%;
		margin: 0 auto;
		background: #fff;
		border-radius: $borderRadius;
	}
</style>
<!-- 
	评论
 -->

<template>
	<div class="comment">
		<div class="comment-title">评论
			<div @click="commentClick" class="comment-btn fa fa-commenting-o"></div>
		</div>

		<div class="comment-list">
			<div class="comment-detail" v-for="(item, index) in commentList" :key="index">
				<div class="comment-header">
					<img :src="item.header">
					<div class="title">{{ item.name }}</div>
					<div class="time">{{ item.date }}</div>
				</div>

				<div class="comment-body">
					<p>{{ item.content }}</p>
	        <div class="rater">
	        	<rater v-model="item.rater" slot="value" active-color="#04BE02"></rater>
					</div>
				</div>
			</div>
			<load-more class="loading" :show-loading="loading.status" :tip="loading.value"></load-more>
		</div>

		<div v-transfer-dom>
      <popup class="comment-popup" v-model="commentStatus" :hide-on-blur=false is-transparent>
        <div class="comment-popup-body">
        	<group>
          	<x-textarea v-model="textareaData"  placeholder="请输入评论" @on-focus="onEvent('focus')"></x-textarea>
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
		props: [ 'commentData' ],
		data () {
			return {
				title: '评论',
				textareaData: '',
				rater: 0,
				commentList: [
					{
						header: '',
						name: '',
						content: '',
						date: ''
					}
				],
				loading: {
					status: false,
					value: 'loading'
				},
				commentStatus: false
			}
		},
		mounted () {
			let productCode = this.commentData.productCode,
					pagesize = this.commentData.pagesize,
					pagecount = this.commentData.pagecount;
			this.fetchData(productCode, pagesize, pagecount);
		},
		methods: {
			fetchData (productCode, pagesize, pagecount) {
				let _this = this;
				this.$http.post('/wechat/discover/productComment/list',
						{
							productCode: productCode,
							pagesize: pagesize,
							pagecount: pagecount
						}
					).then(function(e) {
						let responseData = e.data.data;

						if(responseData.list) {
							_this.commentList = responseData.list.map(function(item, index){
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
					});
			},
			onScrollBottom () {
	      if (this.onFetching) {
	        // do nothing
	      } else {
	        this.onFetching = true
	        setTimeout(() => {
	          this.bottomCount += 10
	          this.$nextTick(() => {
	            this.$refs.scrollerBottom.reset()
	          })
	          this.onFetching = false
	        }, 2000)
	      }
	    },
	    onEvent (event) {
	      console.log('on', event)
	    },
	    commentClick () {
				if(!this.isLogin()) return false;
	    	this.commentStatus = true;
	    },
	    btnClick () {
    		let _this = this;
	    	if(this.textareaData != "") {
					this.$http.post('/wechat/discover/productComment/save',
							{
								"customerCode": _this.$store.state.user.userCode,
								"productCode": _this.commentData.productCode,
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
	    		alert("请输入评论信息")
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
	
	.comment-btn {
		float: right;

	}

	.comment-list {

	}

	.comment-title {
		padding: $padding;
		font-size: 18px;
		background: $bgGray;
	}

	.comment-detail {
		padding: $padding;
		@include halfpxline(0, $borderColor, 1px, 0, 0, 0);

		&:last-child {
			@include halfpxline(0, $borderColor, 1px, 0, 1px, 0);			
		}
	}

	.comment-header	{
		height: 48px;
		line-height: 40px;
		@include halfpxline(0, $borderColor, 0, 0, 1px, 0);

		img {
			float: left;
			width: 40px;
			height: 40px;
			border-radius: 40px;
			border: 0;
		}

		.title {
			float: left;
			padding-left: 1em;
			font-size: 20px;
		}

		.time {
			float: right;
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
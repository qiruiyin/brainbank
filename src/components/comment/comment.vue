<!-- 
	评论
 -->

<template>
	<div class="comment-list">
		<div class="comment-list-title">评论</div>
		<group>
      <x-textarea v-model="textareaData"  placeholder="请输入评论" @on-focus="onEvent('focus')"></x-textarea>
      <cell title="五星好评哦">
        <rater v-model="rater" slot="value" active-color="#04BE02"></rater>
      </cell>
    </group>
    <div class="btn">
    	<x-button type="primary" @click.native="btnClick">确定</x-button>
    </div>
    <div class="comment" v-for="(item, index) in commentList" :key="index">
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
</template>

<script type="text/babel">
	import { Scroller, Divider, Spinner, XButton, XTextarea, Group, Cell, LoadMore, Toast, Rater } from 'vux'

	export default {
		name: 'comment',
		components: {
			Scroller, Divider, Spinner, XButton, XTextarea, Group, Cell, LoadMore, Toast, Rater
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
				}
			}
		},
		mounted () {
			console.log("get")
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
								text: "评论已发布，审核通过后可查看"
							})
						});
	    		// this.$emit("on-btn-click", {data: this.textareaData, rater: 3});
	    	} else {
	    		alert("请输入评论信息")
	    	}
	    	this.textareaData = "";
	    }
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	.comment-list {

	}

	.comment-list-title {
		padding: $padding;
		font-size: 20px;
		background: $bgGray;
	}

	.comment {
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

	.btn {
		padding: $padding;
	}


</style>
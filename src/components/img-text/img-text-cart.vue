<!--
	图文混排 
 -->
<template>
	<div class="img-text" @click="setCheck">
		<check-icon v-if="imgTextData.check" :value.sync="imgTextData.check"></check-icon>
		<img :src="imgTextData.imgPath" alt="图片">
		<div class="img-text-content">
			<div class="title">{{ imgTextData.title }}</div>
			<div class="price" v-if="imgTextData.price">价格：<span>￥{{ imgTextData.price }}</span></div>
			<div class="num" v-if="imgTextData.num">数量：
				<x-number v-if="imgTextData.check" @click.native.stop="numClick" :min="1" class="num-data" v-model="imgTextData.num"></x-number>
				<span v-else>{{ imgTextData.num }}</span>
			</div>

			
		</div>
	</div>
</template>

<script type="text/babel">
	import { XNumber, CheckIcon } from 'vux'

	export default {
		props: ['imgTextData'],
		components: { XNumber, CheckIcon },
		data () {
			return {
			}
		},
		methods: {
			setCheck () {
				this.imgTextData.check = !this.imgTextData.check
				this.$emit('on-check', this.imgTextData.check)
			},
			numClick () {
				let _this = this;
				
				_this.$http.post('/wechat/shop/addCart',
					{
						userCode: _this.$store.state.user.userCode,
						productCode: _this.imgTextData.code,
						shopCount: _this.imgTextData.num
					}).then(function(e) {
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/vars', '~assets/css/core/functions';
	
	$imgTextPadding: 20px;

	.img-text {
		position: relative;
		padding: $imgTextPadding $padding $imgTextPadding;
		background-color: #fff;
		border-bottom: 1px solid $borderColor;
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;

		&.img-text-check {
			// padding-left: px2em(80);
		}

		img {
			width: 100px;
			height: 100%;
			display: block;
		}
	}

	.img-text-content {
	  flex: 1;
		padding-left: $padding;
		line-height: 2;

		.title {
			color: $fontColorBlack;
		}

		.price {

			span {
			}
		}
	}
	
	.checkbox {
		position: absolute;
		top: 50%;
		left: $padding;
	}

	.num-data {
		float: right;
		padding: 0;
	}
</style>
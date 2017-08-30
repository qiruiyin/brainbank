<!-- 
	视频音频订单
 -->

<template>
	<div class="order-audio" v-cloak>
		<!-- <form-preview header-label="付款金额" :header-value="money" :body-items="list"></form-preview> -->
		<el-card-mall class="card-mall-padding" :card-mall-data="orderAudioData"></el-card-mall>
	</div>
</template>

<script type="text/babel">
	import { FormPreview } from 'vux'
	import elCardMall from 'components/card/card-mall'
	
	export default {
		name: "orderAudio",
		components: { FormPreview, elCardMall },
		props: ['orderAudioData'],
		data () {
			return {
				title: "视频音频订单",
				money: "",
				list: [
					{
		        label: '',
		        value: ''
		      },{
		        label: '',
		        value: ''
		      },{
		        label: '',
		        value: ''
		      }
		    ]
			}
		},
		mounted () {
			let _this = this;

			// _this.money = _this.orderAudioData.amount;
			// _this.list[0].value = _this.orderAudioData.code;
			// _this.list[1].value = _this.orderAudioData.name;
			// _this.list[2].value = _this.orderAudioData.time;
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.order-audio {
		padding: $paddingTop $padding;
		background: #fff;
	}

</style>
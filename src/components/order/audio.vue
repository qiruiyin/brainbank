<!-- 
	视频音频订单
 -->

<template>
	<div class="order-audio">
		<form-preview header-label="付款金额" :header-value="money" :body-items="list"></form-preview>
	</div>
</template>

<script type="text/babel">
	import { FormPreview } from 'vux'
	
	export default {
		name: "orderAudio",
		components: { FormPreview },
		props: ['orderAudioData'],
		data () {
			return {
				title: "视频音频订单",
				money: "",
				list: [
					{
		        label: '订单号',
		        value: '电动打蛋机'
		      },{
		        label: '商品名称',
		        value: '名字名字名字'
		      },{
		        label: '时间',
		        value: '很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字'
		      }
		    ]
			}
		},
		mounted () {
			let _this = this;

			_this.money = _this.orderAudioData.amount;
			_this.list[0].value = _this.orderAudioData.code;
			_this.list[1].value = _this.orderAudioData.name;
			_this.list[2].value = _this.orderAudioData.time;
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
</style>
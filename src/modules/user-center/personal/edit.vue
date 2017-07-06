<!-- 
	编辑个人资料
 -->

<template>
	<div class="personal-edit">
		<group>
			<template v-for="item in formDatas">
	    	<x-input v-if="item.key != 'qrcode'" :title="item.title" :placeholder="item.placeholder" v-model="item.value"></x-input>
				<x-input v-else title="发送验证码" class="weui-vcode">
	        <x-button slot="right" type="primary" mini>发送验证码</x-button>
	      </x-input>
			</template>
		</group>

		<div class="btn">
      <x-button @click.native="iconType = 'success'" type="primary">确定</x-button>
    </div>
	</div>
</template>

<script type="text/babel">
	import { XInput, Group, XButton } from 'vux'

	export default {
		components: {
			XInput, Group, XButton
		},
		data () {
			return {
				title: "修改个人资料",
				formDatas: [
					{
						value: '',
						key: 'name',
						title: '姓名',
						placeholder: '请输入您真实姓名' 
					},{
						value: '',
						key: 'phone',
						title: '手机号',
						placeholder: '请输入您的手机号' 
					},{
						value: '',
						key: 'idcard',
						title: '身份证',
						placeholder: '请输入您的身份证号码' 
					},{
						value: '',
						key: 'qq',
						title: 'QQ',
						placeholder: '请输入QQ号码' 
					},{
						value: '',
						key: 'weixin',
						title: '微信',
						placeholder: '请输入微信号码' 
					},{
						value: '',
						key: 'address',
						title: '收货地址',
						placeholder: '请输入收货地址' 
					},{
						value: '',
						key: 'qrcode',
						title: '验证码',
						placeholder: '请输入手机验证码' 
					}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.btn {
		padding: 30px $padding;
	}
</style>
<!-- 
	客户与客户消息页面
 -->

<template>
	<div class="msg-add">
		<group>
			<cell title="收信人" :value="toUser"></cell>
      <x-textarea title="内容" :rows="8" placeholder="请填写消息内容" :max="200" v-model="value"></x-textarea>
    </group>

    <div class="btns">
    	<x-button type="primary" @click.native="submit">确定</x-button>
    </div>
 	</div>
</template>

<script type="text/babel">
	import { XTextarea, Group, Cell, XInput, XButton, Toast } from 'vux'

	export default {
		name: "msgAdd",
		components: {
			XTextarea, Group, Cell, XInput, XButton, Toast
		},
		data () {
			return {
				title: "客户与客户消息页面",
				toUser: this.$store.state.msg.name,
				value: ''
			}
		},
		methods: {
			submit () {
				let _this = this;
				this.$http.post('/wechat/message/reply',
						{
							"receviceCode": _this.$store.state.msg.userCode,
					   	"sendCode": _this.$store.state.user.userCode,
					   	"content": _this.value
						}
					).then(function(e) {
						if(e.data.errcode == 1) {
							_this.$vux.toast.show({
			          text: '消息发送成功',
			        	onHide () {
			        		_this.$router.push({ name: _this.$store.state.msg.url })
			        	}
			        })

						}
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	@import '~assets/css/form';
	

</style>
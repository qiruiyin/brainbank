<!-- 
	编辑个人资料
 -->

<template>
	<div class="dn-form personal-edit" v-cloak>
		<group class="dn-form-group">
			<x-input v-if="editKey == 'name'" @on-change="nameTestNum" :title="name.title" :placeholder="name.placeholder" v-model="name.value">
  			<!-- <label slot="label" class="label icon icon-user">{{ name.title }}</label> -->
  		</x-input>
			
			<x-input v-if="editKey == 'phone'" :title="phone.title" :placeholder="phone.placeholder" v-model="phone.value">
  			<!-- <label slot="label" class="label icon icon-tel">{{ phone.title }}</label> -->
				<el-verification-code :tel="phone.value" code-type="xiugai" slot="right"></el-verification-code>
			</x-input>
			
			<x-input v-if="editKey == 'phone'" type="tel" :max="6" :title="qrcode.title" :placeholder="qrcode.placeholder" v-model="qrcode.value">
  			<!-- <label slot="label" class="label icon icon-qrcode">{{ qrcode.title }}</label> -->
  		</x-input>

			<x-input v-if="editKey == 'weixin'" :title="weixin.title" :placeholder="weixin.placeholder" v-model="weixin.value">
  			<!-- <label slot="label" class="label icon icon-user">{{ name.title }}</label> -->
  		</x-input>
		</group>

		<div class="btn">
      <x-button @click.native="submit" type="primary">确定</x-button>
    </div>
	</div>
</template>

<script type="text/babel">
	import { mapState } from 'vuex'
	import { XInput, Group, XButton, Toast } from 'vux'
	import elVerificationCode from 'components/verification-code/verification-code'

	export default {
		components: {
			XInput, Group, XButton, Toast, elVerificationCode
		},
		data () {
			return {
				title: "修改个人资料",
				btnStatus: false,
				editKey: this.$route.query.key,
				name: {
					value: '',
					key: 'name',
					title: '姓名',
					placeholder: '更新您的姓名',
					isReadonly: false
				},
				idCard: {
					value: '',
					key: 'idcard',
					title: '证件号码',
					placeholder: '请输入您的身份证号码', 
					isReadonly: true
				},
				phone: {
					value: '',
					key: 'phone',
					title: '手机号',
					placeholder: '更新您的手机号',
					isReadonly: false
				},
				qrcode: {
					value: '',
					key: 'qrcode',
					title: '验证码',
					placeholder: '请输入手机验证码', 
					isReadonly: false
				},
				weixin: {
					value: '',
					key: 'weixin',
					title: '微信号',
					placeholder: '更新您的微信号',
					isReadonly: false
				}
			}
		},
		computed: {
	    ...mapState({
        loadbar: state => state.loadbar
	    })
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData() {
				let _this = this;
				this.$http.post('/wechat/usercenter/getCustomerInfo',
						{
							"customerCode": _this.$store.state.user.userCode,
						}
					).then(function(e) {
						let responseData = e.data.data,
								arr = [],
								data;
						if(e.data.errcode == 1) {
							data = responseData.customerInfoList[0];
							_this.name.value = data.NAME;
							_this.idCard.value = data.idcard;
							_this.phone.value = data.mobile;
							_this.weixin.value = data.weixinAccount;
						} else {
							_this.$vux.alert.show({
								content: e.data.errmsg
							})
						}
					}
				);
			},
			submit () {
				let _this = this,
						url = '', // 修改微信号
						query = {}; // 参数
				if(_this.editKey == 'name') {
					if(_this.name.value == "") {
						this.$vux.alert.show({
		          content: _this.name.title + '不能为空',
		        })

		        return;
					}
	        url = '/wechat/usercenter/updateCustomerName';
	        query = {
	        	userCode: _this.$store.state.user.userCode,
	        	name: _this.name.value
	        }
				} else if (_this.editKey == 'phone') {
	        if(_this.phone.value == "") {
						this.$vux.alert.show({
		          content: _this.phone.title + '不能为空',
		        })
		        return;
					} else if (_this.qrcode.value == "") {
						this.$vux.alert.show({
		          content: _this.qrcode.title + '不能为空',
		        })
		        return;
					}
	        url = '/wechat/usercenter/updateCustomerMobile';
	        query = {
	        	userCode: _this.$store.state.user.userCode,
	        	mobile: _this.phone.value,
	        	smsCode: _this.qrcode.value
	        }
				} else if (_this.editKey == 'weixin') {
					if(_this.weixin.value == "") {
						this.$vux.alert.show({
		          content: _this.weixin.title + '不能为空',
		        })
		        return;
					}
					url = '/wechat/usercenter/updateCustomerWxcount', // 修改微信号
					query = {
						userCode: _this.$store.state.user.userCode,
						weixinAccount: _this.weixin.value
					};
				}

				if (!_this.$store.state.loadbar.isLoading) {
					_this.$store.commit('updateLoadingStatus', {isLoading: true})
					this.$http.post(url,
							query
						).then(function(e) {
							_this.$store.commit('updateLoadingStatus', {isLoading: false})
							if(e.data.errcode == 1) {
								_this.$vux.alert.show({
									content: e.data.errmsg,
									onHide () {
										_this.$router.go(-1);
									}
								})
							} else {
								_this.$vux.alert.show({
									content: e.data.errmsg
								})
							}
					})
				}
			}
		}
	}
</script>
<style lang="scss">
	.dn-form.personal-edit .weui-cell__hd {
		width: auto;
	}
</style>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	@import '~assets/css/icon';
	
	.dn-form-group {
		border-top: $uiMarginH solid #fff;
		@include halfpxline(0, $uiMarginBg, 1px, 0, 1px, 0);
	}

	.btn {
		padding: 35px $padding;
	}
</style>
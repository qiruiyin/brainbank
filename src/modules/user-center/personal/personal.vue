<!-- 
	个人信息
 -->

<template>
	<div class="personal">
		<group>
			<cell class="personal-header" title="头像">
				<img slot="after-title" :src="user.img" alt="">
			</cell>
			<cell title="姓名" :value="userData.name" @click.native="goPage('personalEdit', { key: 'name' })" is-link></cell>
			<cell title="证件号码" :value="userData.idCard"></cell>
			<cell title="手机号" :value="userData.phone" @click.native="goPage('personalEdit', { key: 'phone' })" is-link></cell>
			<cell title="微信" :value="userData.weixin" @click.native="goPage('personalEdit', { key: 'weixin' })" is-link></cell>
		</group>

		<group>
			<cell @click.native="checkLogin({name: address.url}, address.click)" :title="address.name" is-link>
        <!-- <i slot="icon" :class="['icon', 'icon-user-' + address.icon]"></i> -->
      </cell>
		</group>
	</div>
</template>

<script type="text/babel">
	import { mapState } from 'vuex'
	import { Group, Cell } from 'vux'

	export default {
		name: "personal",
		components: {
			Group, Cell
		},
		data () {
			return {
				userData: {
					name: '',
					idCard: '',
					phone: '',
					weixin: ''
				},
				address: {
					value: '',
					name: '地址管理',
					url: 'address',
					icon: 'address',
					click: false,
					show: true
				},
				modifyName: true
			}
		},
		computed: {
	    ...mapState({
	      user: state => state.user
	    })
	  },
		mounted () {
			this.fetchData();
		},
	  methods: {
	  	fetchData () {
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
							_this.userData.name = data.NAME;
							_this.userData.idCard = data.idcard;
							_this.userData.phone = data.mobile;
							_this.userData.weixin = data.weixinAccount;
							_this.modifyName = e.data.data.modifyName;
						} else {
							_this.$vux.alert.show({
								content: e.data.errmsg
							})
						}
					}
				);
	  	},
			checkLogin (url, data) {
				if(data) {
					if(url.name) {
						this.$router.push(url); 
					} else {
						this.clearStorage(); 
					}
				} else {
					if(!this.isLogin()) return false

					this.$router.push(url);
				}
			},
			goPage (url, query) {
				if(query.key == 'name' && !this.modifyName)  return false;
				this.$router.push({ name: url, query: query });
			}
	  }
	}
</script>

<style lang="scss">
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.personal {
		.weui-cell_access .weui-cell__ft:after {
			width: 10px;
			height: 10px;
		}

		.weui-cells {
			margin-top: 0;
			border-top: $uiMarginH solid $uiMarginBg;

			&:before {
				border-top: 0;
			}
			&:after {
				border-bottom: 0;
			}
		}
	}
</style>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	@import '~assets/css/icon';

	.personal {
		& > div:last-child {
			border-bottom: $uiMarginH solid $uiMarginBg;
		}
	}

	.personal-header {
		position: relative;
		height: 40px;

		img {
			position: absolute;
			top: 50%;
			right: $padding;
			width: 40px;
			margin-top: -20px;
		}
	}

</style>
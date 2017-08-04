<!-- 
	地址新增
 -->

<template>
	<div class="address-add">
		<group>
      <!-- <x-address title="地址" v-model="address" :list="addressData" placeholder="请选择地址"></x-address> -->
      <selector title="省" placeholder="请选择省份" :options="province.list" v-model="province.value" @on-change="provinceChange"></selector>
      <selector title="市" placeholder="请选择城市" :options="city.list" v-model="city.value" @on-change="cityChange"></selector>
      <selector title="区" placeholder="请选择区县" :options="county.list" v-model="county.value"></selector>
      <x-input title="具体地址" placeholder="请输入具体地址" v-model="addressDetail"></x-input>
      <x-input title="姓名" placeholder="请输入姓名" v-model="name"></x-input>
      <x-input title="联系电话" placeholder="请输入联系电话" type="tel" v-model="tel"></x-input>
    	<div class="check">
    		<check-icon :value.sync="checkAddress">是否默认</check-icon>
    	</div>
    </group>
		
		<div class="btn">
    	<x-button type="primary" @click.native="submit">确定</x-button>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Group, Cell, Selector, CheckIcon, XInput, XButton, XAddress, ChinaAddressV3Data  } from 'vux'
	
	export default {
		name: "address-add",
		components: {
			Group, Cell, Selector, CheckIcon, XInput, XButton, XAddress, ChinaAddressV3Data 
		},
		data () {
			return {
				orderCode: this.$route.query.orderCode || "",
	      addressData: ChinaAddressV3Data,
	      address: [],
	      province: {
	      	value: '',
	      	list: []
	      },
	      city: {
	      	value: '',
	      	list: []
	      },
	      county: {
	      	value: '',
	      	list: []
	      },
	      addressDetail: '',
	      name: '',
	      tel: '',
	      checkAddress: false
			}
		},
		mounted () {
			// 获取省信息列表
			this.getAddressInfo("", 1, "province");
		},
		methods: {
			getAddressInfo (code, type, obj) {
				// type： 1为省，2为市，3为区
				// code: 父节点值
				let _this = this;
	  		_this.$http.post('/wechat/shop/queryArea',{
	  			"code": code,
	  			"type": type
	  			}).then(function(e) {
						let responseData = e.data.data;

						_this[obj].list = responseData.list;

						if(type == 1) {
							_this.city.value = 0;
							_this.city.list = [];
							_this.county.value = 0;
							_this.county.list = []
						}						

						if(type == 2) {
							_this.county.value = 0;
							_this.county.list = []
						}
	  		});
			},
			provinceChange (val) {
	      this.getAddressInfo(val, 2, "city")
	    },
			cityChange (val) {
	      this.getAddressInfo(val, 3, "county")
	    },
	    submit() {
	    	let _this = this;
	    	if(_this.province.value == "") {
    		  _this.$vux.toast.show({
	          text: '请选择省份'
	        })
	    	} else if(_this.city.value == "") {
    		  _this.$vux.toast.show({
	          text: '请选择城市'
	        })
	    	} else if(_this.county.value == "") {
    		  _this.$vux.toast.show({
	          text: '请选择区县'
	        })
	    	} else if (_this.addressDetail == "") {
	    		_this.$vux.toast.show({
	          text: '请输入具体地址'
	        })
	    	} else if (_this.name == "") {
	    		_this.$vux.toast.show({
	          text: '请输入姓名'
	        })
	    	} else if (_this.tel == "") {
	    		_this.$vux.toast.show({
	          text: '请输入联系电话'
	        })
	    	} else {
		  		_this.$http.post('/wechat/shop/saveArea',{
		  			"userCode": _this.$store.state.user.userCode,
		  			"name": _this.name,
		  			"phone": _this.tel,
		  			"province": _this.province.value,
		  			"city": _this.city.value,
		  			"area": _this.county.value,
		  			"address": _this.addressDetail,
		  			"state": _this.checkAddress ? 1 : 0
		  			}).then(function(e) {
							if(e.data.errcode == 1) {
								_this.$router.push({ name: "address", query: { orderCode: _this.orderCode } });
							} else {
								_this.$vux.toast.show({
				          text: e.data.errmsg
				        })
							}
		  		});
	    	}
	    }
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.check {
		@include halfpxline(0, $borderColor, 1px, 0, 0, 0);
		padding: $padding;
	}

	.btn {
		margin-top: 40px;
		padding: $padding;
	}

</style>

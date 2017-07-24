<!-- 
	我的推广积分页面
 -->

<template>
	<div class="integral">
		<el-header-index></el-header-index>

		<div class="container">
			<div class="integral-header">
				<img src="~assets/img/user-center/integral.png" alt="">
				<p>{{ integral }}分</p>
			</div>

			<div class="tab">
	      <tab v-model="tabSelected">
	        <tab-item :selected="tabSelected == index" v-for="(item, index) in tabDatas" @click="tabSelected = index" :key="index">{{ item.title }}</tab-item>
	      </tab>
	      <swiper class="list" height="500px" v-model="tabSelected" :show-dots="false">
	        <swiper-item v-for="(tabContentDatasData, index) in tabDatas" :key="index">
	          <div @click="goMsg(item.code, item.name)" class="integral-man" v-for="(item, ind) in tabContentDatas[tabContentDatasData.value]" :key="ind">
							<img :src="item.img">
							<div class="title">
								<p>{{ item.name }}</p>
								<span>到期时间：{{ item.date }}</span>
							</div>
							<div class="info fa fa-envelope-o"></div>
						</div>
	        </swiper-item>
	      </swiper>
	    </div>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
	import elHeaderIndex from 'components/header/header-index'

	import imgHeader from 'assets/img/header.png'

	export default {
		name: 'integral',
		components: { Tab, TabItem, Swiper, SwiperItem, elHeaderIndex },
		data () {
			return {
				title: '我的积分',
				integral: 0,
				tabDatas: [
					{
						value: 'type1',
						title: '',
					},{
						value: 'type2',
						title: '',
					}
				],
				tabSelected: 0,
				tabContentDatas: {
					type1: [],
					type2: []
				}
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData() {
				let _this = this;
				this.$http.post('/wechat/usercenter/getIntegralInfo',
						{
							"userCode": _this.$store.state.user.userCode,
						}
					).then(function(e) {
						let responseData = e.data.data.result;

						_this.interval = responseData.integralInfo;
						_this.tabDatas[0].title = "已邀请普通学员" + responseData.type1 + "位";
						_this.tabDatas[1].title = responseData.type2 + "位报名总裁商业思维";

						_this.transData(responseData.list1, 'type1');
						_this.transData(responseData.list2, 'type2');
					}
				);
			},
			transData (data, name) {
				let _this =this,
						arr = [];
				if(data) {
					data.map(function(item, index){
						arr[index] = {
							id: item.id,
							code: item.code,
							name: item.name,
							img: _this.resolveImg(item.header),
							date: item.create_time
						}
					});
				}
				_this.tabContentDatas[name] = arr;
			},
			goMsg (userCode, name) {
				this.$store.commit("updateMsgName", { name: name });
				this.$store.commit("updateMsgUserCode", { userCode: userCode });
				this.$store.commit("updateMsgUrl", { url: 'integral' });
				this.$router.push({ name: 'msgAdd' })
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
  $imgW: 44px;
	.integral {

	}

	.integral-header {
		padding: 40px $padding $padding;
		text-align: center;
		line-height: 1.75;

		img {
			margin: 0 auto;
			margin-bottom: $padding;
		}
	}

	.integral-man {
  	padding: $padding;
  	display: flex;
		@include halfpxline(0, $borderColor, 1px, 0, 1px, 0);

  	img {
  		width: $imgW;
  		height: $imgW;
  		border-radius: $imgW;
  	}
		
		.title {
			padding-left: $padding;
			flex: 1;
		}

  	p {
			font-size: 18px;
  	}
  }

  .info {
  	position: absolute;
  	right: $padding;
		top: 50%;
		font-size: 20px;
		line-height: 1;
		margin-top: -10px;
  }
	
</style>
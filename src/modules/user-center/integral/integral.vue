<!-- 
	我的推广积分页面
 -->

<template>
	<div class="integral" v-cloak>
		<el-header-index></el-header-index>

		<div class="container">
			<div class="integral-header">
				<img src="~assets/img/user-center/integral.png" alt="">
				<p>我的积分{{ integral }}分</p>
				<div class="link" @click="goPage('share')">分享给好友</div>	
			</div>

			<div class="tab">
	      <tab v-model="tabSelected">
	        <tab-item :selected="tabSelected == index" v-for="(item, index) in tabDatas" @click="tabSelected = index" :key="index">
	        	<p class="dn-tab-p">{{ item.num }}位</p>
	        	<p class="dn-tab-p">{{ item.title }}</p>
	        </tab-item>
	      </tab>
	      
	      <template v-if="tabSelected == 0">
          <div @click="goMsg(item.openId, item.name)" class="integral-man" v-for="(item, ind) in tabContentDatas.type1" :key="ind">
						<img :src="item.img">
						<div class="title">
							<p>{{ item.name }}</p>
							<span>{{ tabDatas[0].tip }}：{{ item.date }}</span>
						</div>
						<div class="info"></div>
						<!-- <div class="info fa fa-envelope-o"></div> -->
					</div>
	      </template>

	      <template v-else>
          <div @click="goMsg(item.openId, item.name)" class="integral-man" v-for="(item, ind) in tabContentDatas.type2" :key="ind">
						<img :src="item.img">
						<div class="title">
							<p>{{ item.name }}</p>
							<span>{{ tabDatas[1].tip }}：{{ item.date }}</span>
						</div>
						<div class="info"></div>
						<!-- <div class="info fa fa-envelope-o"></div> -->
					</div>
	      </template>
	      <!-- <swiper class="list" height="500px" v-model="tabSelected" :show-dots="false" :threshold="tabChangeW">
	        <swiper-item v-for="(tabContentDatasData, index) in tabDatas" :key="index">
	          <div @click="goMsg(item.openId, item.name)" class="integral-man" v-for="(item, ind) in tabContentDatas[tabContentDatasData.value]" :key="ind">
							<img :src="item.img">
							<div class="title">
								<p>{{ item.name }}</p>
								<span>{{ tabContentDatasData.tip }}：{{ item.date }}</span>
							</div>
							<div class="info fa fa-envelope-o"></div>
						</div>
	        </swiper-item>
	      </swiper> -->
	    </div>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
	import elHeaderIndex from 'components/header/header-index'

	export default {
		name: 'integral',
		components: { Tab, TabItem, Swiper, SwiperItem, elHeaderIndex },
		data () {
			return {
				title: '我的积分',
				tabChangeW: this.wordBook.tabChangeW,
				integral: 0,
				tabDatas: [
					{
						value: 'type1',
						title: '已邀请普通学员',
						num: '',
						tip: "关注时间",
						list: []
					},{
						value: 'type2',
						title: '已报名总裁商业思维',
						num: '',
						tip: "报名时间",
						list: []
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
							"openId": _this.$store.state.user.openId,
						}
					).then(function(e) {
						let responseData = e.data.data.result;

						_this.integral = responseData.integralInfo;
						_this.tabDatas[0].num = responseData.type1;
						_this.tabDatas[1].num = responseData.type2;

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
							date: item.create_time,
							openId: item.openid
						}
					});
				}
				_this.tabContentDatas[name] = arr;
			},
			goMsg (sendOpenId, name) {
				this.$router.push({ name: 'msgDetail', query: { sendUser: sendOpenId, msgType: '3' }})
			},
			goPage (url) {
				this.$router.push({ name: url })
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
		color: #ff4545;

		img {
			max-width: 130px;
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
		width: 22px;
		height: 22px;
		background: url("~assets/img/icon/integral-msg.png") no-repeat;
		background-size: 100%;
		font-size: 20px;
		line-height: 1;
		margin-top: -10px;
  }
	
	.link {
		margin-top: 10px;
		line-height: 30px;
		background: #ff4545;
		color: #fff;
		padding: 0 1em;
		display: inline-block;
		border-radius: 100px;
	}
	
	.vux-tab-item {
		padding: 6px 0;
	}

	.dn-tab-p {
		line-height: 1;
	}
</style>
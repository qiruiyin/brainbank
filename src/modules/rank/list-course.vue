<!-- 
	课程下载
 -->

<template>
	<div class="rank-list">
		<el-headerIndex></el-headerIndex>
		
		<div class="container">
			<div class="tab">
	      <tab v-model="tabSelected">
	        <tab-item :selected="tabSelected == index" v-for="(item, index) in tabDatas" @click="tabSelected = index" :key="index">{{ item.title }}</tab-item>
	      </tab>
	      <swiper class="list" height="100%" v-model="tabSelected" :show-dots="false">
	        <swiper-item v-for="(tabContentDatasList, index) in tabDatas" :key="index">
	          <template v-if="tabContentDatasList.value == 'new'">
	          	<el-img-text-rank @onBtnClick="downloadScource" v-for="(item, ind) in newData" :img-text-data="item" img-text-btn="1" :key="ind"></el-img-text-rank>
	          </template>
	          <template v-if="tabContentDatasList.value == 'most'">
	          	<el-img-text-rank @onBtnClick="downloadScource" v-for="(item, ind) in mostData" :img-text-data="item" img-text-btn="1" :key="ind"></el-img-text-rank>
	          </template>
	        </swiper-item>
	      </swiper>
	    </div>
    </div>
	</div>
</template>

<script type="text/babel">
	import { Tab, TabItem, Swiper, SwiperItem, Alert } from 'vux'
	import elHeaderIndex from 'components/header/header-index'
	import elImgTextRank from 'components/img-text/img-text-rank'

	export default {
		name: 'listCourse',
		components: { Tab, TabItem, Swiper, SwiperItem, Alert, elHeaderIndex, elImgTextRank },
		data () {
			return {
				index: 0,
				tabDatas: [
					{
						value: 'new',
						title: '最新上传',
					},{
						value: 'most',
						title: '下载最多',
					}
				],
				tabSelected: 0,
				newData: [],
				mostData: []
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData() {
				let _this = this;
				// 最新上传
	  		_this.$http.post('/wechat/coursewaremobile/queryTypeRankByCode',{
	  			"customerCode": _this.$store.state.user.userCode, // userCode
	  			"pageSize": 1, 
	  			"pageCount": 10,
	  			"typeCode": _this.$route.params.typeCode
	  		}).then(function(e) {
					let responseData = e.data.data;
					_this.transData(responseData, 'newData');
	  		});

	  		// 下载最多
	  		_this.$http.post('/wechat/coursewaremobile/queryTypeByCode',{
	  			"customerCode": _this.$store.state.user.userCode, // userCode
	  			"pageSize": 1, 
	  			"pageCount": 10,
	  			"typeCode": _this.$route.params.typeCode
	  		}).then(function(e) {
					let responseData = e.data.data;
					_this.transData(responseData, 'mostData');
	  		});
			},
			transData (data, obj) {
	  		let _this = this,
	  				arr = [];
				data.list.map(function(item, index){
					arr[index] = {
						id: item.id,
						code: item.code,
						title: item.name,
						type: '文字说明',
						pay: item.isBuy,
						download: item.downloads,
						downloadUrl: _this.resolveImg(item.file_url),
						peice: item.requiredpoints,
						url: 'audioDetail',
						img: _this.resolveImg(item.thumbnail),
						params: {
							id: item.code
						}
					}
				});

				_this[obj] = arr;
			},
			downloadScource (args) {
				let _this = this;
				if(_this.$store.state.user.userCode == '') {
					_this.$vux.alert.show({
		        title: '',
		        content: '请先登录'
		      })
				} else {
					_this.$http.post('/wechat/coursewaremobile/buy',{
		  			"customerCode": _this.$store.state.user.userCode, // userCode
		  			"productCode": args.code
		  		}).then(function(e) {
		  			if(e.data.data.result.tag == 0) {
			      	_this.$vux.alert.show({
				        title: '',
				        content: e.data.data.result.msg,
				        onHide () {
				        	
				        }
				      })  		
			      } else {
			      	window.location.href(_this.resolveImg(args.url))
			      }
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	.rank-list .vux-slider > .vux-swiper {
    overflow-y: auto;
  }
</style>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	@import '~assets/css/rank';
	
</style>
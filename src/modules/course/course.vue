<!-- 
	课程列表
 -->

<template>
	<div class="detail-type">
		<el-header-index></el-header-index>

		<div class="container">
			<div class="tab">			
				<tab :line-width=2 v-model="tabSelected">
		      <tab-item class="vux-center" v-for="(item, index) in tabData" :key="index">{{ item.name }}</tab-item>
		    </tab>
		    <swiper v-model="tabSelected" height="100%" :show-dots="false">
		      <swiper-item v-for="(tabItem, ind) in tabData" :key="ind">
		    		<template v-if="tabItem.value == 'recent'">
							<timeline>
								<timeline-item v-for="(item, index) in courseList" :key="index">
									<p @click="goPage(item.code, '1')">{{ item.name }}</p>
								</timeline-item>
							</timeline>
		    		</template>

		    		<template v-if="tabItem.value == 'all'">
							<div class="banner">
								<router-link v-for="(item, index) in banner" :key="index" :to="{ name: 'courseDetail', params: { courseCode: item.code , courseStatus: '0'} }">
									<img class="img" :src="item.img" alt="">
								</router-link>
							</div>

							<div class="course-list">
								<card>
									<div slot="content">
										<el-img-text @click.native="goPage(item.code, '0')" v-for="(item, index) in courseTuijian" :img-text-data="item" :key="index"></el-img-text>
									</div>
								</card>
							</div>
		    		</template>
		      </swiper-item>
		    </swiper>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import { XTable, Card, Timeline, TimelineItem, Tab, TabItem, Swiper, SwiperItem } from 'vux'
	import elHeaderIndex from 'components/header/header-index'
	import elCard from 'components/card/card'
	import elImgText from 'components/img-text/img-text'

	import imgBanner from 'assets/img/course/banner.png'
	import imgHeader from 'assets/img/icon/icon.png'

	export default {
		name: 'courseTypeDetail',
		components: { XTable, Card, Timeline, TimelineItem, Tab, TabItem, Swiper, SwiperItem, elHeaderIndex, elCard, elImgText },
		data () {
			return {
				title: '课程列表',
				tabData: [
					{
						value: 'all',
						name: '所有课程',
						list: []
					},{
						value: 'recent',
						name: '近期课程',
						list: []
					}
				],
				tabSelected: 0,
				courseTitle: [ '日期', '课程', '讲师', '时间', '地点' ],
				courseList: [],
				banner: [],
				courseTuijian: []
			}
		},
		mounted () {
			this.fetchData();
		},
		methods: {
			fetchData	() {
	  		// 获取所有数据
	  		let _this = this;
	  		_this.$http.post('/wechat/course/index',{}).then(function(e) {
					let responseData = e.data.data;
	  			_this.courseList = responseData.lessonList;
	  			_this.banner = responseData.adLessonList.map(function(item, index){
	  				return {
	  					img: _this.resolveImg(item.ad_code),
							link: '',
							name: item.name,
							desc: item.description,
							price: item.price,
							code: item.ad_link
	  				}
	  			});
		  		// _this.resolveField(_this, 'banner', responseData.adLessonList, '');

		  		_this.courseTuijian = responseData.lessonProductList.map(function(item, index) {
						return {
							title: item.productName,
							price: item.price,
							// priceUnit: '年',
							// priceCurrency: '￥',
							desc: item.DESCRIPTION || '介绍',
							label: '主讲', 
							speaker: item.author || '苏引华',
							subscribe: item.subCount,
							url: '',
							id: '',
							code: item.productCode,
							img: _this.resolveImg(item.thumbnail)
						}		  			
		  		});
	  		});
	  	},
	  	goPage(code, status) {
	  		this.$router.push({name: "courseDetail", params: { courseCode: code, courseStatus: status }})
	  	}
		}
	}
</script>

<style lang="scss">
	.tab .vux-slider {
		height: 100%;
	}
</style>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
  
	.detail-type, .container {
		height: 100%;

		padding-bottom: 18px;
	}

	.tab {
		height: 100%;
	}

  .table {
  	width: 100%;
  	margin-bottom: $padding;
    white-space: nowrap;
    overflow: auto;

    td, th {
    	padding: 0 1em;
    }
  }

	.banner {
  	margin-bottom: $padding;
	}
	

</style>
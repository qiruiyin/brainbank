<!-- 
	课程列表
 -->

<template>
	<div class="detail-type" v-cloak>
		<el-header-index></el-header-index>

		<div class="container">
			<div class="tab">			
				<tab :line-width=2 v-model="tabSelected">
		      <tab-item class="vux-center" v-for="(item, index) in tabData" :key="index">{{ item.name }}</tab-item>
		    </tab>
		    <swiper v-model="tabSelected" height="100%" :show-dots="false" :threshold="tabChangeW">
		      <swiper-item v-for="(tabItem, ind) in tabData" :key="ind">
		    		<template v-if="tabItem.value == 'recent'">
							<el-course-recent></el-course-recent>
		    		</template>

		    		<template v-if="tabItem.value == 'all'">
							<div class="banner">
								<router-link v-for="(item, index) in banner" :key="index" :to="{ name: 'courseDetail', query: { courseCode: item.code } }">
									<img class="img" :src="item.img" alt="">
								</router-link>
							</div>

							<div class="course-list">
								<card>
									<div slot="content">
										<el-img-text v-for="(item, index) in courseTuijian" :img-text-data="item" :key="index"></el-img-text>
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
	import elCourseRecent from 'components/course/recent'

	export default {
		name: 'courseTypeDetail',
		components: { XTable, Card, Timeline, TimelineItem, Tab, TabItem, Swiper, SwiperItem, elHeaderIndex, elCard, elImgText, elCourseRecent },
		data () {
			return {
				title: '课程列表',
				tabChangeW: this.wordBook.tabChangeW,
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
				tabSelected: this.$route.query.type == 1 ? 1 : 0,
				courseTitle: [ '日期', '课程', '讲师', '时间', '地点' ],
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
	  		_this.$http.post('/wechat/course/index',{
	  			"customerCode": _this.$store.state.user.userCode	
	  		}).then(function(e) {
					let responseData = e.data.data;
	  			
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
							isClick: true,
							// priceUnit: '年',
							// priceCurrency: '￥',
							desc: item.DESCRIPTION,
							label: '主讲', 
							speaker: item.author || '苏引华',
							subscribe: item.subCount,
							url: '',
							id: '',
							code: item.productCode,
							classDay: item.class_day,
							img: _this.resolveImg(item.thumbnail)
						}		  			
		  		});
	  		});
	  	},
	  	goPage(code, status) {
	  		this.$router.push({name: "courseDetail", query: { courseCode: code, courseStatus: status }})
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
	
	.course-list {
		padding-bottom: 30px;
	}
	

</style>
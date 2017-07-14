<!-- 
	课程列表
 -->

<template>
	<div class="course">
		<el-header-index></el-header-index>

		<div class="container">
			<div class="table">
				<x-table>
					<thead>
	          <tr>
	            <th v-for="(item, index) in courseTitle" :key="index">{{ item }}</th>
	          </tr>
	        </thead>
	        <tbody>
	          <tr v-for="(item, index) in courseList" :key="index">
	            <td>{{ item.startDate }}</td>
	            <td>{{ item.name }}</td>
	            <td>{{ item.author }}</td>
	            <td>{{ item.time }}</td>
	            <td>{{ item.address }}</td>
	          </tr>
	        </tbody>
				</x-table>	
			</div>
			
			<div class="banner">
				<router-link v-for="(item, index) in banner" :key="index" :to="{ name: item.link }">
					<img class="img" :src="item.img" alt="">
				</router-link>
			</div>

			<div class="course-list">
				<el-card v-for="(item, index) in courseTuijian" :card-data="item" :key="index"></el-card>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import { XTable } from 'vux'
	import elHeaderIndex from 'components/header/header-index'
	import elCard from 'components/card/card'

	import imgBanner from 'assets/img/course/banner.png'
	import imgHeader from 'assets/img/icon/icon.png'

	export default {
		name: 'course',
		components: { XTable, elHeaderIndex, elCard },
		data () {
			return {
				title: '课程列表',
				courseTitle: [ '日期', '课程', '讲师', '时间', '地点' ],
				courseList: [],
				banner: [],
				courseTuijian: [
					{
						header: {
							img: imgHeader,
							title: '系统思维',
							desc: '破译了国家激发生产力背后的分配机制'
						},
						content: {
							title: '如何让客户离不开公司',
							desc: '成为第一名的源动力，自动自发'
						},
						footer: {
							btns: [
								{
									value: '',
									name: '查看更多',
									url: ''
								}
							]
						}
					},{
						header: {
							img: imgHeader,
							title: '在红尘中修行',
							desc: ''
						},
						content: {
							title: '远交近攻纵横天下',
							desc: '让客户的购买顾虑降到最低；让客户心里无法剔除你的产品'
						},
						footer: {
							btns: [
								{
									value: '',
									name: '查看更多',
									url: ''
								},{
									value: '',
									name: '立即报名',
									url: ''
								}
							]
						}
					}
				]
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
	  			// _this.banner
		  		_this.resolveField(_this, 'banner', responseData.adLessonList, 'ad_code');
		  		console.log(_this.banner)
	  		});
	  	}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
  
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
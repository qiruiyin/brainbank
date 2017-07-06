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
	            <td>{{ item.lecturer }}</td>
	            <td>{{ item.time }}</td>
	            <td>{{ item.address }}</td>
	          </tr>
	        </tbody>
				</x-table>	
			</div>
			
			<div class="banner">
				<router-link :to="{ name: banner.url }">
					<img class="img" :src="banner.img" alt="">
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
				courseList: [
					{
						startDate: '2012-10-01',
						name: '商业思维',
						lecturer: '待定',
						time: 5,
						address: '广州'
					},{
						startDate: '2012-10-01',
						name: '商业思维',
						lecturer: '待定',
						time: 5,
						address: '广州'
					},{
						startDate: '2012-10-01',
						name: '商业思维',
						lecturer: '待定',
						time: 5,
						address: '广州'
					}
				],
				banner: {
					url: '',
					img: imgBanner
				},
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
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
  
  .table {
  	margin-bottom: $padding;
  }

	.banner {
  	margin-bottom: $padding;
	}
	

</style>
<!-- 
	客服
 -->

<template>
	<div class="kefu">
		<el-header-index></el-header-index>

		<div class="container">
			<card :header="{title:'我的服务人员'}">
				<div slot="content" class="service">
					<div class="service-card">
						<img src="" alt="">
					</div>
				</div>
			</card>

			<card :header="{title:'近期开课行程安排'}">
				<div slot="content" class="table">
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
			</card>
		</div>
	</div>
</template>

<script type="text/babel">
	import { XTable, Card } from 'vux'
	import elHeaderIndex from 'components/header/header-index'
	
	import imgUser from 'assets/img/user-center/user.png'
	
	export default {
		name: 'kefu',
		components: { XTable, Card, elHeaderIndex },
		data () {
			return {
				title: '客服',
				service: {
					img: imgUser,
					name: '谢学军',
					num: '12312313213',
					tel: '12312313213',
					link: ''
				},
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	

</style>
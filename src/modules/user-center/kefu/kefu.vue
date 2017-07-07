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
						<img :src="service.img" alt="">
						<div class="service-card-text">
							<div class="title">{{ service.name }}</div>
							<p>工号：{{ service.num }}</p>
							<p>电话：{{ service.tel }}</p>

							<div class="btn" @click="goPage('kefuDetail')">查看TA的名片</div>
						</div>
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
		          <tr v-for="(item, index) in courseList" :key="index" @click="goPage()">
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
		},
		methods: {
			goPage (url) {
	  		this.$router.push({ name: url })
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	$serviceCardW: 66px;

	.service-card {
		position: relative;
		padding: $padding;
		display: flex;

		img {
			width: $serviceCardW;
			height: $serviceCardW;
			border-radius: $serviceCardW;
		}

		.service-card-text {
			flex: 1;
			padding-left: $padding;
		}

		.title {
			font-size: 18px;
			color: $fontColorBlack;
		}

		.btn {
			@include halfpxline($borderRadius, $borderColor, 1px, 1px, 1px, 1px);
			position: absolute;
			top: 26px;
			right: $padding;
			padding: 0 10px;
			line-height: 36px;
		}
	}
</style>
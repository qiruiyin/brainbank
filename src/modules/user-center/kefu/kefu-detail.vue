<!-- 
	客服详情
 -->

<template>
	<div class="kefu-detail">
		<el-header-index></el-header-index>

		<div class="container">
			<div class="kefu-header">
				<img :src="header.img" alt="">
				<div class="title">
					{{ header.name }}
					<span>{{ header.position }}</span>
				</div>
				<div class="feature">
					<p>从业<span>{{ header.time }}</span></p>
					<p>客户<span>{{ header.customerNum }}位</span></p>
				<!-- 	<p>好评率<span>{{ header.likeRate }}</span></p>
					<p>客户见证<span>{{ header.customerWitness }}件</span></p>
					<p>服务水平<span>{{ header.serviceLevel }}分</span></p> -->
				</div>
			</div>
			
			<card :header="{title:'我的服务人员'}">
				<div slot="content" class="kefu-course-read">
					<div class="kefu-course-read-block" v-for="item in courseAll" :key="item.value">
						<div :class="['kefu-icon', 'kefu-icon-' + item.color]">{{ item.name }}</div>
					</div>
				</div>
			</card>

			<card :header="{title: '联系方式'}">
				<div slot="content" class="kefu-link">
					<a class="link-icon-tel" :href="'tel:' + link.tel">{{ link.tel }}<span>（点击拨打）</span></a>
					<a class="link-icon-weixin">{{ link.weixin }}<span>（复制微信号添加服务老师）</span></a>
				</div>
			</card>
			
			<card :header="{title: '近期课程行程安排'}">
				<div slot="content">
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
	import { XTable, Card, Cell } from 'vux'
	import elHeaderIndex from 'components/header/header-index'
	
	import imgUser from 'assets/img/user-center/user.png'
	
	export default {
		name: 'kefu',
		components: { XTable, Card, Cell, elHeaderIndex },
		data () {
			return {
				title: '客服详情',
				header: {
					img: imgUser,
					name: '谢学军',
					position: '资深客服经理',
					time: '1.5年',
					customerNum: '30',
					likeRate: '99%',
					customerWitness: '25',
					serviceLevel: '75'			
				},
				courseAll: [
					{
						value: 'all',
						name: '总',
						color: 'green',
					},{
						value: 'xi',
						name: '系',
						color: 'red',
					},{
						value: 'fu',
						name: '服',
						color: 'gray',
					},{
						value: 'ling',
						name: '领',
						color: 'blue',
					},{
						value: 'hong',
						name: '红',
						color: 'lightblue',
					},{
						value: 'he',
						name: '合',
						color: 'yellow',
					}
				],
				link: {
					tel: '18896904426',
					weixin: '18896904426'
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
			goPage () {
	  		this.$router.push({ name: 'index' })
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	$imgHeaderW: 66px;
	$kefuIconW: 60px;
	$colors: green red gray blue lightblue yellow;
	$linkIconW: 40px;
	$linkIcons: tel weixin;

	.kefu-header {
		width: 100%;
		height: 240px;
		padding: 30px $padding $padding;
		background: url("~assets/img/user-center/kefu-bg.png") no-repeat;
		background-size: 100%;
		text-align: center;
		line-height: 2;
		color: #fff;

		img {
			width: $imgHeaderW;
			height: $imgHeaderW;
			margin: 0 auto;
			border-radius: $imgHeaderW;
		}

		.title {
			font-size: 20px;
			padding: 6px;
		}

		.feature {
			font-size: 0;

			p {
				width: 33%;
				font-size: 14px;
				display: inline-block;
			}

			span {
				margin-left: .2em;
				font-size: 18px;
				color: #ffec81;
			}
		}
	}
	
	.kefu-course-read {
		@extend %clearfix;
		text-align: center;
		font-size: 0;
	}

	.kefu-course-read-block {
		float: left;
		width: 33.3%;
		margin: 10px 0;
		text-align: center;
		display: inline-block;
	}

	.kefu-icon {
		width: $kefuIconW;
		height: $kefuIconW;
		line-height: $kefuIconW;
		margin: 0 auto;
		border-radius: $borderRadius;
		color: #fff;
		font-size: 20px;
	}

	@each $color in $colors { 
		.kefu-icon-#{$color} { 
			background: $color;
		} 
	}
	
	.kefu-link {
		padding: $padding;

		a {
			position: relative;
			padding-left: $linkIconW;
			line-height: $linkIconW;
			display: block;

			&:before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: $linkIconW;
				height: $linkIconW;
				background-repeat: no-repeat;
				background-size: 60%;
				background-position: center;
			}
		}

		span {
			float: right;
		}
	}

	@each $linkIcon in $linkIcons {
		.link-icon-#{$linkIcon} {
			&:before {
				background-image: url("~assets/img/user-center/#{$linkIcon}.png");
			}
		}
	}
</style>
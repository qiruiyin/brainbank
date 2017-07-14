<!-- 
	课程支付页面，报名参加课程，包含复训和升级
 -->

<template>
	<div class="enlist">
		<group>
      <x-input :title='course.title' v-model="course.value" disabled></x-input>
<!--       <selector placeholder="course.placeholder" v-model="course.value" :title="course.title" :name="course.name" :options="course.list" @on-change="onCourseChange"></selector> -->
      <selector :placeholder="period.placeholder" v-model="period.value" :title="period.title" :name="period.name" :options="period.list" @on-change="onPeriodChange"></selector>
      <x-input :title='price.title' v-model="price.value" disabled></x-input>
    </group>
		
		<div class="btns" @click="pay()">
			<x-button type="primary" >支付</x-button>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Group, Selector, XInput, XButton } from 'vux'

	export default {
		name: 'pay',
		components: { Group, Selector, XInput, XButton },
		data () {
			return {
				title: '报名参加课程，包含复训和升级',
				course: {
					value: '',
					title: '课程',
					name: 'course',
					placeholder: '请选择课程',
					list: [
						{
							key: 'shangsi',
							value: '商业思维'
						},{
							key: 'xitong',
							value: '系统思维'
						}
					]
				},
				period: {
					value: '',
					title: '期数',
					name: 'period',
					placeholder: '请选择期数',
					list: [
						{
							key: 'shangsi',
							value: '商业思维'
						},{
							key: 'xitong',
							value: '系统思维'
						}
					]
				},
				price: {
					value: '',
					title: '金额',
					name: 'price',
					placeholder: '金额'
				}
			}
		},
		mounted: function() {
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;
				this.$http.post('/wechat/discover/retrain/lesson',{"userCode":"201705300052529835144771844797952"}).then(function(e) {
					let responseData = e.data.data;
					_this.course.value = responseData.lessonName;
					_this.period.list = responseData.lessonList;
					_this.price.value = responseData.money;
				})	
			},
	    onCourseChange (val) {
	      // console.log(val)
	    },
	    onPeriodChange (val) {

	    },
	    pay () {
	    	let _this = this;
				this.$http.post('/wechat/order/create',
						{
							"userCode": _this.$store.state.user.userCode ? _this.$store.state.user.userCode : "201705300052529835144771844797952",
							"productCode": "af6f6eceb55b454ea400731128f35475",
							"amount": "1",
							"money": _this.price.value,
							"orderType": "1",
							"lessonCode": "2a78f11c9c9646d9ac43c65c5bd37f39"
						}
					).then(function(e) {
					// let responseData = e.data.data;
					// _this.course.value = responseData.lessonName;
					// _this.period.list = responseData.lessonList;
					// _this.price.value = responseData.money;
				})	
	    }
	  }
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	@import '~assets/css/form';
</style>
<!-- 
	报名参加课程，包含复训和升级
 -->

<template>
	<div class="enlist">
		<group>
      <selector placeholder="course.placeholder" v-model="course.value" :title="course.title" :name="course.name" :options="course.list" @on-change="onChange"></selector>
      <x-input :title='period.title' v-model="period.value" disabled></x-input>
      <x-input :title='price.title' v-model="price.value" disabled></x-input>
    </group>
		
		<div class="btns">
			<x-button type="primary">支付</x-button>
		</div>
	</div>
</template>

<script type="text/babel">
	import { Group, Selector, XInput, XButton } from 'vux'

	export default {
		name: 'enlist',
		components: { Group, Selector, XInput, XButton },
		data () {
			return {
				title: '报名参加课程，包含复训和升级',
				course: {
					value: 'course',
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
					value: '11112321奥术大师多',
					title: '期数',
					name: 'period',
					placeholder: '金额'
				},
				price: {
					value: '111',
					title: '金额',
					name: 'price',
					placeholder: '金额'
				}
			}
		},
		mounted: function() {
			this.$http.post('/discover/userinfo/get',{"userCode":"201705300052529835144771844797952"}).then(function(argument) {
			})
		},
		methods: {
	    onChange (val) {
	      // console.log(val)
	    }
	  }
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.btns {
		padding: $padding;
		margin-top: 40px;
	}
</style>
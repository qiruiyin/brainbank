<!-- 
	demo
 -->

<template>
	<div class="zupu">
		<div class="zupu-card">
			<el-zupu :zupu-data="zupuData" :is-root=true></el-zupu>
		</div>
	</div>
</template>

<script type="text/babel">
	import elZupu from "./demo-com.vue" 

	export default {
		components: { elZupu },
		data () {
			return {
				zupuData: {
					name: "姓名男1",
					peiou: "姓名",
					child: [
						{
							name: "姓名男11",
							peiou: "姓名女11",
							child: [
								{
									name: "姓名男111",
									peiou: "姓名女111",
									child: []
								},{
									name: "姓名男112",
									child: []
								}
							]
						},{
							name: "姓名男12",
							peiou: "姓名女12",
							child: [
								{
									name: "姓名男121",
									peiou: "姓名女122",
									child: []
								}
							]
						},{
							name: "姓名男13",
							peiou: "姓名女1",
							child: [
								{
									name: "姓名男131",
									child: []
								}
							]
						}
					]
				}
			}
		}
	}
</script>

<style lang="scss">
	.zupu-card {
		width: 100%;
	}
</style>
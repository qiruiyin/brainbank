<!-- 
	组件
 -->

<template>
		<div class="zupu-card">
			<div :class="['zupu-info', {'has-parent': !isRoot}, {'has-child': zupuData.child.length > 0}, { 'only-one': zupuData.child.length == 1 }]">
				<div class="zupu-info-msg">
					<p class="zupu-man">{{ zupuData.name }}</p>
					<p class="zupu-woman" v-if="zupuData.peiou">{{ zupuData.peiou }}</p>
				</div>
				<!-- <div class="line"></div>		 -->
			</div>
			<div class="zupu-child" v-if="zupuData.child.length > 0">
				<el-zupu :zupu-data="item" v-for="(item, index) in zupuData.child" :key="index"></el-zupu>
			</div>
		</div>
</template>

<script type="text/babel">

	export default {
		name: "elZupu",
		props: ["zupuData", "isRoot"],
		data () {
			return {
				zupuDatas: {
					name: "姓名男",
					peiou: "姓名女",
					child: [{
						name: "姓名男",
						peiou: "姓名女"
					}]
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '~lib/sandal/core';
	
	* {
		box-sizing: border-box;
	}
	
	$h: 40px;
	$paddingTop: 30px;

	.zupu-card {
		position: relative;
		float: left;
		margin: 0 auto;
		text-align: center;
		
		&:first-child {
			&:before {
				display: none;
			}
		}

		&:last-child {
			&:after {
				display: none;
			}
		}

		&:before, &:after {
			content: "";
			position: absolute;
			width: 50%;
			top: $paddingTop/2;
			left: 0;
			border-top: 1px solid red;
		}

		&:after {
			left: 50%;
		}
	}

	.zupu-info {
		position: relative;
		text-align: center;
		margin-top: $paddingTop;
		font-size: 0;
		padding: 10px;
		border: 1px solid red;
		display: inline-block;

		&.has-child {
			&:after {
				content: "";
				position: absolute;
				top: 100%;
				left: 50%;
				background: red;
				width: 1px;
				height: $paddingTop/2 + 2px;
			}
		}

		&.has-parent {
			&:before {
				content: "";
				position: absolute;
				top: - $paddingTop/2;
				left: 50%;
				width: 1px;
				height: $paddingTop/2;
				background: red;
			}	
		}

		p {
			position: relative;
			height: $h;
			padding: 0 .5em;
			line-height: $h;
			border: 1px solid red;
			display: inline-block;
			word-break: break-word;
			font-size: 14px;

			&.zupu-man {
				margin: 0 10px;
			}

			&.zupu-woman {
				margin: 0 10px;

				&:before, &:after {
					content: "";
					position: absolute;
					top: 50%;
					left: 0;
					width: 22px;
					height: 1px;
					margin-left: -22px;
					background: red;
				}
			}
		}
	}

	.zupu-child {
		width: 100%;
		display: flex;
	}
</style>
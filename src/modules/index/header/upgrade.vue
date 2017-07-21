<!-- 
	升级须知
 -->

<template>
	<div class="retrain">
		<!-- <el-header-index></el-header-index> -->
		<div class="container">
			<img src="~assets/img/header/retrain.jpg" alt="复训">
			<div class="retrain-body">
				<section>
					<h3>复训学员须知</h3>
					<p>为了防止老学员说好来复训，实际没来复训而造成的学习资格浪费，导致想报名学习的人无法参加学习。</p>
					<p>从2017年7月1日起，大脑银行学员若要参加复训，需要在报名时间交纳500元/人的复训座位保证金，在到达课程现场签到成功后退回500元。</p>
					<p>如果报名了而未实际到场，500元保证金不退。</p>
					<div class="tips">本人已认真阅读以上文字，自愿参加复训并愿意遵守大脑银行公司规则！</div>
					<div class="end">
						<p>2017年7月1日
							<span>苏州大脑方程式信息咨询有限公司</span>
						</p>
						<img class="logo" src="~assets/img/logo.png" alt="logo">
					</div>
				</section>

				<div class="btn">
					<x-button type="primary" @click.native="goPage">立即复训</x-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import { XButton } from 'vux'
	import elHeaderIndex from 'components/header/header-index'
	
	export default {
		components: {
			XButton, elHeaderIndex
		},
		data () {
			return {
				title: "复训",
				btn: {
					value: 
				}
			}
		},
		methods: {
			goPage () {
				this.$router.push({name: "pay", params: { payType: 'retrain' }});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	.container {
		& > img {
			width: 100%;
		}
	}

	section {
		padding: $padding;
		line-height: 2;

		h3 {
			text-indent: 1em;
			font-size: 20px;
			color: $fontColorBlack;
		}

		p {
			text-indent: 2em;
		}
		
		.tips {
			text-indent: 2em;
			font-size: 12px;
			margin: 1em 0;
		}

		.end {
			@extend %clearfix;
			text-align: right;

			p {
				float: right;
				display: inline-block;
			}

			span {
				display: block;
			}
		}
	}

	.logo {
		float: right;
		height: 4em;
	}

	.btn {
		margin-top: 2em;
		padding: $padding;
	}
</style>
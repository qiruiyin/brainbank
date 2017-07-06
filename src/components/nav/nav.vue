<!-- 
 底部导航菜单
 -->

<template>
	<nav>
		<tabbar icon-class="vux-center" slot="bottom">
      <tabbar-item v-for="item in navDatas" :link="{name: item.link}" :selected="item.value == navSelected" :key="item.value">
      	<img :class="{'icon-big': item.value == 'mall'}" slot="icon" :src="item.img">
        <span slot="label" class="icon">{{ item.name }}</span>
      </tabbar-item>
    </tabbar>
	</nav>
</template>

<script type="text/babel">
	import { Tabbar, TabbarItem } from 'vux'
	
	import imgIndex from 'assets/img/nav/nav-index.png'
	import imgCourse from 'assets/img/nav/nav-course.png'
	import imgMall from 'assets/img/nav/nav-mall.png'
	import imgMsg from 'assets/img/nav/nav-msg.png'
	import imgMy from 'assets/img/nav/nav-my.png'

	export default {
		// name: 'elNav',
		components: { Tabbar, TabbarItem },
		data () {
    	return {
    		isDemo: true,
    		navDatas: [
    			{
    				value: "index",
    				name: "首页",
    				img: imgIndex,
    				link: 'index'
    			},{
    				value: "course",
    				name: "课程",
    				img: imgCourse,
    				link: 'course'
    			},{
    				value: "mall",
    				name: "",
    				img: imgMall,
    				link: 'mall'
    			},{
    				value: "msg",
    				name: "消息",
    				img: imgMsg,
    				link: 'msg'
    			},{
    				value: "userCenter",
    				name: "我的",
    				img: imgMy,
    				link: 'userCenter'
    			}
    		],
    		navSelected: 'index'
	    }
	  }
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	// 这里的大小取自vux组件的
	.icon-big {
		width: 68px;
    height: 69px;
    position: absolute;
    top: -20px;
    left: 50%;
    margin-left: -34px;
	}
</style>
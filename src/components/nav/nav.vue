<!-- 
 底部导航菜单
 -->

<template>
    <div v-transfer-dom v-cloak>
      <nav>
    	<tabbar icon-class="vux-center" slot="bottom">
          <tabbar-item v-for="item in navDatas" :link="{name: item.link}" :selected="item.value == navSelected" :badge="item.link == 'msg' ? user.hasMsg : ''" :key="item.value">
            <img v-if="item.value == 'mall'" :class="{'nav-icon-big': item.value == 'mall'}" slot="icon" :src="item.img">
            <i v-else :class="['fa', 'fa-' + item.value ]" slot="icon"></i>
            <span slot="label" class="nav-icon">{{ item.name }}</span>
          </tabbar-item>
        </tabbar>
      </nav>
    </div>
</template>

<script type="text/babel">
	import { Tabbar, TabbarItem, TransferDom } from 'vux'
    import { mapState } from 'vuex'
	
	import imgIndex from 'assets/img/nav/nav-index.png'
	import imgCourse from 'assets/img/nav/nav-course.png'
	import imgMall from 'assets/img/nav/nav-mall.png'
	import imgMsg from 'assets/img/nav/nav-msg.png'
	import imgMy from 'assets/img/nav/nav-my.png'

	export default {
		name: 'elNav',
		components: { Tabbar, TabbarItem },
        directives: {
            TransferDom
        },
		data () {
        	return {
        		isDemo: true,
        		navDatas: [
        			{
        				value: "home",
        				name: "首页",
        				img: imgIndex,
        				link: 'index'
        			},{
        				value: "headphones",
        				name: "课程",
        				img: imgCourse,
        				link: 'course'
        			},{
        				value: "mall",
        				name: "",
        				img: imgMall,
        				link: 'mall'
        			},{
        				value: "comments-o",
        				name: "消息",
        				img: imgMsg,
        				link: 'msg'
        			},{
        				value: "user-o",
        				name: "我的",
        				img: imgMy,
        				link: 'userCenter'
        			}
        		],
        		navSelected: 'home'
    	    }
	    },
        computed: {
          ...mapState({
            user: state => state.user
          })
        },
        // computed: {
        //     navSelected () {
        //         let _this = this,
        //             name = this.$route.name,
        //             data = "home";
        //         this.navDatas.map(function(item, index){
        //             if(item.link == name) {
        //                 data = item.value;
        //             }
        //         });
        //         return data;
        //     }
        // }
	}
</script>

<style lang="scss">
    @import '~lib/sandal/core';
    @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
        
    $vuxBadgeW: 8px;
    
    .vux-center {
        .vux-badge {
            font-size: 0;
            width: $vuxBadgeW;
            height: $vuxBadgeW;
            margin-top: 6px;
            color: $msgCircleColor;
            border-radius: $vuxBadgeW;
        }
    }
</style>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';

	// 这里的大小取自vux组件的
	.nav-icon-big {
		width: 68px;
        height: 69px;
        position: absolute;
        top: -22px;
        left: 50%;
        margin-left: -34px;
	}
</style>
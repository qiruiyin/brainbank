<template>
  <div id="app">
    <loading v-model="isLoading"></loading>
    <div :class="['container', {'active': nav.status}]">
      <transition :name="'vux-pop-' + (direction.direction === 'forward' ? 'in' : 'out')">
          <router-view class="router-view"></router-view>
        </transition>
      <!-- <router-view></router-view>     -->
    </div>
    <el-nav v-show="nav.status"></el-nav>
  </div>
</template>

<script type="text/babel">
  import { Loading } from 'vux'
  import { mapState } from 'vuex'
  import hold from 'src/commons/hold'

  import elNav from 'components/nav/nav'

  export default {
    name: 'app',
    components: {
      Loading, elNav
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapState({
        user: state => state.user,
        nav: state => state.nav,
        isLoading: state => state.isLoading,
        direction: state => state.direction
      })
    },
    mounted () {
      let userCode = this.$store.state.user.userCode,
          storageOpenId = hold.storage.get("openId"),
          storeOpenId = this.$store.state.user.openId,
          openId = storageOpenId || storeOpenId;

      if(userCode && userCode != "undefined" && userCode != "") {
        this.fetchData(hold.storage.get("openId"), userCode);
      } else if(openId && openId != "undefined" && openId != "") {
        this.getUserCode(openId);
      }
    },
    methods: {
      getUserCode (openId) {
        let _this = this;

        _this.$http.post('/wechat/discover/usercode/get',
            {
              "openId": openId
            }
          ).then(function(e) {
            _this.fetchData(openId, e.data.data.userCode);
        });
      },
      fetchData (openId, code) {
        let _this = this;

        hold.storage.set("openId", openId);
        hold.storage.set("userCode", code);
        _this.$store.commit("updateUserUserCode", { userCode: code });
        _this.$store.commit("updateUserOpenId", { openId: openId });

        if(code) {
          _this.$store.commit('updateUserBangdingStatus', {bangdingStatus: true});
        }

        _this.$http.post('/wechat/discover/userinfo/get',
            {
              "userCode": code,
              "openId": openId
            }
          ).then(function(e) {
            let responseData = e.data.data,
                headerUrl;

            headerUrl = _this.resolveImg(responseData.headerUrl) ;

            _this.$store.commit('updateUserImg', {img: headerUrl});
            _this.$store.commit('updateUserName', {name: responseData.name ? responseData.name : '普通学员'})

            if(responseData.userLevelMap) {
              _this.$store.commit('updateUserLevel', {level: responseData.userLevelMap.categoryLevel });
              _this.$store.commit('updateUserBtns', {btns: _this.wordBook.headerBtns['level' + responseData.userLevelMap.categoryLevel].btns})
              _this.$store.commit('updateUserCourse', {course: responseData.userLevelMap.categoryName})
            } else {
              _this.$store.commit('updateUserBtns', {btns: _this.wordBook.headerBtns.level1.btns})
              _this.$store.commit('updateUserCourse', {course: _this.wordBook.headerBtns.level1.course})
              _this.$store.commit('updateUserLevel', {level: 1 });
            }
          });
      },
    }
  }
</script>

<style src="assets/css/common.scss" lang="scss"></style>

<style lang="scss" scoped>
  @import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
  
  #app {
    // position: relative;
    height: 100%;
    overflow: hidden;
  }

  .container {
    // position: relative;
    width: 100%;
    height: 100%;
    // padding-bottom: $containerBottom;
    overflow: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;

    &.active {
      padding-bottom: $containerBottom;
    }
  }

.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  width: 100%;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>

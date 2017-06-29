<template>
  <div id="app">
    <loading v-model="isLoading"></loading>
    <div class="container">
      <router-view></router-view>    
    </div>
    <el-nav></el-nav>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { mapState } from 'vuex'

import elNav from 'components/nav/nav'

export default {
  name: 'app',
  components: {
    Loading, elNav
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    })
  }
}
</script>

<style src="assets/css/common.scss" lang="scss"></style>

<style lang="scss" scoped>
  @import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
  
  #app {
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  .container {
    height: 100%;
    padding-bottom: 50px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>

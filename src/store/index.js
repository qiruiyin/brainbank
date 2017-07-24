import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import loadbar from './modules/loadbar'
import common from './modules/common'
import direction from './modules/direction'
import user from './modules/user'
import msg from './modules/msg'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
  	loadbar,
  	common,
    direction,
    user,
    msg
    // cart,
    // products
  },
  strict: debug
  // plugins: debug ? [createLogger()] : []
})

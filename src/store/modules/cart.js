import * as types from '../mutation-types'

export default {
  state: {
    num: 0
  },
  mutations: {
    updateCartNum (state, payload) {
      state.num = payload.num
    }
  }
}

import * as types from '../mutation-types'

export default {
  state: {
    name: "",
    userCode: "",
    url: ''
  },
  mutations: {
    updateMsgName (state, payload) {
      state.name = payload.name
    },
    updateMsgUserCode (state, payload) {
      state.userCode = payload.userCode
    },
    updateMsgUrl (state, payload) {
      state.url = payload.url
    }
  }
}

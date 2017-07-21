import * as types from '../mutation-types'

export default {
  state: {
    img: '',
    name: '',
    course: '',
    userCode: '',
    level: '',
    openId: '',
    btns: [],
    bangdingStatus: true
  },
  mutations: {
    updateUserImg (state, payload) {
      state.img = payload.img
    },
    updateUserName (state, payload) {
      state.name = payload.name
    },
    updateUserCourse (state, payload) {
      state.course = payload.course
    },
    updateUserUserCode (state, payload) {
      state.userCode = payload.userCode
    },
    updateUserLevel (state, payload) {
      state.level = payload.level
    },
    updateUserOpenId (state, payload) {
      state.openId = payload.openId
    },
    updateUserBtns (state, payload) {
      state.btns = payload.btns
    },
    updateUserBangdingStatus (state, payload) {
      state.bangdingStatus = payload.bangdingStatus
    }
  }
}

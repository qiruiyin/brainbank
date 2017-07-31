// 用户信息存储
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
    bangdingStatus: false,
    qrcode: ""
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
    },
    updateUserQrcode (state, payload) {
      state.qrcode = payload.qrcode
    }
  }
}

import * as types from '../mutation-types'

export default {
  state: {
    img: '',
    name: '梁熙颖',
    course: '商业思维',
    userCode: '201705300052529835144771844797952',
    level: '',
    btns: []
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
    updateUserBtns (state, payload) {
      state.btns = payload.btns
    }
  }
}

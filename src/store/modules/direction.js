import * as types from '../mutation-types'

export default {
  state: {
    direction: 'forword'
  },
  mutations: {
    updateDirection (state, payload) {
    	console.log(state, payload)
      state.direction = payload.direction
    }
  }
}

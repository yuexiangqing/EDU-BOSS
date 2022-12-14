import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
  },
  mutations: {
    jia (state, payload) {
      state.count = payload
    }
  },
  actions: {
    jiaHandle (context, payload) {
      setTimeout(() => {
        // context 与 store 功能完全相同
        context.commit('jia', payload.count)
      }, payload.delay)
    }
  },
  modules: {
  }
})

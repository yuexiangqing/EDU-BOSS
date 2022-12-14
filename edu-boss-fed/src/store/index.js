import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用于在登录成功后保存用户信息（初始值尝试读取本地存储）
    // user: null
    user: JSON.parse(window.localStorage.getItem('user') || null)
  },
  getters: {
  },
  mutations: {
    // 存储用户数据
    setUser (state, payload) {
      // 将 payload 转换为对象后再存储到 vuex 中
      state.user = JSON.parse(payload)
      // 将 payload 数据添加到本地存储中
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})

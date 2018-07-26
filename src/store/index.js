import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

const state = {
  isLogin: window.localStorage.getItem('isLogin') || false,
  cs: '1',
  name: window.localStorage.getItem('name') || '某某',
  goodsNum: 0,
  userId: window.localStorage.getItem('userId') || ''
}

const getters = {
}

const mutations = {
  changeLogin (state, status) {
    state.isLogin = status
  },
  changeName (state, status) {
    state.name = status
  },
  changeId (state, status) {
    state.userId = status
  },
  changeGoodsNum (state, num) {
    state.goodsNum = num
  }
}

const actions = {
  loginAction ({ commit }) {
    commit('changeLogin', true)
  }
}

export default new vuex.Store({
  state,
  getters,
  actions,
  mutations
})

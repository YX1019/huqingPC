import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

const state = {
  isLogin: false,
  cs: '1',
  name: '某某',
  goodsNum: 0
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

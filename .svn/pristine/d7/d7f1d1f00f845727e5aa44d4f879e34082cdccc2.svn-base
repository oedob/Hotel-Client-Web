import Vue from 'vue'
import mutations from './mutations'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  user: {},
  token: '',
  count: 0,
  status: '',
  oldaddress: ''
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  mutations
})

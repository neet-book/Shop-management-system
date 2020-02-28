import Vue from 'vue'
import Vuex from 'vuex'

import { SET_RIGHTS_TREE } from './mutation.type'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rightsTree: []
  },
  mutations: {
    [SET_RIGHTS_TREE](state, tree) {
      state.rightsTree = tree
    }
  },
  actions: {
  },
  modules: {
  }
})

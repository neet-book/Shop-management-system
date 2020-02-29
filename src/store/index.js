import Vue from 'vue'
import Vuex from 'vuex'

import { UPDATE_RIGHTS_TREE, UPDATE_ROLE_LIST } from './mutation.type'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 权限列表
    rightsTree: [],
    // 角色列表
    rolesList: []
  },
  mutations: {
    [UPDATE_RIGHTS_TREE](state, tree) {
      state.rightsTree = tree
    },
    [UPDATE_ROLE_LIST](state, list) {
      state.rolesList = list
    }
  },
  actions: {
  },
  modules: {
  }
})

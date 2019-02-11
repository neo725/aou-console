import Vue from 'vue'
import Vuex from 'vuex'

//import { state, getters, actions, mutations } from './root.js'
import getters from './_getters'
import state from './_states'
import actions from './_actions'
import mutations from './_mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
//   modules: {
//     form,
//     formToDoList,
//     formQuery,
//     signOff
//   }
})

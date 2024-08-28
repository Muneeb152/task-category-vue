import Vue from 'vue'
import Vuex from 'vuex'
import signInStore from '../store/SignIn/signInStore.js'
import Register from '../store/SignUp/Register.js'
import TaskStore from '../store/Task/TaskStore.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    signInStore,
    Register,
    TaskStore,
  }
})

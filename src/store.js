import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    edit_mode: false,
  },
  mutations: {
    toggle_edit_mode (sate){
      this.state.edit_mode = !this.state.edit_mode;
    }
  },
  actions: {

  }
})

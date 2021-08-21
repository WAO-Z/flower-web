import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    name: "",
    phone: 0,
    id: 0,
    session: 0,
    qrCodeURL: "",
    is_appointment: 0

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

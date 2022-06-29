import { createStore } from 'vuex'

export default createStore({
  state: {
    Entered:{},
    Authorization: sessionStorage.getItem('Authorization') ?sessionStorage.getItem('Authorization') : ''
  },
  mutations: {
    changeLogin(state, token) {
      state.Authorization = token
      sessionStorage.setItem('Authorization', token)
    },
    setEntered: (state, payload) => {
      state.Entered[payload.id] = payload.val
    }
  },
  getters: {
    getEntered: state => state.Entered
  },
  actions: {
  },
  modules: {
  }
})

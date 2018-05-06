import Vuex from 'vuex'

const store = () => new Vuex.Store({
  actions: {
    nuxtServerInit ({ commit, state }, context) {
      state.apiUrl = context.isDev ? context.env.API_DEV : context.env.API_PROD
    }
  },
  state: {
    apiUrl: null
  }
})

export default store

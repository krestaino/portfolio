import Vuex from 'vuex'

const store = () => new Vuex.Store({

  actions: {
    async nuxtServerInit ({ commit, state }) {
      let projects = await this.$axios.get('https://portfolio-api.kmr.io/project')
      commit('setProjects', projects.data)

      let jobs = await this.$axios.get('https://portfolio-api.kmr.io/job')
      commit('setJobs', jobs.data)
    }
  },

  mutations: {
    setProjects (state, data) {
      state.projects = data
    },
    setJobs (state, data) {
      state.jobs = data
    }
  },

  state: {
    projects: null,
    jobs: null
  }
})

export default store

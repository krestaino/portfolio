import Vuex from 'vuex'

const store = () => new Vuex.Store({

  actions: {
    async nuxtServerInit ({ commit, state }) {
      let projects = await this.$axios.get('http://localhost:1337/project')
      commit('setProjects', projects.data)

      let jobs = await this.$axios.get('http://localhost:1337/job')
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

import gql from 'graphql-tag'

const state = {
  apitoken: null
}

const getters = {
  APITOKEN: state => {
    return state.apitoken
  }
}

const mutations = {
  // this.$store.commit(“SET_NAME”,your_name)
  SET_APITOKEN: (state, payload) => {
    state.apitoken = payload
  }
}

const actions = {
  // this.$store.dispatch("SET_NAME",your_name)
  setApiToken: (context, payload) => {
    context.commit('SET_APITOKEN', payload)
  },
  doLogin: async (context, payload) => {
    let response = null
    try {
      response = await payload.apollo.mutate({
        mutation: gql`mutation(
          $username: String,
          $password: String
        ){
          authenticate(username: $username, password: $password)
        }`,
        variables: {
          username: payload.username,
          password: payload.password
        }
      })
    } catch (error) {
      return { iserror: true, message: error }
    }
    // commit disini
    context.dispatch('setApiToken', response.data.authenticate)
    return { iserror: false, message: '' }
  },
  doLogout: (context, payload) => {
    // commit disini
    context.dispatch('setApiToken', null)
    sessionStorage.removeItem('jdih-token')
    return { iserror: false, message: 'Successfuly logged out' }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

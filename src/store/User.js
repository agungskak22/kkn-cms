import gql from 'graphql-tag'

const state = {
  users: []
}

const getters = {
  USERS: state => {
    return state.users
  },
  USER: state => {
    return index => {
      return JSON.stringify(state.users.filter(user => {
        return user.id === index
      }))
    }
  }
}

const mutations = {
  SET_USERS: (state, payload) => {
    state.users = payload
  },
  ADD_USER: (state, payload) => {
    state.users.push(payload)
  },
  EDIT_USER: (state, payload) => {
    state.users[ payload.index ] = payload.object
  },
  REMOVE_USER: (state, index) => {
    state.users.splice(index, 1)
  }

}

const actions = {
  addUser: (context, payload) => {
    context.commit('ADD_USER', payload)
  },
  editUser: (context, payload) => {
    context.commit('EDIT_USER', payload)
  },
  removeUser: (context, payload) => {
    context.commit('REMOVE_USER', payload)
  },
  doAllUser: async (context, payload) => {
    let response = null
    try {
      response = await payload.apollo.query({
        query: gql`query{
        users{
            id,
          username,
          fullName
        }
      }`
      })
    } catch (error) {
      return { iserror: true, message: error }
    }
    // commit disini
    context.commit('SET_USERS', response.data.users)
    return context.getters.USERS
  },
  doAddUser: async (context, payload) => {
    let response = null
    try {
      response = await payload.apollo.mutate({
        mutation: gql`mutation(
          $username: String,
          $fullName: String,
          $confirmPassword: String,
          $password: String
        ){
          createUser(
              payload : { 
              username: $username, fullName: $fullName, password: $password, confirmPassword: $confirmPassword
          }) {
            id,
            username,
            fullName
          }
        }`,
        variables: {
          username: payload.object.username,
          fullName: payload.object.fullName,
          confirmPassword: payload.object.confirmPassword,
          password: payload.object.password
        }
      })
    } catch (error) {
      return { iserror: true, message: error }
    }
    // commit disini
    context.dispatch('addUser', response.data.createUser)
    return { iserror: false, message: '' }
  },
  doRemoveUser: async (context, payload) => {
    let response = null
    try {
      response = await payload.apollo.mutate({
        mutation: gql`mutation(
          $id: Int
        ){
          deleteUser(id: $id)
        }`,
        variables: {
          id: payload.index
        }
      })
    } catch (error) {
      return { iserror: true, message: error.graphQLErrors[ 0 ][ 'message' ] }
    }
    // commit disini
    context.dispatch('removeUser', payload.index)
    return { iserror: false, message: 'Deleted user index: ' + response }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

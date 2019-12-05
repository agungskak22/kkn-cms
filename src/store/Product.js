import gql from 'graphql-tag'

const state = {
  products: [],
  productstatuses: [],
  producttypes: [],
  product: null
}

const getters = {
  PRODUCTS: state => {
    return state.products
  },
  PRODUCTTYPES: state => {
    return state.producttypes
  },
  PRODUCTSTATUSES: state => {
    return state.productstatuses
  },
  EDITEDPRODUCT: state => {
    if (state.product === null || state.product.length === 0) {
      return null
    }
    return state.product[0]
  },
  PRODUCT: state => {
    return index => {
      state.product = state.products.filter(product => {
        return product.id === index
      })
      if (state.product.length === 0 || state.product === null) {
        state.product = null
      }
      return state.product
    }
  }
}

const mutations = {
  SET_PRODUCTS: (state, payload) => {
    state.products = payload
  },
  SET_PRODUCTTYPES: (state, payload) => {
    state.producttypes = payload
  },
  SET_PRODUCTSTATUSES: (state, payload) => {
    state.productstatuses = payload
  },
  GET_PRODUCT: (state, index) => {
    state.product = state.products.filter(product => {
      return product.id === index
    })
    if (state.product.length === 0 || state.product === null) {
      state.product = null
    }
  },
  RESET_PRODUCT: (state, payload) => {
    state.product = null
  },
  ADD_PRODUCT: (state, payload) => {
    state.products.push(payload)
  },
  EDIT_PRODUCT: (state, payload) => {
    state.products[ payload.index ] = payload.object
  },
  REMOVE_PRODUCT: (state, index) => {
    state.products.splice(index, 1)
  }
}

const actions = {
  addProduct: (context, payload) => {
    context.commit('ADD_PRODUCT', payload)
  },
  editProduct: (context, payload) => {
    context.commit('EDIT_PRODUCT', payload)
  },
  removeProduct: (context, payload) => {
    context.commit('REMOVE_PRODUCT', payload)
  },
  doAllProduct: async (context, payload) => {
    let response = null
    try {
      response = await payload.apollo.query({
        query: gql`query{
        products{
          id,
          about,
          description,
          legislatedAt,
          setAt,
          year,
          status {
            id,
            name
          },
          type {
            id,
            name
          },
          files {
            fileName,
            mimeType,
            url
          }
        }
      }`
      })
    } catch (error) {
      return { iserror: true, message: error }
    }
    // commit disini
    context.commit('SET_PRODUCTS', response.data.products)
    return context.getters.PRODUCTS
  },
  doAddProduct: async (context, payload) => {
    let response = null
    try {
      response = await payload.apollo.mutate({
        mutation: gql`mutation(
          $about: String,
          $description: String,
          $legislatedAt: String,
          $setAt: String,
          $statusId: Int,
          $typeId: Int,
          $year: Int,
          $files: [FileInput]
        ){
          createProduct(
              payload : { 
                about: $about,
                description: $description,
                legislatedAt: $legislatedAt,
                setAt: $setAt,
                statusId: $statusId,
                typeId: $typeId,
                year: $year,
                files: $files
          }) {
            id,
            about,
            description,
            legislatedAt,
            setAt,
            year,
            status {
              id,
              name
            },
            type {
              id,
              name
            },
            files {
              fileName,
              mimeType,
              url
            }
          },
        }`,
        variables: {
          about: payload.object.about,
          description: payload.object.description,
          legislatedAt: payload.object.legislatedAt,
          setAt: payload.object.setAt,
          statusId: payload.object.statusId,
          typeId: payload.object.typeId,
          year: payload.object.year,
          files: payload.object.files
        }
      })
    } catch (error) {
      return { iserror: true, message: error }
    }
    // commit disini
    context.dispatch('addProduct', response.data.createProduct)
    return { iserror: false, message: '' }
  },
  doEditProduct: async (context, payload) => {
    let response = null
    try {
      response = await payload.apollo.mutate({
        mutation: gql`mutation(
        $id: Int,
        $about: String,
        $description: String,
        $legislatedAt: String,
        $setAt: String,
        $statusId: Int,
        $typeId: Int,
        $year: Int,
        $files: [FileInput]){
        
          updateProduct(
            id: $id,
            payload : {
              about: $about,
              description: $description,
              legislatedAt: $legislatedAt,
              setAt: $setAt,
              statusId: $statusId,
              typeId: $typeId,
              year: $year,
              files: $files
            }) {
            id,
            about,
            description,
            legislatedAt,
            setAt,
            year,
            status {
              id,
              name
            },
            type {
              id,
              name
            },
            files {
              fileName,
              mimeType,
              url
            }
          }
        }`,
        variables: {
          id: payload.index,
          about: payload.object.about,
          description: payload.object.description,
          legislatedAt: payload.object.legislatedAt,
          setAt: payload.object.setAt,
          statusId: payload.object.statusId,
          typeId: payload.object.typeId,
          year: payload.object.year,
          files: payload.object.files
        }
      })
    } catch (error) {
      return { iserror: true, message: error }
    }
    // commit disini
    context.dispatch('editProduct', response.data.updateProduct)
    return { iserror: false, message: '' }
  },
  doRemoveProduct: async (context, payload) => {
    let response = null
    try {
      response = await payload.apollo.mutate({
        mutation: gql`mutation(
          $id: Int
        ){
          deleteProduct(id: $id)
        }`,
        variables: {
          id: payload.index
        }
      })
    } catch (error) {
      return { iserror: true, message: error.graphQLErrors[ 0 ][ 'message' ] }
    }
    // commit disini
    context.dispatch('removeProduct', payload.index)
    return { iserror: false, message: 'Deleted product index: ' + response }
  },
  doAllProductStatuses: async (context, payload) => {
    let response = null
    try {
      response = await payload.apollo.query({
        query: gql`query{
          productStatuses{
            id,
            name
          }
        }`
      })
    } catch (error) {
      return { iserror: true, message: error }
    }
    // commit disini
    context.commit('SET_PRODUCTSTATUSES', response.data.productStatuses)
    return context.getters.PRODUCTSTATUSES
  },
  doAllProductTypes: async (context, payload) => {
    let response = null
    try {
      response = await payload.apollo.query({
        query: gql`query{
            productTypes{
              id,
              name
            }
          }`
      })
    } catch (error) {
      return { iserror: true, message: error }
    }
    // commit disini
    context.commit('SET_PRODUCTTYPES', response.data.productTypes)
    return context.getters.PRODUCTTYPES
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

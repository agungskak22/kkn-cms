import Vue from 'vue'
import Vuex from 'vuex'

import User from './AdminUser'
import UserN from './User'
import Product from './Product'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    User,
    UserN,
    Product
  }
})

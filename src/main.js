import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueApollo from 'vue-apollo'
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost'

const httpLink = new HttpLink({ uri: process.env.VUE_APP_GQL_BASE })

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = sessionStorage.getItem('jdih-token')

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : 'tak ada'
    }
  })

  // Call the next link in the middleware chain.
  return forward(operation)
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache()
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(VueApollo)

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

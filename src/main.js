import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'
import Axios from 'axios'
import store from './store'

Vue.prototype.$http = Axios
Vue.prototype.$apiurl = 'https://api-gis.ercasystem.com/api'
Vue.prototype.$apiLogin = 'https://api-gis.ercasystem.com/oauth'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

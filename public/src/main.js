import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import store from './store'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.prototype.$moment = moment

Vue.use(Vuetify, {
  theme: {
    primary: '#42853d',
    secondary: '#f7f7f7',
    accent: '#e6e6e6'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import i18n from 'vue-i18n'
import chartjs from 'vue-chartjs'
import moment from 'vue-moment'
import { sync } from 'vuex-router-sync'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './App.css'

import App from './App'
import router from './router'
import store from './store'
import './components'

Vue.use(i18n)
Vue.use(chartjs)
Vue.use(moment)
Vue.use(Vuetify, {
  theme: {
    primary: '#42853d',
    secondary: '#f7f7f7',
    accent: '#e6e6e6'
  }
})

sync(store, router)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

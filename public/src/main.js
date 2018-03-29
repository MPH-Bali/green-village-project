import 'babel-polyfill'

import Vue from 'vue'
import moment from 'vue-moment'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'
import './App.css'

import './components'
import App from './App'
import router from './router'
import i18n from './i18n'
import firebase from './firebase'
import firestore from './firestore'
import firestore2 from './vue-firestore-sync'

Vue.prototype.$firebase = firebase
Vue.prototype.$firestore = firestore
Vue.prototype.$firestore2 = firestore2
Vue.prototype.$store = firestore2.store
Vue.prototype.$sync = firestore2.sync

Vue.use(moment)
Vue.use(Vuetify, {
  theme: {
    primary: '#42853d',
    secondary: '#f7f7f7',
    accent: '#e5ece9'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})

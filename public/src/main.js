import Vue from 'vue'
import moment from 'vue-moment'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { auth } from '@/firebase'
import './App.css'

import App from './App'
import router from './router'
import i18n from './i18n'
import './elements'
import firestore from './firestore'

Vue.prototype.$firestore = firestore

Vue.use(moment)
Vue.use(Vuetify, {
  theme: {
    primary: '#42853d',
    secondary: '#f7f7f7',
    accent: '#e5ece9'
  }
})

Vue.config.productionTip = false

let app
// Wait for the firebase state to initialise before we render the component,
// so we know if we need to redirect the user to the login page.
auth.onAuthStateChanged(user => {
  if (!app) {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      i18n,
      router,
      components: { App },
      template: '<App/>'
    })
  }
})

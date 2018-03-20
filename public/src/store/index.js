import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import delivery from './modules/delivery'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    delivery
  }
})

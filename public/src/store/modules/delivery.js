import Vue from 'vue'
import API from '@/api/'
import * as types from '../mutations.js'

const actions = {
  fetchDailyList: async ({ commit }, { date }) => {
    const result = await API.Deliveries.fetchDailyDeliveries({ date })
    if (result.success) {
      commit(types.FETCH_DAILY_DELIVERIES, { list: result.data })
    }
    return result
  },
  fetchItem: async ({ commit }, { id }) => {
    const result = API.Deliveries.fetchDeliveryItem({ id })
    return result
    // todo: proper mutations
  },
  deleteItem ({ commit }, { id }) {
    const result = API.Deliveries.deleteDeliveryItem({ id })
    return result
    // todo: proper mutations
  },
  saveItem ({ commit }, { form }) {
    const result = API.Deliveries.saveDeliveryItem({ form })
    return result
    // todo: proper mutations
  }
}

const getters = {
  getDailyList: state => state.dailyList
}

const mutations = {
  [types.FETCH_DAILY_DELIVERIES]: (state, { list }) => {
    Vue.set(state, 'dailyList', list.slice())
  }
}

const initialState = {
  dailyList: []
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}

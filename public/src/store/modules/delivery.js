import Vue from 'vue'
import API from '@/api/'

const FETCH_DAILY_DELIVERIES = 'FETCH_DAILY_DELIVERIES'
const DELETE_DELIVERY_ITEM = 'DELETE_DELIVERY_ITEM'
const UPDATE_DELIVERY_ITEM = 'UPDATE_DELIVERY_ITEM'
const CREATE_DELIVERY_ITEM = 'CREATE_DELIVERY_ITEM'
const FETCH_DELIVERY_ITEM = 'FETCH_DELIVERY_ITEM'

const actions = {
  fetchDailyList: async ({ commit }, { date }) => {
    const result = await API.Deliveries.fetchDailyList({ date })
    if (result.success) {
      commit(FETCH_DAILY_DELIVERIES, { data: result.data })
    }
    return result
  },
  fetchItem: async ({ commit }, { id }) => {
    const result = await API.Deliveries.fetchItem({ id })
    if (result.success) {
      commit(FETCH_DELIVERY_ITEM, { id, data: result.data })
    }
    return result
  },
  deleteItem: async ({ commit, getters }, { id }) => {
    const result = await API.Deliveries.deleteItem({ id })
    if (result.success) {
      commit(DELETE_DELIVERY_ITEM, { id })
    }
    return result
  },
  createItem: async ({ commit }, { form }) => {
    const result = await API.Deliveries.createItem({ form })
    if (result.success) {
      commit(CREATE_DELIVERY_ITEM, { id: result.data.id, data: form })
    }
    return result
  },
  updateItem: async ({ commit }, { form }) => {
    const result = await API.Deliveries.updateItem({ form })
    if (result.success) {
      commit(UPDATE_DELIVERY_ITEM, { id: form.id, data: form })
    }
    return result
  },
  saveItem: async (store, { form }) => {
    if (form.id) {
      return actions.updateItem(store, { form })
    }
    return actions.createItem(store, { form })
  }
}

const getters = {
  getDailyList: state => state.dailyList,
  getDeliveryById: state => {
    return id => {
      return state.dailyList[id]
    }
  }
}

const mutations = {
  [FETCH_DAILY_DELIVERIES]: (state, { data }) => {
    Vue.set(state, 'dailyList', data)
  },
  [DELETE_DELIVERY_ITEM]: (state, { id }) => {
    Vue.delete(state.dailyList, id)
  },
  [UPDATE_DELIVERY_ITEM]: (state, { id, data }) => {
    Vue.set(state.dailyList, id, data)
  },
  [CREATE_DELIVERY_ITEM]: (state, { id, data }) => {
    Vue.set(state.dailyList, id, data)
  },
  [FETCH_DELIVERY_ITEM]: (state, { id, data }) => {
    Vue.set(state.dailyList, id, data)
  }
}

const initialState = {
  dailyList: {}
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}

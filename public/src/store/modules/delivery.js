// import * as types from '../mutation.js'
import { db } from '../firebase'

const actions = {
  fetchDailyList ({ commit }, logDate) {
    return new Promise((resolve, reject) => {
      db.collection('delivery')
        .where('timestamp', '>=', new Date(logDate))
        .where('timestamp', '<=', new Date(logDate.endOf('day')))
        .get()
        .then(snapShot => {
          let data = []
          snapShot.forEach(doc => data.push({ id: doc.id, ...doc.data() }))
          commit('setDailyList', data)
          resolve(data)
        })
        .catch(err => reject(err))
    })
  },
  fetchItem ({ commit }, id) {
    return new Promise((resolve, reject) => {
      db.collection('delivery').doc(id).get()
        .then(doc => resolve({ id: doc.id, ...doc.data() }))
        .catch(err => reject(err))
    })
  },
  deleteItem ({ commit }, id) {
    return new Promise((resolve, reject) => {
      db.collection('delivery').doc(id).delete()
        .then(data => resolve(data)) // ToDo: Remove from local array
        .catch(err => reject(err))
    })
  },
  save ({ commit }, form) {
    return new Promise((resolve, reject) => {
      if (form.id) {
        db.collection('delivery')
          .doc(form.id)
          .set({ ...form })
          .then(data => resolve(data)) // ToDo: Update local array
          .catch(err => reject(err))
      } else {
        db.collection('delivery')
          .add(form)
          .then(data => resolve(data)) // ToDo: Push to local array
          .catch(err => reject(err))
      }
    })
  }
}

const getters = {

}

const mutations = {
  setDailyList (state, dailyList) {
    state.dailyList = []
    dailyList.forEach(item => state.dailyList.push(item))
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

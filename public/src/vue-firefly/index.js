import sync from './sync'
export default {
  install (Vue, { db, registerGlobals = true }) {
    let firefly = new Vue({
      data: {
        refs: {},
        db
      },
      methods: {
        sync: sync(this, db)
      }
    })

    if (registerGlobals) {
      Vue.prototype['$db'] = db
      Vue.prototype['$sync'] = firefly.sync
      Vue.prototype['$store'] = firefly.store
    }
  }
}
